const pluginName = "webpack-progress";

function addProgressVars() {
  // chunk-progress-webpack-plugin add-progress-vars start
  const progress = {
    totalSize: 0,
    activeLoadCount: 0,
    activeLoads: {},
  };
  // chunk-progress-webpack-plugin add-progress-vars end
}

function functionBody(fn) {
  const str = fn.toString();
  return str.slice(str.indexOf("{") + 1, str.lastIndexOf("}"));
}

function replaceRequireEnsure(chunkId) {
  // chunk-progress-webpack-plugin replace-require-ensure start
  let installedChunkData = installedChunks[chunkId];
  if (installedChunkData !== 0) {
    // 0 means "already installed".
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // setup Promise in chunk cache
      const promise = new Promise((resolve, reject) => {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });

      // eslint-disable-next-line no-undef
      const url = jsonpScriptSrc(chunkId);
      progress.activeLoads[url] = 0;
      progress.activeLoadCount += 1;
      promises.push((installedChunkData[2] = promise));

      const timeout = setTimeout(() => {
        onScriptComplete({
          type: "timeout",
          target: script,
        });
      }, 120000);

      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
      })
        .then(requestEvent => {
          progress.totalSize += parseInt(
            requestEvent.target.getResponseHeader("content-length"),
            10,
          );
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = resolve;
            xhr.onerror = reject;
            xhr.onprogress = function(progressEvent) {
              const loaded = Object.values(progress.activeLoads).reduce(
                (sum, num) => num + sum,
              );
              progress.activeLoads[url] = progressEvent.loaded;
              document.dispatchEvent(
                new CustomEvent("chunk-progress-webpack-plugin", {
                  detail: {
                    originalEvent: progressEvent,
                    originalRequestEvent: requestEvent,
                    loaded,
                    total: progress.totalSize,
                    resource: {
                      url,
                      loaded: progressEvent.loaded,
                      total: progressEvent.total,
                    },
                  },
                }),
              );
            };
            xhr.send();
          });
        })
        .then(event => event.target.responseText)
        .then(js => {
          const head = document.getElementsByTagName("head")[0];
          const script = document.createElement("script");
          script.textContent = js;
          head.appendChild(script);
        })
        .then(() => {
          onScriptComplete();
        })
        .catch(error => {
          onScriptComplete(error);
        });

      function onScriptComplete(event) {
        progress.activeLoadCount -= 1;
        if (progress.activeLoadCount <= 0) {
          progress.totalSize = 0;
          progress.activeLoadCount = 0;
          progress.activeLoads = {};
        }
        clearTimeout(timeout);
        const chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            const errorType =
              event && (event.type === "load" ? "missing" : event.type);
            const realSrc = event && event.target && event.target.src;
            const error = new Error(
              `Loading chunk ${chunkId} failed.\n(${errorType}: ${realSrc})`,
            );
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      }
    }
  }
  // chunk-progress-webpack-plugin replace-require-ensure end
}

class ChunkProgress {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      console.log("The webpack build process is starting!!!");
      compilation.mainTemplate.hooks.localVars.tap(
        "add-progress-vars",
        source => [source, functionBody(addProgressVars)].join("\n"),
      );
      compilation.mainTemplate.hooks.requireEnsure.tap(
        "replace-require-ensure",
        () => functionBody(replaceRequireEnsure),
      );
    });
  }
}

module.exports = ChunkProgress;
