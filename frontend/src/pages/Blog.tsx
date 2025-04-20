import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader } from "lucide-react";

import blogStore from "../store/blogStore";
import Navbar from "../components/Navbar";
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
            <>
              <Navbar />
              <div className="mx-auto max-w-6xl my-5 flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center items-center gap-5">
                  <img
                    src={Blog.titleImg}
                    alt="Title image"
                    className="w-2/3 object-contain rounded-sm"
                  />
                  <h1 className="text-4xl font-bold">{Blog.title}</h1>
                </div>
                <div className="w-1/2 flex justify-between items-center gap-4">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src={Blog.author.profileImg}
                      alt={Blog.author.name}
                      className="size-10 rounded-full"
                    />
                    <h2 className="text-xl leading-0 font-semibold pb-1">
                      {Blog.author.name.toUpperCase()}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center gap-1">
                    <span className="text-sm leading-0 font-semibold">
                      {formatDate(Blog.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="w-2/3 text-lg font-normal font-segoeu-light flex justify-center items-center gap-2">
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
