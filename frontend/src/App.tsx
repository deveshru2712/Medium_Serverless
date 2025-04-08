import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
