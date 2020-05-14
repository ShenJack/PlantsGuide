import React,{useState} from "react";
import './index.scss'
import {apiCancelLikePlantInstance, apiLikePlantInstance} from "../../api/plant";
import {PlantStore} from "../../store/plants";
import {message} from "antd";

interface Props {
  plantInstance: any,
}


export function ThumbButton(props: Props) {
  let [liked, setLiked] = useState(PlantStore.isInstanceLiked(props.plantInstance._id))
  let [likes, setLikes] = useState(props.plantInstance.likes || 0)
  console.log(liked)

  const doLike = () => {
    if (liked) {
      PlantStore.cancelLikePlantInstance(props.plantInstance._id).then(count => {
        setLiked(false)
        setLikes(count)
      })
    } else {
      PlantStore.likePlantInstance(props.plantInstance._id).then(count => {
        setLiked(true)
        message.success("点赞成功，该植物已加入到您的首页列表中")
        setLikes(count)
      })
    }
  }
  return <div className={'like-button'} onClick={() => {
    doLike()
  }}>
    <div className={"icon " + (liked ? 'liked' : '')}>
      <div className="thumb">
        <i className="iconfont icon-thumb"/>
      </div>
      <div className="dianzan">
        <i className="iconfont icon-dianzan"/>
      </div>
    </div>
    <div className="count">{likes}
    </div>
  </div>
}
