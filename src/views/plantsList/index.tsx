import "./index.scss";
import React from "react";
import {Plant} from "Plant";
import {Button} from "antd";
import {appHistory} from "../../router";

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
  return <div className="plant-item">
    <Button onClick={() => appHistory.push('/plant-card')}>
      PlantCard
    </Button>
    <Button onClick={() => appHistory.push('/vr')}>
      全景图
    </Button>
  </div>;
}
