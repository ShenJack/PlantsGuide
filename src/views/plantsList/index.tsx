import "./index.scss";
import React from "react";
import {Plant} from "Plant";
import {appHistory} from "../../router";
import {LikeButton} from "../buttons/likeButton"
import {PlantIcon} from "./plantIcon";
import {VrIcon} from "./vrIcon";

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
          <button onClick={(id) => appHistory.push("/plant-card")}>
            <PlantIcon/>
          </button>
          <div className="like">
            <LikeButton  />
          </div>
        </div>
      </div>
    </div>
    <div className="plant-vr" onClick={() => appHistory.push('/vr')}>
      <VrIcon/>
      <p>全景图</p>
    </div>
  </div>;
}
