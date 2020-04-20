import React, {useEffect, useState} from 'react';
import {useStore} from "../../store";
import {STORES} from "../../store/const";
import {getDispatch} from "../../store/dispatches";
import './index.scss'
import anime from "animejs";

let lastY;
let startY;
let tempTop: number;
let startTop: number;

export function BottomSheet(props) {
  let [appStore] = useStore(STORES.APP_STORE);
  useEffect(() => {
    if (appStore.bottomSheetOpened) {
      anime({
        targets: document.getElementById('bottom-sheet-container'),
        top: '20%',
        easing: 'easeInOutCubic',
        duration: 200
      })
    } else {
      anime({
        targets: document.getElementById('bottom-sheet-container'),
        top: '100%',
        easing: 'easeInOutCubic',
        duration: 200
      })
    }
  }, [appStore.bottomSheetOpened])
  return (
    <div className={'bottom-sheet'}>
      <div className="snap-zone"
           onTouchStartCapture={(touchEvent) => {
             touchEvent.preventDefault()
             const container = document.getElementById('bottom-sheet-container');
             startY = touchEvent.touches[0].clientY;
             startTop = container.offsetTop;
           }}
           onTouchMoveCapture={(touchEvent) => {
             touchEvent.preventDefault()
             const container = document.getElementById('bottom-sheet-container');
             tempTop = touchEvent.touches[0].clientY - startY;
             if (startTop + tempTop >= 0) {
               container.style.top = startTop + tempTop + 'px';
             }
           }}
           onTouchEndCapture={(touchEvent) => {
             touchEvent.preventDefault()
             if (startTop + tempTop >= 0.8 * window.innerHeight) {
               BottomSheet.close()
             } else if (startTop + tempTop <= 0.2 * window.innerHeight) {
               BottomSheet.expand(100)
             }
           }}
      >
        <i className="iconfont icon-drag"/>
        <i onClick={BottomSheet.close} className="iconfont icon-fold"/>
      </div>
      <div className="sheet-content">
        {appStore.bottomSheetContent ? appStore.bottomSheetContent : ""}
      </div>
    </div>
  );
};

BottomSheet.open = function (content, type) {
  getDispatch(STORES.APP_STORE)({
    bottomSheetContent: content,
    bottomSheetOpened: true,
    bottomSheetContentType: type
  })
}

BottomSheet.expand = function (percent) {
  getDispatch(STORES.APP_STORE)({
    bottomSheetOpened: true,
  })
  anime({
    targets: document.getElementById('bottom-sheet-container'),
    top: '0%',
    easing: 'easeInOutCubic',
    duration: 200
  })
}

BottomSheet.close = function () {
  getDispatch(STORES.APP_STORE)({
    bottomSheetOpened: false
  })
  anime({
    targets: document.getElementById('bottom-sheet-container'),
    top: '100%',
    easing: 'easeInOutCubic',
    duration: 200
  })
}
