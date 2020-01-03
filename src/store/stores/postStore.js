import {STORES} from "../const";
import {gqlClient} from "../../api";
import queryPost from "../../api/query/post.graphql";
const {getPost, getPosts} = queryPost;
import {getDispatch} from "../dispatches";
import {getState} from "../index";

interface Post {}

interface PostState {
  editingComment: string;
  posts: Post[];
  postDetails: Post[];
  totalCount: number;
  loading: boolean;
  loadedAll: boolean;
}

export const POST_STORE_ACTIONS = {
  FETCH_POSTS: Symbol("FETCH_POSTS"),
  SET_POSTS: Symbol("SET_POSTS"),
  FETCH_MORE: Symbol("FETCH_MORE"),
  SEARCH_POSTS: Symbol("SEARCH_POSTS"),
  GET_POST: Symbol("GET_POST"),
  CREATE_COMMENT: Symbol("CREATE_COMMENT"),
};

function postReducer(state: PostState, action) {
  switch (action.type) {
    case POST_STORE_ACTIONS.SET_POSTS:
      return {...state, theme: action.data};
    case POST_STORE_ACTIONS.GET_POST:
      gqlClient
        .query({
          query: getPost,
          variables: action.data,
        })
        .then(res => {
          getDispatch(STORES.POST_STORE)(prevState => {
            const post = res.data.post;
            let postDetails = prevState.postDetails.filter(
              item => item._id === post._id,
            );
            postDetails.push(post);
            return {
              postDetails,
            };
          });
        });
      return {...state, loading: true};
    case POST_STORE_ACTIONS.FETCH_POSTS:
      gqlClient
        .query({
          query: getPosts,
          variables: {
            limit: state.limit,
            skip: state.posts.length,
            ...action.data,
          },
        })
        .then(res => {
          getDispatch(STORES.POST_STORE)({
            posts: res.data.posts.list,
            totalCount: res.data.posts.totalCount,
            loading: false,
          });
        });
      return {...state, loading: true};
    case POST_STORE_ACTIONS.SEARCH_POSTS:
      console.log(getState(STORES.TAG_STORE).chosenTagId);
      getDispatch(STORES.POST_STORE)({
        type: POST_STORE_ACTIONS.FETCH_POSTS,
        data: {
          title: action.data.title || undefined,
          skip: 0,
          tagId:
            action.data.tagId ||
            getState(STORES.TAG_STORE).chosenTagId ||
            undefined,
        },
      });
      return {...state, loading: true};
    case POST_STORE_ACTIONS.FETCH_MORE:
      const postState = getState(STORES.POST_STORE);
      if (postState.posts.length >= postState.totalCount) {
        return {...state, loading: false};
      }
      gqlClient
        .query({
          query: getPosts,
          variables: Object.assign(
            {},
            {limit: state.limit, skip: state.posts.length},
            action.data,
            {
              tagId:
                action.data && action.data.tagId ||
                getState(STORES.TAG_STORE).chosenTagId ||
                undefined,
            }
          ),
        })
        .then(res => {
          getDispatch(STORES.POST_STORE)({
            posts: [...state.posts, ...res.data.posts.list],
            totalCount: res.data.posts.totalCount,
            loading: false,
          });
        });
      return {...state, loading: true};
    default:
      return state;
  }
}

let postState: PostState = {
  posts: [],
  postDetails: [],
  loading: false,
  limit: 5,
  skip: 0,
};

function initialize(stateMap, reducerMap) {
  stateMap.set(STORES.POST_STORE, postState);
  reducerMap.set(STORES.POST_STORE, postReducer);
}

export const PostStore = {
  initialize,
};
