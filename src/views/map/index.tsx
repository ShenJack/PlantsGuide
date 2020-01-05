import {Button} from "antd";
import React from "react";
import './index.scss'
import {appHistory} from "../../router";

export function Map() {
  return <div className="cover">
    <div className="header">
      地图
    </div>
    <div className="button">
      <Button >
        <i className="iconfont icon-go"/>
      </Button>
    </div>
  </div>
}
