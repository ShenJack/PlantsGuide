import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getDispatch} from "../../store/dispatches";
import {STORES} from "../../store/const";

export function onRequestSuccess(request: AxiosRequestConfig):AxiosRequestConfig {
  getDispatch(STORES.APP_STORE)({loading:true});
  return request;
}

export function onRequestFail(request: AxiosRequestConfig):AxiosRequestConfig {
  getDispatch(STORES.APP_STORE)({loading:false});
  return request;
}

export function onResponseSuccess(response: AxiosResponse):AxiosResponse {
  getDispatch(STORES.APP_STORE)({loading:false});
  return response;
}

export function onResponseFail(response: AxiosResponse):AxiosResponse {
  getDispatch(STORES.APP_STORE)({loading:false});
  return response;
}
