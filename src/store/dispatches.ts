import {dispatches, listenersMap, reducerMap, stateMap} from "./const";

function makeDispatch(store) {
  return function (newState) {
    if (newState.type !== undefined && reducerMap.get(store) !== undefined) {
      // if type and has reducer
      stateMap.set(store, reducerMap.get(store)(stateMap.get(store), newState));
    } else if (typeof newState === "function") {
      const result = newState(stateMap.get(store));
      stateMap.set(store, {...stateMap.get(store), ...result});
    } else {
      stateMap.set(store, {...stateMap.get(store), ...newState});
    }
    listenersMap.get(store).forEach(listener => {
      listener(stateMap.get(store));
    });
  };
}

export function getDispatch(store) {
  if (dispatches.get(store) === undefined) {
    dispatches.set(store, makeDispatch(store));
    if (listenersMap.get(store) === undefined) {
      listenersMap.set(store, []);
    }
  }
  return dispatches.get(store);
}
