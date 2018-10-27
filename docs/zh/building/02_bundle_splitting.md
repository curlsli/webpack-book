# 构建拆分

目前，应用程序的生产版本是单个JavaScript文件。 如果应用程序已更改，则客户端也必须下载[供应商（vendor）](https://en.wikipedia.org/wiki/Vendor)依赖内容。

最好只下载更改的部分。如果供应商依赖项发生更改，则客户端应仅获取供应商依赖项。实际的应用程序代码也是如此。**构建拆分**可以使用`optimization.splitChunks.cacheGroups`来实现。在生产模式下运行时，[webpack4可以开箱即可执行一系列拆分]（https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693）但在这种情况下，我们会手动执行某些操作。

> 要要使bundle无效，必须将哈希附加到生成的bundle中，如：*向文件名中注入hash*章节中所述。只有这样客户端才能识别请求内容是否改变，进而决定是否下载新的内容。

## 构建拆分的原理

利用构建拆分，你可以将供应商依赖项推送到独立的构建包中，并从客户端级缓存中受益。该过程可以让应用程序在保持整个大小不变的情况下完成。虽然增加了请求的次数，产生了轻微的开销，但是客户端的缓存的弥补了这个成本。

举个例子。你可以得到 *main.js*（10 kB）和 *vendor.js*（90 kB），而不是 *main.js*（100 kB）。现在，对于已经使用过该应用程序的客户端，对应用程序所做的更改，维护更为廉价。

使用这种方式，就会面因临缓存而产生的问题。其中之一是缓存失效。解决方法会在 [*在文件名中添加hash*](https://lvzhenbang.github.io/webpack-book/dist/zh/optimizing/04_adding_hashes_to_filenames.html) 章节中讨论。

构建拆分不是唯一的出路。[*代码分割*](https://lvzhenbang.github.io/webpack-book/dist/zh/building/03_code_splitting.html) 章节讨论了另一种更细粒度的方法。

## 为了实现分离，引入其它依赖

鉴于暂时没有什么东西可以拆分供应商（vendor）包，你应该在源文件中引入一些东西。

在项目中添加React依赖：

```bash
npm install react react-dom --save
```

在项目引用它：

**src/index.js**

```
import "react";
import "react-dom";
...
```

执行 `npm run build` 脚本命令，然后会输出下面展示的内容：

```bash
Hash: 80f9bb6fc04c54949644
Version: webpack 4.1.1
Time: 3276ms
Built at: 3/16/2018 4:59:25 PM
       Asset       Size  Chunks             Chunk Names
     main.js   97.5 KiB       0  [emitted]  main
    main.css   3.49 KiB       0  [emitted]  main
 main.js.map    240 KiB       0  [emitted]  main
main.css.map   85 bytes       0  [emitted]  main
  index.html  220 bytes          [emitted]
Entrypoint main = main.js main.css main.js.map main.css.map
...
```

正如你所看到的那样， *main.js* 非常大。这就是接下来要解决的问题。

## 配置 `vendor` 输出

在webpack4.x之前，我们使用 `CommonsChunkPlugin` 来实现构建拆分。现在该插件已被自动化和配置所取代。要从*node_modules* 目录中提取供应商包，可按如下方式调整代码：

**webpack.config.js**

```javascript
const productionConfig = merge([
  ...
  {
    optimization: {
      splitChunks: {
        chunks: "initial",
      },
    },
  },
]);
```

运行 `npm run build` 脚本命令，你将看到如下的输出内容：

```bash
Hash: 6c499f10237fdbb07378
Version: webpack 4.1.1
Time: 3172ms
Built at: 3/16/2018 5:00:03 PM
               Asset       Size  Chunks             Chunk Names
     vendors~main.js   96.8 KiB       0  [emitted]  vendors~main
             main.js   1.35 KiB       1  [emitted]  main
            main.css   1.27 KiB       1  [emitted]  main
    vendors~main.css   2.27 KiB       0  [emitted]  vendors~main
 vendors~main.js.map    235 KiB       0  [emitted]  vendors~main
vendors~main.css.map   93 bytes       0  [emitted]  vendors~main
         main.js.map   7.11 KiB       1  [emitted]  main
        main.css.map   85 bytes       1  [emitted]  main
          index.html  329 bytes          [emitted]
Entrypoint main = vendors~main.js vendors~main.css ...
...
```

现在构建生成看起来应该像下图说明的那样。

![应用配置后的主包和供应商包](../../images/bundle_02.png)

## 构建拆分的操作

你可以针对 *node_modules* 做明确的匹配，来重写上面的配置，如下所示：

**webpack.config.js**

```javascript
const productionConfig = merge([
  ...
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },
  },
]);
```

如果你不希望依赖自动化，则使用这种配置可以更好地控制拆分过程。

## 拆分和合并模块（Chunks）

Webpack通过两个插件实现对生成的块的更多控制：`AggressiveSplittingPlugin` 和`AggressiveMergingPlugin`。

前者允许你分离出更多和更小的包。由于HTTP/2新标准的工作方式，让这种方式很容易实现。

以下是 `Aggressive` 分离的基本思路：

```javascript
{
  plugins: [
    new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 10000,
        maxSize: 30000,
    }),
  ],
},
```

如果你分成多个小构建包，那么缓存会失效，这是需要做一个权衡。此外，你还会在HTTP/1环境中增加请求开销。目前，由于插件中的一个[错误](https://github.com/ampedandwired/html-webpack-plugin/issues/446)，启用`HtmlWebpackPlugin` 该插件不起作用。

而 `AggressiveMergingPlugin` 插件以相反的方式工作，并允许你将小包组合成更大的：

```javascript
{
  plugins: [
    new AggressiveMergingPlugin({
        minSizeReduce: 2,
        moveToParents: true,
    }),
  ],
},
```

如果使用webpack **记录**，则可以使用这个插件获得良好的缓存行为。这个想法在*添加哈希到文件名*章节中详细介绍。

`webpack.optimize` 还包含 `LimitChunkCountPlugin` 和 `MinChunkSizePlugin`，它们可以进一步控制构建包大小。

> Tobias Koppers 在他的官方博客中，详细的介绍了 [aggressive merging](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6)。

## webpack中的模块（Chunk）类型

在上面的示例中，你使用了不同类型的webpack块。Webpack处理三种类型的块：

* **Entry chunks** - 它包含webpack运行时和它随后加载的模块。
* **Normal chunks** - 它不包含webpack运行时的模块。相反，是这些可以在应用程序运行时动态加载的模块。一个包装器（例如JSONP）生成这些模块。在下一章代码分割这个主题中，你将生成一个 `Normal chunks`。
* **Initial chunks** - 它是 `Normal chunks` ，但它用来计算进入应用程序的初始加载时间。作为使用者，你不用关心这些。这是 `Initial chunks` 和 `Normal chunks` 之间的区别，这一点很重要。

## 总结

与之前相比，现在情况好转。要知道小 `main` 包与 `vendor` 包相比如何？如何从此拆分中受益？你需要在设置缓存，下一部分的 [*在文件名中添加hash*](https://lvzhenbang.github.io/webpack-book/dist/zh/optimizing/04_adding_hashes_to_filenames.html) 一章将详细介绍。

内容回顾：

* Webpack allows you to split bundles from configuration entries through the `optimization.splitChunks.cacheGroups` field. It performs 构建拆分 by default in production mode as well.
* A vendor bundle contains the third party code of your project. The vendor dependencies can be detected by inspecting where the modules are imported.
* Webpack offers more control over chunking through specific plugins, such as `AggressiveSplittingPlugin` and `AggressiveMergingPlugin`. Mainly the splitting plugin can be handy in HTTP/2 oriented setups.
* Internally webpack relies on three chunk types: entry, normal, and initial chunks.

在下一章中，你将学习到代码分割和按需加载代码。
