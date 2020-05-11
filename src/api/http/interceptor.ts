import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getDispatch} from "../../store/dispatches";
import {STORES} from "../../store/const";
import {AppStore} from "../../store/app";

export function onRequestSuccess(request: AxiosRequestConfig):AxiosRequestConfig {
  AppStore.showLoading();
  getDispatch(STORES.APP_STORE)({loading: true});
  return request;
}

export function onRequestFail(request: AxiosRequestConfig):AxiosRequestConfig {
  AppStore.cancelLoading()
  getDispatch(STORES.APP_STORE)({loading: false});
  return request;
}

export function onResponseSuccess(response: AxiosResponse):AxiosResponse {
  AppStore.cancelLoading()
  return response;
}

export function onResponseFail(response: AxiosResponse):AxiosResponse {
  AppStore.cancelLoading()
  return response;
}
