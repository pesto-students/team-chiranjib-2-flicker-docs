/* eslint-disable */
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useQuery } from '@tanstack/react-query';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import randomColor from 'randomcolor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as Y from 'yjs';

import { WEBSOCKET_API_URL } from '@/config';
import { useAuth, useModal } from '@/hooks';
import { User } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

import { AiAssistant } from '../components/AiAssistant';
import Chat from '../components/Chat';
import { EditorHeader } from '../components/EditorHeader';
import ShareModal from '../components/ShareModal';

export const Editor = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  const textRef = useRef<string>('');

  const { id: docName } = useParams();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const { isOpen, openModal, closeModal } = useModal();

  const ydoc = useMemo(() => new Y.Doc(), []);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: WEBSOCKET_API_URL,
        name: docName || 'default',
        document: ydoc,
        onAwarenessChange: (awareness) => {
          setActiveUsers(awareness.states.map((state) => state.user));
        },
      }),
    [docName, ydoc]
  );

  const extensions = useMemo(
    () => [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.firstName,
          color: randomColor(),
          _id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          picture: user?.picture,
        },
      }),
    ],
    [provider, user?._id, user?.firstName, user?.lastName, user?.picture, ydoc]
  );

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          'prose-lg scrollbar focus:outline-none overflow-y-scroll bg-white rounded-md h-full p-[20px]',
      },
    },
  });

  editor?.captureTransaction(() => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const text = state.doc.textBetween(from, to, '');
    textRef.current = text;
  });

  useEffect(() => {
    const shared = searchParams.get('s');
    if (shared) {
      axiosClient
        .post('/document/user', { documentName: docName, userId: user?._id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [docName, searchParams, user?._id]);

  const { data: document } = useQuery({
    queryKey: ['document'],
    queryFn: () => {
      return axiosClient.get(`/document/${docName}`);
    },
    select: (res) => res.data,
    enabled: !!docName,
  });

  const resetEditorSelection = () => {
    editor?.commands.setTextSelection({ from: 0, to: 0 });
  };

  return (
    <div className='flex h-screen flex-col'>
      <EditorHeader openModal={openModal} document={document} editor={editor} />
      <div className='flex h-[calc(100%-115px)] justify-center gap-4 bg-slate-100 p-4'>
        <EditorContent
          editor={editor}
          style={{
            height: '100%',
            width: '50%',
          }}
        />
        <div className='flex w-1/5 flex-col gap-6'>
          <div className='scrollbar flex h-[40%] w-[100%] flex-col overflow-y-auto rounded-md bg-white p-2'>
            <Chat activeUsers={activeUsers} />
          </div>
          <div className='flex h-[60%] w-[100%] flex-col justify-between rounded-md bg-white p-3'>
            <h4 className='text-md mb-2 text-center text-slate-600'>AI Assistant</h4>
            <AiAssistant
              selectedText={textRef.current}
              resetEditorSelection={resetEditorSelection}
            />
          </div>
        </div>
      </div>
      {isOpen ? <ShareModal closeModal={closeModal} isOpen={isOpen} /> : null}
    </div>
  );
};
