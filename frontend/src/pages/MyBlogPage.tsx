import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Pencil, Trash, UserIcon } from "lucide-react";

import { authStore } from "../store/authStore";
import blogStore from "../store/blogStore";
import { FetchType } from "../utils/types";

import Card from "../components/Card";
import Loader from "../components/Loader";

const MyBlogPage = () => {
  const { User, logOut, isLoading } = authStore();
  const { fetchingBlogList, isProcessing, BlogList, deletingBlog } =
    blogStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchingBlogList(FetchType.personal);
  }, [fetchingBlogList]);

  const [active, setActive] = useState(false);

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [active]);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <div>
      <div className="border-b-2 shadow-md">
        <div className="max-w-6xl mx-auto w-full py-4 flex justify-between items-center">
          <div className="flex flex-col justify-center items-start text-left">
            <h1 className=" text-2xl font-semibold font-segoeu-heavy">
              {User?.name}
            </h1>
          </div>

          <button
            ref={buttonRef}
            className="cursor-pointer relative"
            onClick={handleClick}
          >
            <UserIcon />
            <div
              ref={dropDownRef}
              className={`w-fit bg-white ${
                active ? "block" : "hidden"
              } absolute -left-1/2 top-1/6 -translate-x-3/4 translate-y-1/2 px-3 py-2 border rounded-md`}
            >
              <ul className="flex flex-col justify-center items-start text-lg font-semibold whitespace-nowrap">
                <li className="hover:underline">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:underline">
                  <Link to={"/profileUpdate"}>My profile</Link>
                </li>
                <button
                  className="cursor-pointer hover:underline"
                  onClick={logOut}
                >
                  Logout
                </button>
              </ul>
              {isLoading && (
                <div className="absolute inset-0">
                  <Loader />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
      {isProcessing ? (
        <div className="h-screen w-screen overflow-y-hidden">
          <Loader />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4">
          {BlogList?.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-lg text-gray-600">
                No Blog found ... 🔎🔎
              </span>
            </div>
          ) : (
            <>
              {BlogList?.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col justify-center items-center gap-3 px-4"
                >
                  <Card
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    title={blog.title}
                    content={blog.content}
                    author={blog.author}
                    titleImg={blog.titleImg}
                    createdAt={blog.createdAt}
                  />
                  <div className="bg-slate-200 rounded-md  w-full py-1 px-2 flex items-center justify-end gap-3">
                    <button
                      className=" flex justify-center items-center border gap-2 active:scale-105 duration-200 border-white rounded-md px-2 cursor-pointer py-1 text-lg font-semibold "
                      onClick={() => navigate(`/updateBlog/${blog.id}`)}
                    >
                      Edit <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deletingBlog(blog.id)}
                      className=" flex justify-center items-center border gap-2 active:scale-105 duration-200 border-white rounded-md px-2 cursor-pointer py-1 text-lg font-semibold "
                    >
                      Delete <Trash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBlogPage;
