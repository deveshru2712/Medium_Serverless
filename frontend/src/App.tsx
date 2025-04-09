import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { authStore } from "./store/authStore";

import Blog from "./pages/Blog";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";

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
          element={User ? <Blog /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!User ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!User ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
