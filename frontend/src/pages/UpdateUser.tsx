import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { authStore } from "../store/authStore";
import { UpdateUserType } from "@deveshru2712/medium_common";
import { Pencil } from "lucide-react";

const UpdateUser = () => {
  const { User } = authStore();

  const imageRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<UpdateUserType>({
    name: User?.name || "",
    email: User?.email || "",
    bio: User?.bio || "",
    password: User?.password || "",
    profileImg: User?.profileImg || "",
  });

  const [image, setImage] = useState<string>(
    User?.profileImg ||
      "https://images.unsplash.com/photo-1743043616695-ab8dfe004ef8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D"
  );

  const onchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        setForm({ ...form, profileImg: result });
      };
      reader.readAsDataURL(file); // This was missing - needed to actually read the file
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-5">
        <div className="size-64 rounded-full relative">
          <button
            className="cursor-pointer absolute right-4 -translate-x-1/2 top-2"
            onClick={handleImageClick}
            type="button"
          >
            <Pencil />
          </button>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={imageRef}
            onChange={handleImageChange}
          />
          <img
            src={image}
            alt="Profile"
            className="rounded-full object-contain w-full h-full"
          />
        </div>
        <div className="w-1/2 mt-10">
          <form
            className="w-full flex flex-col px-10 py-5 gap-5"
            onSubmit={onSubmitHandler}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-lg font-semibold">
                Username
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Username"
                value={form.name}
                onChange={onchangeHandler}
                className="border outline-none px-2 py-1 rounded-sm text-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mail" className="text-lg font-semibold">
                Email
              </label>
              <input
                id="mail"
                type="text"
                name="email"
                placeholder="you@mail.com"
                value={form.email}
                onChange={onchangeHandler}
                className="border outline-none px-2 py-1 rounded-sm text-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="......"
                value={form.password}
                onChange={onchangeHandler}
                className="border outline-none px-2 py-1 rounded-sm text-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="text-lg font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                placeholder="Enter your bio"
                onChange={onchangeHandler}
                className="border outline-none px-2 py-1 rounded-sm text-lg "
              ></textarea>
            </div>

            <button
              className="w-fit bg-blue-500 text-white text-lg font-semibold px-2 py-1 rounded-md cursor-pointer text-left"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
