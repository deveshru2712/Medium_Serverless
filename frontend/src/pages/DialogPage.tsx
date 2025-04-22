import { useEffect, useRef, useState } from "react";
import Tiptap from "../components/TextEditor/Tiptap";

import { FilePlus, Pencil } from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

import blogStore from "../store/blogStore";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { WorkType } from "../utils/types";

interface DialogPageProps {
  workType: WorkType;
}

const DialogPage = ({ workType }: DialogPageProps) => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleImg, setTitleImg] = useState<string>(
    "https://images.unsplash.com/photo-1744380623181-a675718f120c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const { Blog, creatingBlog, fetchBlog, updatingBlog, isProcessing } =
    blogStore();

  const InputRef = useRef<HTMLInputElement | null>(null);

  const params = useParams();
  const blogId = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    if (workType === WorkType.UPDATE && blogId) {
      fetchBlog(blogId);
    }
  }, [workType, blogId, fetchBlog]);

  useEffect(() => {
    if (workType === WorkType.UPDATE && Blog) {
      setTitle(Blog.title || "");
      setBlog(Blog.content || "");
      if (Blog.titleImg) {
        setTitleImg(Blog.titleImg);
      }
    }
  }, [Blog, workType]);

  // fnc will work when changes are made to the blog content
  const onChangeHandler = (content: string) => {
    setBlog(content);
  };

  const onSubmit = async () => {
    if (workType === WorkType.UPDATE && blogId) {
      updatingBlog(
        {
          id: blogId,
          title: title,
          content: blog,
          titleImg: titleImg,
          published: true,
        },
        blogId
      );
    } else if (workType === WorkType.CREATE) {
      creatingBlog({
        title,
        content: blog,
        titleImg: titleImg,
        published: true,
      });
    }
    navigate("/", { replace: false });
  };

  // this fnc will call the input field for changing the image
  const onButtonClick = () => {
    if (InputRef.current) {
      InputRef.current.click();
    }
  };

  // fnc will handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            const fileUrl = event.target?.result as string;

            // Upload to Cloudinary
            const cloudName = import.meta.env.VITE_CLOUD_NAME;
            const formData = new FormData();
            formData.append("file", fileUrl);
            formData.append("upload_preset", "medium");

            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );

            setTitleImg(response.data.secure_url);
            toast.success("Image uploaded successfully");
          } catch (error) {
            toast.error("Unable to upload the image");
            console.error("Error uploading image:", error);
          } finally {
            setIsLoading(false);
          }
        };

        reader.onerror = (error) => {
          toast.error("Unable to read the file");
          console.error("Error reading file:", error);
          setIsLoading(false);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Unable to process the image");
        console.error("Error processing image:", error);
        setIsLoading(false);
      }

      // Reset file input
      if (InputRef.current) {
        InputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <Navbar />
      {isProcessing ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-main container max-w-6xl mx-auto my-10 px-5 md:px-10">
          <div className="bg-active w-full border px-4 py-2 rounded-md relative">
            <input
              ref={InputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            {titleImg ? (
              <>
                <img
                  src={titleImg}
                  className="w-full h-full max-h-[300px] object-contain rounded-sm"
                />

                {/* edit the placeholder image  */}

                <button
                  onClick={onButtonClick}
                  className="absolute -top-1 left-1/2 translate-x-20  bg-white/50 p-1 rounded-full hover:bg-white/70 cursor-pointer"
                >
                  <Pencil fill="#eeeee4" />
                </button>
              </>
            ) : (
              <div className="bg-active">
                <span
                  onClick={onButtonClick}
                  className="w-full h-full cursor-pointer flex flex-col justify-center items-center"
                >
                  <button>
                    <FilePlus size={64} color="#eeeee4" />
                  </button>
                  <span className="text-2xl font-semibold">
                    Click to Add a Title Image
                  </span>
                </span>
              </div>
            )}

            {isLoading ? (
              <div className="absolute inset-0 bg-white/90">
                <Loader />
              </div>
            ) : null}
          </div>
          <form className="mb-10">
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-active mt-6 text-3xl md:text-6xl w-full outline-none text-slate-800"
            />
          </form>
          <Tiptap
            content={blog}
            isLoading={isLoading}
            onChange={onChangeHandler}
          />
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-lg font-semibold px-2 py-1 text-white rounded-sm cursor-pointer mt-2"
          >
            {workType === WorkType.CREATE ? "Create" : "Update"}
          </button>
        </div>
      )}
    </>
  );
};

export default DialogPage;
