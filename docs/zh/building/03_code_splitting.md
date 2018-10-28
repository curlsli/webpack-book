# 代码分割

随着功能的演变，Web应用程序往往会越变越大，应用程序加载所需的时间也越来越长。但对用户来说体验效果就越令人沮丧。在网络速度较慢的移动环境中，此问题会被无限放大。

即使分离构建包可以在一定的程度上缓解这个问题，但它不是唯一的解决方案，你最终仍然需要下载大量数据。幸运的是，使用**代码分割**这个技术可以更好的解决这个问题。它允许在你需要时动态地加载代码。

你可以在用户进入应用程序的新视图时加载更多代码。你还可以将加载绑定到特定的用户操作上，例如滚动或单击按钮。你还可以尝试预测用户下一步要做什么，并根据你的猜测加载代码。这样当用户尝试访问它时，功能就已存在。

> 顺便说一下，使用webpack的懒加载可以实现Google的[PRPL模式]（https://developers.google.com/web/fundamentals/performance/prpl-pattern/）。PRPL（推送，渲染，预缓存，延迟加载）的设计考虑了移动网络。

## 代码分割的格式

代码分割可以在webpack中以两种主要方式完成：通过动态的 `import` 或 `require.ensure` 语法。在此项目用前者。

项目的目标是最终得到一个按需加载的分裂点。可以在拆分中进行拆分，你可以根据拆分构建整个应用程序。这样做的好处是，你的应用程序的初始有效负载可能会比其他情况下更小。
![代码分割](../../images/code-splitting.png)

### `import` 的动态特性

[dynamic`import`语法]（https://github.com/tc39/proposal-dynamic-import）尚未在官方语言规范中。 由于这个原因，特别是在Babel设置中需要进行小的调整。

动态的import是用 `Promise` 定义的：

```javascript
import(/* webpackChunkName: "optional-name" */ "./module").then(
  module => {...}
).catch(
  error => {...}
);
```

可选名称允许你将多个拆分点拉入单个包中。只要它们具有相同的名称，它们就会被分组。每个拆分点默认生成一个单独的包。

接口允许组合，你可以并行加载多个资源：

```javascript
Promise.all([
  import("lunr"),
  import("../search_index.json"),
]).then(([lunr, search]) => {
  return {
    index: lunr.Index.load(search.index),
    lines: search.lines,
  };
});
```

上面的代码为请求创建分离的包。如果只需要一个，则必须使用命名或定义中间模块来 `import`。

> 在以正确的方式配置之后，语法仅适用于JavaScript。如果你使用其他环境，则可能必须使用以下各部分中介绍的替代方案。

> 有一个旧的语法[require.ensure](https://webpack.js.org/api/module-methods/#require-ensure)。实际上，新语法可以涵盖相同的功能，另见[require.include]（https://webpack.js.org/api/module-methods/#require-include）。

> [webpack-pwa]（https://github.com/webpack/webpack-pwa）大范围地介绍了这个思想，并讨论了不同的基于shell的方法。你可以在 [*Multiple Pages*](https://lvzhenbang.github.io/webpack-book/dist/zh/output/02_multiple_pages.html#possible-approaches) 这章中将详细介绍这个主题。

## 配置代码分割

为了演示代码分割的想法，你可以使用动态的 `import`。项目的Babe需要额外的l配置以使语法有效。

### 配置 Babel

鉴于Babel不支持开箱即用的动态 `import` 语法，它需要[@babel/plugin-syntax-dynamic-import]（https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import）插件来工作。

用下面的命令，添加 `@babel/plugin-syntax-dynamic-import` 依赖：

```bash
npm install @babel/plugin-syntax-dynamic-import --save-dev
```

在 **.babelrc** 中添加如下配置启用动态的 `import`：

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"],
  ...
}
```

> 如果你正在使用ESLint，你应该在ESLint配置中安装 `babel-eslint` 并设置 `parser："babel-eslint"` 以及 `parserOptions.allowImportExportEverywhere：true` 。

### 用动态的 `import` 定义一个分割点

在项目中，添加一个包含替换演示按钮文本的字符串的模块，然后演示这个想法：

**src/lazy.js**

```javascript
export default "Hello from lazy";
```

你还需要将应用程序指向此文件，以便应用程序知道通过单击来加载它。只要用户点击按钮，就会触发加载过程并替换内容：

**src/component.js**

```javascript
export default (text = "Hello world") => {
  const element = document.createElement("div");

  element.className = "pure-button";
  element.innerHTML = text;
  element.onclick = () =>
    import("./lazy")
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => {
        console.error(err);
      });

  return element;
};
```

如果运行 `npm start` 脚本命令，启动应用，然后单击按钮，你将看到下图所示的效果：

![Lazy loaded content](../../images/lazy.png)

如果你运行 `npm run build` 脚本命令，你将看到如下信息：

```bash
Hash: 063e54c36163f79e8c90
Version: webpack 4.1.1
Time: 3185ms
Built at: 3/16/2018 5:04:04 PM
               Asset       Size  Chunks             Chunk Names
            0.js.map  198 bytes       0  [emitted]
                0.js  156 bytes       0  [emitted]
             main.js    2.2 KiB       2  [emitted]  main
            main.css   1.27 KiB       2  [emitted]  main
    vendors~main.css   2.27 KiB       1  [emitted]  vendors~main
...
```

*0.js* 就是你所需要的分离点。查看文件，你会发现webpack已将代码包装到 `webpackJsonp` 块中。

> 如果要调整块的名称，请设置`output.chunkFilename`。 例如，将其设置为 `"chunk.[id].js"` 将为每个拆分块添加前缀 `"chunk"` 。

> [bundle-loader]（https://www.npmjs.com/package/bundle-loader）可以通过loader接口实现类似的结果，它通过 `name` 选项支持bundle重命名。

> 当你必须处理更复杂的分割时，[*Dynamic Loading*](https://lvzhenbang.github.io/webpack-book/dist/zh/techniques/01_dynamic_loading.html#dynamic-loading-with-require-context) 这章介绍了其他技术。

## 使用React实现代码分割

在React组件中实现拆分模式。Airbnb使用以下[解决方案]（https://gist.github.com/lencioni/643a78712337d255f5c031bfc81ca4cf），如Joe Lencioni所述：

```javascript
import React from "react";

// Somewhere in code
<AsyncComponent loader={() => import("./SomeComponent")} />

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: null };
  }
  componentDidMount() {
    this.props.loader().then(
      Component => this.setState({ Component })
    );
  }
  render() {
    const { Component } = this.state;
    const { Placeholder, ...props } = this.props;

    return Component ? <Component {...props} /> : <Placeholder />;
  }
}
AsyncComponent.propTypes = {
  loader: PropTypes.func.isRequired,
  Placeholder: PropTypes.node.isRequired,
};
```

> [react-async-component](https://www.npmjs.com/package/react-async-component) 包含 `createAsyncComponent` 调用，并提供服SSR特定功能。 [loadable-components](https://www.npmjs.com/package/loadable-components) 是其它一个选项。

## 禁用代码分割

虽然在一般况下代码分割是好的，但它并不是总是好的，尤其是在服务器端使用时。因此，可以像下面这样将其禁用：

```javascript
const webpack = require("webpack");

...

module.exports = {
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
```

> 为什么代码分割在服务端使用会出现问题？，可以看 [Glenn Reyes 的详细解释](https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5)。

## 总结

代码分割是一个可以进一步提升你的应用程序的功能。你可以在需要时加载代码，以获得更快的初始加载时间和改善的用户体验，尤其是在带宽有限的移动环境中。

内容回顾：

* 要实现 **代码分割** ，你必须决定分割什么和在哪里。通常，你会在路由器中找到良好的分裂点。或者你注意到仅在使用特定功能时，它才被需要。
* 要使用动态`import`语法，Babel和ESLint都需要仔细调整。 Webpack支持开箱即用的语法。
* 使用命名将分离的拆分点放入相同的构建包中。
* 这些技术可以在框架和React等库中使用。你可以将相关逻辑包装到特定组件，用户友好的方式处理加载过程。
* 启用代码分割，可以用 `webpack.optimize.LimitChunkCountPlugin` 的 `maxChunks` 配置。

在下一章中，将介绍如何对构建做整理。

> 附录中的 *Searching with React* 包含代码分割的完整示例。当用户搜索信息加载时，如何设置静态站点索引的显示。
