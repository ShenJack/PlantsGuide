import "./index.scss";
import React, {useState, useEffect} from "react";
import {Button} from "antd";
import {Card} from "antd";
import {appHistory} from "../../router";
import {Plant} from "../../types/Plant";
import {useStore} from "../../store";
import {STORES} from "../../store/const";
import {apiGetCertainPlantsInstance} from "../../api/plant";


interface Props {
}

export function PlantCard(props: Props) {
  let [plantStore] = useStore(STORES.PLANT_STORE)
  let [plants,dispatchPlants] = useState([]);
  const plant = plantStore.currentPlantDetail;
  // let plantInstances = [];
  // useEffect(() => {
  //   plantInstances = plantStore.plantInstances.filter(item => item.plantId === plant._id)
  // },[plant])
  return (
    <div className="plant-card">

      {plant &&
      <div>
        <img className="plant-card-img" src={plant && plant.coverUrl} alt={plant.name}/>
        <div className="plant-details">
          <h5 className="plant-name">
            {plant.name}
          </h5>
          <div className="plant-description">
            {plant.description}
          </div>
          {/*<div className="plant-instances">*/}
          {/*  {plantStore.plantInstances.filter(item => item.plantId === plant._id).map(plantInstance=><div className="plant-instance" key={plantInstance._id}>*/}
          {/*    {plantInstance.lat}*/}
          {/*  </div>)}*/}
          {/*</div>*/}
          <div className="">

          </div>
        </div>
      </div>}
    </div>
  );
}
