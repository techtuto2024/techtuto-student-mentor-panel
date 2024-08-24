import { getCookie } from "@/utils/cookies";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface ClassDetails {
  studentId: string;
  mentorId: string;
  classLink: string;
  classDate: string;
  classTime: string;
}

const token = getCookie("token");

export const getLoggedUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/currentuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const sendClassDetails = async (classDetails: ClassDetails) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/sendclassdetails`,
      classDetails,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while sending class details."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const fetchClassDetails = async (
  id: string | undefined,
  idType: string,
  token?: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/user/classdetails`,
      {
        params: { [idType]: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { success, data } = response.data;

    if (success) {
      return data;
    } else {
      throw new Error("Failed to fetch class details");
    }
  } catch (error) {
    console.error("Error fetching class details:", error);
    throw error;
  }
};