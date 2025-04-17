import Navbar from "../components/Navbar";
import Tiptap from "../components/TextEditor/Tiptap";

const CreateBlog = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-5 md:px-10">
        <form className="mb-10">
          <input
            type="text"
            placeholder="Enter title"
            className="text-3xl md:text-6xl w-full outline-none text-slate-800"
          />
        </form>
        <Tiptap />
      </div>
    </>
  );
};

export default CreateBlog;
