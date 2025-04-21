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
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blog/${type}`,
        {
          withCredentials: true,
        }
      );

      set({ BlogList: response.data.blog, isProcessing: false });
    } catch (error) {
      set({ BlogList: null, isProcessing: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to fetch Blogs"
      );
    }
  },
  fetchBlog: async (id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}`,
        { withCredentials: true }
      );
      set({ isProcessing: false, Blog: response.data.blog });
    } catch (error) {
      set({ Blog: null, isProcessing: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to fetch Blog"
      );
    }
  },
  creatingBlog: async (body) => {
    set({ isProcessing: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blog`,
        body,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      set({ isProcessing: false });
    } catch (error) {
      set({ isProcessing: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to create blog"
      );
    }
  },
  updatingBlog: async (body, id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}`,
        body,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      set({ Blog: null, isProcessing: false });
    } catch (error) {
      set({ Blog: null, isProcessing: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to update blog"
      );
    }
  },
  deletingBlog: async (id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}`,
        { withCredentials: true }
      );
      set((state) => ({
        isProcessing: false,
        BlogList: state.BlogList
          ? state.BlogList.filter((blog) => blog.id !== id)
          : null,
      }));

      toast.success(response.data.message);
    } catch (error) {
      set({ isProcessing: false, Blog: null });
      toast.error(
        error instanceof Error ? error.message : "Unable to delete Blog"
      );
    }
  },
}));

export default blogStore;
