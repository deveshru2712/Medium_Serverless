import { useEffect } from "react";
import blogStore from "../store/blogStore";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Card from "../components/Card";

const MainPage = () => {
  const { fetchingBlog, isProcessing, BlogList } = blogStore();

  useEffect(() => {
    fetchingBlog();
  }, [fetchingBlog]);

  return (
    <div>
      <Navbar />

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
