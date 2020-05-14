import {Button} from "antd";
import React,{useState} from "react";
import {appHistory} from "../../router";
import {from} from "rxjs/internal/observable/from";
import Swiper from "swiper";
import 'swiper/css/swiper.min.css';
import './index.scss'
import {getDirectiveValues} from "graphql";
const img1 = require("../../assets/college/cover_01.jpg");
const img2 = require("../../assets/college/cover_02.jpg");
const img3 = require("../../assets/college/cover_03.jpg");
const img4 = require("../../assets/college/cover_04.jpg");

export function Illustration() {
  const [folded, setfolded] = useState(false);
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

          <div className="fold" onClick={() => {
            setfolded(!folded);
          }}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4612" width="32" height="32">
              <path
                d="M491.904 380.638H112.171c-16.032 0-29.091 10.99-29.091 24.437 0 13.446 13.059 24.436 29.09 24.436h379.864c16.032 0 29.09-10.99 29.09-24.436-0.129-13.576-13.187-24.437-29.22-24.437z m0 216.049H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z m-0.517 216.307H112.56c-16.291 0-29.608 10.99-29.608 24.436 0 13.447 13.188 24.437 29.608 24.437h378.828c16.42 0 29.608-10.99 29.608-24.437 0-13.446-13.188-24.436-29.608-24.436zM681.19 334.739h93.737v316.897c0 16.033 10.99 29.091 24.437 29.091 13.446 0 24.307-13.058 24.307-29.09V334.738h93.737c14.74 0 21.85-3.878 23.273-6.723 1.164-2.327-0.13-9.438-8.145-19.394l-102.53-128.258c-8.404-10.602-19.264-16.291-30.513-16.291-11.378 0-22.109 5.818-30.513 16.29L666.32 308.753c-7.886 9.955-9.18 17.066-8.016 19.393 0.905 2.716 8.146 6.594 22.885 6.594z"
                p-id="4613"></path>
              <path
                d="M112.688 861.737h768c16.291 0 29.608-10.99 29.608-24.436s-13.188-24.436-29.608-24.436h-768c-16.29 0-29.608 10.99-29.608 24.436 0 13.576 13.188 24.436 29.608 24.436z m379.216-697.535H112.171c-16.032 0-29.091 10.99-29.091 24.436 0 13.447 13.059 24.437 29.09 24.437h379.864c16.032 0 29.09-10.99 29.09-24.437-0.129-13.446-13.187-24.436-29.22-24.436z"
                p-id="4614"></path>
            </svg>
          </div>
        </div>
        {
          folded?  <SpotsList/>:<SwiperImg />
        }
      </div>
  )
}

export class SwiperImg extends React.Component<any,any>{
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
            <div className="swiper-slide" onClick={()=>{
              appHistory.push('/zhulou')}}>
              <div className="title">
                主楼
              </div>
              <img src={img1} alt=""/>
            </div>
            <div className="swiper-slide" onClick={()=>{
              appHistory.push('/xueyan')}}>
              <div className="title">
                学研
              </div>
              <img src={img2} alt=""/>
            </div>
            <div className="swiper-slide" onClick={()=>{
              appHistory.push('/library')}}>
              <div className="title">
                图书馆
              </div>
              <img src={img3} alt=""/>
            </div>
            <div className="swiper-slide" onClick={()=>{
              appHistory.push('/playground')}}>
              <div className="title">
                操场
              </div>
              <img src={img4} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export function SpotsList() {
  return(
    <div className="img-list">
      <div className="swiper-temp-group">
        <div className="swiper-temp" onClick={()=>{
          appHistory.push('/zhulou')}}>
          <div className="title-temp">
            主楼
          </div>
          <img src={img1} alt=""/>
        </div>

        <div className="swiper-temp" onClick={()=>{
          appHistory.push('/xueyan')}}>
          <div className="title-temp">
            学研
          </div>
          <img src={img2} alt=""/>
        </div>
      </div>

      <div className="swiper-temp-group">
        <div className="swiper-temp" onClick={()=>{
          appHistory.push('/library')}}>
          <div className="title-temp">
            图书馆
          </div>
          <img src={img3} alt=""/>
        </div>

        <div className="swiper-temp">
          <div className="title-temp" onClick={()=>{
            appHistory.push('/zhulou')}}>
            操场
          </div>
          <img src={img4} alt=""/>
        </div>
      </div>
    </div>
  )
}
