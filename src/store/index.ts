import {useEffect, useState} from "react";
import {PlantStore} from "./plants";
import {listenersMap, reducerMap, stateMap, STORES} from "./const";
import {getDispatch} from "./dispatches";
import {AppStore} from "./app";

PlantStore.initialize(stateMap, reducerMap);
AppStore.initialize(stateMap, reducerMap);

export function useStore(store) {
  if (store === undefined) {
    store = STORES.APP_STORE;
  }
  const newListener = useState()[1];//[state,dispatch] = useState(undefined)
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
