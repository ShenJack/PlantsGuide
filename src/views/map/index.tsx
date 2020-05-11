import React, {useEffect, useRef} from "react";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";
// @ts-ignore
import {BottomSheet} from "../../component/bottomSheet";
import {getState} from "../../store/plants";
import {STORES} from "../../store/const";
import {AdminFormCreatePlantInstance} from "../adminForms/adminCreatePlantInstance";
import {IconButtonGroup} from "../../component/iconButtonGroup";
import {useStore} from "../../store";
import {PlantCard} from "../plantCard";
import {getDispatch} from "../../store/dispatches";

const AMap = (global as any).AMap;

function onMarkClick(mark) {

}

function drawItem(plantInstance) {
  let map = (window as any).map;
  const customOverlay = new AMap.Marker({
    position: [plantInstance.lng, plantInstance.lat],
    title: 'add',
    content: `<div class="anchor">
                <div class="plant-item">
                    <img class="icon " src="${plantInstance.plant.coverUrl}" alt="">
                </div>
              </div>`,
  });
  map.add(customOverlay);
  customOverlay.on('click', () => openInstanceDetail(plantInstance))
}

function createPlantInstance(param: { lng: any; lat: any }) {
  BottomSheet.open(<AdminFormCreatePlantInstance preset={param}/>, AdminFormCreatePlantInstance);
}

function openInstanceDetail(plantInstance) {
  getDispatch(STORES.PLANT_STORE)({
    currentPlantInstance: plantInstance
  })
  BottomSheet.open(<PlantCard instance={plantInstance} hideBackButton={true}/>, PlantCard);
}

export function PlantsMap(props) {
  const {enableAdd} = props;
  const BackButton = useRef(undefined);
  const [plantStore] = useStore(STORES.PLANT_STORE);
  useEffect(() => {
    let map;
    // let bounds = new qq.maps.LatLngBounds(new qq.maps.LatLng(40.00076109484555, 116.33997917175293),
    //   new qq.maps.LatLng(40.0108528801675, 116.3487982749939));
    (window as any).map = map = new AMap.Map('map-container', {
      zoom: 16,
      center: [116.34458063140511, 40.00588141184491],
    });

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
      // if (!enableAdd) {
      //   return
      // }
      if (prevPoint) {
        map.remove(prevPoint);
      }
      const lat = event.lnglat.Q;
      const lng = event.lnglat.R;

      const customOverlay = new AMap.Marker({
        position: [lng, lat],
      });

      customOverlay.on('click', () => createPlantInstance({
        lat, lng
      }));

      map.add(customOverlay);
      prevPoint = customOverlay;
    })

    let currentInstance;
    if (currentInstance = getState(STORES.PLANT_STORE).currentPlantInstance) {
      map.setZoomAndCenter(19, [currentInstance.lng, currentInstance.lat])
    }

  }, []);

  useEffect(() => {
    plantStore.plantInstances.forEach(drawItem)
  }, [plantStore.plantInstances])

  const back = function () {
    let appState = getState(STORES.APP_STORE);
    if (appState.bottomSheetContentType === AdminFormCreatePlantInstance && appState.bottomSheetOpened) {
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

      <IconButtonGroup className="map-zoom-control">
        <IconButton onClick={() => (window as any).map.zoomIn()}>
          <i className="iconfont icon-plus"/>
        </IconButton>

        <IconButton onClick={() => (window as any).map.zoomOut()}>
          <i className="iconfont icon-minus"/>
        </IconButton>
      </IconButtonGroup>

      <div className="plant-list">
      </div>
    </div>
  );
}
