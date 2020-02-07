import React from "react";
import ReactDOM from "react-dom";
import "sanitize.css";
import {formatTime} from "./utils/time";
import {App} from "./App";
// let App = Loadable({
//   loader: load(
//     () => import(/*webpackChunkName:"App"*/ "./App"),
//     "App",
//     progress => console.log("progress is " + progress),
//   ),
//   loading: () => <div />,
// });

// appInitialize().then(res => {
  ReactDOM.render(<App />, document.getElementById("root"));
// });

if (["prod", "production"].includes(process.env.NODE_ENV)) {
  console.log(`BUILD_TIME: ${formatTime(new Date(process.env.BUILD_TIME))}`);
}
