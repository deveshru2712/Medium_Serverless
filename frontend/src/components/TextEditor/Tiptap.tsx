import { useEffect, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import "./style.css";

import MenuBar from "./MenuBar";
import Loader from "../Loader";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isLoading: boolean;
}

const Editor = ({ content, onChange, isLoading }: EditorProps) => {
  const [isUploading, setIsUploading] = useState(false);

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

  const handleUploadStateChange = (uploading: boolean) => {
    setIsUploading(uploading);
    if (editor) {
      editor.setEditable(!isLoading && !uploading);
    }
  };

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isLoading && !isUploading);
    }
  }, [editor, isLoading, isUploading]);

  return (
    <div className="relative">
      {isUploading && (
        <div className="absolute bg-white/50 inset-0">
          <Loader />
        </div>
      )}
      <MenuBar
        editor={editor}
        isUploading={isUploading}
        setIsUploading={handleUploadStateChange}
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
