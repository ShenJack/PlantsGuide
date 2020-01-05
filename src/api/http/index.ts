// import {server} from '../index'
import {KEY_TOKEN} from "../keys";
import {STORES} from "../../store/const";
import {getServer} from "../url";
import {getDispatch} from "../../store/dispatches";
import {utils} from "./utils";
import {appHistory} from "../../router";

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
