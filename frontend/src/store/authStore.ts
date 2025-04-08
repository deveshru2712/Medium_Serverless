import { SignInType, SignUpType } from "@deveshru2712/medium_common";
import axios from "axios";
import { create } from "zustand";

interface authStoreTypes {
  signUp: (credentials: SignUpType) => void;
  logIn: (credentials: SignInType) => void;
}

export const authStore = create<authStoreTypes>(() => ({
  signUp: async (credentials) => {
    const response = await axios.post(`/api/auth/signup`, credentials);
    const token = response.data.key;

    // setting the the jwt token in localstorage

    localStorage.setItem("token", token);
  },
  logIn: async (credentials) => {
    const response = await axios.post(`/api/auth/signin`, credentials);
    const token = response.data.key;

    // setting the the jwt token in localstorage

    localStorage.setItem("token", token);
  },
}));
