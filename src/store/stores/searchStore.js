import {STORES} from "../const";

interface SearchState {
  searching: boolean;
  text: string;
}

let searchState: SearchState = {
  searchingText: false,
  text: "",
};

function initialize(stateMap, reducerMap) {
  stateMap.set(STORES.SEARCH_STORE, searchState);
}

export const SearchStore = {
  initialize,
};
