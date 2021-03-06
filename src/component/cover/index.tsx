import React from "react";
import "./index.scss";
import {useStore} from "../../store";
import {STORES} from "../../store/const";

const coverImg = require('../../assets/college/college-icon.gif')

export function Cover(props) {
  let [appStore] = useStore(STORES.APP_STORE);
  return (
    <div className={['cover-inner', appStore.cover].join(' ')}>
      {
        appStore.cover && <CoverAnimation/>
      }
    </div>
  );
}

function CoverAnimation() {
  return(
    <div className="cover">
      <img src={coverImg} alt=""/>
    </div>
  )
}
