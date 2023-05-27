import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Lock } from 'lucide-react';
// import QuillCursors from 'quill-cursors';
import { useEffect, useRef } from 'react';
// import ReactQuill from 'react-quill';
import { useParams, useSearchParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
// import { QuillBinding } from 'y-quill';
// import { WebrtcProvider } from 'y-webrtc';
// import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import '../styles/editor.css';
import { AvatarWithDropdown, Button } from '@/components';
import { FlickerDocsLogo } from '@/constants';
import { useModal } from '@/hooks';

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
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name: string = searchParams.get('name') || 'anonymous';
  const color: string = searchParams.get('color') || 'black';
  const userID: string = searchParams.get('id') || '123';

  const { Modal, openModal, closeModal } = useModal();

  // let quillRef: any = null;
  // let reactQuillRef: any = null;
  const yRef: any = useRef(null);
  const yRefEncoded: any = useRef(null);
  const awainessRef: any = useRef(null);

  // const attachQuillRefs = () => {
  //   if (typeof reactQuillRef.getEditor !== 'function') return;
  //   quillRef = reactQuillRef.getEditor();
  // };

  useEffect(() => {
    // attachQuillRefs();

    // ReactQuill.register('modules/cursors', QuillCursors);
    // https://github.com/yjs/yjs/blob/master/README.md

    if (!id) return;

    // const ydoc = new Y.Doc();
    // const provider = new WebrtcProvider(id, ydoc);

    yRef.current = ydoc;
    // console.log(Y.encodeStateAsUpdate(ydoc));

    // Sync clients with the y-websocket provider
    // const provider = new WebsocketProvider('ws://127.0.0.1:1234', id, ydoc);

    // ! run this in terminal to start websocket server
    // PORT=1234 node ./node_modules/y-websocket/bin/server.js

    provider.on('status', (event: any) => {
      console.log(`${event.status} to web socket server`); // logs "connected" or "disconnected"
    });

    const awareness = provider.awareness;

    awareness.setLocalStateField('user', {
      name: name,
      color: color,
      userID,
    });

    awainessRef.current = awareness;
    // console.log(wsProvider);
    // console.log(wsProvider.awareness);
    // const ytext = ydoc.getText('quill');
    // new QuillBinding(ytext, quillRef, provider.awareness);

    return () => {
      ydoc.destroy();
      provider.disconnect();
    };
  }, []);

  // const modules = {
  //   toolbar: {
  //     container: '#toolbar',
  //   },
  // };

  // const formats = [
  //   'header',
  //   'font',
  //   'size',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  //   'color',
  // ];

  const ydoc = new Y.Doc();

  const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234',
    name: 'example-document',
    document: ydoc,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: 'John Doe', color: '#ffcc00' },
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  return (
    <>
      <Header openModal={openModal} />
      <div className='flex justify-center gap-4 bg-slate-100 p-4'>
        {/* <ReactQuill
          ref={(el: any) => {
            reactQuillRef = el;
          }}
          modules={modules}
          formats={formats}
          placeholder='Start writing...'
          style={{
            height: 'calc(85vh - 32px)',
            width: '50%',
            background: '#fff',
            border: '0px !important',
            borderRadius: '6px',
          }}
        /> */}
        <EditorContent editor={editor} />
        <div className='flex w-1/5 flex-col gap-6'>
          <div className='h-[50%] w-[100%] rounded-md bg-white p-2'>
            <Button
              onClick={() => {
                yRefEncoded.current = Y.encodeStateAsUpdate(yRef.current);
                console.log(yRefEncoded.current);
              }}
            >
              encode
            </Button>
            <Button
              className='ms-2'
              onClick={() => {
                console.log(yRef.current);
                console.log(awainessRef.current.getStates());

                console.log(awainessRef.current.getLocalState());
                // console.log(Y.applyUpdate(yRef.current, yRefEncoded.current));
              }}
            >
              decode
            </Button>
          </div>
          {/* <div className="h-[50%] w-[100%] bg-white rounded-md"></div> */}
        </div>
      </div>
      <ShareModal closeModal={closeModal} Modal={Modal} />
    </>
  );
};
