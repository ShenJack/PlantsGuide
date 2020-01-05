import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";
import {List} from "../views/list";
import {Map} from "../views/map";
import {VRView} from "../views/vrView";

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
  {
    path: "/list",
    exact: true,
    component: List,
  },
  {
    path: "/map",
    exact: true,
    component: Map,
  },
  {
    path: "/vr",
    exact: true,
    component: VRView,
  },
];

export const appHistory = createHashHistory();
