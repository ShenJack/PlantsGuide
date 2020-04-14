import React, {useEffect, useRef} from "react";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";
import {fakeData, icons} from "./fakeData";
// @ts-ignore
import {CustomOverlay, PlantsType} from "./customOverlay.tsx";
import {Button, Modal} from "antd";
import {BottomSheet} from "../../component/bottomSheet";
import {getState} from "../../store/plants";
import {STORES} from "../../store/const";
import {AdminFormCreatePlantInstance} from "../adminForms/adminCreatePlantInstance";

const TYPE_ADMIN_FORM_CREATE_PLANT_INSTANCE = Symbol();

const qq = (global as any).qq;

const data = [
  {
    lat: "",
    lng: "",
    type: "",
    name: "",
  }
]

function onMarkClick(mark) {

}

function drawItem(item) {
  let map = (window as any).map;
  const position = new qq.maps.LatLng(item.lat, item.lng);
  // let marker = new qq.maps.Marker({
  //   position: position,
  //   map: map
  // });
  let overlay = new CustomOverlay(position, <Button/>,
    [PlantsType.TYPE_GRASS, PlantsType.TYPE_FLOWER, PlantsType.TYPE_TREE][Math.floor(Math.random() * 3)],
    (mark) => {
      onMarkClick(mark)
    });
  overlay.setMap(map);

  const watchId = navigator.geolocation.watchPosition(console.log, console.log, {enableHighAccuracy: true});

  return () => {
    navigator.geolocation.clearWatch(watchId);
  }
}

function createPlantInstance(param: { lng: any; lat: any }) {
  BottomSheet.open(<AdminFormCreatePlantInstance preset={param}/>, TYPE_ADMIN_FORM_CREATE_PLANT_INSTANCE);
}

export function PlantsMap(props) {
  const BackButton = useRef(undefined);
  useEffect(() => {
    let map;
    let center = new qq.maps.LatLng(40.00454979877397, 116.34477067065745);
    let bounds = new qq.maps.LatLngBounds(new qq.maps.LatLng(40.00076109484555, 116.33997917175293),
      new qq.maps.LatLng(40.0108528801675, 116.3487982749939));
    (window as any).map = map = new qq.maps.Map(document.getElementById("map-container"), {
      center: center,
      zoom: 16,
      boundary: bounds,
      mapTypeControl: false,
    });

    let mapLogo = document.querySelector("#map-container > div > div:nth-child(2) > a > div > img");
    if (mapLogo) {
      (mapLogo as any).style.display = "none";
    }

    let prevPoint;

    qq.maps.event.addListener(
      map,
      'click',
      function (event) {
        if (prevPoint) {
          prevPoint.destroy();
        }
        const position = new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng());
        let overlay = new CustomOverlay(position, <Button onClick={() => createPlantInstance({
            lat: event.latLng.getLat(), lng: event.latLng.getLng()
          })}>添加植株</Button>,
          [PlantsType.TYPE_GRASS, PlantsType.TYPE_FLOWER, PlantsType.TYPE_TREE][Math.floor(Math.random() * 3)],
          (mark) => {
            console.log(event.latLng.getLat() +
              ',' + event.latLng.getLng());
            onMarkClick(mark)
          });
        prevPoint = overlay;
        overlay.setMap(map);
      }
    );

    fakeData.forEach(drawItem);

  }, []);

  const back = function () {
    let appState = getState(STORES.APP_STORE);
    if (appState.bottomSheetContentType === TYPE_ADMIN_FORM_CREATE_PLANT_INSTANCE && appState.bottomSheetOpened) {
      BottomSheet.close()
    } else {
      anime({
        targets: BackButton.current,
        scale: 0,
        duration: 100,
      }).finished.then(() => {
        appHistory.push("/")
      })
    }
  }
  return (
    <div className="map-page">
      <IconButton ref={BackButton} className="back" onClick={back}>
        <i className="iconfont icon-back"/>
      </IconButton>
      <div id="map-container"/>
      <div className="plant-list">
      </div>
    </div>
  );
}
