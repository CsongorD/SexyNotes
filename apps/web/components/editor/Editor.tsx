'use client';

import './editor.css';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { BubbleMenu } from '@tiptap/react/menus';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, List, CheckSquare } from 'lucide-react';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Start typing or press '/' for commands...",
  }),
  Document,
  Paragraph,
  Text,
  TaskList,
  TaskItem.configure({
    HTMLAttributes: { class: 'flex items-start gap-2' },
  }),
];

const Editor = () => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none focus:outline-none min-h-[80vh] min-w-[80vh] px-6 py-8 text-foreground',
      },
    },
    immediatelyRender: false,
  });

  if (!editor)
    return <div className='p-8 text-muted-foreground'>Loading editor...</div>;

  return (
    <div className='border border-border rounded-xl bg-background/80 backdrop-blur-sm overflow-hidden'>
      {/* Toolbar */}
      <div className='sticky top-0 z-10 bg-background/90 backdrop-blur border-b p-2 flex gap-1 flex-wrap'>
        <Toggle
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('taskList')}
          onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        >
          <CheckSquare className='h-4 w-4' />
        </Toggle>
      </div>

      {/* The actual editor */}
      <EditorContent editor={editor} />

      {/* Bubble menu (appears when you select text) */}
      {editor && (
        <BubbleMenu editor={editor} /*options={{ duration: 100 }}*/>
          <div className='flex bg-popover border rounded-lg shadow-xl p-1 gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default Editor;
