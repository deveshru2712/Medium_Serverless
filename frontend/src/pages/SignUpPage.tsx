import React from "react";
import Quote from "../components/Quote";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="bg-slate-200">
      <div className="w-screen h-screen flex flex-col md:flex-row">
        <div className="flex flex-1 py-10 bg-white justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-semibold">
              Create an account to start writing ✍️
            </h2>
            <span className="text-lg font-semibold text-slate-500">
              Already have an account?
              <Link to={"/login"} className="underline">
                login
              </Link>
            </span>

            <form className="w-full flex flex-col justify-center items-center gap-2">
              <div className="w-full">
                <label htmlFor="username" className="text-xl font-semibold ">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full border-2 px-2 py-1 rounded-md mt-2 outline-none"
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="text-xl font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@mail.com"
                  className="w-full border-2 px-2 py-1 rounded-md mt-2 outline-none"
                />
              </div>

              <div className="w-full">
                <label htmlFor="password" className="text-xl font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="......"
                  className="w-full border-2 px-2 py-1 rounded-md mt-2 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-black text-lg font-semibold text-white rounded-md cursor-pointer active:scale-105 duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-1 h-full  justify-center items-center">
          <Quote
            author="yash chandra"
            quote="I did'nt do it cause it was easy but i did it cause i thought it was easy."
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
