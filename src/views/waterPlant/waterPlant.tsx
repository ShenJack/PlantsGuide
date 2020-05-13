import React, {useState} from "react";
import './index.scss'

const dowater = require('../../assets/icons/dowater.png')

export function WaterPlant(props) {
  let [watered, setWatered] = useState(false)
  return <div className={'water-plant-component'} onClick={() => !watered && setWatered(!watered)}>
    <div className="button">
      <img className={'water ' + (watered ? 'watered' : '')} src={dowater} alt=""/>
      {}
    </div>
  </div>
}
