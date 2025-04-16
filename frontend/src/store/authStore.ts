import {
  SignInType,
  SignUpType,
  UpdateUserType,
} from "@deveshru2712/medium_common";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserType {
  id: string;
  email: string;
  name: string;
  bio: string;
  profileImg: string;
}

interface authStoreTypes {
  User: UserType | null;
  isLoading: boolean;
  signUp: (credentials: SignUpType) => void;
  logIn: (credentials: SignInType) => void;
  update: (credentials: UpdateUserType) => void;
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
      toast.error(
        error instanceof Error
          ? error.message
          : "Error occurred while creating an account"
      );
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
      toast.error(
        error instanceof Error ? error.message : "An error occurred while login"
      );
    }
  },
  update: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/auth/update`, credentials);
      set({ User: response.data.updatedUser, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating"
      );
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
