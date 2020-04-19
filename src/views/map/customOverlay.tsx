import ReactDOM from 'react-dom'
import {Button} from "antd";
import React from "react";

export function CustomOverlay(position,component, type, onClick) {
  this.component = component;
  this.type = type;
  this.position = position;
  this.onClick = onClick;
}

export enum PlantsType {
  TYPE_TREE,
  TYPE_FLOWER,
  TYPE_GRASS
}

export function PlantOverlay(center, component){
  this._center = center;
  this._map = undefined;
  this._component = component;
}

PlantOverlay.prototype = new ((window as any).BMap).Overlay();

// 实现初始化方法
PlantOverlay.prototype.initialize = function(map){
  // 保存map对象实例
  this._map = map;
  // 创建div元素，作为自定义覆盖物的容器
  var div = document.createElement("div");
  div.style.position = "absolute";
  // 可以根据参数设置元素外观
  // 将div添加到覆盖物容器中
  map.getPanes().markerPane.appendChild(div);
  // 保存div实例
  this._div = div;
  // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
  // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
  return div;
}

PlantOverlay.prototype.draw = function(){
// 根据地理坐标转换为像素坐标，并设置给容器
  var position = this._map.pointToOverlayPixel(this._center);
  this._div.style.left = position.x + "px";
  this._div.style.top = position.y + "px";
  this._div.style.transform = "translate(-50%, -50%)";
  this._div.onclick = this._onClick;
  ReactDOM.render(this._component,this._div)
}
