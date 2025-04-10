import { useEffect } from "react";
import Navbar from "../components/Navbar";
import blogStore from "../store/blogStore";
import Loader from "../components/Loader";

const MainPage = () => {
  const { fetchingBlog, isProcessing } = blogStore();

  useEffect(() => {
    fetchingBlog();
  }, []);

  return (
    <div>
      <Navbar />

      {isProcessing ? (
        <div className="h-screen w-screen overflow-y-hidden">
          <Loader />
        </div>
      ) : (
        <div className="max-w-6xl"></div>
      )}
    </div>
  );
};

export default MainPage;
