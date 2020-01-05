import {Button} from "antd";
import React from "react";
import "./index.scss";
import {appHistory} from "../../router";

export function Cover() {
  return (
    <div className="cover">
      <div className="title">北京林业大学 校园植物导览</div>
      <div className="button">
        <Button
          onClick={() => {
            appHistory.push("/list");
          }}>
          植物列表
        </Button>
      </div>

      <div className="button">
        <Button
          onClick={() => {
            appHistory.push("/map");
          }}>
          植物地图
        </Button>
      </div>
    </div>
  );
}
