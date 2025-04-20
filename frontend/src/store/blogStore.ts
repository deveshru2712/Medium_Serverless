import { CreateBlogType } from "@deveshru2712/medium_common";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

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

export enum FetchType {
  personal = "personal",
  public = "public",
}

interface BlogStoreType {
  BlogList: Blog[] | null;
  Blog: Blog | null;
  isProcessing: boolean;
  fetchingBlogList: (type: FetchType) => void;
  fetchBlog: (id: string) => void;
  creatingBlog: (body: CreateBlogType) => void;
  updatingBlog: () => void;
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
  updatingBlog: async () => {},
}));

export default blogStore;
