import axios from "axios";

const baseURL: string = '';

export const axiosA = (token: string) => {
  return axios.create({baseURL, withCredentials: true, headers: { authorization: `Bearer ${token}`}})
}