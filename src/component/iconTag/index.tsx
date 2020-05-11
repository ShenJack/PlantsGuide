import React from "react";
import './index.scss'

function getChildrenColor(children) {
  let hex = hexEncode(children);
  return '#' + hex.slice(hex.length - 6, hex.length);
}

function getTextColor(children) {
  let bg = getChildrenColor(children);
  if (isDark(bg)) {
    return 'white'
  } else {
    return 'black'
  }
}


export function IconTag(props) {
  return <div className="icon-tag-component"
              style={{background: getChildrenColor(props.children), color: getTextColor(props.children)}}>
    <i className={"iconfont icon " + props.icon || ""}/>
    {props.children}
  </div>
}

function hexEncode(str) {
  var hex, i;

  var result = "";
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

function isDark(color) {
  var c = color.substring(1);      // strip #
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >> 8) & 0xff;  // extract green
  var b = (rgb >> 0) & 0xff;  // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  if (luma < 40) {
    return false;
  } else {
    return true;
  }
}
