import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import blogStore from "../store/blogStore";
import { FetchType } from "../utils/types";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Card from "../components/Card";

const MainPage = () => {
  const { fetchingBlogList, isProcessing, BlogList } = blogStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchingBlogList(FetchType.public);
  }, [fetchingBlogList]);

  return (
    <div className="bg-main">
      <Navbar />
      {isProcessing ? (
        <div className="h-screen w-screen overflow-y-hidden">
          <Loader />
        </div>
      ) : (
        <div className="container max-w-6xl mx-auto p-4">
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
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
