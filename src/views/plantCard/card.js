import "./index.scss";
import React from "react";
import {Button} from "antd";
import {appHistory} from "../../router";
import img from "./logo.svg"

export function PlantCard() {
  return (
    <div className="plants-card">
      <img src={img}/>
    </div>
  );
}

