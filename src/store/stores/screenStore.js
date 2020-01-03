import {STORES} from "../const";
import {detectRunningInMobile} from "../../appinitial/util";

interface ScreenState {
  agent: "mobile" | "desktop";
  isMobile: () => boolean;
}

let screenState: ScreenState = {
  agent: "desktop",
  isMobile() {
    return screenState.agent === "mobile";
  },
};

function initialize(stateMap, reducerMap) {
  screenState.agent = detectRunningInMobile() ? "mobile" : "desktop";
  stateMap.set(STORES.SCREEN_STORE, screenState);
}

export const ScreenStore = {
  initialize,
};
