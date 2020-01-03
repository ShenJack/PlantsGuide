import React, {useEffect, useRef} from "react";
import "./App.scss";
import {Route, Router} from "react-router-dom";
import {Footer} from "./views/footer";
import {routes, appHistory} from "./router";
import {Header} from "./views/header";
import {getState, useStore} from "./store";
import {ModalContainer} from "./components/ModalContainer";
import {Loading} from "./components/Loading";
import {fromEvent} from "rxjs";
import {STORES} from "./store/const";
import {POST_STORE_ACTIONS} from "./store/stores/postStore";
import {getDispatch} from "./store/dispatches";
import {Sidebar} from "./views/sideBar";
import {Transition} from "./components/Transition";

function App() {
  const [state, dispatch] = useStore();
  // document.body.style.position = state.expanded?'fixed':'static'

  useEffect(() => {
    Loading.hide(true);
    fromEvent(scrollingContent.current, "scroll").subscribe(event => {
      let element: HTMLElement = scrollingContent.current;
      if (element) {
        if (
          element.clientHeight + element.scrollTop >=
          element.scrollHeight - 10
        ) {
          //todo 判断优化
          if (appHistory.location.pathname === "/") {
            getDispatch(STORES.POST_STORE)({
              type: POST_STORE_ACTIONS.FETCH_MORE,
            });
          }
        }

        if (
          element.scrollTop > 200 &&
          !getState(STORES.APP_STORE).headerFolded
        ) {
          dispatch({
            headerFolded: true,
            showEditButton: false,
          });
        } else if (
          element.scrollTop < 200 &&
          getState(STORES.APP_STORE).headerFolded
        ) {
          dispatch({
            headerFolded: false,
            showEditButton: true,
          });
        }
      }
    });
  }, []);

  let scrollingContent = useRef(undefined);

  return (
    <Router history={appHistory}>
      <div className={["app"].concat(state.theme).join(" ")}>
        <Header />
        <div ref={scrollingContent} className="scrolling-content">
          <div className="hidden lg:block lg:ml-20">
            <Transition>
              <Sidebar />
            </Transition>
          </div>
          <div className="content">
            {routes.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.main}
              />
            ))}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
        {/*{state.loading && <div className="app-loading"/>}*/}
      </div>
      <ModalContainer />
    </Router>
  );
}

export default App;
