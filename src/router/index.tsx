import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";
import {List} from "../views/list";
import {PlantsMap} from "../views/map";
import {VRView} from "../views/vrView";
import {PlantCard} from "../views/plantCard";
import {Menu} from "../views/menu";
import {AdminForms} from "../views/adminForms";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
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
    component: PlantsMap,
  },
  {
    path: "/vr",
    exact: true,
    component: VRView,
  },
  {
    path: "/plant-card",
    exact: true,
    component: PlantCard
  },
  {
    path: "/menu",
    exact: true,
    component: Menu
  },
  {
    path: "/admin/forms",
    exact: true,
    component: AdminForms
  }
];

export const appHistory = createHashHistory();
