import { setCookie } from "@/utils/cookies";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCookie("token", response.data.token)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "An error occurred during login"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/user/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Logout error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "An error occurred during logout"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
