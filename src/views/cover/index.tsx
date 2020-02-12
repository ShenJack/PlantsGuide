import React from "react";
import "./index.scss";

export function Cover() {
  const cover = require("../../assets/college/bg_02.jpg");
  return (
    <div className="cover">
      <img src={cover}/>
    </div>
  );
}
