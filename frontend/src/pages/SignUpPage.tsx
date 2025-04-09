import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { SignUpType } from "@deveshru2712/medium_common";

import Quote from "../components/Quote";
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
    <div className="bg-slate-200">
      <div className="w-screen h-screen flex flex-col md:flex-row">
        <div className="flex flex-1 py-10 bg-white justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-3xl font-semibold">
              Sign Up to start writing ✍️
            </h2>
            <span className="text-lg font-semibold text-slate-500">
              Already have an account?
              <Link to={"/login"} className="pl-2 underline">
                login
              </Link>
            </span>

            <form
              onSubmit={onSubmitHandler}
              className="w-full flex flex-col justify-center items-center gap-2"
            >
              <LabelledInput
                label="Username"
                name="name"
                type="text"
                onchange={onChangeHandler}
                placeholder="Enter your username"
              />

              <LabelledInput
                label="Email"
                type="email"
                name="email"
                onchange={onChangeHandler}
                placeholder="your@mail.com"
              />

              <LabelledInput
                label="password"
                type="password"
                name="password"
                onchange={onChangeHandler}
                placeholder="......"
              />

              <button
                type="submit"
                className="w-full py-2 bg-black text-lg font-semibold text-white rounded-md cursor-pointer active:scale-105 duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex flex-1 h-full  justify-center items-center">
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
