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
    name: string | null;
    profileImg: string | null;
    bio: string | null;
  };
}

interface BlogStoreType {
  BlogList: Blog[] | null;
  Blog: Blog | null;
  isProcessing: boolean;
  fetchingBlog: () => void;
  creatingBlog: (body: CreateBlogType) => void;
  updatingBlog: () => void;
}

const blogStore = create<BlogStoreType>((set) => ({
  BlogList: null,
  Blog: null,
  isProcessing: false,
  fetchingBlog: async () => {
    set({ isProcessing: true });
    try {
      const response = await axios.get("/api/blog", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("here are your blogs:", response.data.blog);
      set({ BlogList: response.data.blog, isProcessing: false });
    } catch (error) {
      console.log(error);
      set({ BlogList: null, isProcessing: false });
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
