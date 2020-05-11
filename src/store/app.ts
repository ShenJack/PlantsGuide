import {STORES} from "./const";
import {getDispatch} from "./dispatches";

let appState = {
  loading: false,
  bottomSheetContent: undefined,
  bottomSheetContentType: undefined,
  bottomSheetOpened: false,
  modelContent: undefined,
  modalContentType: undefined,
  modalOpened: false,
};
export const AppStore = {
  initialize: (stateMap, reducerMap) => {
    stateMap.set(STORES.APP_STORE, appState);
  },
  showLoading,
  cancelLoading,
};

function showLoading(hint = undefined) {
  if (hint) {
    getDispatch(STORES.APP_STORE)({
      loading: true,
      loadingHint: hint
    })
  } else {
    getDispatch(STORES.APP_STORE)({
      loading: true,
    })
  }
}

function cancelLoading() {
  getDispatch(STORES.APP_STORE)({
    loading: false,
    loadingHint: undefined
  })
}
