import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true, // Enables support for multiple highlight colors
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // Allows alignment for these node types
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
    ],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md outline-none px-3 py-2",
      },
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
