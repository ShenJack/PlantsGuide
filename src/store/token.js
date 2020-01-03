import {getState} from "./index";
import {STORES} from "./const";
import {KEY_TOKEN} from "../api/keys";

export function getToken() {
  return getState(STORES.AUTH_STORE).token;
}

export function setToken(token) {
  localStorage.setItem(KEY_TOKEN, token);
}
