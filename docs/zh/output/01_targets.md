# 构建目标

虽然webpack通常用于打包Web应用程序，但它可以做得更多。你可以在Node或桌面环境中使用它，例如Electron。Webpack还可以编写适当的输出包装器打包为库，从而可以使用库。

Webpack的输出目标由 `target` 字段控制。下面将主要介绍构建目标的种类，然后深入了解库所指定的特定选项。

## Web目标

Webpack默认使用 *web* 目标。该目标非常适合Web应用程序。Webpack引导应用程序，并加载其模块。要加载的模块的初始列表在清单中维护，然后模块可以按照定义相互加载。

### Web Workers

*webworker* 目标将你的应用程序包装为[Web worker]（https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API）。如果要在应用程序的主线程之外执行计算而不降低用户界面的速度，则使用 `Web worker` 非常有用。你需要注意以下几个限制：

* 使用 *webworker* 目标时，无法使用webpack的hash功能。
* 你无法操纵 `web worker` 中的DOM。如果你将图书项目包装为 worker，则不会显示任何内容。

> `Web Worker` 及其用法将在 [*Web Workers*](https://lvzhenbang.github.io/webpack-book/dist/zh/techniques/02_web_workers.html) 这章中详细介绍。

## Node目标

Webpack提供了两个特定的Node目标：`node`和`async-node`。除非使用异步模式，否则它使用标准节点 `require` 来加载块。在这种情况下，它包装模块，以便通过Node的 `fs` 和 `vm` 模块异步加载它们。

使用Node目标的主要用例是 *Server Side Rendering*（SSR）。它的核心思想在 [*Server Side Rendering*](https://lvzhenbang.github.io/webpack-book/dist/zh/output/03_server_side_rendering.html) 这章中详细介绍。

## Desktop目标

有一些桌面shell，如[NW.js]（https://nwjs.io/）（以前是 *node-webkit*）和[Electron]（http://electron.atom.io/）（以前是 *Atom* ）。Webpack可以有如下目标：

* `node-webkit` - 在考虑体验时，将NW.js作为目标。
* `atom`, `electron`, `electron-main` - 目标是 [Electron main process](https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md).
* `electron-renderer` - 目标是 Electron 的渲染。

[electron-react-boilerplate]（https://github.com/chentsulin/electron-react-boilerplate）是一个很好的开端，如果你想要基于Electron和React开发的热加载的webpack设置。使用[Electron的官方快速入门]（https://github.com/electron/electron-quick-start）是一种方法。

## 总结

Webpack支持Web以外的目标。基于此，来实现其功能的，这对webpack来说是轻而易举。

内容回顾：

* Webpack的输出目标可以通过`target`字段来控制 它默认为 `web`，但也接受其他选项。
* 除了Web目标之外，Webpack还可以desktop，Node和Web workers。
* 如果是在服务器端渲染的配置中，Node目标会派上用场。

在下一章中，你将学习如何做一个多页面的构建配置。
