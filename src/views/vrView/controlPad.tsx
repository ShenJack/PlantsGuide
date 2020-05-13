import React from "react";
import {WaterPlant} from "../waterPlant/waterPlant";
import {ThumbButton} from "../thumbButton";
import {CommentView} from "../commentView";
import './controlPad.scss'

export function ControlPad(props) {
  return <div className={'control-pad-component'}>
    <div className="control-item water">
      <WaterPlant plantInstance={props.instance}/>
    </div>
    <div className="control-item comment">
      <CommentView plantInstance={props.instance}/>
    </div>
    <div className="control-item like">
      <ThumbButton plantInstance={props.instance}/>
    </div>
  </div>
}
