import "./index.scss";
import React from "react";
import {Button} from "antd";
import {appHistory} from "../../router";
import img from "../../assets/plants/pc_01.jpeg";

export function PlantCard() {
  return (
    <div className="plants-card">
      <img src={img}/>
    </div>
  );
}

