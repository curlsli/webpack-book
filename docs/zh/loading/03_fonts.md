# 加载字体

虽然加载字体和图片类似，但是也有一些特殊的问题你需要解决。了解要支持什么类型的字体? 如果你要保证所有的浏览器支持，则需要考虑四种字体。

现在通用的解决方案：主流的浏览器和平台使用自定义的字体，而哪些次要的浏览器和平台使用系统字体。

webpack有几种不同的方法来实现这个解决方案。在这里，webpack可以像处理图片那样，依然用 *url-loader* 和 *file-loader* 。然而字体的 `test` 匹配模式变得更为复杂，因此你需要字体考虑字体文件的匹配查找。

> [canifont](https://www.npmjs.com/package/canifont) 可以帮助你找出你应该支持的字体格式（国内：[iconfont](http://www.iconfont.cn/)）。 **.browserslistrc** 定义了一个浏览器支持列表，webpack通过它来加载所需的字体。

## 支持一种字体类型

如果你不支持Opera Mini的话，其余的浏览器都支持 *.woff* 字体格式，它的新版本 *.woff2* 被现代浏览器广泛支持。

就 `.woff` 来讲，你可以是使用 *file-loader* 和 *url-loader* 像下面这样配置，它和图片的相似：

```javascript
{
  test: /\.woff$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 50000,
    },
  },
},
```
“是不是很简单！”。而一个更复杂包括*.woff2*在内的其他格式字体的配置如下：

```javascript
{
  // Match woff2 in addition to patterns like .woff?v=1.1.1.
  test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: "url-loader",
    options: {
      // Limit at 50k. Above that it emits separate files
      limit: 50000,

      // url-loader sets mimetype if it's passed.
      // Without this it derives it from the file extension
      mimetype: "application/font-woff",

      // Output below fonts directory
      name: "./fonts/[name].[ext]",
    }
  },
},
```

## 支持多种字体类型

为了使你的站点效果更好，你可以使用 *file-loader* 支持多种字体。但 `file-loader` 不能实现字体的内联，这增加了额外的请求，但或许这正式你需要的。你可以像下面这样配置loader：

```javascript
{
  test: /\.(ttf|eot|woff|woff2)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "fonts/[name].[ext]",
    },
  },
},
```

编写CSS定义的方式很重要。为了确保你从新的css格式中获益，它们应该首先出现在定义中。可以参考下面的编写形式：

```css
@font-face {
  font-family: "myfontfamily";
  src: url("./fonts/myfontfile.woff2") format("woff2"),
    url("./fonts/myfontfile.woff") format("woff"),
    url("./fonts/myfontfile.eot") format("embedded-opentype"),
    url("./fonts/myfontfile.ttf") format("truetype");
    /* Add other formats as you see fit */
}
```

> MDN中有 [ font-family](https://developer.mozilla.org/en/docs/Web/CSS/@font-face) 的详细介绍。

## 配置 *file-loader* 的输出和 `publicPath` 

结合上面所述，然后结合 [webpack issue tracker](https://github.com/webpack/file-loader/issues/32#issuecomment-250622904) 的讨论，你可以使用 *url-loader* 的 `publicpath` 选项调整 *file-loader* 输出的路径（`url-loader` 可以自动调用`file-loader`，所以你就不用配置 `file-loader`）。这样就可以将字体输出到 `fonts/` 子目录，图片到 `images/` 子目录，以及其他你希望的。

字体输出的配置修改如下：

```javascript
{
  // Match woff2 and patterns like .woff?v=1.1.1.
  test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 50000,
      // url-loader 允许你设置 mimetype，
      // 如果没有这个配置项url-loader将便利文件的所有扩展类型
      mimetype: "application/font-woff",
      name: "./fonts/[name].[ext]", // Output below ./fonts
      publicPath: "../", // Take the directory into account
    },
  },
},
```

如果要支持多字体，你可以不指定 `url-loader` 的 `mimetype` 字段的值，你可以像下面这样修改配置：

```javascript
{
  test: /\.(ttf|eot|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 50000,
      mimetype: "application/font-woff",
      name: "./fonts/[name].[ext]", 
      publicPath: "../",
    },
  },
},
```

## 生成svg字体文件

如果你喜欢svg字体，你可以使用 [webfonts-loader](https://www.npmjs.com/package/webfonts-loader) 将它们打包为svg字体文件。

> 如果配置中已经添加了对svg图片的处理，你需要小心配置svg字体。*[Loader 定义](https://lvzhenbang.github.io/webpack-book/dist/zh/loading/01_loader_definitions.html)* 这章提供了可选择的方案。

## 使用 Google 字体

[google-fonts-webpack-plugin](https://www.npmjs.com/package/google-fonts-webpack-plugin) 可以下载Google到webpack构建目录中来使用，也可以通过CDN使用它们。

## 使用字体图标

[iconfont-webpack-plugin](https://www.npmjs.com/package/iconfont-webpack-plugin) 被用来加载图标所使用的字体。它在css文件中内联 SVG 。

## 结论

加载字体同加载其他静态资源类似。你需要考虑你支持什么浏览器，然后制定加载策略。

内容回顾：

* 加载字体使用的技术和加载图片的相似。你依然可以采用较小的字体内联，较大的字体单独输出。
* 如果只对现代的浏览器做支持，你使用一两种字体就可以，而老版本的浏览器则让他们使用系统字体。

在下一章中，将讲解如何使用Babel和webpack加载JavaScript。虽然webpack默认加载JavaScript，但是这个模块还要将其他一些必要内容，如：你需要考虑浏览器的支持等。
