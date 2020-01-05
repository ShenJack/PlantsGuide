import {Button} from "antd";
import React from "react";
import "./index.scss";
import {appHistory} from "../../router";
import {PlantsList} from "../plantsList";

export function List() {
  let plants = Array(10)
    .fill(1)
    .map((item, index) => index);
  return (
    <div className="cover">
      <div className="header">植物列表</div>
      <div className="filter">
        筛选
      </div>
      <div className="plants">
        <PlantsList plants={plants} />
      </div>
    </div>
  );
}
