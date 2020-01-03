import {createHashHistory} from "history";
import PostContainer from "../views/postContainer";
import React from "react";
import {About} from "../views/about";
import Loadable from "react-loadable";
import {Login} from "../views/login/login";
import {Register} from "../views/login/register";
import PostDetail from "../views/postDetail";

const EditPost = Loadable({
  loader: () => import("../views/editPost"),
  loading() {
    return <div>Loading...</div>;
  },
});
export const routes = [
  {
    path: "/",
    exact: true,
    main: PostContainer,
  },
  {
    path: "/login",
    exact: true,
    main: Login,
  },
  {
    path: "/register",
    exact: true,
    main: Register,
  },
  {
    path: "/detail/:id",
    exact: false,
    main: PostDetail,
  },
  {
    path: "/about",
    exact: true,
    main: About,
  },
  {
    path: "/edit/:id",
    main: EditPost,
  },
  {
    path: "/edit",
    exact: true,
    main: EditPost,
  },
];

export const appHistory = createHashHistory();
let routeListener = appHistory.listen(({pathname, search, hash, state}) => {
  // if (['/detail', '/about', '/edit'].includes(pathname)) {
  //   store.dispatch({type: CHANGE_THEME, theme: WHITE_THEME})
  // }
  // Loading.hide()
});
