import {useStore} from "../../store";
import {STORES} from "../../store/const";
import React, {useEffect, useState} from "react";
import anime from "animejs";
import './index.scss'
import {getDispatch} from "../../store/dispatches";

export function Modal(props) {
  let [appStore] = useStore(STORES.APP_STORE);
  useEffect(() => {
    if (appStore.modalOpened) {
      document.getElementById('modal-container').style.zIndex = '2';
      anime({
        targets: document.getElementById('modal-container'),
        opacity: 1,
        easing: 'easeInOutCubic',
        duration: 200
      })
    } else {
      anime({
        targets: document.getElementById('modal-container'),
        opacity: 0,
        easing: 'easeInOutCubic',
        duration: 200
      }).finished.then(() => {
        document.getElementById('modal-container').style.zIndex = '-1';
      })
    }
  }, [appStore.modalOpened])

  return (
    <div className={'modal'}>
      <div className="modal-header">
        <i onClick={Modal.close} className="iconfont icon-close close"/>
      </div>
      <div className="modal-content">
        {appStore.modalContent ? appStore.modalContent : ""}
      </div>
    </div>
  );
}

Modal.open = function (content, key) {
  getDispatch(STORES.APP_STORE)({
    modalContent: content,
    modalContentType: key,
    modalOpened: true
  })
}

Modal.close = function () {
  getDispatch(STORES.APP_STORE)({
    modalOpened: false
  })
}
