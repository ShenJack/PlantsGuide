import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";
import {PlantsMap} from "../views/map";
import {VRView} from "../views/vrView";
import {PlantCard} from "../views/plantCard";

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
    component: PlantCard,
  },
  {
    path: "/map",
    exact: true,
    component: PlantsMap,
  },
  {
    path: "/vr",
    exact: true,
    component: VRView,
  },
];

export const appHistory = createHashHistory();
