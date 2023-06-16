import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';

import './customtoolbar.css';

export const CustomToolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <Toolbar.Root className='ToolbarRoot' aria-label='Formatting options'>
      <Toolbar.ToggleGroup
        type='multiple'
        className='ToolbarToggleGroup'
        aria-label='Text formatting'
      >
        <Toolbar.ToggleItem className='ToolbarToggleItem' value='bold' aria-label='Bold'>
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem className='ToolbarToggleItem' value='italic' aria-label='Italic'>
          <FontItalicIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='strikethrough'
          aria-label='Strike through'
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className='ToolbarSeparator' />
      <Toolbar.ToggleGroup
        type='single'
        defaultValue='center'
        className='ToolbarToggleGroup'
        aria-label='Text alignment'
      >
        <Toolbar.ToggleItem className='ToolbarToggleItem' value='left' aria-label='Left aligned'>
          <TextAlignLeftIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='center'
          aria-label='Center aligned'
        >
          <TextAlignCenterIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem className='ToolbarToggleItem' value='right' aria-label='Right aligned'>
          <TextAlignRightIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className='ToolbarSeparator' />
      <Toolbar.Link className='ToolbarLink' href='#' target='_blank' style={{ marginRight: 10 }}>
        Edited 2 hours ago
      </Toolbar.Link>
    </Toolbar.Root>
  );
  // return (
  //   // <div className="w-[1200px] h-full overflow-y-scroll overflow-x-hidden">
  //   <div className='[&>*]:bg-gray-0 grid w-[500px] auto-cols-max grid-flow-col grid-rows-1 gap-3 [&>*]:cursor-pointer [&>*]:rounded-[7px] [&>*]:border-[1px] [&>*]:border-gray-400 [&>*]:px-[6px] [&>*]:py-[2px] [&>*]:text-[12px] [&>*]:font-[600] [&>*]:text-gray-500'>
  //     <button
  //       onClick={() => editor.chain().focus().toggleBold().run()}
  //       disabled={!editor.can().chain().focus().toggleBold().run()}
  //       className={editor.isActive('bold') ? 'is-active' : ''}
  //     >
  //       Bold
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleItalic().run()}
  //       disabled={!editor.can().chain().focus().toggleItalic().run()}
  //       className={editor.isActive('italic') ? 'is-active' : ''}
  //     >
  //       Italic
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleStrike().run()}
  //       disabled={!editor.can().chain().focus().toggleStrike().run()}
  //       className={editor.isActive('strike') ? 'is-active' : ''}
  //     >
  //       Strike
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleCode().run()}
  //       disabled={!editor.can().chain().focus().toggleCode().run()}
  //       className={editor.isActive('code') ? 'is-active' : ''}
  //     >
  //       Code
  //     </button>
  //     <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
  //     <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
  //     <button
  //       onClick={() => editor.chain().focus().setParagraph().run()}
  //       className={editor.isActive('paragraph') ? 'is-active' : ''}
  //     >
  //       paragraph
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
  //       className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
  //     >
  //       h1
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  //       className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
  //     >
  //       h2
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
  //       className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
  //     >
  //       h3
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
  //       className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
  //     >
  //       h4
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
  //       className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
  //     >
  //       h5
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
  //       className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
  //     >
  //       h6
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleBulletList().run()}
  //       className={editor.isActive('bulletList') ? 'is-active' : ''}
  //     >
  //       bullet list
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleOrderedList().run()}
  //       className={editor.isActive('orderedList') ? 'is-active' : ''}
  //     >
  //       ordered list
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().toggleCodeBlock().run()}
  //       className={editor.isActive('codeBlock') ? 'is-active' : ''}
  //     >
  //       code block
  //     </button>
  //     {/* <button
  //       onClick={() => editor.chain().focus().toggleBlockquote().run()}
  //       className={editor.isActive('blockquote') ? 'is-active' : ''}
  //     >
  //       blockquote
  //     </button>
  //     <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
  //       horizontal rule
  //     </button>
  //     <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button> */}
  //     {/* <button
  //       onClick={() => editor.chain().focus().undo().run()}
  //       disabled={!editor.can().chain().focus().undo().run()}
  //     >
  //       undo
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().redo().run()}
  //       disabled={!editor.can().chain().focus().redo().run()}
  //     >
  //       redo
  //     </button>
  //     <button
  //       onClick={() => editor.chain().focus().setColor('#958DF1').run()}
  //       className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
  //     >
  //       purple
  //     </button> */}
  //   </div>
  //   // </div>
  // );
};
