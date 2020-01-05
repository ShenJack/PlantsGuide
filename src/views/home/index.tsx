import {Button} from "antd";
import React from "react";
import './index.scss'
import {appHistory} from "../../router";

export function Home() {
  return <div className="cover">
    <div className="header">
      北京林业大学 校园植物导览
    </div>
    <div className="button">
      <Button >
        <i className="iconfont icon-go"/>
      </Button>
    </div>
  </div>
}
