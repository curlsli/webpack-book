# 分割 CSS

虽然现在已经有了一个还算不错的构建，但是我们知道一个Web项目中不光只有js文件，还有css文件，但打包后却不见他们，它们到哪里去了？根据配置，它已内联到js中。这尽管在开发过程中很方便，但实际效果并不理想，这里涉及到项目的优化，在本书的优化这一部分再做详解。

当前的构建不能实现css的缓存。当你运行web向时，可能遇到‘没有样式的内容一闪而过’（Flash of Unstyled Content，简称：FOUC）的情况。FOUC出现的原因是因为浏览器需要一段的时间来加载js，而样式只有在那时才会被应用。通过将CSS分离到单独的样式文件中，可以避免这个问题的出现。

webpack4.x 推荐使用[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) (MCEP)，而低于webpack4.x的可以使用[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)。它附带了一个loader，这个提取程序可以将多个CSS文件合为一个，然后插件获取loader合成的结果并分离出一个单独的文件。

由于 `MiniCssExtractPlugin` 插件的执行伴随着编译，因此使用时要考虑编译的开销，而热模块交换（HMR）不支持，所以不适合开发模式下使用，但如果仅把它用于生产，则不用考虑这个问题。

> 在生产环境中使用JavaScript内嵌样式可能有潜在的危险，因为它是一个[攻击向量](https://searchsecurity.techtarget.com.cn/whatis/11-25088/)。**[关键路径渲染](https://varvy.com/pagespeed/critical-render-path.html)（Critical path rendering）** 包含了这个想法，并将关键的CSS内联到初始的HTML有效负载中，从而提高了站点的感知性能。在有限的上下文中，内联少量CSS是加速初始负载(更少的请求)的可行选择。

## 配置 `MiniCssExtractPlugin`

首先需要添加 `MiniCssExtractPlugin` 依赖：

```bash
npm install mini-css-extract-plugin --save-dev
```

`MiniCssExtractPlugin` 包含一个loader，`MiniCssExtractPlugin.loader` 这个标记可以用来提取静态资源中的css，然后插件在前面的基础上分离css。

在 **webpack.parts.js** 中，添加如下的配置：

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};
```

`[name]` 占位符引入入口名称为css模块的名称。占位符和hash用法和意义将在 *[在文件名中添加hash]()https://lvzhenbang.github.io/webpack-book/dist/zh/optimizing/04_adding_hashes_to_filenames.html* 这章详解。

> 如果你想输出文件到指定目录，你可以添加一个路径名来指定路径。如：`filename: "styles/[name].css"`.

### 如何在配置中实现功能的拼接

功能的拼接的配置代码如下：

**webpack.config.js**

```javascript
const commonConfig = merge([
  ...
  // parts.loadCSS(),
]);

// const productionConfig = merge([]);
const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader",
  }),
]);

const developmentConfig = merge([
  ...
  parts.loadCSS(),
]);
```

使用这种方式，在开发中，你任然可以使用HMR。在生产模式下你也可以实现css的分离。 `HtmlWebpackPlugin` 可以成一个 `index.html` 文件，并实现分离的css文件的注入。

> 如果你正在使用 *CSS 模块* ，你可以根据*[加载样式](https://lvzhenbang.github.io/webpack-book/dist/zh/styling/01_loading.html)* 这章所讲的方法，调整 `use` 。你也可以将它们独立出来，单独的维护标准的css和css模块的配置。

运行 `npm run build` 脚本命令后，你将看到与下面相似的结果：

```bash
Hash: 45a5e26cc963eb12db02
Version: webpack 4.1.1
Time: 752ms
Built at: 3/16/2018 4:24:40 PM
     Asset       Size  Chunks             Chunk Names
   main.js  700 bytes       0  [emitted]  main
  main.css   33 bytes       0  [emitted]  main
index.html  220 bytes          [emitted]
Entrypoint main = main.js main.css
   [0] ./src/index.js + 1 modules 247 bytes {0} [built]
       | ./src/index.js 99 bytes [built]
       | ./src/component.js 143 bytes [built]
   [1] ./src/main.css 41 bytes {0} [built]
...
```

现在已经把样式推到一个单独的CSS文件中。这样JavaScript包变得稍微小了一些。你就可以避免FOUC问题，浏览器不需要等待JavaScript加载来获得样式信息。相反，它可以单独处理CSS，避免使用flash情况的出现。

> 如果你遇到了 `Module build failed: CssSyntaxError:` 或 `Module build failed: Unknown word` 的错误，首先你要确定你的 `common` 配置中是否引入了一个 `css-loader` 对css文件进行相应的转换，使它能够被webpack处理，如果是 `*sass` 这样的css扩展类型文件，亦需要引入相应的loader对它进行处理。

## 用 `env` 判断是否使用 MECP 插件

参考代码如下：

```Javascript

*webpack.parts.js*
...
  process.env === "production" ?MiniCssExtractPlugin.loader: "style-loader",
...
```

*webpack.config.js*

```
const commonConfig = merge([
  ...
  parts.extractCSS({
    use: "css-loader",
  }),
]);

const productionConfig = merge([
  // parts.extractCSS({
  //   use: "css-loader",
  // }),
]);

const developmentConfig = merge([
  ...
  // parts.loadCSS(),
]);
```

如果 `env` 代表的值为 "production" 则使用 MECP 插件所自带的loader，反之测试用 `style-loader`。

## 在JavaScript之外管理css

尽管官方推荐的是在JavaScript内引入样式，然后再构建它们。但是你也可以通过 `entry` 入口引入它们，作为一个[全局](https://www.npmjs.com/package/glob)的CSS文件，使用方法如下：

```javascript
...
const glob = require("glob");

...

const commonConfig = merge([
  {
    entry: {
      ...
      style: glob.sync("./src/**/*.css"),
    },
    ...
  },
  ...
]);
```
这样你就不用在你的应用代码中引入样式文件了。这也就意味着你放弃了使用css模块化编程的思想。这样做的后果就是你要注意因为样式文件的顺序而引起的样式问题。

这样运行 `npm run build` 命令后，你会看到生成目录中有 *style.css* 和 *style.js* 这样两个文件。后一个文件中包含 `webpackJsonp([1,3],[function(n,c){}]);` 这样的内容，它不做任何操作，在 [webpack issue 1967](https://github.com/webpack/webpack/issues/1967) 有详细讨论。

你可以创建一个css文件，然后用 `@import` 按照所需的顺序，引入所有的css文件；你也可以创建一个js文件用 `import` 按照所需的顺序，引入所有的css文件，来实现相同的效果。

> [css-entry-webpack-plugin](https://www.npmjs.com/package/css-entry-webpack-plugin) 插件就是被设计用来实现这种操作的，它也可以实现与 MCEP 插件相同的css分离功能。

## 总结

当前的设置巧妙地将样式与JavaScript分离。虽然这种技术在CSS中最有价值，但它也可以用于提取HTML模板或你使用的任何其他文件类型。`MiniCssExtractPlugin` 的难点在于它的设置，但是它的复杂性被隐藏在抽象之后。

内容回顾：

* 用 `MiniCssExtractPlugin` 插件解决了FOUC问题。分离css到独立的文件中可以实现css的缓存使用，也可以减少以攻击向量。
* 如果你不喜欢在JavaScript引入样式，你可以通过 `entry` 来引入项目所需的样式，但要注意引入的顺序。

在下一章中，将详细介绍如果清除项目中未用到的样式。
