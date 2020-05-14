import React, {useState} from "react";
import './index.scss'
import {apiWaterPlantInstance} from "../../api/plant";
import {message} from "antd";
import {PlantStore} from "../../store/plants";

const dowater = require('../../assets/icons/dowater.png')

export function WaterPlant(props) {
  let [watered, setWatered] = useState(false)
  const waterPlant = () => {
    PlantStore.waterPlant(props.plantInstance._id).then(res => {
      message.success(`浇水成功，您是第${(props.plantInstance.waters || 0) + 1}个给该植物浇水的人`)
      !watered && setWatered(true);
    }).catch(reason => {
      message.info(`您已经浇过水了`)
    })
  }
  return <div className={'water-plant-component'} onClick={() => waterPlant()}>
    <div className="button">
      <img className={'water ' + (watered ? 'watered' : '')} src={dowater} alt=""/>
      {}
    </div>
  </div>
}
