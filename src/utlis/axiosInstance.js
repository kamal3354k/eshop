import axios from "axios";
import { APP_CONFIG } from "../app.config";

const defaultHeader = {
  "Content-Type": "application/json",
  timeout: 1000,
};

export const axiosInstance = axios.create({
  baseURL: APP_CONFIG.APP_URL,
  headers:{...defaultHeader}
});
