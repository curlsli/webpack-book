# Web Workers

[Web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 允许你将工作移到到JavaScript的主执行线程之外，这使得它们便于进行冗长的计算和后台工作。

在主线程和工作线程之间移动数据会带来与通信相关的开销。拆分提供了隔离，迫使 `web worker` 只关注逻辑，因为它们无法直接操作用户界面。

`web worker` 的想法在一般化的层面上是有价值的。 [parallel-webpack]（https://www.npmjs.com/package/parallel-webpack）使用底层的 [worker-farm]（https://www.npmjs.com/package/worker-farm）并行化webpack执行。

正如 *Build Targets* 章节中所讨论的，webpack允许你将应用程序构建为工作程序本身。为了更好地了解 `web worker`，你可以学习如何使用[worker-loader]（https://www.npmjs.com/package/worker-loader）构建一个微型的worker。

> 由于[SharedArrayBuffer]（https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer）等技术，将来主机和worker之间的数据共享可能会变得更加容易。

## 创建 `Worker Loader`

首先，在项目中安装 *worker-loader* ：

```bash
npm install worker-loader --save-dev
```

你可以使用内联loader定义来做一个示例演示，而不是将loader序定义推送到webpack配置。有关替代方案的更多信息，请参阅 [*Loader 的基本定义*](https://lvzhenbang.github.io/webpack-book/dist/zh/loading/01_loader_definitions.html) 这章内容。

## 配置一个Worker

worker必须做两件事：听取消息并做出回应。在这两个动作之间，它可以执行计算。在这种情况下，你接受文本数据，将其附加到自身，然后发送结果：

**src/worker.js**

```javascript
self.onmessage = ({ data: { text } }) => {
  self.postMessage({ text: text + text });
};
```

## 创建一个Host

Host须是worker的一个实例，然后与worker通信。除了host拥有控制功能之外，其它几乎相同

**src/component.js**

```javascript
import Worker from "worker-loader!./worker";

export default () => {
  const element = document.createElement("h1");
  const worker = new Worker();
  const state = { text: "foo" };

  worker.addEventListener("message", ({ data: { text } }) => {
    state.text = text;
    element.innerHTML = text;
  });

  element.innerHTML = state.text;
  element.onclick = () => worker.postMessage({ text: state.text });

  return element;
};
```

有host和worker这两个后，`web worker` 才可以工作。当你单击文本时，它应该在worker完成其执行时,改变应用程序状态。为了演示worker的异步特性，你可以尝试在代码中添加延迟，然后查看会发生什么。

> [webworkify-webpack]（https://www.npmjs.com/package/webworkify-webpack）是 *worker-loader* 的替代方案。 API允许你将worker用作常规JavaScript模块，同时避免在示例解决方案中看到 `self`。[webpack-worker]（https://www.npmjs.com/package/webpack-worker）是另一个研究学习的选择。

## 总结

你最需要注意的是worker无法访问DOM。你可以在worker程序中执行计算和查询，但它无法直接操作用户界面。

内容回顾：

* Web worker允许你将工作移出到浏览器的主线程之外。如果一个项目需要性能问题，这种分离是有意义的。
* Web worker无法操纵DOM。 相反，最好将它们用于冗长的计算和请求。
* Web worker提供的隔离可以使架构受益。它迫使程序员留在特定的沙箱中。
* 与Web worker进行通信会产生开销，使其不太实用。随着规范的发展，这可能会在未来发生变化。

在下一章中，将详细的介绍如何用webpack做国际化处理。
