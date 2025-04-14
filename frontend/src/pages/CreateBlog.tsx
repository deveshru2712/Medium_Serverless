import Navbar from "../components/Navbar";
import Tiptap from "../components/TextEditor/Tiptap";

const CreateBlog = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <Tiptap />
      </div>
    </>
  );
};

export default CreateBlog;
