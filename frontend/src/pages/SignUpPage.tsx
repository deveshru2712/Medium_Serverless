import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { SignUpType } from "@deveshru2712/medium_common";

import LabelledInput from "../components/LabelledInput";
import { authStore } from "../store/authStore";

const SignUpPage = () => {
  const [form, setForm] = useState<SignUpType>({
    email: "",
    password: "",
    name: "",
  });

  const { signUp } = authStore();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <div className="h-screen flex flex-col bg-main">
      <nav className="shadow p-4">
        <div className="container max-w-6xl mx-auto text-2xl font-semibold">
          StoryScape
        </div>
      </nav>

      <main className="h-[calc(100vh-64px)] flex items-center  justify-center">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div>
              <h1 className="text-4xl font-bold">Sign up</h1>
            </div>
            <div>
              <form onSubmit={onSubmitHandler}>
                <LabelledInput
                  label="Username"
                  name="name"
                  type="text"
                  onchange={onChangeHandler}
                  placeholder="Enter your username"
                />

                <LabelledInput
                  label="Email"
                  name="email"
                  type="email"
                  onchange={onChangeHandler}
                  placeholder="your@mail.com"
                />

                <LabelledInput
                  label="Password"
                  type="password"
                  name="password"
                  onchange={onChangeHandler}
                  placeholder="......"
                />

                <button
                  type="submit"
                  className="w-full border border-slate-600 text-lg cursor-pointer font-semibold mt-4 py-1 bg-white text-black rounded"
                >
                  Log in
                </button>
              </form>
              <div className="text-lg text-center mt-2">
                Already have an account?
                <Link
                  to={"/login"}
                  className="text-danger ml-1 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full md:w-1/2 mx-auto mb-2 text-center text-slate-500 font-normal">
        © 2025 StoryScape. Empowering your creativity with interactive
        storytelling and seamless note-taking. All rights reserved.
      </footer>
    </div>
  );
};

export default SignUpPage;
