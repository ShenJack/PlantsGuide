import React, {useState} from 'react'


import {getDispatch, stateMap} from "./index";

export function createLocalStore(initialState) {
  let newListener = useState(initialState);
  useEffect(() => {
    if (listenersMap.get(store) === undefined) {
      listenersMap.set(store, [])
    }
    listenersMap.get(store).push(newListener)
  }, []);
  return [stateMap.get(store), getDispatch(store)]
}
