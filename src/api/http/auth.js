import {httpClient} from "./index";

export function apiLogin(data) {
  return httpClient.request({
    url: "/auth/login/local",
    method: "POST",
    data: JSON.stringify(data),
  });
}

export function apiRegister(data) {
  return httpClient.request({
    url: "/auth/register",
    method: "POST",
    data: JSON.stringify(data),
  });
}

export function apiGetUserInfo(data) {
  return httpClient.request({
    url: "/auth/info",
    method: "GET",
  });
}

export function apiUpdateUserInfo(data) {
  return httpClient.request({
    url: "/auth/update",
    method: "POST",
    data: JSON.stringify(data),
  });
}

export function apiLoginWithGoogle(profile) {
  return httpClient.request({
    url: "/auth/login/google",
    method: "POST",
    data: JSON.stringify(profile),
  });
}
