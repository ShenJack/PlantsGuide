import React,{useState} from "react";
import './index.scss';

const img = require('../../assets/college/photo.jpg');

export class LibraryllustrationSpotsMap extends React.Component<any, any>{
  render(): React.ReactNode {
    return (
      <div className="illustration-spots-map">
        <div className="title">
          图书馆周边
        </div>
        <div className="plant-images">
          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              重瓣榆叶梅
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              杂种鹅掌楸
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              王族海棠
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              大叶黄杨
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              白刺花
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              扶芳藤
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              紫叶桃
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              白玉兰
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              圆柏
            </div>
          </div>
        </div>
        <div className="plant-map">

        </div>
      </div>
    )
  }
}
