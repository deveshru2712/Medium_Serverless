import axios from "axios";
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
  creatingBlog: () => void;
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
  creatingBlog: async () => {},
  updatingBlog: async () => {},
}));

export default blogStore;
