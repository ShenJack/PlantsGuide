export const STORES = {
  APP_STORE: Symbol("APP_STORE"),
  MESSAGE_STORE: Symbol("MESSAGE_STORE"),
  EDIT_STORE: Symbol("EDIT_STORE"),
  USER_STORE: Symbol("USER_STORE"),
  AUTH_STORE: Symbol("AUTH_STORE"),
  MODAL_STORE: Symbol("MODAL_STORE"),
  TAG_STORE: Symbol("TAG_STORE"),
  POST_STORE: Symbol("POST_STORE"),
  SEARCH_STORE: Symbol("SEARCH_STORE"),
  SCREEN_STORE: Symbol("SCREEN_STORE"),
  COMMENT_STORE: Symbol("COMMENT_STORE")

};

export const ACTIONS = {
  CHANGE_THEME: Symbol(),
  SET_POSTS: Symbol(),
  TOGGLE_MODE: Symbol(),
  SET_TOKEN: Symbol(),
};

export const EDIT_SAVING_STATUS = {
  SAVING: "保存中",
  SAVED: "已保存",
  SAVE_FAIL: "保存失败",
  IS_NEW: "未保存",
  NO_CHANGE: "", //未修改
};
