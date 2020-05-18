import React,{useState} from "react";
import './index.scss';

const img = require('../../assets/college/photo.jpg');

export class PlaygroundIllustrationSpotsMap extends React.Component<any, any>{
  render(): React.ReactNode {
    return (
      <div className="illustration-spots-map">
        <div className="title">
          操场周边
        </div>
        <div className="plant-images">
          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              桑
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              龙桑
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              爬山虎
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              美国地锦
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              馒头柳
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              油松
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              旱柳
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              毛泡桐
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              华北珍珠梅
            </div>
          </div>
        </div>
        <div className="plant-map">

        </div>
      </div>
    )
  }
}
