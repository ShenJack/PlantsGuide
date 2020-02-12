import "./index.scss";
import React from "react";
import {Plant} from "Plant";
import {Button} from "antd";
import {appHistory} from "../../router";
import {LikeButton} from "../buttons/likeButton"

interface ListProps {
  plants: Plant[];
}

export function PlantsList(props: ListProps) {
  return (
    <div className="plants-list">
      {props.plants.map(item => PlantItem(item))}
    </div>
  );
}

function PlantItem(props: Plant) {
  let plantImg = require("../../assets/plants/pc_01.jpeg")
  return <div className="plant-item">
    <div className="brief-plant-card">
      {/*PlantCard*/}
      {/*onClick={() => appHistory.push('/plant-card')}*/}
      <div className="plant-img">
        <img src={plantImg} />
      </div>
      <div className="plant-description">
        <div className="plant-name">
          中文名：梅花
        </div>
        <div className="plant-english-name">
          英文名：plum
        </div>
        <div className="plant-more">
          <button>详情卡片</button>
        </div>
        <div className="like">
          <LikeButton  />
        </div>
      </div>
    </div>
    <div onClick={() => appHistory.push('/vr')}>
      全景图
    </div>
  </div>;
}
