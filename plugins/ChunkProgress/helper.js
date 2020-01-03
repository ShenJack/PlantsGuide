export function load(loader, webpackChunkName, onProgress) {
  listenerMap.set(webpackChunkName, {
    onProgress,
    loaded: 0,
    total: 1,
    chunks: [],
    chunksMap: {},
  });
  if (listenerMap.size > 0) {
    console.log("start lissetn");
    document.addEventListener("chunk-progress-webpack-plugin", event => {
      let {resource} = event.detail;
      console.log(resource.url);
      const chunkName = extractChunkName(resource.url);

      console.log(chunkName + 'total:' + event.detail.total)

      const listener = listenerMap.get(chunkName);
      if (listener == null) {
        return;
      }

      listener.chunksMap[resource.url] = {
        url: resource.url,
        loaded: resource.loaded,
        total: resource.total,
      };

      let chunkInList = listener.chunks.find(
        item => item && item.url === resource.url,
      );

      if (chunkInList) {
        chunkInList.loaded = resource.loaded;
      } else {
        listener.chunks.push(resource);
      }

      console.log(resource);

      let {loaded, total} = listener.chunks.reduce((pre, cur) => {
        return {
          loaded: pre.loaded + cur.loaded,
          total: pre.total + cur.total,
        };
      });

      console.log(`loaded${loaded} total ${total}`)

      listener.onProgress(Math.round((loaded / total) * 100) + "%");

      //delete listener when loaded
      if (loaded / total >= 1) {
        listenerMap.remove(webpackChunkName)
      }

    });
  }
  return () =>
    new Promise((resolve, reject) => {
      loader()
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
}

const listenerMap = new Map();

function extractChunkName(str) {
  return str.replace("vendors~", "").split(".")[0];
}
