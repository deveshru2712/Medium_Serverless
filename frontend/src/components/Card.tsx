import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Blog } from "../store/blogStore";
import formatDate from "../utils/DateFormatter";
import { useEffect, useState } from "react";

type CardProps = Pick<
  Blog,
  "title" | "content" | "author" | "createdAt" | "titleImg"
> & { onClick: () => void };

const Card = ({
  title,
  content,
  author,
  titleImg,
  createdAt,
  onClick,
}: CardProps) => {
  const [plainTextExcerpt, setPlainTextExcerpt] = useState({
    desktop: "",
    mobile: "",
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      try {
        const plainText = editor.getText();
        setPlainTextExcerpt({
          desktop:
            plainText.slice(0, 300) + (plainText.length > 300 ? " ..." : ""),
          mobile:
            plainText.slice(0, 100) + (plainText.length > 100 ? " ..." : ""),
        });
      } catch (error) {
        console.error("Error extracting text from content:", error);
        setPlainTextExcerpt({
          desktop: "Unable to extract preview...",
          mobile: "Unable to extract preview...",
        });
      }
    }
  }, [editor, content]);

  return (
    <div className="w-full py-5 cursor-pointer" onClick={onClick}>
      <div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-start gap-2 md:gap-4">
            <div className="text-xl md:text-4xl font-bold ">{title}</div>
            <div className="hidden md:block text-sm md:text-lg font-segoeu-light text-slate-600">
              {plainTextExcerpt.desktop || "Loading preview..."}
            </div>
            <div className="block text-normal md:hidden text-slate-500">
              {plainTextExcerpt.mobile || "Loading preview..."}
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 overflow-hidden">
            <img
              src={titleImg}
              alt="title"
              className="size-16 md:size-40 object-contain rounded-sm hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            Created By
            <span className="text-lg font-medium pl-1">{author.name}</span>
          </div>
          <div>{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
