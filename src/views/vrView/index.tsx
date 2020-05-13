// @flow
import * as React from 'react';
import {IconButton} from "../../component/iconButton";
import './index.scss'
import {ControlPad} from "./controlPad";
import {STORES} from "../../store/const";
import {useStore} from "../../store";
import {RouterProps} from "react-router";
import {useEffect} from "react";
import {appHistory} from "../../router";

type Props = {
  match: any
} & RouterProps;
const htmlAFRAME = `<a-scene>
  <a-assets>
    <audio id="click-sound" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>

    <!-- Images. -->
    <img id="city" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1742719065,3916193567&fm=15&gp=0.jpg">
    <img id="city-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg">
    <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg">
    <img id="cubes-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg">
    <img id="sechelt" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
    <img id="sechelt-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg">
  </a-assets>

  <!-- 360-degree image. -->
  <a-sky id="image-360" radius="10" src="#city"></a-sky>

  <!-- Link template we will build. -->
  <a-entity class="link"></a-entity>

  <!-- Camera + Cursor. -->
  <a-camera>
    <a-cursor
      id="cursor"
      animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
      animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
      animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"></a-cursor>
  </a-camera>
</a-scene>`
export const VRView = (props: Props) => {
  let [plantStore] = useStore(STORES.PLANT_STORE)
  let instanceId = props.match.params.instanceId;
  let instance = plantStore.plantInstances.find(item => item._id === instanceId)
  useEffect(() => {
    if (instance == null) {
      // appHistory.push('/list')
    }
  })
  console.log(props)
  return (
    <div className={'vr-view'}>
      <IconButton onClick={() => history.back()} className={'back-button'}>
        <i className="iconfont icon-back"/>
      </IconButton>
      <div className="vr-container" dangerouslySetInnerHTML={{__html: htmlAFRAME}}/>
      {instance && <div className="control-pad">
        <ControlPad instance={instance}/>
      </div>}
    </div>
  );
};
