import React from "react";
import './index.scss'

interface Props {
  plantInstance: any,
}

export function ThumbButton(props: Props) {
  return <div className={'like-button'}>
    <div className={"icon " + (true ? 'liked' : '')}>
      <div className="thumb">
        <i className="iconfont icon-thumb"/>
      </div>
      <div className="dianzan">
        <i className="iconfont icon-dianzan"/>
      </div>
    </div>
    <div className="count">{props.plantInstance.likes || 0}
    </div>
  </div>
}
