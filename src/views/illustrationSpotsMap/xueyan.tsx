import React,{useState} from "react";
import './index.scss';

const img = require('../../assets/college/photo.jpg');

export class XueyanIllustrationSpotsMap extends React.Component<any, any>{
  render(): React.ReactNode {
    return (
      <div className="illustration-spots-map">
        <div className="title">
          学研周边
        </div>
        <div className="plant-images">
          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              元宝枫
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              加杨
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              紫叶稠李
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              锦带花
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              平直栒子
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              金叶榆
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              小叶黄杨
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              银杏
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              西府海棠
            </div>
          </div>


        </div>
        <div className="plant-map">

        </div>
      </div>
    )
  }
}
