import {Button} from "antd";
import React from "react";
import "./index.scss";
import {appHistory} from "../../router";

export function Cover() {
  return (
    <div className="cover">

      <div className="description">
        <div className="title">
          校园植物导览
        </div>
        <p></p>
      </div>
      <div className="banners">
        <div className="banner">
          <Button
            onClick={() => {
              appHistory.push("/list");
            }}>
            植物列表
          </Button>
        </div>

        <div className="banner">
          <Button
            onClick={() => {
              appHistory.push("/map");
            }}>
            植物地图
          </Button>
        </div>
      </div>
    </div>
  );
}
