import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { authStore } from "./store/authStore";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";
import MainPage from "./pages/MainPage";
import DialogPage from "./pages/DialogPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import MyBlogPage from "./pages/MyBlogPage";
import Blog from "./pages/Blog";

import { WorkType } from "./utils/types";

const App = () => {
  const { User, authCheck, isLoading } = authStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="overflow-hidden">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={User ? <MainPage /> : <Navigate to={"/login"} />}
        />
        {/* update user profile */}
        <Route
          path="/profileUpdate"
          element={User ? <UpdateUserPage /> : <Navigate to={"/login"} />}
        />
        {/* get the public blogs */}
        <Route
          path="/blogs"
          element={User ? <MyBlogPage /> : <Navigate to={"/login"} />}
        />
        {/* get the personal blogs */}
        <Route
          path="/blog/:id"
          element={User ? <Blog /> : <Navigate to={"/login"} />}
        />
        {/* create blog */}
        <Route
          path="/create"
          element={
            User ? (
              <DialogPage workType={WorkType.CREATE} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        {/* update blog */}
        <Route
          path="/updateBlog/:id"
          element={
            User ? (
              <DialogPage workType={WorkType.UPDATE} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        {/* auth route */}
        <Route
          path="/signup"
          element={!User ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        {/* auth route */}
        <Route
          path="/login"
          element={!User ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
