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

function doLike(_id: string) {
//todo
}

function PlantItem(props: Plant) {
  return <div className="plant-item">
    <div className="brief-plant-card">

      <div className="plant-img">
        <img src={props.coverUrl}/>
      </div>
      <div className="plant-description">
        <div className="plant-name">
          中文名：{props.name}
        </div>
        <div className="plant-english-name">
          英文名：{props.nameEn}
        </div>
        <div className="plant-more">
          <button onClick={(id) => appHistory.push(`/plant-card/${props._id}`)}>
            <PlantIcon/>
          </button>
          <div className="like">
            <LikeButton onClick={() => doLike(props._id)}/>
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
