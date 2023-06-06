import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Lock } from 'lucide-react';
import randomColor from 'randomcolor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as Y from 'yjs';

import { Avatar, AvatarFallback, AvatarImage, AvatarWithDropdown, Button } from '@/components';
import { WEBSOCKET_API_URL } from '@/config';
import { FlickerDocsLogo } from '@/constants';
import { useAuth, useModal } from '@/hooks';
import { User } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

import { fetchDataFromOpenAiApi } from '../api/chat';
import { ChatTextSelection, Conversation } from '../components/Chat';
import { CustomToolbar } from '../components/CustomToolbar';
import ShareModal from '../components/ShareModal';

const Header = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className='flex h-[15vh] flex-col justify-between py-3 pe-8 ps-8'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div>
            <FlickerDocsLogo />
          </div>
          <div className='flex flex-col justify-between'>
            <h4 className='text-lg font-semibold leading-none text-slate-600'>Doc name</h4>
            <div className='flex gap-2 text-xs leading-none text-slate-600'>
              <p>File</p>
              <p>Edit</p>
              <p>View</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <Button onClick={openModal}>
            <Lock className='mr-2 h-4 w-4' /> Share
          </Button>

          <AvatarWithDropdown />
        </div>
      </div>
      <CustomToolbar />
    </div>
  );
};

export const Editor = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [aiAssistantResponse, setAIAssistantResponse] = useState<string>('');

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
          id: user?._id,
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

  const fetchData = async () => {
    setIsLoading(true);

    let question = '';

    if (textRef.current.length) {
      question = `${prompt}: "${textRef.current}"`;
    } else {
      question = `${prompt}`;
    }

    setPrompt('');
    editor?.commands.setTextSelection({ from: 0, to: 0 });
    setQuestion(question);

    try {
      const response = await fetchDataFromOpenAiApi(question);
      setIsLoading(false);
      setAIAssistantResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header openModal={openModal} />
      <div className='flex justify-center gap-4 bg-slate-100 p-4'>
        <EditorContent
          editor={editor}
          style={{
            height: 'calc(85vh - 32px)',
            width: '50%',
          }}
        />
        <div className='flex w-1/5 flex-col gap-6'>
          <div className='flex h-[50%] w-[100%] flex-col gap-3 overflow-y-auto rounded-md bg-white p-3'>
            {activeUsers.map((user) => (
              <div key={user._id} className='flex items-center gap-3'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user?.picture} alt='@shadcn' />
                  <AvatarFallback>
                    {user?.name.charAt(0)}
                    {user?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='capitalize'>{`${user.name.toLowerCase()}  ${user.lastName.toLowerCase()}`}</div>
              </div>
            ))}
          </div>
          <div className='flex h-[50%] w-[100%] flex-col justify-end rounded-md bg-white p-3'>
            {textRef.current.length ? (
              <ChatTextSelection
                selectedText={textRef.current}
                setPrompt={setPrompt}
                fetchData={fetchData}
                prompt={prompt}
              />
            ) : (
              <Conversation
                question={question}
                isLoading={isLoading}
                aiAssistantResponse={aiAssistantResponse}
                prompt={prompt}
                setPrompt={setPrompt}
                fetchData={fetchData}
              />
            )}
          </div>
        </div>
      </div>
      {isOpen ? <ShareModal closeModal={closeModal} isOpen={isOpen} /> : null}
    </>
  );
};
