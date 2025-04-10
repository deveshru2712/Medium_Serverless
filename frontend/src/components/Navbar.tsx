import { Link } from "react-router-dom";
import { Bell, NotebookPen, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 py-4 border-b shadow-md">
      <div className="h-full px-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-semibold font-segoeu-heavy">
              Storyscape
            </h1>
          </Link>
          <div className="hidden md:flex bg-[#F9F9F9] gap-2 rounded-3xl p-1">
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
          <button className="hidden md:flex cursor-pointer">
            <NotebookPen />
            Write
          </button>

          <button className="cursor-pointer">
            <Bell />
          </button>

          <button className="cursor-pointer">
            <User />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
