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
  let [contentHeight, setContentHeight] = useState(window.innerHeight);
  useEffect(() => {
    if (appStore.bottomSheetOpened) {
      anime({
        targets: document.getElementById('bottom-sheet-container'),
        top: '20%',
        easing: 'easeInOutCubic',
        duration: 200
      }).finished.then(res => {
        setContentHeight(0.8 * window.innerHeight)
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
      <div className="bottom-sheet-header">
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
               if (startTop + tempTop >= 0.6 * window.innerHeight) {
                 BottomSheet.close()
               } else if (startTop + tempTop <= 0.3 * window.innerHeight) {
                 BottomSheet.expand(1).then(res=>{
                   setContentHeight(1 * window.innerHeight)
                 })
               }else {
                 setContentHeight(window.innerHeight - (startTop + tempTop))
               }
             }}
        >
          <i className="iconfont icon-drag"/>
        </div>
        <i onClick={BottomSheet.close} className="iconfont icon-fold fold"/>
      </div>
      <div className="sheet-content" style={{height: contentHeight}}>
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
  return anime({
    targets: document.getElementById('bottom-sheet-container'),
    top: (1 - percent) + '%',
    easing: 'easeInOutCubic',
    duration: 200
  }).finished
}

BottomSheet.close = function () {
  getDispatch(STORES.APP_STORE)({
    bottomSheetOpened: false
  })
  anime({
    targets: document.getElementById('bottom-sheet-container'),
    top: window.innerHeight + 'px',
    easing: 'easeInOutCubic',
    duration: 200
  })
}
