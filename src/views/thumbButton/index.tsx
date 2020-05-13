import React,{useState} from "react";
import './index.scss'
import {apiLikePlantInstance} from "../../api/plant";

interface Props {
  plantInstance: any,
}

function doLike(plantInstance: any) {
  apiLikePlantInstance(plantInstance._id).then(res => {

  })
}

export function ThumbButton(props: Props) {
  let [liked,setLiked] = useState(false)
  console.log(liked)
  return <div className={'like-button'} onClick={() => setLiked(!liked)}>
    <div className={"icon " + (liked ? 'liked' : '')}>
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
