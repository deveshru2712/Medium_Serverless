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
      console.log(response.data.blog);
      set({ BlogList: response.data.blog, isProcessing: false });
    } catch (error) {
      console.log(error);
      set({ BlogList: null, isProcessing: false });
    }
  },
  fetchBlog: async (id) => {
    set({ isProcessing: true });
    try {
      const response = await axios.get(`/api/blog/${id}`);
      set({ isProcessing: false, Blog: response.data.blog });
    } catch (error) {
      set({ Blog: null, isProcessing: false });
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to fetch the blog"
      );
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
      toast.error(
        error instanceof Error ? error.message : "Failed to create blog"
      );
      console.log(error);
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
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to update the blog"
      );
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
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to delete the blog"
      );
    }
  },
}));

export default blogStore;
