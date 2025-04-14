import { Blog } from "../store/blogStore";
import formatDate from "../utils/DateFormatter";

type CardProps = Pick<
  Blog,
  "title" | "content" | "author" | "createdAt" | "titleImg"
>;

const Card = ({ title, content, author, titleImg, createdAt }: CardProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
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
        <div className="w-2/3 object-contain md:w-1/2">
          <img
            src={titleImg}
            alt="title"
            className="object-contain rounded-sm hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-lg">
          Created By
          <span className="text-lg font-semibold pl-1">{author.name}</span>
        </div>
        <div>{formatDate(createdAt)}</div>
      </div>
    </div>
  );
};

export default Card;
