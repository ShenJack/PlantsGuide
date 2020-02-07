import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import {appHistory, routes} from "./router";
import {Route, Router, Switch} from "react-router-dom";
import {AnimatedSwitch} from "./component/animatedSwitch";

export function App() {
  return (
    <div className="app-content">
      <Router history={appHistory}>
        <Switch>
          <AnimatedSwitch
            className={'switch-wrapper'}
          >
            {routes.map((item, index) => (
              <Route key={index} path={item.path} exact={item.exact} component={item.component}>
              </Route>
            ))}
          </AnimatedSwitch>
        </Switch>
      </Router>
    </div>
  );
}
