import { useState } from "react";
import Navbar from "../components/Navbar";
import Tiptap from "../components/TextEditor/Tiptap";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");

  const onChangeHandler = (content: string) => {
    console.log(content);
    setBlog(content);
  };

  const onSubmit = () => {
    console.log(title, blog);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-5 md:px-10">
        <form className="mb-10">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl md:text-6xl w-full outline-none text-slate-800"
          />
        </form>
        <Tiptap content={blog} onChange={onChangeHandler} />
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-lg font-semibold px-2 py-1 text-white rounded-sm cursor-pointer mt-2"
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateBlogPage;
