import React, {useState, useEffect} from "react";
import './index.scss';
import {apiGetAdjacentPlantInstances} from "../../api/plant";

const img1 = require('../../assets/plants/zhulou/090_山桃.jpg');
const img2 = require('../../assets/plants/zhulou/151_火炬树.jpg');
const img3 = require('../../assets/plants/zhulou/129_丝绵木.jpg');
const img4 = require('../../assets/plants/zhulou/189_锦带花.jpg');
const img5 = require('../../assets/plants/zhulou/189b_深粉锦带花.jpg');
const img6 = require('../../assets/plants/zhulou/116a_红花刺槐.jpg');
const img7 = require('../../assets/plants/zhulou/020_矮紫杉.jpg');
const img8 = require('../../assets/plants/zhulou/070_‘金山’绣线菊.jpg');
const img9 = require('../../assets/plants/zhulou/185_楸树.jpg');

export class ZhulouIllustrationSpotsMap extends React.Component<any, any> {
  componentDidMount(): void {
    apiGetAdjacentPlantInstances(40.00588141184491, 116.34458063140511).then(console.log)
  }

  render(): React.ReactNode {
    return (
      <div className="illustration-spots-map">
        <div className="title">
          主楼周边
        </div>
        <div className="plant-images">
          <div className="plant">
            <img src={img1} alt=""/>
            <div className="plant-name">
              山桃
            </div>
          </div>

          <div className="plant">
            <img src={img2} alt=""/>
            <div className="plant-name">
              火炬树
            </div>
          </div>

          <div className="plant">
            <img src={img3} alt=""/>
            <div className="plant-name">
              丝绵木
            </div>
          </div>

          <div className="plant">
            <img src={img4} alt=""/>
            <div className="plant-name">
              锦带花
            </div>
          </div>

          <div className="plant">
            <img src={img5} alt=""/>
            <div className="plant-name">
              深粉锦带花
            </div>
          </div>

          <div className="plant">
            <img src={img6} alt=""/>
            <div className="plant-name">
              红花刺槐
            </div>
          </div>

          <div className="plant">
            <img src={img7} alt=""/>
            <div className="plant-name">
              矮紫杉
            </div>
          </div>

          <div className="plant">
            <img src={img8} alt=""/>
            <div className="plant-name">
              绣线菊
            </div>
          </div>

          <div className="plant">
            <img src={img9} alt=""/>
            <div className="plant-name">
              楸树
            </div>
          </div>
        </div>
        <div className="plant-map">

        </div>
      </div>
    )
  }
}
