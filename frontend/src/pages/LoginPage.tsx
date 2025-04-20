import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { SignInType } from "@deveshru2712/medium_common";

import LabelledInput from "../components/LabelledInput";
import Quote from "../components/Quote";
import { authStore } from "../store/authStore";

const LoginPage = () => {
  const [form, setForm] = useState<SignInType>({
    email: "",
    password: "",
  });

  const { logIn } = authStore();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    logIn(form);
  };

  return (
    <div className="bg-slate-200">
      <div className="w-screen h-screen flex flex-col md:flex-row">
        <div className="flex flex-1 py-10 bg-white justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-4xl font-semibold">
              Login to start writing ✍️
            </h2>
            <span className="text-lg font-semibold text-slate-500">
              Don't have an account?
              <Link to={"/signup"} className="pl-2 underline">
                signup
              </Link>
            </span>

            <form
              onSubmit={onSubmitHandler}
              className="w-full flex flex-col justify-center items-center gap-2"
            >
              <LabelledInput
                label="Email"
                name="email"
                type="email"
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
                className="w-full py-2 bg-black  text-lg font-semibold text-white rounded-md cursor-pointer active:scale-105 duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex flex-1 h-full  justify-center items-center">
          <Quote
            author="Ella Fitzgerald"
            quote="Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong."
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
