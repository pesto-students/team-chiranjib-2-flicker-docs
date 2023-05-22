import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { QuillBinding } from 'y-quill';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

export const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  let quillRef: any = null;
  let reactQuillRef: any = null;

  console.log(id);

  // useEffect(() => {
  //   if (!id) {
  //     navigate({
  //       pathname: '/editor',
  //       search: '?id=123',
  //     });
  //   }
  // }, []);

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== 'function') return;
    quillRef = reactQuillRef.getEditor();
  };

  useEffect(() => {
    attachQuillRefs();

    // Quill.register("modules/cursors", QuillCursors);

    if (!id) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(id, ydoc);
    const ytext = ydoc.getText('quill');

    const binding = new QuillBinding(ytext, quillRef, provider.awareness);
    console.log(binding);
  }, []);

  const modulesRef = {
    toolbar: [
      [{ header: [1, 2, false] }],
      // ["bold", "italic", "underline", "strike", "blockquote"],
      // [
      //   { list: "ordered" },
      //   { list: "bullet" },
      //   { indent: "-1" },
      //   { indent: "+1" },
      // ],
      // ["link", "image"],
      // ["clean"],
    ],
  };

  return (
    <>
      <div className="flex items-center gap-4 pt-8 p-4">
        <h1 className="text-4xl">Editor</h1>
        <button
          onClick={() => navigate('/docs')}
          className="bg-black text-white p-3 rounded-xl content-center"
        >
          go back to docs
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="bg-black text-white p-3 rounded-xl ml-3 content-center"
        >
          go to settings
        </button>
      </div>
      <ReactQuill
        ref={(el) => {
          reactQuillRef = el;
        }}
        modules={modulesRef}
        theme={'snow'}
      />
    </>
  );
};
