import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";
import {List} from "../views/list";
import {PlantsMap} from "../views/map";
import {VRView} from "../views/vrView";
import {PlantCard} from "../views/plantCard";
import {Menu} from "../views/menu";
import {AdminFormCreatePlant} from "../views/adminForms/adminFormCreatePlant";
import {AdminFormUpdatePlant} from "../views/adminForms/adminFormUpdatePlant";
import {SwiperImg} from "../views/illustration";
import {SpotsList} from "../views/illustration";

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
    exact: false,
    component: PlantCard
  },
  {
    path: "/menu",
    exact: true,
    component: Menu
  },
  {
    path: "/admin/forms/create",
    exact: true,
    component: AdminFormCreatePlant
  },
  {
    path: "/admin/forms/update",
    exact: true,
    component: AdminFormUpdatePlant
  }
];

export const appHistory = createHashHistory();
