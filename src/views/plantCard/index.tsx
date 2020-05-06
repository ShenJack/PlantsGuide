import "./index.scss";
import React, {useState, useEffect} from "react";
import {appHistory} from "../../router";
import {useStore} from "../../store";
import {STORES} from "../../store/const";
import {PlantDescription} from "./plantDescription";
import {IconButton} from "../../component/iconButton";


interface Props {
  hideBackButton?: boolean
}

function gotoList() {
  appHistory.push('/list')
}

export function PlantCard(props: Props) {

  let [plantStore] = useStore(STORES.PLANT_STORE)
  let [plants, dispatchPlants] = useState([]);
  const plant = plantStore.currentPlantDetail;
  useEffect(() => {
    if (plant == null) {
      gotoList()
    }
  }, [])
  // let plantInstances = [];
  // useEffect(() => {
  //   plantInstances = plantStore.plantInstances.filter(item => item.plantId === plant._id)
  // },[plant])
  return (
    <div className="plant-card">
      {!props.hideBackButton && <IconButton onClick={gotoList} className={'back-button'}>
        <i className="iconfont icon-back"/>
      </IconButton>}
      {plant &&
      <div>
        <img className="plant-card-img" src={plant && plant.coverUrl} alt={plant.name}/>
        <div className="plant-details">
          <h5 className="plant-name">
            {plant.name}
          </h5>
          <div className="plant-description">
            <PlantDescription description={plant.description + plant.description + plant.description}/>
          </div>
          <div className="instance-list">
            <div className="title">植株</div>
            {plantStore.plantInstances.filter(item => item.plantId === plant._id).map(plantInstance => <div
              className="plant-instance" key={plantInstance._id}>
              <div className="instance-index">
                {plantInstance.instanceIndex}
              </div>
              <div className="goto-map">
                <i className="iconfont icon-fold enter"/>
              </div>
            </div>)}
          </div>
          <div className="">

          </div>
        </div>
      </div>}
    </div>
  );
}
