import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  CodeIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import * as Toolbar from '@radix-ui/react-toolbar';
import './customtoolbar.css';
import classnames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { ListOrderedIcon } from 'lucide-react';
import React from 'react';

import './selectstyles.css';

const SelectItem = React.forwardRef(function selectItem(
  { children, className, ...props }: any,
  forwardedRef
) {
  return (
    <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className='SelectItemIndicator'>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

const SelectDemo = ({ editor }: { editor: any }) => {
  const onValueChange = (value: any) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      console.log('in on value change', value);
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(value) })
        .run();
    }
  };

  return (
    <Select.Root defaultValue={'paragraph'} onValueChange={onValueChange}>
      <Select.Trigger className='SelectTrigger' aria-label='Food'>
        <Select.Value />
        <Select.Icon className='SelectIcon'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className='SelectContent'>
          <Select.ScrollUpButton className='SelectScrollButton'>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className='SelectViewport'>
            <Select.Group>
              <SelectItem
                value='paragraph'
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                Paragraph
              </SelectItem>
            </Select.Group>

            <Select.Separator className='SelectSeparator' />

            <Select.Group>
              <SelectItem
                value='1'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                Headding 1
              </SelectItem>
              <SelectItem
                value='2'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                Headding 2
              </SelectItem>
              <SelectItem
                value='3'
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                Headding 3
              </SelectItem>
              <SelectItem
                value='4'
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              >
                Headding 4
              </SelectItem>
              <SelectItem
                value='5'
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              >
                Headding 5
              </SelectItem>
              <SelectItem
                value='6'
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              >
                Headding 6
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className='SelectScrollButton'>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const CustomToolbar = ({ editor, document }: { editor: any; document: any }) => {
  if (!editor) {
    return null;
  }
  console.log(document);

  return (
    <Toolbar.Root className='ToolbarRoot' aria-label='Formatting options'>
      <Toolbar.ToggleGroup
        type='multiple'
        className='ToolbarToggleGroup'
        aria-label='Text formatting'
      >
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='bold'
          aria-label='Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='italic'
          aria-label='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='strikethrough'
          aria-label='Strike through'
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className='ToolbarSeparator' />
      <SelectDemo editor={editor} />
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

      <Toolbar.ToggleGroup
        type='multiple'
        className='ToolbarToggleGroup'
        aria-label='Text formatting'
      >
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='strikethrough'
          aria-label='Strike through'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon className='h-5 stroke-1' />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='bold'
          aria-label='Bold'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBulletIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className='ToolbarToggleItem'
          value='italic'
          aria-label='Italic'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className='ToolbarSeparator' />
      <Toolbar.Link className='ToolbarLink' href='#' target='_blank' style={{ marginRight: 10 }}>
        Edited {dayjs(document?.updatedAt).fromNow()}
      </Toolbar.Link>
    </Toolbar.Root>
  );
};
