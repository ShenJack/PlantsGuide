import {Button} from "antd";
import React from "react";
import {appHistory} from "../../router";
import {from} from "rxjs/internal/observable/from";
import Swiper from "swiper";
import 'swiper/css/swiper.min.css';
import './index.scss'
const img1 = require("../../assets/college/cover_01.jpg");
const img2 = require("../../assets/college/cover_02.jpg");
const img3 = require("../../assets/college/cover_03.jpg");
const img4 = require("../../assets/college/cover_04.jpg");
const img5 = require("../../assets/college/cover_05.jpg");
// const img6 = require("../../assets/college/cover_06.png");
const img7 = require("../../assets/college/cover_07.jpg");

export function Illustration(illustrations) {
  return(
      <div className="illustration">
        <div className="services">
          <div className="menu" onClick={()=>{
            appHistory.push('/menu')
          }}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="20365">
              <path
                d="M713.488 821.423H303.886c-11.304 0-20.476-9.175-20.476-20.48s9.172-20.48 20.476-20.48h409.603c11.305 0 20.48 9.176 20.48 20.48 0 11.305-9.176 20.48-20.481 20.48z m0 0"
                p-id="20366"></path>
              <path
                d="M795.41 207.025c-11.309 0-20.48 9.172-20.48 20.476v614.402c0 11.305-9.176 20.48-20.48 20.48H303.886c-33.871 0-61.437-27.566-61.437-61.441s27.566-61.441 61.437-61.441h368.642c33.875 0 61.441-27.566 61.441-61.438v-491.52c0-33.875-27.566-61.441-61.441-61.441H262.929c-33.875 0-61.441 27.566-61.441 61.441v614.398c0 56.441 45.957 102.398 102.398 102.398h450.563c33.871 0 61.438-27.563 61.438-61.438v-614.4c0-11.304-9.172-20.476-20.477-20.476z m-532.481-40.961h409.599c11.305 0 20.48 9.176 20.48 20.48v491.52c0 11.306-9.176 20.48-20.48 20.48H303.886c-23.019 0-44.316 7.657-61.437 20.52v-532.52c0-11.304 9.176-20.48 20.48-20.48z m0 0"
                p-id="20367"></path>
            </svg>
          </div>
        </div>
        {/*<img src={img1} />*/}
        <SwiperImg />
      </div>
  )
}

class SwiperImg extends React.Component<any,any>{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imgList : [0, 1, 2]
  //   }
  // }

  componentDidMount(): void {
    new Swiper('.swiper-container',{
      autoplay: false,
      loop: true,
    })
  }

  render(){
    return(
      <div className='new'>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src={img1} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={img2} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={img3} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={img4} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={img5} alt=""/>
            </div>
            {/*<div className="swiper-slide">*/}
            {/*  <img src={img6} alt=""/>*/}
            {/*</div>*/}
            <div className="swiper-slide">
              <img src={img7} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
