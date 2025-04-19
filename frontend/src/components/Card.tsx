import { Blog } from "../store/blogStore";
import formatDate from "../utils/DateFormatter";

type CardProps = Pick<
  Blog,
  "title" | "content" | "author" | "createdAt" | "titleImg"
>;

const Card = ({ title, content, author, titleImg, createdAt }: CardProps) => {
  return (
    <div className="w-full py-5">
      <div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col justify-center items-start gap-2 md:gap-4">
            <div className="text-xl md:text-3xl font-semibold font-segoeu-heavy">
              {title}
            </div>
            <div className="hidden md:block text-sm md:text-lg font-segoeu-light text-slate-600">
              {content.slice(0, 300)} ...
            </div>
            <div className="block text-sm md:hidden font-segoeu-light text-slate-600">
              {content.slice(0, 100)} ...
            </div>
          </div>
          <div className="size-16 md:h-56 md:w-56 flex  items-center flex-shrink-0  overflow-hidden">
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
