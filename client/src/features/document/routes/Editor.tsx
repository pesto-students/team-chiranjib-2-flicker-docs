import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Lock } from 'lucide-react';
import randomColor from 'randomcolor';
import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as Y from 'yjs';

import { AvatarWithDropdown, Button } from '@/components';
import { WEBSOCKET_API_URL } from '@/config';
import { FlickerDocsLogo } from '@/constants';
import { useAuth, useModal } from '@/hooks';
import { axiosClient } from '@/lib';

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
          console.log(awareness);
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
        user: { name: user?.firstName, color: randomColor() },
      }),
    ],
    [provider, user?.firstName, ydoc]
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

  useEffect(() => {
    const shared = searchParams.get('s');
    if (shared) {
      axiosClient.post('/document/user', { documentName: docName, userId: user?._id });
    }
  }, [docName, searchParams, user?._id]);

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
          <div className='h-[50%] w-[100%] rounded-md bg-white p-2'></div>
          {/* <div className="h-[50%] w-[100%] bg-white rounded-md"></div> */}
        </div>
      </div>
      {isOpen ? <ShareModal closeModal={closeModal} isOpen={isOpen} /> : null}
    </>
  );
};

// https://tiptap.dev/guide/custom-extensions
