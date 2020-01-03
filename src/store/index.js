import {useEffect, useState} from "react";
import {ACTIONS, EDIT_SAVING_STATUS, STORES} from "./const";
import {setToken} from "./token";
import {getDispatch, listenersMap} from "./dispatches";
import {PostStore} from "./stores/postStore";
import {TagStore} from "./stores/tagStore";
import {SearchStore} from "./stores/searchStore";
import {ScreenStore} from "./stores/screenStore";
import {CommentStore} from "./stores/commentStore";

export const THEMES = {
  BLACK_THEME: "__black",
  WHITE_THEME: "__white",
};

export const dispatches = new Map();

interface AppState {
  theme: Symbol;
  posts: Array;
}

export function appReducer(state: AppState, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_THEME:
      return {...state, theme: action.data};
    case ACTIONS.SET_POSTS:
      return {...state, posts: action.data};
    case ACTIONS.TOGGLE_MODE:
      return {
        ...state,
        theme:
          state.theme === THEMES.BLACK_THEME
            ? THEMES.WHITE_THEME
            : THEMES.BLACK_THEME,
      };
    default:
      return state;
  }
}

export function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TOKEN:
      setToken(action.data);
      return {...state, token: action.data};
    default:
      return state;
  }
}

export const stateMap = new Map();

const appState = {
  theme: THEMES.WHITE_THEME,
  expanded: false,
  posts: undefined,
  postDetails: [],
};
const messageState = {messages: []};
const userState = {
  info: {},
};

const authState = {
  signed: false,
  token: undefined,
};

const tagState = {
  availTags: [],
};

const editState = {
  savingStatus: EDIT_SAVING_STATUS.NO_CHANGE,
  lastSaveTime: undefined,
};

stateMap.set(STORES.APP_STORE, appState);
stateMap.set(STORES.MESSAGE_STORE, messageState);
stateMap.set(STORES.EDIT_STORE, editState);
stateMap.set(STORES.USER_STORE, userState);
stateMap.set(STORES.AUTH_STORE, authState);
stateMap.set(STORES.TAG_STORE, tagState);

export const reducerMap = new Map();
reducerMap.set(STORES.APP_STORE, appReducer);
reducerMap.set(STORES.AUTH_STORE, authReducer);

PostStore.initialize(stateMap, reducerMap);
TagStore.initialize(stateMap, reducerMap);
SearchStore.initialize(stateMap, reducerMap);
ScreenStore.initialize(stateMap, reducerMap);
CommentStore.initialize(stateMap, reducerMap);

export function getState(store) {
  return stateMap.get(store);
}

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
