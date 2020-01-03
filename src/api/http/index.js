// import {server} from '../index'
import {KEY_TOKEN} from "../keys";
import {STORES} from "../../store/const";
import {getServer} from "../url";
import {getDispatch} from "../../store/dispatches";
import {utils} from "./utils";
import {Message} from "../../components/Message";
import {appHistory} from "../../router";

export const httpClient = new Client(getServer());

function Client(baseUrl) {
  this.baseUrl = baseUrl;
}

function getHeaders(config) {
  let headers = {
    authorization: `Bearer ${localStorage.getItem(KEY_TOKEN)}`,
    ...config.headers,
  };
  if (!(config.data instanceof FormData)) {
    headers["content-type"] = "application/json";
  }
  return headers;
}

function makeFetchConfig(config) {
  return {
    method: config.method,
    body: config.data,
    headers: getHeaders(config),
  };
}

function makeUrl(base, rest) {
  if (rest.indexOf("http://") >= 0) {
    return rest;
  }
  return base + rest;
}

interface RequestConfig {
  url: string;
  method: string;
  data: any;
  headers: any[];
  onDownloadProgress: number => void;
  onUploadProgress: number => void;
}

Client.prototype.request = function(config: RequestConfig) {
  return new Promise((resolve, reject) => {
    getDispatch(STORES.APP_STORE)({
      loading: true,
    });

    let requestData = config.data;

    let requestHeaders = {...(config.headers || {}), ...getHeaders(config)};

    if (utils.isFormData(requestData)) {
      delete requestHeaders["Content-Type"]; // Let the browser set it
    }

    let request = new XMLHttpRequest();
    request.open(config.method, makeUrl(getServer(), config.url), true);
    if ("setRequestHeader" in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (
          typeof requestData === "undefined" &&
          key.toLowerCase() === "content-type"
        ) {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }
    request.onreadystatechange = function() {
      if (!request || request.readyState !== 4) {
        return;
      }

      if (
        request.status === 0 &&
        !(request.responseURL && request.responseURL.indexOf("file:") === 0)
      ) {
        return;
      }

      var responseData =
        !config.responseType || config.responseType === "text"
          ? request.responseText
          : request.response;
      var response = {
        data: JSON.parse(responseData),
        status: request.status,
        statusText: request.statusText,
        config: config,
        request: request,
      };

      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        if (response.data && response.data.message) {
          Message.error(response.data.message);
        }

        if (response.status === 401) {
          appHistory.push("/login");
        }

        reject(response);
      }

      request = null;
    };

    // Handle progress if needed
    if (typeof config.onDownloadProgress === "function") {
      request.addEventListener("progress", config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", config.onUploadProgress);
    }

    request.ontimeout = function() {
      reject("timeout");
      request = null;
    };

    request.onerror = function() {
      reject("onerror");
      request = null;
    };

    request.send(config.data);

    return;

    fetch(makeUrl(getServer(), config.url), makeFetchConfig(config))
      .then(async (res: Response) => {
        try {
          res.data = await res.json();
          if (res.status >= 200 && res.status < 300) {
            resolve(res);
          } else {
            reject(res);
          }
        } catch (e) {
          reject(e);
        }
      })
      .catch(err => {
        getDispatch(STORES.APP_STORE)({
          loading: false,
        });
        reject(err);
      });
  });
};
