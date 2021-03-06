import {createHashHistory} from "history";
import React from "react";
import {Cover} from "../component/cover";
import {Home} from "../views/home";
import {List} from "../views/list";
import {PlantsMap} from "../views/map";
import {VRView} from "../views/vrView";
import {PlantCard} from "../views/plantCard";
import {Menu} from "../views/menu";
import {AdminFormCreatePlant} from "../views/adminForms/adminFormCreatePlant";
import {AdminFormUpdatePlant} from "../views/adminForms/adminFormUpdatePlant";
import {ZhulouIllustrationSpotsMap} from "../views/illustrationSpotsMap/zhulou";
import {XueyanIllustrationSpotsMap} from "../views/illustrationSpotsMap/xueyan";
import {LibraryllustrationSpotsMap} from "../views/illustrationSpotsMap/library";
import {PlaygroundIllustrationSpotsMap} from "../views/illustrationSpotsMap/playground";


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
    exact: false,
    component: List,
  },
  {
    path: "/map",
    exact: false,
    component: PlantsMap,
  },
  {
    path: "/vr/:instanceId",
    exact: false,
    component: VRView,
  },
  {
    path: "/plant-card/:plantId",
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
  },
  {
    path: "/cover",
    exact: true,
    component: Cover
  },
  {
    path: "/zhulou",
    exact: true,
    component: ZhulouIllustrationSpotsMap
  },
  {
    path: "/xueyan",
    exact: true,
    component: XueyanIllustrationSpotsMap
  },
  {
    path: "/library",
    exact: true,
    component: LibraryllustrationSpotsMap
  },
  {
    path: "/playground",
    exact: true,
    component: PlaygroundIllustrationSpotsMap
  }
];

export const appHistory = createHashHistory();
