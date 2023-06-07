import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
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
import { EditorHeader } from '../components/EditorHeader';
import Peers from '../components/Peers';
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
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-white rounded-md h-full',
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

  const resetEditorSelection = () => {
    editor?.commands.setTextSelection({ from: 0, to: 0 });
  };

  return (
    <>
      <EditorHeader openModal={openModal} />
      <div className='flex justify-center gap-4 bg-slate-100 p-4'>
        <EditorContent
          editor={editor}
          style={{
            height: 'calc(85vh - 32px)',
            width: '50%',
          }}
        />
        <div className='flex w-1/5 flex-col gap-6'>
          <div className='flex h-[40%] w-[100%] flex-col gap-2 overflow-y-auto rounded-md bg-white p-3'>
            <Peers activeUsers={activeUsers} />
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
    </>
  );
};
