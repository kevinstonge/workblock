import axios from "axios";

const baseURL: string | undefined =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API
    : process.env.REACT_APP_API_DEV;

export const axiosA = (token: string) => {
  return axios.create({baseURL, withCredentials: true, headers: { authorization: `Bearer ${token}`}})
}