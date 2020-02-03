import React, {useEffect, useRef} from "react";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";

const qq = (global as any).qq;

export function PlantsMap(props) {
  const BackButton = useRef(undefined);
  useEffect(() => {
    let map;
    let center = new qq.maps.LatLng(40.00454979877397, 116.34477067065745);
    (window as any).map = map = new qq.maps.Map(document.getElementById("map-container"), {
      center: center,
      zoom: 16,
      mapTypeControl: false,
    });

    let mapLogo = document.querySelector("#map-container > div > div:nth-child(2) > a > div > img");
    if (mapLogo) {
      (mapLogo as any).style.display = "none";
    }

    //设置圆形
    new qq.maps.Circle({
      center: new qq.maps.LatLng(39.936273, 116.44004334),
      radius: 2000,
      map: map,
    });

  }, []);

  const back = function () {
    anime({
      targets: BackButton.current,
      scale: 0,
      duration:100,
    }).finished.then(() => {
      appHistory.push("/")
    })
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
