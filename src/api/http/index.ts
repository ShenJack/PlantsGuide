import axios from "axios";
import {
  onRequestFail,
  onRequestSuccess,
  onResponseFail,
  onResponseSuccess,
} from "./interceptor";

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
});

httpClient.interceptors.request.use(onRequestSuccess, onRequestFail);
httpClient.interceptors.response.use(onResponseSuccess, onResponseFail);
