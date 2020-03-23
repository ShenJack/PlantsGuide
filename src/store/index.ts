import {useEffect, useState} from "react";
import {PlantStore} from "./plants";
import {listenersMap, reducerMap, stateMap, STORES} from "./const";
import {getDispatch} from "./dispatches";

let appState = {
  loading: false
}

stateMap.set(STORES.APP_STORE, appState)
PlantStore.initialize(stateMap, reducerMap);

export function useStore(store) {
  if (store === undefined) {
    store = STORES.APP_STORE;
  }
  const newListener = useState()[1];
  useEffect(() => {
    if (listenersMap.get(store) === undefined) {
      listenersMap.set(store, []);
    }
    listenersMap.get(store).push(newListener);
    return () => {
      listenersMap.set(
        store,
        listenersMap.get(store).filter(listener => listener !== newListener),
      );
    };
  }, [newListener, store]);
  return [stateMap.get(store), getDispatch(store)];
}

