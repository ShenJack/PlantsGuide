import {AxiosRequestConfig, AxiosResponse} from "axios";

export function onRequestSuccess(request: AxiosRequestConfig):AxiosRequestConfig {
  return undefined;
}

export function onRequestFail(request: AxiosRequestConfig):AxiosRequestConfig {
  return undefined;
}

export function onResponseSuccess(response: AxiosResponse):AxiosResponse {
  return undefined;
}

export function onResponseFail(response: AxiosResponse):AxiosResponse {
  return undefined;
}
