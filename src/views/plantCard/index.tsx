import "./index.scss";
import React, {useState, useEffect} from "react";
import {appHistory} from "../../router";
import {useStore} from "../../store";
import {STORES} from "../../store/const";
import {PlantDescription} from "./plantDescription";
import {IconButton} from "../../component/iconButton";
import {getDispatch} from "../../store/dispatches";
import {IconTag} from "../../component/iconTag";
import {PlantType} from "../../utils/const";


interface Props {
  hideBackButton?: boolean
  instance?: any
}

function gotoList() {
  appHistory.push('/list')
}

function gotoMap(instance) {
  appHistory.push('/map')
  getDispatch(STORES.PLANT_STORE)({
    currentPlantInstance: instance,
  })
}

export function PlantCard(props: Props) {
  let [plantStore] = useStore(STORES.PLANT_STORE)
  let plant;
  if (!props.instance) {
    plant = plantStore.currentPlantDetail;
  } else {
    plant = props.instance.plant;
  }

  //刷新页面之后没有plant了，自动跳转到列表
  useEffect(() => {
    if (plant == null && !props.instance) {
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
        <div className={'plant-card-header'}>
          <img className="plant-img" src={plant && plant.coverUrl} alt={plant.name}/>
          <div className="enter-vr">
            <div className="button" onClick={() => appHistory.push('/vr')}>
              VR
            </div>
          </div>
        </div>
        <div className="plant-details">
          <h5 className="plant-name">
            {plant.name}
          </h5>
          <div className="tags">
            <div className="type">
              <IconTag>
                {PlantType[plant.type]}
              </IconTag>
            </div>
            <div className="genus">
              <IconTag>
                {plant.genus}
              </IconTag>
            </div>
            <div className="family">
              <IconTag>
                {plant.family}
              </IconTag>
            </div>
          </div>
          <div className="plant-description">
            <PlantDescription description={plant.description}/>
          </div>
          {
            !props.instance && <div className="instance-list">
              <div className="title">植株</div>
              {plantStore.plantInstances.filter(item => item.plantId === plant._id).map(plantInstance => <div
                className="plant-instance" key={plantInstance._id}>
                <div className="instance-index">
                  {plantInstance.instanceIndex}
                </div>
                <div className="position">
                  二教
                </div>
                <div className="like">
                  <div className="icon">
                    <i className="iconfont icon-thumb"/>
                  </div>
                  <div className="count">{plantInstance.likes || 0}</div>
                </div>
                <div className="goto-map" onClick={() => gotoMap(plantInstance)}>
                  <i className="iconfont icon-fold enter"/>
                </div>
              </div>)}
            </div>
          }
          <div className="">

          </div>
        </div>
      </div>}
    </div>
  );
}
