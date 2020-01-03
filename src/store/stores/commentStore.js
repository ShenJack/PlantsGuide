import {STORES} from "../const";
import {gqlClient} from "../../api";
import {getDispatch} from "../dispatches";
import {getState} from "../index";
import commentsGraphql from "../../api/query/comment.graphql";

interface CommentState {
    editingComment: string;
    lastPostId: string,
    skip: number;
    limit: number;
}

export const COMMENT_ACTIONS = {
  CREATE_COMMENT: Symbol("CREATE_COMMENT"),
  GET_COMMENTS: Symbol("GET_COMMENTS"),
};

function commentReducer(state: CommentState, action) {
  switch (action.type) {
    case COMMENT_ACTIONS.CREATE_COMMENT:
      gqlClient
        .mutate({
          mutation: commentsGraphql.createComment,
          variables: {...action.data, content: state.editingComment},
        })
          .then(res => {
              getDispatch(STORES.COMMENT_STORE)({
                  comments: [res.data.createComment, ...state.comments],
                  loading: false,
              });
          });
        return {...state, loading: true};
      case COMMENT_ACTIONS.GET_COMMENTS:
          const commentState = getState(STORES.COMMENT_STORE);
          if (
              commentState.comments.length >= commentState.totalCount &&
              action.data.postId === state.lastPostId
          ) {
              return {...state, loading: false};
          }
          gqlClient
              .query({
                  query: commentsGraphql.getComments,
                  variables: Object.assign(
                      {},
                      {limit: state.limit, skip: state.skip},
                      action.data,
                  ),
                  fetchPolicy: "no-cache",
              })
        .then(res => {
          getDispatch(STORES.COMMENT_STORE)({
            comments: res.data.comments.list,
            totalCount: res.data.comments.totalCount,
            loading: false,
          });
        });
          return {...state, lastPostId: action.data.postId, loading: true};
    default:
      return state;
  }
}

let commentState: CommentState = {
  editingComment: "",
  comments: [],
  totalCount: 1,
  loading: false,
  limit: 5,
  skip: 0,
};

function initialize(stateMap, reducerMap) {
  stateMap.set(STORES.COMMENT_STORE, commentState);
  reducerMap.set(STORES.COMMENT_STORE, commentReducer);
}

export const CommentStore = {
  initialize,
};
