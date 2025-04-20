import { useEffect } from "react";
import { useParams } from "react-router-dom";
import blogStore from "../store/blogStore";
import { Loader } from "lucide-react";
import formatDate from "../utils/DateFormatter";

const Blog = () => {
  const params = useParams();
  const blogId = params.id;

  const { fetchBlog, isProcessing, Blog } = blogStore();

  useEffect(() => {
    if (blogId) {
      fetchBlog(blogId);
    }
  }, [fetchBlog, blogId]);

  return (
    <div>
      {isProcessing ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          {!Blog ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <h1 className="text-3xl font-semibold">Blog not found🥲</h1>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl my-10 flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-4xl font-semibold">{Blog.title}</h1>
                <img
                  src={Blog.titleImg}
                  alt="Title image"
                  className="w-2/3 object-contain rounded-sm"
                />
              </div>
              <div className="w-1/2 pl-5 flex flex-col justify-center items-start gap-4">
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={Blog.author.profileImg}
                    alt={Blog.author.name}
                    className="size-14 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {Blog.author.name}
                    </h2>
                    <span className="text-sm font-semibold">
                      {formatDate(Blog.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-2/3 flex justify-center items-center gap-2">
                {Blog.content}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
