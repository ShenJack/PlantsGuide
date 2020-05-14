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
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          <div className="plant">
            <img src={img} alt=""/>
            <div className="plant-name">
              北林
            </div>
          </div>

          {/*<div className="plant">*/}
          {/*  <img src={img} alt=""/>*/}
          {/*  <div className="plant-name">*/}
          {/*    北林*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="plant">*/}
          {/*  <img src={img} alt=""/>*/}
          {/*  <div className="plant-name">*/}
          {/*    北林*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="plant">*/}
          {/*  <img src={img} alt=""/>*/}
          {/*  <div className="plant-name">*/}
          {/*    北林*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="plant-map">

        </div>
      </div>
    )
  }
}
