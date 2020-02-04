import React, {useEffect, useRef} from "react";
import "./index.scss";
import anime from "animejs";
import {IconButton} from "../../component/iconButton";
import {appHistory} from "../../router";
import {fakeData, icons} from "./fakeData";
import {CustomOverlay, PlantsType} from "./customOverlay";

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

    qq.maps.event.addListener(
      map,
      'click',
      function (event) {
        console.log(event.latLng.getLat() +
          ',' + event.latLng.getLng());
      }
    );

    fakeData.forEach(item => {
      const position = new qq.maps.LatLng(item.lat, item.lng);
      // let marker = new qq.maps.Marker({
      //   position: position,
      //   map: map
      // });
      let overlay = new CustomOverlay(position,
        [PlantsType.TYPE_GRASS, PlantsType.TYPE_FLOWER, PlantsType.TYPE_TREE][Math.floor(Math.random() * 3)],
        (mark) => {
          onMarkClick(mark)
        });
      overlay.setMap(map);
      var anchor = new qq.maps.Point(10, 10),
        size = new qq.maps.Size(20, 20),
        scaleSize = new qq.maps.Size(20, 20),
        origin = new qq.maps.Point(10, 10),
        markerIcon = new qq.maps.MarkerImage(
          icons[Math.floor(Math.random() * icons.length)],
          null,
          null,
          null,
          scaleSize
        );
      // marker.setIcon(markerIcon);

      const watchId = navigator.geolocation.watchPosition(console.log, console.log, {enableHighAccuracy: true});

      return () => {
        navigator.geolocation.clearWatch(watchId);
      }
    })

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
