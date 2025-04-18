import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import MenuBar from "./MenuBar";

import "./style.css";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,

    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md outline-none px-3 py-2 tiptap",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
