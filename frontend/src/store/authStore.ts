import { SignInType, SignUpType } from "@deveshru2712/medium_common";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserType {
  id: string;
  name: string;
  email: string;
}

interface authStoreTypes {
  User: UserType | null;
  isLoading: boolean;
  signUp: (credentials: SignUpType) => void;
  logIn: (credentials: SignInType) => void;
  authCheck: () => void;
}

export const authStore = create<authStoreTypes>((set) => ({
  User: null,
  isLoading: false,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signup`, credentials);
      const token = response.data.key;

      // setting the the jwt token in localstorage

      localStorage.setItem("token", token);
      set({ User: response.data.user, isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ User: null, isLoading: false });
      toast.error("Error occurred while creating an account");
    }
  },
  logIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signin`, credentials);
      const token = response.data.key;

      // setting the the jwt token in localstorage

      localStorage.setItem("token", token);
      set({ User: response.data.user, isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Error occurred while login");
    }
  },
  authCheck: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log(response.data.user);
      set({ User: response.data.user, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ User: null, isLoading: false });
    }
  },
}));
