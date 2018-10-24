# 加载 Images

HTTP/1应用程序因为加载大量的小静态资源而变得运行缓慢，这是因为每个请求都会带来开销。
HTTP/2在针对上面的情况做出了改进，并在一定程度上改变了这种情况。你曾经也会为使用那一种解决方案而感到困扰，下面Webpack允许其中的一些。

Webpack 可以使用 url-loader 实现静态资源的内联。它将你的图片资源以base64格式的字符串形式打包到js中。虽然这种处理方式可以减小请求的次数，但是它增加了打包生成文件的大小。url-loader在开发模式下足够用了，但是在生产模式下你需要考虑是用其它的loader。
Webpack提供了对内联过程的控制，并可以延迟加载到file-loader。file-loader输出图像文件并返回路径，而不是内联。这种技术适用于其他资产类型，如：字体。你将在后面的章节中看到。

## 配置 *url-loader*


从开发模式来说，url-loader是一个完美的选择，因为你不必关心结果包的大小。它有一个限制选项，可用于当图片超过限制后将图像生成交给file-loader。通过这种方式，你可以将小文件内联到JavaScript包中，而为较大的文件生成单独的文件。

如果使用limit选项，则需要将url-loader和file-loader安装到项目中。假如你已经正确配置了它们，webpack将解析你的样式中所包含的任何url()语法，也可以你通过JavaScript代码引用的图像资源。

如果使用了limit选项，url-loader会将这个选项传递给file-loader，从而可以进一步配置它的行为。

如果 .jpg 和 .png 类型的文件小于25kB需要内联， 你可以添加这样的配置loader：

```javascript
{
  test: /\.(jpg|png)$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 25000,
    },
  },
},
```

> 如果在达到限制时，而你喜欢使用非file-loader的loader，你可以设置调用该loader,然后webpack会执行它，而不是一定要用file-loader。

## 配置 *file-loader*

如果你想直接跳过内联这个步骤，你可以直接使用file-loader。它支持自定义文件名和路径。默认情况下，file-loader返回原始的文件扩展名和文件内容的MD5哈希值，具体使用可参考下面的配置：

```javascript
{
  test: /\.(jpg|png)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[path][name].[hash].[ext]",
    },
  },
},
```

> 如果你想要将图片输出到指定的目录中，可以修改 `options.name` 为 `name: "./images/[hash].[ext]"` 。

> 注意 `file-loader` 和 `url-loader` 不能是并列的关系，要么只是用两者中其中一个，要么是嵌套关系。如果 *url-loader* 的 `limit` 的不能满足使用，可以选择使用 `include` 字段。

## 将 Images 集成到项目中

可以将上面想法的封装成一个函数，添加的配置文件中。

首先添加 `file-loader` 和 `url-loader` 依赖：

```bash
npm install file-loader url-loader --save-dev
```

在 **webpack.parts.js** 中，添加一个如下面所示的配置函数：

```javascript
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});
```

在 **webpack.config.js** 中，引入上面的配置函数。在开发模式下，只使用 *url-loader* ，而在生产模式下，引入 *url-loader* 和 *file-loader* 。当添加了 `limit` 选项， *url-loader* 会隐式的使用 *file-loader*，所以为了是配置起作用，你需要同时安装这两个loader。

```javascript
const productionConfig = merge([
  ...
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  ...
  parts.loadImages(),
]);
```

为了测试配置的工作情况，下载或生成一个图片(`convert -size 100x100 gradient:blue logo.png`)，然后再项目中引用它。

**src/main.css**

```css
body {
  background: cornsilk;
  background-image: url("./logo.png");
  background-repeat: no-repeat;
  background-position: center;
}
```

具体的操作方式取决于 `limit` 的配置。如果在配置值之下，则内联这张图片，否则就生成一张图片和图片存在的路径。这个查找工作取决于 *css-loader*。你也可以在js代码中引入一张图片，然后看看发生了什么。

## 加载 SVGs

Webpack 可以使用[两种方法](https://github.com/webpack/webpack/issues/595) 加载 SVGs。然而最简单的方法是用 *file-loader* ，配置如下：

```javascript
{
  test: /\.svg$/,
  use: "file-loader",
},
```

如果上面的配置是正确的，你可以在css代码中引入svg，像下面这样：

```css
.icon {
   background-image: url("../assets/icon.svg");
}
```

也可以考虑使用下面的loader：

* [raw-loader](https://www.npmjs.com/package/raw-loader) 可以访问 SVG 内容。
* [svg-inline-loader](https://www.npmjs.com/package/svg-inline-loader) 可以更进一步的实现清除SVG内的不必要的标记。
* [svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader) 可以将多张svg合成为一张雪碧图。它也支持 *.jpg* 和 *.png* 格式图片的处理。
* [svg-url-loader](https://www.npmjs.com/package/svg-url-loader) 把 SVGs 用UTF-8格式编码为data-URI，这样静态资源更小，且比base64架加载更快。
* [react-svg-loader](https://www.npmjs.com/package/react-svg-loader) 可以在React中以 `<Image width={50} height={50}/>` 格式的代码引入svg，然后渲染它。

> 你可以仍然使用 *url-loader* ，但要注意 SVGs 的处理。

## 优化 Images

你可以使用 [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)，[svgo-loader](https://www.npmjs.com/package/svgo-loader) (SVG specific)，或 [imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin) 来压缩图片。这种类型的 loader 被首先用来改变数据，所以你应该把它放在 `use` 列表的最后位置。

它在生产中很有意义，因为它可以减小请求静态资源的带宽，因此可以起到加速你的站点或应用程序的启动。

## 启用 `srcset`

[resize-image-loader](https://www.npmjs.com/package/resize-image-loader) 和 [responsive-loader](https://www.npmjs.com/package/responsive-loader) 允许你生成 `srcset` 兼容现代浏览器的图片集合。`srcset` 为浏览器提供了更多的控制，可以控制加载什么图像，以及在什么情况下可以获得更高的性能

## 动态加载 Images

Webpack 允许在某个条件下动态的加载图片。这个技术包括 *Code Splitting* 和 *[Dynamic Loading](https://lvzhenbang.github.io/webpack-book/dist/zh/techniques/01_dynamic_loading.html)* 。这样做可以节省带宽，图片可以等到需要的时候在加载，或者在你有时间的时候预先加载它们。

## 加载雪碧图（Sprites）

**Spriting** 允许你将多张小图片合成一张大图。它过去常被用在游戏的动画上，在web开发上也可以用来减少请求的次数。

[webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith) 可以转换图片成一张雪碧图，伴随生成一个 Sass/Less/Stylus 样式文件。你可以添加 `SpritesmithPlugin` 配置，然后指定目标图片组，你也可以指定生成的mixin名称，然后你可以像下面这样引用样式：

```scss
@import "~sprite.sass";

.close-button {
  sprite($close);
}

.open-button {
  sprite($open);
}
```

## 使用占位符

[image-trace-loader](https://www.npmjs.com/package/image-trace-loader) 可以加载图片，然后暴露`image/svg+xml` 这样的URL编码数据。它可以跟 *file-loader* 和 *url-loader* 一起使用，当真正的图片加载前，使用这一个占位符。

[lqip-loader](https://www.npmjs.com/package/lqip-loader) 实现了相似的功能。它实现的是一个模糊效果的图片，而不是一个占位图片。

## Getting Image Dimensions

有的时候只得到一张图片的引用是不够的。 [image-size-loader](https://www.npmjs.com/package/image-size-loader) 不仅返回图片的引用，还返回图片的 dimensions、type、size信息。

## Images 的引用

如果 Webpack 配置使用了 *css-loader* ，那么它可以在样式中通过 `@import` 和 `url()` 来获取图片。你也可以在你的js代码中引入图片，这时你需要像下面例子中那样引入并使用图片：

```javascript
import src from "./avatar.png";

// Use the image in your code somehow now
const Profile = () => <img src={src} />;
```

如果你在使用React，并且项目中引入了 [babel-plugin-transform-react-jsx-img-import](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-img-import) 插件，`require` 会自动生成，在这样的情况下，你可以像下面这样引入图片：

```javascript
const Profile = () => <img src="avatar.png" />;
```

你也可以配置动态引入图片，在 *[Code Splitting](https://lvzhenbang.github.io/webpack-book/dist/zh/building/03_code_splitting.html)* 这章将详细介绍。下面是个小例子：

```javascript
const src = require(`./avatars/${avatar}`);`.
```

## Images and *css-loader* Source Map Gotcha

如果你正在使用图片且在 *css-loader* 中开启了 `sourceMap` 功能，这时你需要设置 `output.publicPath` 为一个指明开发服务器的绝对值。否则，图片将没有效果，可查看 [webpack issue](https://github.com/webpack/style-loader/issues/55) 去进一步了解问题。

## 总结

Webpack 可以根据打包的需要来实现图片的内联。根据实际的需求设置内联的限制条件。你需要在构建包的大小和请求次数之间做权衡。

内容回顾：

* *url-loader* 将静态资源内敛到JavaScript。它由一个 `limit` 选项可以实现将静态资源延迟传递给 *file-loader* 。
* *file-loader* 输出图片静态资源，并返回给js代码一个路径信息。它允许内静态资源的名字中注入hash（文件内容的MD5 hash，所以每个图片都有一个唯一的hash）。
* 你可以使用与图片优化相关的 loaders 和 plugins 来进一步调整图片的大小。
* 将一些小图片生成一个 **sprite sheets** 来减少请求次数。
* Webpack 允许你在某一条件下，动态的加载图片。
* 如果你要使用source-maps，你需要设置 `output.publicPath` 为一个绝对值，这样图片才能正常展示。

在下一章中，你将学习使用webpack加载字体。
