# 压缩

从webpack 4开始，默认情况下使用UglifyJS压缩生产输出。也就是说，了解技术和进一步的可能性是很好的。

## 压缩js

`压缩`的目的是将代码转换为更小的形式。安全地`转换`通过重写代码而不会失去任何意义。这方面的好例子包括重命名变量，甚至根据它们无法访问的事实删除整个代码块（`if（false）`）。

不安全的转换可能会破坏代码，因为它们可能会丢失底层代码所依赖的隐含内容。例如，Angular1.x在使用模块时需要特定的函数参数命名。除非在这种情况下采取预防措施，否则重写参数会破坏代码。

### 修改JavaScript压缩过程

在webpack 4中，通过两个配置字段控制压缩过程：`optimization.minimize`标志以切换它和`optimization.minimizer`数组来配置压缩过程。

为了调整默认值，我们将[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)附加到项目中，以便可以对其进行调整。

首先，在项目中，安装 `uglifyjs-webpack-plugin` 依赖：

```bash
npm install uglifyjs-webpack-plugin --save-dev
```

然后，在 `webpack.parts.js` 中定义一个函数：

```javascript
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});
```

紧接着，在 `webpack.config.js` 中引入上面定义的函数：

```javascript
const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  ...
]);
```

运行 `npm run build` 脚本命令，你应该看到与之前相同的结果。结果可能略好一些，因为你可能会以这种方式使用较新版本的UglifyJS。

> 默认情况下禁用源映射。你可以通过 `sourceMap` 选项启用它们。你应该查看 `uglifyjs-webpack-plugin` 官方文档以获取更多选项。

> 要从结果源中删除 `console.log` 调用，请将 `uglifyOptions.compress.drop_console` 设置为 `true` 。在[Stack Overflow](https://stackoverflow.com/questions/49101152/webpack-v4-remove-console-logs-with-webpack-uglify) 中有详细讨论。

## 压缩JavaScript的其它方法

虽然默认值和 `uglifyjs-webpack-plugin` 都适用于此demo，但你可以考虑其他的方案：

* [babel-minify-webpack-plugin](https://www.npmjs.com/package/babel-minify-webpack-plugin) 依赖于 [babel-preset-minify](https://www.npmjs.com/package/babel-preset-minify) 它是由Babel团队开发的。但它比UglifyJS要慢。
* [webpack-closure-compiler](https://www.npmjs.com/package/webpack-closure-compiler)时并行运行，并且有时比 `babel-minify-webpack-plugin` 的结果更小。 [closure-webpack-plugin](https://www.npmjs.com/package/closure-webpack-plugin) 是另一个选择。
* [butternut-webpack-plugin](https://www.npmjs.com/package/butternut-webpack-plugin) 使用Rich Harris开发的 [butternut](https://www.npmjs.com/package/butternut) 实现压缩。

## 加快JavaScript执行速度

特定的解决方案允许你预处理代码，以便它运行得更快。它们补充了缩小技术，可以分为“范围提升”，“预评估”和“改进解析”。这些技术有时可能会增加整体包大小，同时允许更快的执行速度。

### 提升作用域

从webpack4.x开始，它默认在生产模式下应用作用域提升。它将所有模块提升到单个作用域，而不是为每个模块编写单独的闭包。这样做会减慢构建速度，但会为你提供执行速度更快的构建包。[阅读有关作用域提升的更多信息]（https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f）在webpack博客上。

>  将 `--display-optimization-bailout` 标志传递给webpack，以获取与提升结果相关的调试信息。

### Pre-evaluation

[prepack-webpack-plugin](https://www.npmjs.com/package/prepack-webpack-plugin) 使用了 [Prepack](https://prepack.io/)，它是一个部分JavaScript计算器。它重写了可以在编译时完成的计算，从而加快了代码执行速度。另请参阅[val-loader](https://www.npmjs.com/package/val-loader) 和 [babel-plugin-preval](https://www.npmjs.com/package/babel-plugin-preval )替代解决方案。

### 改进parseing

[optimize-js-plugin](https://www.npmjs.com/package/optimize-js-plugin)通过包装eager函数来补充其他解决方案，并且它增强了最初解析JavaScript代码的方式。该插件依赖于Nolan Lawson的[optimize-js](https://github.com/nolanlawson/optimize-js)。

## 压缩 HTML

如果你使用[html-loader](https://www.npmjs.com/package/html-loader)来处理项目中使用的HTML模板，则可以通过[posthtml](https://www.npmjs.com/package/posthtml)与[posthtml-loader](https://www.npmjs.com/package/posthtml-loader)对其进行预处理。你可以使用[posthtml-minifier](https://www.npmjs.com/package/posthtml-minifier)通过它缩小HTML。

## 压缩 CSS

[clean-css-loader](https://www.npmjs.com/package/clean-css-loader) 允许你使用流行的CSS压缩工具 [clean-css](https://www.npmjs.com/package/clean-css)。

[optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) 是一个基于插件的方案，它将用minifier来处理CSS静态资源。使用 `MiniCssExtractPlugin` 会导致结果包含重复的CSS，因为它只是合并文本块。 `OptimizeCSSAssetsPlugin` 通过对生成的结果进一步的处理来避免这个问题，从而可以产生更好的结果。

### 配置 CSS 压缩

在可用的解决方案中，`OptimizeCSSAssetsPlugin` 是最佳的选择。要使用它，首先安装 [cssnano](http://cssnano.co/) 依赖：

```bash
npm install optimize-css-assets-webpack-plugin cssnano --save-dev
```

然后，在 `webpack.parts.js` 中定义下面这样一个函数：

```javascript
const OptimizeCSSAssetsPlugin = require(
  "optimize-css-assets-webpack-plugin"
);
const cssnano = require("cssnano");

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});
```

> 如果你向webpack传入`--json` 参数，它在 `构建分析` 这章中有详细的介绍。你应该为插件设置 `canPrint：false`。

然后，在 `webpack.config.js` 中引入上面定义的函数：

```javascript
const productionConfig = merge([
  ...
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
  ...
]);
```

运行 `npm run build` 脚本命令，然后查看输出，你应该注意到CSS已经变小了，因为它缺少了注释：

```bash
Hash: f51ecf99e0da4db99834
Version: webpack 4.1.1
Time: 3125ms
Built at: 3/16/2018 5:32:55 PM
           Asset       Size  Chunks             Chunk Names
      chunk.0.js  162 bytes       0  [emitted]
      chunk.1.js   96.8 KiB       1  [emitted]  vendors~main
         main.js   2.19 KiB       2  [emitted]  main
        main.css    1.2 KiB       2  [emitted]  main
vendors~main.css   1.32 KiB       1  [emitted]  vendors~main
  chunk.0.js.map  204 bytes       0  [emitted]
  chunk.1.js.map    235 KiB       1  [emitted]  vendors~main
...
```

> [compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin) 允许你将生成压缩文件的问题推送到webpack，从而可能节省在服务器上的处理时间。

## 压缩 Images

图片的大小的压缩，你可以使用 [img-loader](https://www.npmjs.com/package/img-loader)，[imagemin-webpack](https://www.npmjs.com/package/imagemin-webpack)，和 [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin)。这些包使用底层的图片优化工具。

使用 `cache-loader` 和 `thread-loader` 这些loader可能是一个好主意，正如 [`性能`](https://lvzhenbang.github.io/webpack-book/zh/optimizing/07_performance.html) 这章所述，因为它们做了一些实质性的操作。

## 总结

为了使你的构建更小，压缩是你可以采取的最最合适的操作。 

内容回顾：

* 如果使用安全转换，`压缩`过程会分析你的源代码，并将其转换为具有相同含义的较小形式。特定的不安全转换允许你达到更小的结果，同时可能破坏依赖于精确参数命名的代码。
* Webpack默认使用UglifyJS在生产模式下执行压缩。其他解决方案，例如`babel-minify-webpack-plugin`，提供与其自身成本相似的功能。
* 除了JavaScript之外，还可以压缩其他静态资源，例如CSS，HTML和图像。压缩它们需要特定的技术支持，这些技术必须通过自己的loader和插件来使用。

在下一章中，将详细的介绍如何对构建结果执行tree-shaking。
