import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";
import {fakeData, icons} from "./fakeData";
// @ts-ignore
import {Button, Modal} from "antd";
import {BottomSheet} from "../../component/bottomSheet";
import {getState} from "../../store/plants";
import {STORES} from "../../store/const";
import {AdminFormCreatePlantInstance} from "../adminForms/adminCreatePlantInstance";
import {apiGetAllPlantInstance, apiGetAllPlants} from "../../api/plant";

const TYPE_ADMIN_FORM_CREATE_PLANT_INSTANCE = Symbol();

const AMap = (global as any).AMap;

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
  // let map = (window as any).map;
  // const position = new qq.maps.LatLng(item.lat, item.lng);
  // // let marker = new qq.maps.Marker({
  // //   position: position,
  // //   map: map
  // // });
  // let overlay = new CustomOverlay(position, <Button/>,
  //   [PlantsType.TYPE_GRASS, PlantsType.TYPE_FLOWER, PlantsType.TYPE_TREE][Math.floor(Math.random() * 3)],
  //   (mark) => {
  //     onMarkClick(mark)
  //   });
  // overlay.setMap(map);
  //
  // const watchId = navigator.geolocation.watchPosition(console.log, console.log, {enableHighAccuracy: true});
  //
  // return () => {
  //   navigator.geolocation.clearWatch(watchId);
  // }
}

function createPlantInstance(param: { lng: any; lat: any }) {
  BottomSheet.open(<AdminFormCreatePlantInstance preset={param}/>, TYPE_ADMIN_FORM_CREATE_PLANT_INSTANCE);
}

export function PlantsMap(props) {
  const BackButton = useRef(undefined);
  useEffect(() => {
    let map;
    // let bounds = new qq.maps.LatLngBounds(new qq.maps.LatLng(40.00076109484555, 116.33997917175293),
    //   new qq.maps.LatLng(40.0108528801675, 116.3487982749939));
    (window as any).map = map = new AMap.Map('map-container', {
      zoom: 16,
      center: [116.34458063140511, 40.00588141184491],
    });
    // var point = new AMap.Point(116.35148999587203, 40.00912312417949);

    // map.setViewport({
    //   center: point,
    //   zoom: 17,
    // }, {
    //   margins: [116.33997917175293, 40.00076109484555, 116.3487982749939, 40.0108528801675]
    // })


    let mapLogo = document.querySelector(".amap-logo");
    if (mapLogo) {
      (mapLogo as any).style.display = "none !important";
    }

    let mapCopyright = document.querySelector(".amap-copyright");
    if (mapCopyright) {
      (mapCopyright as any).style.display = "none !important";
    }

    let prevPoint;

    map.on('click', (event) => {
      if (prevPoint) {
        map.remove(prevPoint);
      }
      const lat = event.lnglat.Q;
      const lng = event.lnglat.R;

      // const customOverlay = new PlantOverlay(point, <Button onClick={() => createPlantInstance({
      //   lat, lng
      // })
      // }>添加植株</Button>);

      const customOverlay = new AMap.Marker({
        content: '<div id="temp-hint" style="transform: translate(-50%,-50%)"></div>',
        position: [lng, lat]
      });

      map.add(customOverlay);
      (window as any).requestIdleCallback(() => {
        ReactDOM.render(<Button onClick={() => createPlantInstance({
          lat, lng
        })
        }>添加植株</Button>, document.getElementById('temp-hint'))
      })
      // customOverlay.addEventListener("click", function () {
      //   createPlantInstance({
      //     lat, lng
      //   });
      //   map.removeOverlay(customOverlay)
      // });

      prevPoint = customOverlay;
    })


    apiGetAllPlantInstance().then(res => {
      res.data.plantInstances.forEach(drawItem)
    });

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
