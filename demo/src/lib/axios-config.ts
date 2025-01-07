import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://34.229.205.130:8081/quizzer/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
