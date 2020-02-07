import {Button} from "antd";
import React from "react";
import './index.scss'
import {appHistory} from "../../router";
import {from} from "rxjs/internal/observable/from";
import {Illustration} from "../illustration";

export function Home() {
  return(
    <div className="home">
      <Illustration />
    </div>
  )
}
