# 分离的 manifest

当webpack写入bundle时，它也会维护 `manifest`。你可以在此项目中找到生成的 `vendor` 包。webpack应加载的 `manifest` 中的文件。可以更快地提取并开始加载文件，而不必等待加载 `vendor ` 包。

如何webpack生成的hash改变，`mnifest` 也将改变。因此，`vendor` 包的内容也将改变，并变得无效。可以通过将其提取到自己的文件中，或通过将其内联写入项目的 `index.html` 来解决该问题。

## 提取Manifest

当 `extractBundles` 选项被添加，webpack就做了许多的工作，这些工作在 [`构建拆分`](https://lvzhenbang.github.io/webpack-book/zh/building/02_bundle_splitting.html) 这章做了详细的介绍。为了提取mnifest，可以像下面这样配置 `optimization.runtimeChunk` ：

**webpack.config.js**

```javascript
const productionConfig = merge([
  ...
  {
    optimization: {
      splitChunks: {
        ...
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  ...
]);
```

模块的名字通常用 `manifest` 。当然，你也可以自定义名字。

运行 `npm run build` 脚本命令，你将看到下面的输出：

```bash
Hash: 2e1c61341de0fd7e0e5c
Version: webpack 4.1.1
Time: 3347ms
Built at: 3/16/2018 6:24:51 PM
                   Asset       Size  Chunks             Chunk Names
       manifest.d41d.css    0 bytes       1  [emitted]  manifest
               0.73a8.js  160 bytes       0  [emitted]
    vendors~main.3af5.js   96.8 KiB       2  [emitted]  vendors~main
            main.8da2.js  546 bytes       3  [emitted]  main
           main.5524.css    1.2 KiB       3  [emitted]  main
   vendors~main.3dd5.css   1.32 KiB       2  [emitted]  vendors~main
        manifest.8cac.js   1.81 KiB       1  [emitted]  manifest
           0.73a8.js.map  203 bytes       0  [emitted]
    manifest.8cac.js.map     10 KiB       1  [emitted]  manifest
vendors~main.3af5.js.map    235 KiB       2  [emitted]  vendors~main
        main.8da2.js.map   1.45 KiB       3  [emitted]  main
              index.html  460 bytes          [emitted]
...
```

这样的改变，给你了一个分离的 `manifest` 文件，模块的名字是 `manifest` 。因为使用了 `HtmlWebpackPlugin` ，没有必要担心加载 `manifest` ，插件会添加 `manifest` 的引用到 `index.html` 。

如：[inline-manifest-webpack-plugin](https://www.npmjs.com/package/inline-manifest-webpack-plugin) 和 [html-webpack-inline-chunk-plugin](https://www.npmjs.com/package/html-webpack-inline-chunk-plugin) 。 [assets-webpack-plugin](https://www.npmjs.com/package/assets-webpack-plugin) 和 `HtmlWebpackPlugin` 一起使用，允许你将 `manifest` 写入 `index.html` ，来减少一次请求。

尝试改变 `src/index.js` ，然后看看hash如何改变。`vendor` 包将变得无效，`manifest` 和 `app` 包的名字将随之改变。

> 要更好地了解 `manifest` 内容，请在开发模式下运行构建，或通过配置将 `none` 传递给模式。你应该看到相似的东西。


> 为了使用asset管道，你可以使用 [chunk-manifest-webpack-plugin](https://www.npmjs.com/package/chunk-manifest-webpack-plugin)， [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)， [webpack-assets-manifest](https://www.npmjs.com/package/webpack-assets-manifest)，或 [webpack-rails-manifest-plugin](https://www.npmjs.com/package/webpack-rails-manifest-plugin) 插件。这些解决方案使用JSON形式的将原始静态资源路径映射到新静态资源路径。

> 通过CDN加载流行的依赖项（如React）可以进一步改进构建。这将进一步减少 `vendor` 包的大小，同时增加对项目的外部依赖性。 它的想法是如果用户较早的触发CDN，缓存可以像这里一样启动。

## 使用Records

正如构建查分章节中介绍的那样， `AggressiveSplittingPlugin` 插件可以使用 `records` 实现缓存。这些方法仍然有效，但 `record` 更进了一步。

 `record` 记录构建分离生成的模块ID。问题是你需要保存此文件。如果你在本地构建，则可以选择将其包含在版本控制中。

像下面这样调整配置，会生成一个 `records.json` 文件：
**webpack.config.js**

```javascript
const productionConfig = merge([
  {
    ...
    recordsPath: path.join(__dirname, "records.json"),
  },
  ...
]);
```

运行`npm run build` 脚本命令，你将在项目的根目录下看到一个 `records.json` 文件。如果下一次构建中有模块的改变，webpack将重写 `records.json` 文件。

如果你遇到拆分问题，并希望确保拆分部分获得正确的缓存行为，那么 `record` 会特别有用。最大的问题是维护 `record` 文件。

> `recordsInputPath` 和 `recordsOutputPath` 对输入和输出进行更精细的控制，但通常只设置 `recordsPath` 就足够了。

> 如果更改Web模块处理模块ID的方式（即删除`HashedModuleIdsPlugin`），仍需考虑可能的`record`！如果要使用新模块ID方案，那么必须删除 `record.json` 文件。

## 总结

The project has basic caching behavior now. If you try to modify `index.js` or `component.js`, the vendor bundle should remain the same.

内容回顾：

* Webpack 通过维护 `manifest` ，来控制应用程序加载所需要的信息。
* 如果 `manifest` , 那么它所包含的包将失效。
* 有些插件允许你将 `mainfest` 注入到 `index.html` 中。也可以提取模块信息到一个JSON文件中。JSON文件这种方式在SSR中很方便。
* `Records` 记录构建生成的模块ID。缺点是，你必须跟踪 `record.json` 文件。

在下一章中，你将学习如何分析构建，因为它对于理解和改进构建至关重要。
