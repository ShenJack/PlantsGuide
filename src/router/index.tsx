import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Cover,
  },
  {
    path: "/home",
    exact: true,
    component: Home,
  },
];

export const appHistory = createHashHistory();
