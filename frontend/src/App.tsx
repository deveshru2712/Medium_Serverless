import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { authStore } from "./store/authStore";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";
import MainPage from "./pages/MainPage";

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
