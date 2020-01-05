// @flow
import React, {useState} from "react";
import "antd/dist/antd.css";

import "./App.scss";
import {appHistory, routes} from "./router";
import {Route, Router, Fade} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {AnimatedSwitch} from "react-router-transition";

export function App() {
  return (
    <div className="app-content">
      <Router history={appHistory}>
        <AnimatedSwitch
          className={'switch-wrapper'}
          atEnter={{opacity: 0}}
          atLeave={{opacity: 0}}
          atActive={{opacity: 1}}>
          {routes.map((item, index) => (
            <Route key={index} path={item.path} exact={item.exact}>
              {item.component}
            </Route>
          ))}
        </AnimatedSwitch>
      </Router>
    </div>
  );
}
