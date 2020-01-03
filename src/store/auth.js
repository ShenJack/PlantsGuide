import Url from "url-parse";
import {KEY_TOKEN} from "../api/keys";
import {ACTIONS, STORES} from "./const";
import {setToken} from "./token";
import {getServer} from "../api/url";
import {getDispatch} from "./dispatches";
import {POST_STORE_ACTIONS} from "./stores/postStore";

export let token = undefined;

export function onLogout() {
  localStorage.removeItem(KEY_TOKEN);
  getDispatch(STORES.AUTH_STORE)({
    signed: false,
  });
  getDispatch(STORES.USER_STORE)({
    info: {},
  });
  getDispatch(STORES.POST_STORE)({
    type: POST_STORE_ACTIONS.FETCH_POSTS,
    data: {skip: 0},
  });
}

export function onLogin(token) {
  setToken(token);
  getDispatch(STORES.AUTH_STORE)({type: ACTIONS.SET_TOKEN, data: token});
  getDispatch(STORES.AUTH_STORE)({signed: true});
  fetch(`${getServer()}/auth/info`, {
    method: "GET",
    headers: {authorization: `Bearer ${token}`},
  }).then(async res => {
    let data = await res.json();
    getDispatch(STORES.USER_STORE)({
      info: data,
    });
  });
}

export function onRegister(token) {
  setToken(token);
  getDispatch(STORES.AUTH_STORE)({type: ACTIONS.SET_TOKEN, data: token});
  getDispatch(STORES.AUTH_STORE)({signed: true});
  fetch(`${getServer()}/auth/info`, {
    method: "GET",
    headers: {authorization: `Bearer ${token}`},
  }).then(async res => {
    let data = await res.json();
    getDispatch(STORES.USER_STORE)({
      info: data,
    });
  });
}


//get token from url or localstorage
let url = Url(location.href, true);
if (url.query.token) {
  token = url.query.token;
  if (localStorage.getItem(KEY_TOKEN) !== url.query.token) {
    localStorage.setItem(KEY_TOKEN, token);
  }
} else {
  token = localStorage.getItem(KEY_TOKEN);
}

//check token and do login
if (token !== undefined && token !== null) {
  fetch(`${getServer()}/auth/info`, {
    method: "GET",
    headers: {authorization: `Bearer ${token}`},
  })
    .then(async res => {
      let data = await res.json();
      if (data != null) {
        getDispatch(STORES.AUTH_STORE)({
          signed: true,
          initialized: true,
        });
        getDispatch(STORES.USER_STORE)({
          info: data,
        });
      }
    })
    .catch(err => {
      getDispatch(STORES.AUTH_STORE)({
        initialized: true,
      });
    });
} else {
  getDispatch(STORES.AUTH_STORE)({
    initialized: true,
  });
}
