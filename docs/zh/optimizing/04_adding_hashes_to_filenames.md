# 在文件名中添加hash

虽然构建可以工作，但是它生成的文件名也是有问题的。它不允许有效利用客户端级别的缓存，因为无法判断文件是否已更改。可以通过在文件名中包含哈希来实现缓存失效。

## 占位符

Webpack为此提供`占位符`。这些字符串用于将特定信息附加到webpack输出。可选的值如下：

* `[id]` - 返回模块id。
* `[path]` - 返回文件路径。
* `[name]` - 返回文件名。
* `[ext]` - 返回扩展名。 `[ext]` 是非常有用的字段。 `MiniCssExtractPlugin` 也使用这个字段。
* `[hash]` - 返回构建生成的hash。如果构建的任何部分发生变化，这也会发生变化。
* `[chunkhash]` - 返回入口指定模块的hash。每个 `entry` 在配置中定义的接收自己的哈希。 如果`entry`的任何部分发生变化，则哈希值也会变化。根据定义，`[chunkhash]`比`[hash]`更精细。
* `[contenthash]` - 返回基于内容生成的哈希。

`hash` 和 `chunkhash` 通常仅用于生产目的，因为hash在开发过程中没有太大作用。

> 可以使用特定语法对 `hash` 和 `chunkhash` 进行切片：`[chunkhash：4]`。而不是像`8c4cbfdb91ff93f3f3c5` 这样的切片生成 `8c4c`。

> 有更多可用选项，你甚至可以修改hash和摘要类型，如[loader-utils](https://www.npmjs.com/package/loader-utils#interpolatename)文档中所述。

### 占位符demo

你可以像下面这样修改配置代码：

```javascript
{
  output: {
    path: PATHS.build,
    filename: "[name].[chunkhash].js",
  },
},
```

webpack将生成如下的文件名：

```bash
main.d587bbd6e38337f5accd.js
vendor.dc746a5db4ed650296e1.js
```

如果与模块相关的文件内容不同，则hash也会改变，因此缓存变得无效。更准确地说，浏览器发送新文件的新请求。如果只更新 `main` 包，则只需要再次请求该文件。

通过生成静态文件名和查询字符串（例如：`main.js?d587bbd6e38337f5accd`）使缓存无效，可以实现相同的结果。问号背后的部分使缓存无效。根据[Steve Souders](http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/)，将哈希值附加到文件名是最高性能的选项。

## 配置 Hashing

构建需要调整以生成合适的哈希。图片和字体应该接收 `hash`，而块应该在模块名中使用 `chunkhash` 来正确地使它们无效：

**webpack.config.js**

```javascript
const productionConfig = merge([
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  ...
  parts.loadImages({
    options: {
      limit: 15000,
      // name: "[name].[ext]",
      name: "[name].[hash:4].[ext]",
    },
  }),
  ...
]);
```

> 通过 `file-loader` 定义 `[hash]` 与webpack的其它部分不同。它是根据文件内容计算的。 详细信息可参考 [file-loader](https://www.npmjs.com/package/file-loader#placeholders) 文档。

如果你对提取的CSS也使用 `chunkhash` 这会导致问题，因为代码通过JavaScript将CSS指向同一个`entry`。这意味着如果应用程序代码或CSS发生了变化，它将使两者无效。

因此，你可以使用基于提取的内容而生成的 `contenthash` 而不是 `chunkhash`：

**webpack.parts.js**

```javascript
exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    // filename: "[name].css",
    filename: "[name].[contenthash:4].css",
  });

  ...
};
```

> hash的切片使得输出更适合。在实践中，你可以跳过切片。

运行 `npm run build` 脚本命令，你将看到下面的输出内容：

```bash
Hash: fb67c5fd35454da1d6ff
Version: webpack 4.1.1
Time: 3034ms
Built at: 3/16/2018 6:18:07 PM
                   Asset       Size  Chunks             Chunk Names
               0.0847.js  161 bytes       0  [emitted]
    vendors~main.d2f1.js   96.8 KiB       1  [emitted]  vendors~main
            main.745c.js   2.25 KiB       2  [emitted]  main
           main.5524.css    1.2 KiB       2  [emitted]  main
   vendors~main.3dd5.css   1.32 KiB       1  [emitted]  vendors~main
           0.0847.js.map  203 bytes       0  [emitted]
vendors~main.d2f1.js.map    235 KiB       1  [emitted]  vendors~main
        main.745c.js.map   11.4 KiB       2  [emitted]  main
              index.html  349 bytes          [emitted]
Entrypoint main = vendors~main.d2f1.js ...
...
```

文件现在有统一的哈希。为了使它适用于样式，你可以尝试改变 `src/main.css` 并查看重新构建时哈希会发生什么变化。

但是有一个问题，如果更改应用程序代码，它也会使 `vendor` 文件无效！解决这个问题需要提取 `manifest`，但在此之前，你可以改进生产构建处理模块ID的方式。

## 总结

将与文件内容相关的哈希包括在其文件名中，这允许在客户端使它们无效。如果哈希值已更改，则会强制客户端再次下载该静态资源。

内容回顾：

* Webpack 的 `占位符` 允许你定义文件名，并在它们中注入hash。
* 最常用的占位符是 `[name]`、`[chunkhash]` 和 `[ext]`。基于静态资源所属的 `entry` 生成块hash。
* 如果你正在使用 `MiniCssExtractPlugin`，你应该使用 `[contenthash]` 。这样只有在内容发生更改时，生成的静态文件才会失效。

即使现在项目产生hash，输出也不完美。问题是如果应用程序发生更改，它也会使 `vendor` 包无效。下一章[分离的manifest](https://lvzhenbang.github.io/webpack-book/zh/optimizing/05_separating_manifest.html)将深入探讨该主题，并向你展示如何提取 `manifest` 以解决问题。
