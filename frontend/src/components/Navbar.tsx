import { Link, useNavigate } from "react-router-dom";
import { NotebookPen, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { authStore } from "../store/authStore";
import Loader from "./Loader";

const Navbar = () => {
  const { logOut, isLoading } = authStore();

  const [active, setActive] = useState(false);

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

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

  const navigate = useNavigate();

  return (
    <nav className="border-b shadow-md">
      <div className="container max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-semibold">Storyscape</h1>
            </Link>
            <div className="hidden md:flex bg-active gap-2 rounded-3xl p-1">
              <button type="submit" className="cursor-pointer">
                <Search />
              </button>
              <form>
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Search..."
                />
              </form>
            </div>

            <button className="cursor-pointer block md:hidden">
              <Search />
            </button>
          </div>

          <div className="flex justify-between items-center gap-8">
            <button
              className="flex cursor-pointer"
              onClick={() => navigate("/create")}
            >
              <NotebookPen />
              <span className="hidden md:flex">Write</span>
            </button>

            <div
              ref={buttonRef}
              className="cursor-pointer relative"
              onClick={handleClick}
            >
              <User />
              <div
                ref={dropDownRef}
                className={`w-fit bg-white ${
                  active ? "block" : "hidden"
                } absolute -left-1/2 top-1/6 -translate-x-3/4 translate-y-1/2 px-3 py-2 border rounded-md z-50`}
              >
                <ul className="flex flex-col justify-center items-start text-lg font-semibold whitespace-nowrap">
                  <li className="hover:underline">
                    <Link to={"/profileUpdate"}>My profile</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to={"/blogs"}>My Blog</Link>
                  </li>
                  <button
                    className="cursor-pointer hover:underline"
                    onClick={logOut}
                  >
                    Logout
                  </button>

                  {isLoading && (
                    <div className="absolute inset-0">
                      <Loader />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
