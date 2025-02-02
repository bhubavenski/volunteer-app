import { Editor } from '@tiptap/react';
import { Bold, Heading2, Italic } from 'lucide-react';
import React from 'react';
import { Toggle } from './ui/toggle';

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex p-2 gap-1 items-center border border-input bg-transparent rounded-lg">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic className="h-4 w-4"/>
      </Toggle>

    </div>
  );
}
