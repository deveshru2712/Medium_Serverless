import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

import { CreateBlogType, UpdateBlogType } from "@deveshru2712/medium_common";
import { FetchType } from "../utils/types";

export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  titleImg: string;
  author: {
    name: string;
    profileImg: string;
    bio: string;
  };
}

interface BlogStoreType {
  BlogList: Blog[] | null;
  Blog: Blog | null;
  isProcessing: boolean;
  fetchingBlogList: (type: FetchType) => void;
  fetchBlog: (id: string) => void;
  creatingBlog: (body: CreateBlogType) => void;
  updatingBlog: (body: UpdateBlogType, id: string) => void;
  deletingBlog: (id: string) => void;
}

const blogStore = create<BlogStoreType>((set) => ({
  BlogList: null,
  Blog: null,
  isProcessing: false,
  fetchingBlogList: async (type) => {
    set({ isProcessing: true });
    try {
      const response = await axios.get(`/api/blog/${type}`);

      set({ BlogList: response.data.blog, isProcessing: false });
    } catch (error) {
      set({ BlogList: null, isProcessing: false });
      if (error instanceof Error) {
        const message = error.response?.data?.message;
        if (Array.isArray(message)) {
          message.forEach((err: { message: string }) =>
            toast.error(err.message)
          );
        } else {
          toast.error(message || "An error occurred while login");
        }
      }
    }
  },
  fetchBlog: async (id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.get(`/api/blog/${id}`);
      set({ isProcessing: false, Blog: response.data.blog });
    } catch (error) {
      set({ Blog: null, isProcessing: false });
      if (error instanceof Error) {
        const message = error.response?.data?.message;
        if (Array.isArray(message)) {
          message.forEach((err: { message: string }) =>
            toast.error(err.message)
          );
        } else {
          toast.error(message || "An error occurred while login");
        }
      }
    }
  },
  creatingBlog: async (body) => {
    set({ isProcessing: true });
    try {
      const response = await axios.post(`/api/blog`, body);
      toast.success(response.data.message);
      set({ isProcessing: false });
    } catch (error) {
      set({ isProcessing: false });
      if (error instanceof Error) {
        const message = error.response?.data?.message;
        if (Array.isArray(message)) {
          message.forEach((err: { message: string }) =>
            toast.error(err.message)
          );
        } else {
          toast.error(message || "An error occurred while login");
        }
      }
    }
  },
  updatingBlog: async (body, id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.put(`/api/blog/${id}`, body);
      toast.success(response.data.message);
      set({ Blog: null, isProcessing: false });
    } catch (error) {
      set({ Blog: null, isProcessing: false });
      if (error instanceof Error) {
        const message = error.response?.data?.message;
        if (Array.isArray(message)) {
          message.forEach((err: { message: string }) =>
            toast.error(err.message)
          );
        } else {
          toast.error(message || "An error occurred while login");
        }
      }
    }
  },
  deletingBlog: async (id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.delete(`/api/blog/${id}`);
      set((state) => ({
        isProcessing: false,
        BlogList: state.BlogList
          ? state.BlogList.filter((blog) => blog.id !== id)
          : null,
      }));

      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof Error) {
        const message = error.response?.data?.message;
        if (Array.isArray(message)) {
          message.forEach((err: { message: string }) =>
            toast.error(err.message)
          );
        } else {
          toast.error(message || "An error occurred while login");
        }
      }
    }
  },
}));

export default blogStore;
