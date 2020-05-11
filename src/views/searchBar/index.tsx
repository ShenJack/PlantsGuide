import React from 'react'
import {Button} from "antd";
import {BottomSheet} from "../../component/bottomSheet";
import {FormSearchPlant} from "../adminForms/searchPlant";
import {Modal} from "../../component/modal";

export function SearchBar() {
  return <div className="search-bar">
    <Button onClick={() => Modal.open(<FormSearchPlant/>, FormSearchPlant)}>检索</Button>
  </div>
}
