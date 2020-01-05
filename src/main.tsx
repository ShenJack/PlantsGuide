import React from "react";
import ReactDOM from "react-dom";
import "sanitize.css";
import {formatTime} from "./utils/time";
import {appInitialize} from "./appinitial";
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

// LogRocket.init('17sotr/luckhunt');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
