import {STORES} from "../const";
import {gqlClient} from "../../api";
import {getDispatch} from "../dispatches";
import queryTag from "../../api/query/tag.graphql";

let {deleteTag, createTag, queryTags} = queryTag;

interface Tag {}

interface TagState {
  tags: Tag[];
  queryTags: Tag[];
  totalCount: number;
  loading: boolean;
  queryLoading: boolean;
  loadedAll: boolean;
  selectedTags: Tag[];
}

export const TAG_STORE_ACTIONS = {
  FETCH_TAGS: Symbol("FETCH_TAGS"),
  QUERY_TAGS: Symbol("QUERY_TAGS"),
  CREATE_TAG: Symbol("CREATE_TAG"),
  DELETE_TAG: Symbol("DELETE_TAG"),
  UPDATE_TAG: Symbol("UPDATE_TAG"),
};

function tagReducer(state: TagState, action) {
  switch (action.type) {
    case TAG_STORE_ACTIONS.FETCH_TAGS:
      gqlClient
        .query({
          query: queryTag.queryTags,
          variables: Object.assign({}, action.data),
        })
        .then(res => {
          getDispatch(STORES.TAG_STORE)({
            tags: res.data.tags,
            loading: false,
          });
        });
      return {...state, loading: true};
    case TAG_STORE_ACTIONS.QUERY_TAGS:
      gqlClient
        .query({
          query: queryTag.queryTags,
          variables: Object.assign({}, action.data),
          fetchPolicy: "no-cache",
        })
        .then(res => {
          getDispatch(STORES.TAG_STORE)({
            queryTags: res.data.tags,
            queryLoading: false,
          });
        });
      return {...state, queryLoading: true};
    case TAG_STORE_ACTIONS.DELETE_TAG:
      gqlClient
        .mutate({
          mutation: deleteTag,
          variables: Object.assign({}, action.data),
        })
        .then(res => {
          getDispatch(STORES.TAG_STORE)({
            type: TAG_STORE_ACTIONS.FETCH_TAGS,
          });
        });
      return {...state, loading: true};
    case TAG_STORE_ACTIONS.UPDATE_TAG:
      gqlClient
        .mutate({
          mutation: queryTag.updateTag,
          variables: Object.assign({}, action.data),
        })
        .then(res => {
          getDispatch(STORES.TAG_STORE)({
            type: TAG_STORE_ACTIONS.FETCH_TAGS,
          });
        });
      return {...state, loading: true};
    case TAG_STORE_ACTIONS.CREATE_TAG:
      gqlClient
        .mutate({
          mutation: createTag,
          variables: Object.assign({}, action.data),
        })
        .then(res => {
          getDispatch(STORES.TAG_STORE)({
            type: TAG_STORE_ACTIONS.FETCH_TAGS,
          });
        });
      return {...state, loading: true};
    default:
      return state;
  }
}

let tagState: TagState = {
  tags: [],
  chosenTagId: undefined,
  loadedAll: false,
  queryLoading: false,
  totalCount: 0,
  queryTags: [],
  loading: false,
};

function initialize(stateMap, reducerMap) {
  stateMap.set(STORES.TAG_STORE, tagState);
  reducerMap.set(STORES.TAG_STORE, tagReducer);
}

export const TagStore = {
  initialize,
};
