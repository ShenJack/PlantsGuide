import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import {appHistory, routes} from "./router";
import {Route, Router, Switch} from "react-router-dom";
import {AnimatedSwitch} from "./component/animatedSwitch";
import {Spin} from "antd";
import {useStore} from "./store";
import {STORES} from "./store/const";
import {BottomSheet} from "./component/bottomSheet";
import {Modal} from "./component/modal";
import {Cover} from "./component/cover";

export function App() {
  return (
    <div className="app-content">
      <div id="cover-container">
        <Cover/>
      </div>
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
      <div id="bottom-sheet-container">
        <BottomSheet/>
      </div>
      <div id="modal-container">
        <Modal/>
      </div>
    </div>
  );
}

function Loading(props) {
  let [appStore] = useStore(STORES.APP_STORE);
  return <div className={['loading-inner', appStore.loading ? "loading" : ""].join(' ')}>{appStore.loading &&
  <>
    <Spin size={"large"}/>
    {appStore.loadingHint && <div className="hint">{appStore.loadingHint}</div>}
  </>}</div>
}
