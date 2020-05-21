import React, {useEffect, useRef} from "react";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";
// @ts-ignore
import {BottomSheet} from "../../component/bottomSheet";
import {getState, PlantStore} from "../../store/plants";
import {STORES} from "../../store/const";
import {AdminFormCreatePlantInstance} from "../adminForms/adminCreatePlantInstance";
import {IconButtonGroup} from "../../component/iconButtonGroup";
import {useStore} from "../../store";
import {PlantCard} from "../plantCard";
import {getDispatch} from "../../store/dispatches";
import {apiCreatePlantInstance} from "../../api/plant";
import {message} from "antd";
import qs from 'qs'
import {useLocation} from "react-router";


const AMap = (global as any).AMap;

function onMarkClick(mark) {

}

interface Props {
  //是否允许点击添加植物的功能
  enableAdd: boolean,
  //要定位的中心位置
  center?: Array<any>,

  match: any,
}

function drawItem(plantInstance) {
  let map = (window as any).map;
  const customOverlay = new AMap.Marker({
    position: [plantInstance?.lng, plantInstance?.lat],
    title: 'add',
    content: `<div class="anchor">
                <div class="plant-item">
                    <img class="icon " src="${plantInstance?.plant?.coverUrl}" alt="">
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

export function PlantsMap(props: Props) {
  const {enableAdd = true} = props;
  const BackButton = useRef(undefined);
  const [plantStore] = useStore(STORES.PLANT_STORE);
  const asComponent = props.center != undefined;

  //可以通过在hashRouter的路由后缀加入query参数： quickInsert和plantId来指定快速添加和快速添加的实例对应的植物id
  let location = useLocation();
  const query = qs.parse(location.search.split('?')[1])
  const quickInsert = useRef(undefined);
  quickInsert.current = query?.quickInsert != undefined;
  const plantId = useRef(undefined);
  plantId.current = query?.plantId;
  useEffect(() => {
    let center: any[];
    if (props.center) {
      center = props.center;
    } else {
      center = [116.34458063140511, 40.00588141184491]
    }
    let map;
    // let bounds = new qq.maps.LatLngBounds(new qq.maps.LatLng(40.00076109484555, 116.33997917175293),
    //   new qq.maps.LatLng(40.0108528801675, 116.3487982749939));
    (window as any).map = map = new AMap.Map('map-container', {
      zoom: props.center ? 19 : 16,
      center,
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
      if (!enableAdd) {
        return
      }
      if (prevPoint) {
        map.remove(prevPoint);
      }
      const lat = event.lnglat.Q;
      const lng = event.lnglat.R;

      if (quickInsert.current && plantId.current) {
        apiCreatePlantInstance({
          lat,
          lng,
          plantId:plantId.current
        }).then(res => {
          message.success("已添加植物实例")
          PlantStore.loadPlantInstances();
        });
        return;
      }

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
      {!asComponent && <IconButton ref={BackButton} className="back" onClick={back}>
        <i className="iconfont icon-back"/>
      </IconButton>}
      <div id="map-container"/>

      {
        !asComponent && <IconButtonGroup className="map-zoom-control">
          <IconButton onClick={() => (window as any).map.zoomIn()}>
            <i className="iconfont icon-plus"/>
          </IconButton>

          <IconButton onClick={() => (window as any).map.zoomOut()}>
            <i className="iconfont icon-minus"/>
          </IconButton>
        </IconButtonGroup>
      }
    </div>
  );
}
