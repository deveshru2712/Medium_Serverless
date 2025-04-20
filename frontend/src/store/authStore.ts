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
  logOut: () => void;
  update: (credentials: UpdateUserType) => void;
  authCheck: () => void;
}

export const authStore = create<authStoreTypes>((set) => ({
  User: null,
  isLoading: true,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signup`, credentials);
      set({ User: response.data.user, isLoading: false });
      toast.success(response.data.message[0]);
    } catch (error) {
      set({ User: null, isLoading: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to create an account"
      );
    }
  },
  logIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signin`, credentials);
      set({ User: response.data.user, isLoading: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error(error instanceof Error ? error.message : "Unable to Login");
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/logout`);
      toast.success(response.data.message);
      set({ User: null, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error(error instanceof Error ? error.message : "Unable to Logout");
    }
  },
  update: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`/api/auth/update`, credentials);
      set({ User: response.data.user, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update the User Profile"
      );
    }
  },
  authCheck: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/auth/me");
      set({ User: response.data.user, isLoading: false });
    } catch (error) {
      set({ User: null, isLoading: false });
      toast.error(
        error instanceof Error ? error.message : "Unable to Authenticate"
      );
    }
  },
}));
