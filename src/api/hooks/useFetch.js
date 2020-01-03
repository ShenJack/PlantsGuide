import { useEffect, useReducer, useRef } from "react";
import { ApiOptions } from "./types";

import {
  useMemoOne as useMemo,
  useCallbackOne as useCallback
} from "use-memo-one";
import {apiGetUserInfo} from "../http/auth";
import {gqlClient} from "../index";
import {getPosts} from "../query/post.graphql";

const forcedReducer = (state: number) => state + 1;
const useForceUpdate = () => useReducer(forcedReducer, 0)[1];

export type AsyncFuncType = <T = any>(...args: any[]) => Promise<any>;

const createTask = (func: AsyncFuncType, forceUpdateRef: any) => {
  const task = {
    start: async (...args: any[]) => {
      task.loading = true;
      task.result = null;
      forceUpdateRef.current(func);
      try {
        task.result = await func(...args);
      } catch (e) {
        task.error = e;
      }
      task.loading = false;
      forceUpdateRef.current(func);
    },
    loading: false,
    result: null,
    error: undefined
  };
  return task;
};

export const useAsyncTask = (func: AsyncFuncType) => {
  /*Manually control the component's update*/
  const forceUpdate = useForceUpdate();
  const forceUpdateRef = useRef(forceUpdate);

  const task = useMemo(() => createTask(func, forceUpdateRef), [func]);

  useEffect(() => {
    forceUpdateRef.current = f => {
      if (f === func) {
        forceUpdate({});
      }
    };
    const cleanup = () => {
      forceUpdateRef.current = () => null;
    };
    return cleanup;
  }, [func, forceUpdate]);

  return {
    start: task.start,
    loading: task.loading,
    error: task.error,
    result: task.result
  }
};

export const useFetch = (initial: ApiOptions) =>
  useAsyncTask(
    useCallback(
      async (overrides: ApiOptions) => {
        // return gqlClient.query({ ...initial, ...overrides });
        return gqlClient.query({query: getPosts});
      },
      [initial]
    )
  );

export const useAsyncRun = (
  asyncTask: ReturnType<typeof useAsyncTask>,
  ...args: any[]
) => {
  const { start } = asyncTask;
  useEffect(() => {
    start(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncTask.start, ...args]);
  useEffect(() => {
    const cleanup = () => {
      // clean up code here
    };
    return cleanup;
  });
};
