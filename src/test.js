export const str = `# axios内容通悟

\`Promise based HTTP client for the browser and node.js
\`

今天我们来看一下axios在帮你完成请求的时候内部都做了什么。

## 概述

## 流程

### 默认可用，也可以自定义
\`\`\`javascript
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
\`\`\`

### \`delete\`, \`get\`, \`head\`, \`options\`, \`post\`, \`put\`, \`patch\` 都只是简单的\`request\`改了1~2个参数（\`method\`和\`data\`)

\`\`\`javascript
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
\`\`\`

### 拦截器系统

\`\`\`javascript
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
\`\`\`

## 细节 1
axios核心库（不包括test）全程没有使用箭头函数，因为IE是不支持箭头函数的

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

但因为axios是默认兼容node和browser环境的，所以还是使用了更为谨慎的function

同样的，通篇未使用一个let，就是为了避免浏览器环境下的不兼容性，例如IE11对let的支持是有限的
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

## Axios 网络编程最佳实践（之一）
`
