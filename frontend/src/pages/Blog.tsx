import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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

  const extractor = useEditor({
    extensions: [StarterKit],
    content: Blog?.content,
    editable: false,
  });

  useEffect(() => {
    if (extractor && Blog?.content) {
      extractor.commands.setContent(Blog.content);
    }
  }, [extractor, Blog]);

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
                  <h1 className="text-4xl font-bold">{Blog.title}</h1>
                  <img
                    src={Blog.titleImg}
                    alt="Title image"
                    className="w-2/3 object-contain rounded-sm"
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
                <div className="w-full md:w-4/5 px-4 text-lg font-normal font-segoeu-light flex justify-center items-center gap-2">
                  {extractor && <EditorContent editor={extractor} />}
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
