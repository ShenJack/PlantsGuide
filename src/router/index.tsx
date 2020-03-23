import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../views/cover";
import {Home} from "../views/home";
import {List} from "../views/list";
import {PlantsMap} from "../views/map";
import {VRView} from "../views/vrView";
import {PlantCard} from "../views/plantCard";
import {Menu} from "../views/menu";
import {AdminFormsUpdate} from "../views/adminForms/updateForm";
import {AdminFormsCreate} from "../views/adminForms/createForm";

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
    component: AdminFormsCreate
  },
  {
    path: "/admin/forms/update",
    exact: true,
    component: AdminFormsUpdate
  }
];

export const appHistory = createHashHistory();
