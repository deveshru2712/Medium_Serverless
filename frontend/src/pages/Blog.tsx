import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TipTapParser from "tiptap-parser";

import blogStore from "../store/blogStore";
import Navbar from "../components/Navbar";
import formatDate from "../utils/DateFormatter";
import Loader from "../components/Loader";

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
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          {!Blog ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <h1 className="text-3xl font-semibold">Blog not found🥲</h1>
            </div>
          ) : (
            <>
              <Navbar />
              <div className="container max-w-6xl mx-auto my-5 flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center items-center gap-5">
                  <h1 className="text-2xl md:text-4xl font-bold text-center">
                    {Blog.title}
                  </h1>
                  <img
                    src={Blog.titleImg}
                    alt="Title image"
                    className="w-2/3 max-h-[300px] object-contain rounded-sm"
                  />
                </div>
                <div className="w-4/5 md:w-1/2 mx-auto flex justify-between items-center gap-4">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src={Blog.author.profileImg}
                      alt={Blog.author.name}
                      className="size-10 rounded-full"
                    />
                    <h2 className="text-xl leading-0 font-semibold pb-0 md:pb-1">
                      {Blog.author.name.toUpperCase()}
                    </h2>
                  </div>
                  {/* main content */}
                  <div className="flex justify-between items-center gap-1">
                    <span className="text-lg md:text-sm leading-0 font-semibold">
                      {formatDate(Blog.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="w-full px-4 text-lg font-normal flex justify-center items-center gap-2">
                  <div className="w-full h-full">
                    <TipTapParser
                      content={Blog.content}
                      language="tsx"
                      containerClassName="tiptap"
                      classNames={{
                        h1ClassName: "text-3xl font-bold mb-4",
                        h2ClassName: "text-2xl font-bold mb-3",
                        h3ClassName: "text-xl font-bold mb-2",

                        pClassName: "mb-4",
                        divClassName: "my-2",
                        aClassName: "text-blue-600 underline",

                        codeClassName: "font-mono text-sm",
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
