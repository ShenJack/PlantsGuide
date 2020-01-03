const FETCH_TIMEOUT = 20 * 1000;

export function testLocalServer(url) {
  return new Promise((resolve, reject) => {
    let didTimeOut = false;

    if (process.env.NODE_ENV === "prod") {
      reject();
    }

    const timeout = setTimeout(function() {
      didTimeOut = true;
      reject(new Error("Request timed out"));
    }, FETCH_TIMEOUT);

    fetch(url)
      .then(function(response) {
        // Clear the timeout as cleanup
        clearTimeout(timeout);
        if (!didTimeOut) {
          console.log("fetch good! ", response);
          resolve(response);
        }
      })
      .catch(function(err) {
        console.log("fetch failed! ", {didTimeOut});
        // Rejection already happened with setTimeout
        if (didTimeOut) return;
        // Reject with error
        reject();
      });
  });
}
