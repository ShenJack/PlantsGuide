import {AxiosRequestConfig, AxiosResponse} from "axios";

export function onRequestSuccess(request: AxiosRequestConfig):AxiosRequestConfig {
  return request;
}

export function onRequestFail(request: AxiosRequestConfig):AxiosRequestConfig {
  return request;
}

export function onResponseSuccess(response: AxiosResponse):AxiosResponse {
  return response;
}

export function onResponseFail(response: AxiosResponse):AxiosResponse {
  return response;
}
