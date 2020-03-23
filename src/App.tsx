import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import {appHistory, routes} from "./router";
import {Route, Router, Switch} from "react-router-dom";
import {AnimatedSwitch} from "./component/animatedSwitch";
import {Spin} from "antd";
import {useStore} from "./store";
import {STORES} from "./store/const";

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
      <div className="loading-wrapper">
        <Loading/>
      </div>
    </div>
  );
}

function Loading(props) {
  let [appStore] = useStore(STORES.APP_STORE);
  return <div className={['loading-inner', appStore.loading ? "loading" : ""].join(' ')}>{appStore.loading &&
  <Spin size={"large"}/>}</div>
}
