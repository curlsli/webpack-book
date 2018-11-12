# 性能

Webpack的开箱即用性能通常足以满足小型项目的需求。也就是说，随着项目规模的扩大，它开始达到极限。这是webpack问题跟踪器中的常见问题。[issue 1905](https://github.com/webpack/webpack/issues/1905) 就是一个很好的例子。

在优化方面有几个基本规则：

1. 知道要优化什么。
2. 快速执行是需要调整的首要问题。
3. 之后调整更多执行相关的。
4. 做取舍。

有时优化需要成本。这会使他们的配置更难理解。通常最好的做法是做更少的工作或更聪明地做。这些将在下一章节中介绍，以便你知道在何时处理性能。

## 做取舍

如上一章所述，生成统计数据可用于衡量构建时间。[speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin) 通过插件和加载程序为你提供更详细的信息，以便你了解哪些过程占用了大部分时间。

## 更高层级的优化

Webpack默认只使用一个实例，这意味着你不做额外的工作，webpack就无法从多核处理器中受益。  [parallel-webpack](https://www.npmjs.com/package/parallel-webpack) 和 [HappyPack](https://www.npmjs.com/package/happypack) 提供了第三方的解决方案。

### 并行运行多个Webpack实例

`parallel-webpack` 允许你以两种方式并行化webpack配置。假设你将webpack配置作为阵列，它可以并行运行配置。除此之外，`parallel-webpack` 可以基于给定的 `**variants**` 配置构建。

使用变体可以同时生成生产和开发构建。因此，变体允许你生成具有不同目标的包，以便根据环境更容易使用它们。 变量可用于与`DefinePlugin`结合使用时实现标志，如：[`环境变量`](https://lvzhenbang.github.io/webpack-book/zh/optimizing/03_environment_variables.html) 章节中所述。

可以使用 [worker-farm](https://www.npmjs.com/package/worker-farm) 实现这个想法。事实上，`parallel-webpack` 依赖于 `worker-farm` 。

`parallel-webpack` 可以被引入到项目中代替webpack，然后 用 `parallel-webpack` 代替 `webpack` 命令

### HappyPack - 文件级并行

相比较于 `parallel-webpack` ，HappyPack使用起来优点麻烦。HappyPack可以拦截你使用的loader，然后并行运行它们。你必须先设置插件：

**webpack.config.js**

```javascript
...
const HappyPack = require("happypack");

...

const commonConfig = merge([{
  {
    plugins: [
      new HappyPack({
        loaders: [
          // Capture Babel loader
          "babel-loader"
        ],
      }),
    ],
  },
}];
```

你必须使用HappyPack替换原始Babelloader定义：

```javascript
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        ...
        // loader: "babel-loader",
        loader: "happypack/loader",
        ...
      },
    ],
  },
});
```

上面的示例包含webpack的信息，以便并行运行给定的loader。HappyPack提供了一些选项来实现这个功能。

也许HappyPack的问题在于它需要你调整配置。使用注入使它变得更容易。一种选择是替换更高级别的抽象。

## Low-Level 优化

特定的低级优化可以很好地了解。关键是允许webpack执行更少的工作。可从以下方面入手：

* 考虑在开发期间使用更快的源映射变体或跳过它们。如果你不以任何方式处理代码，则可以跳过。
* 在开发期间使用 [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)而不是映射，以使现代浏览器更易于访问和使用，并使代码更具可读性调试。
* 在开发过程中跳过polyfill。将[babel-polyfill(https://www.npmjs.com/package/babel-polyfill)等依赖包附加到应用程序的开发版本会增加开销。
* 禁用开发期间不需要的应用程序部分，只编译需要的部分，这是个好主意。
* Polyfill为Node提供很少的或不提供任何内容。例如，一个包可以使用Node的 `process`，这反过来会使你的包膨胀。要禁用它，请将 `node.process` 设置为 `false`。要完全禁用polyfill，请将 `node` 直接设置为 `false`。 [请参阅webpack文档](https://webpack.js.org/configuration/node/)获取默认值。
* 使用 `**Dynamically Loaded Libraries**` (DLL) 来避免不必要的处理。[官方的 webpack 示例](https://github.com/webpack/webpack/tree/master/examples/dll-user)，[Rob Knight的博文](https://robertknight.me.uk/posts/webpack-dll-plugins/) 详细的解释了它。[autodll-webpack-plugin](https://www.npmjs.com/package/autodll-webpack-plugin) 可以自动处理这个操作。

### 可用于优化的插件

下面介绍可用于优化的插件：

* 通过[hard-source-webpack-plugin](https://www.npmjs.com/package/hard-source-webpack-plugin)这样的插件来利用缓存，以避免不必要的工作。
* 在开发过程中使用相同但更轻的插件和loader替代品。如：用[HtmlPlugin](https://gist.github.com/bebraw/5bd5ebbb2a06936e052886f5eb1e6874)替换`HtmlWebpackPlugin`。

### 可用于优化的Loader

下面介绍可用于优化的loader：

* 通过在开发期间跳过loader来执行较少的处理。特别是如果你使用的是现代浏览器，则可以跳过使用 `babel-loader` 或完全相同的内容。
* 用 `include` 或 `exclude` 指定loader的作用范围。Webpack默认情况下遍历 `node_modules` ，除非已正确配置，否则对文件执行 `babel-loader`。
* 使用 [cache-loader](https://www.npmjs.com/package/cache-loader)将昂贵的loader(例如：图像处理)结果缓存到磁盘。
* 使用[thread-loader](https://www.npmjs.com/package/thread-loader)并行执行昂贵的loader。鉴于在Node工作中有开销，使用 `thread-loader` 只有在并行操作很重的情况下才值得。

## 优化开发过程中重新构建的速度

在开发过程中使用库的最小化版本（如React），可以优化此过程。如使用React的情况下，你将忽略基于`propType`的验证。如果速度很重要，这种技术是值得的。

`module.noParse` 可接受一个正则或一个正则数组。除了告诉webpack你想要使用的最小化的库文件之外，你还必须使用 `resolve.alias` 。 别名将在 [`使用包`](https://lvzhenbang.github.io/webpack-book/zh/techniques/06_consuming.html) 章节中详细介绍。

可以将想法封装在一个函数中：

```javascript
exports.dontParse = ({ name, path }) => {
  const alias = {};
  alias[name] = path;

  return {
    module: {
      noParse: [new RegExp(path)],
    },
    resolve: {
      alias,
    },
  };
};
```

然后，在配置中调用这个函数：

```javascript
dontParse({
  name: "react",
  path: path.resolve(
    __dirname, "node_modules/react/cjs/react.production.min.js",
  ),
}),
```

在此更改之后，应用程序应该更快地重建，具体取决于底层实现。该技术可以应用于生产。

`module.noParse` 可以接受一个你想要忽略的文件的正则表达式，如：`/\.min\.js/` 。

> 不是所有的模块都支持 `module.noParse`。如果有 `require`, `define`, 或相似的引用，将会出现 `Uncaught ReferenceError: require is not defined` 的错误。

## 总结

您可以通过多种方式优化webpack的性能。通常，从更易于使用的技术开始是个好主意。你使用的特定方案取决于项目。

内容回顾：

* 首先要考虑的是构建的速度。
* 其次需要考虑从多角度的优化。
* 由于webpack默认使用单个实例运行，因此并行化是有意义的。
* 特别是在开发期间，由于现代浏览器，跳过是可以接受的。

> [官方的构建性能指导](https://webpack.js.org/guides/build-performance/)。也可以参考 [Keep webpack Fast: A Field Guide for Better Build Performance](https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1)，[
How we improved webpack build performance by 95%](https://blog.box.com/blog/how-we-improved-webpack-build-performance-95/), [webpack optimization — A Case Study](https://medium.com/walmartlabs/webpack-optimization-a-case-study-92b130334b6c) 和 [Web Fundamentals by Google](https://developers.google.com/web/fundamentals/performance/webpack/) 。
