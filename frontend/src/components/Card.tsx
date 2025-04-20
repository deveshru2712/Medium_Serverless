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

  const extractor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  useEffect(() => {
    if (extractor) {
      const plainText = extractor.getText();
      setPlainTextExcerpt({
        desktop:
          plainText.slice(0, 300) + (plainText.length > 300 ? " ..." : ""),
        mobile:
          plainText.slice(0, 100) + (plainText.length > 100 ? " ..." : ""),
      });
    }
  }, [extractor, content]);

  return (
    <div className="w-full py-5 cursor-pointer" onClick={onClick}>
      <div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-start gap-2 md:gap-4">
            <div className="text-xl md:text-3xl font-semibold font-segoeu-heavy">
              {title}
            </div>
            <div className="hidden md:block text-sm md:text-lg font-segoeu-light text-slate-600">
              {plainTextExcerpt.desktop}
            </div>
            <div className="block text-sm md:hidden font-segoeu-light text-slate-600">
              {plainTextExcerpt.mobile}
            </div>
          </div>
          <div className="size-16 md:h-56 md:w-56 flex items-center flex-shrink-0 overflow-hidden">
            <img
              src={titleImg}
              alt="title"
              className="object-cover rounded-sm hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg">
            Created By
            <span className="text-lg font-semibold pl-1">{author.name}</span>
          </div>
          <div>{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
