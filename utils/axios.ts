import axios from "axios";

const token: string | null =
  typeof window !== "undefined"
    ? localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "e7"
    : "e8";
const baseURL: string | undefined =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API
    : process.env.REACT_APP_API_DEV;
export const axiosWithAuth = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${token}`,
  },
});
