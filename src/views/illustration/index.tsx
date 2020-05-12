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
          <div className="title">
            北林风光
          </div>
          <div className="share">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4105" width="32" height="32">
              <path
                d="M837.818182 116.363636c38.493091 0 69.818182 31.325091 69.818182 69.818182s-31.325091 69.818182-69.818182 69.818182-69.818182-31.325091-69.818182-69.818182 31.325091-69.818182 69.818182-69.818182M232.727273 628.363636c-64.162909 0-116.363636-52.200727-116.363637-116.363636s52.200727-116.363636 116.363637-116.363636 116.363636 52.200727 116.363636 116.363636-52.200727 116.363636-116.363636 116.363636m605.090909 139.636364c38.493091 0 69.818182 31.325091 69.818182 69.818182s-31.325091 69.818182-69.818182 69.818182-69.818182-31.325091-69.818182-69.818182 31.325091-69.818182 69.818182-69.818182m0-442.181818a139.636364 139.636364 0 0 0 0-279.272727 139.636364 139.636364 0 0 0-139.636364 139.636363c0 13.754182 2.071273 26.996364 5.771637 39.540364l-330.123637 165.050182A185.483636 185.483636 0 0 0 232.727273 325.818182a186.181818 186.181818 0 0 0 0 372.363636c56.087273 0 106.24-24.901818 140.381091-64.139636l328.378181 173.847273A139.240727 139.240727 0 0 0 698.181818 837.818182a139.636364 139.636364 0 0 0 279.272727 0 139.636364 139.636364 0 0 0-139.636363-139.636364 139.124364 139.124364 0 0 0-104.680727 47.453091l-324.887273-172.008727A185.716364 185.716364 0 0 0 418.909091 512a185.716364 185.716364 0 0 0-10.263273-60.555636l331.357091-165.678546A139.170909 139.170909 0 0 0 837.818182 325.818182"
               height="3rem" width="3rem" p-id="4106"></path>
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
