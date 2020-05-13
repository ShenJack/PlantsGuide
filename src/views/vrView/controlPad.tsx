import React from "react";
import {WaterPlant} from "./waterPlant";
import {ThumbButton} from "../thumbButton";
import {CommentView} from "../commentView";

export function ControlPad(props) {
  return <div className={'control-pad-component'}>
    <div className="water">
      <WaterPlant/>
    </div>
    <div className="comment">
      <CommentView/>
    </div>
    <div className="like">
      <ThumbButton plantInstance={props.instance}/>
    </div>
  </div>
}
