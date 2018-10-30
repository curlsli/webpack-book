# 构建多页面应用

即使webpack经常用于打包单页面应用程序，也可以用它处理多个独立的页面。这个想法类似于 *构建目标* 这章中所讲的，你可以生成多个输出文件。但是这一次，你必须生成多个独立的页面。而这可以通过 `HtmlWebpackPlugin` 和一些配置来实现。

## 可能的方法

使用webpack生成多个页面时，你有以下几种选择：

* 完成*multi-compiler*并返回一组配置。 只要页面是分开的，并且跨越它们共享代码的最小需求，该方法就可以工作。这种方法的好处是你可以通过[parallel-webpack] (https://www.npmjs.com/package/parallel-webpack)处理它，以提高构建性能。
* 设置单个配置并提取共性。你执行此操作的方式可能会有所不同，具体取决于你的方式。
* 如果你遵循[渐进式 Web 应用程序] (https://developers.google.com/web/progressive-web-apps/)（PWA）的想法，你最终可能会得到 **app shell** 或者 **page shell** 并在使用时加载应用程序的部分。

在实践中，你可以从更多的维度着手。例如，你必须为页面提供 i18n 支持。这些想法在基本方法之上发展。

## 生成多页面

要生成多个独立的页面，应以某种方式初始化它们。你还应该能够返回每个页面的配置，因此webpack会选择它们并通过 `multi-compiler` 模式处理它们。

### 页面摘要

要初始化页面，它至少应该接收页面标题、输出路径和可选的模板。每个页面都应该接收可选的输出路径和用于自定义的模板。这个想法的建模可参考下面的配置：

**webpack.parts.js**

```javascript
...
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.page = ({
  path = "",
  template = require.resolve(
    "html-webpack-plugin/default_index.ejs"
  ),
  title,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + "/"}index.html`,
      template,
      title,
    }),
  ],
});
```

### 集成到配置

要将这个想法融入到配置中，它的组合方式必须改变。此外，还需要定义页面。

首先，让我们暂时为每个页面重用相同的JavaScript逻辑：

**webpack.config.js**

```javascript
...
// const HtmlWebpackPlugin = require("html-webpack-plugin");
...


const commonConfig = merge([
  // {
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       title: "Webpack demo",
  //     }),
  //   ],
  // },
  ...
]);

...

module.exports = mode => {
  // if (mode === "production") {
  //   return merge(commonConfig, productionConfig, { mode });
  // }

  // return merge(commonConfig, developmentConfig, { mode });
  const pages = [
    parts.page({ title: "Webpack demo" }),
    parts.page({ title: "Another demo", path: "another" }),
  ];
  const config =
    mode === "production" ? productionConfig : developmentConfig;

  return pages.map(page =>
    merge(commonConfig, config, page, { mode })
  );
};
```

在这个改变之后，在应用程序中应该有两个页面：`/`和`/ another`。应该可以在看到相同输出，并导航它们。

### 向每个页面注入不同的脚本

问题是，如何为每个页面注入不同的脚本。在当前配置中，两者共享相同的`entry`。要解决此问题，你应该将 `entry` 配置移到较低的级别并按页面进行管理。要使用脚本进行测试，请设置另一个入口点：

**src/another.js**

```javascript
import "./main.css";
import component from "./component";

const demoComponent = component("Another");

document.body.appendChild(demoComponent);
```

该文件可以转到自己的目录。这里重用现有代码以显示某些内容。Webpack配置必须指向此文件：

**webpack.config.js**

```javascript
...

const commonConfig = merge([
  {
    output: {
      // Needed for code splitting to work in nested paths
      publicPath: "/",
    },
  },
  ...
]);

...

module.exports = mode => {
  // const pages = [
  //   parts.page({ title: "Webpack demo" }),
  //   parts.page({ title: "Another demo", path: "another" }),
  // ];
  const pages = [
    parts.page({
      title: "Webpack demo",
      entry: {
        app: PATHS.app,
      },
    }),
    parts.page({
      title: "Another demo",
      path: "another",
      entry: {
        another: path.join(PATHS.app, "another.js"),
      },
    }),
  ];
  const config =
    mode === "production" ? productionConfig : developmentConfig;

    return pages.map(page =>
      merge(commonConfig, config, page, { mode })
    );
};
```

调整还需要在相关部分进行更改，以便 `entry` 包含在配置中：

**webpack.parts.js**

```javascript
exports.page = (
  {
    path = "",
    template = require.resolve(
      "html-webpack-plugin/default_index.ejs"
    ),
    title,
    entry,
  } = {}
) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + "/"}index.html`,
      title,
    }),
  ],
});
```

`/another` 有相似的修改，展示效果如下：

![Another page shows up](../../images/another.png)

### 赞成和反对观点

如果你构建应用程序（`npm run build`），你应该找到 *another/index.html*。 根据生成的代码，你可以进行以下观察：

* 很清楚如何在配置中添加更多页面。
* 生成的静态资源直接位于构建根目录下方。页面是一个除外，因为它们由`HtmlWebpackPlugin`处理，但它们仍然指向根目录下的静态资源。可以用 *webpack.page.js* 的形式添加更多抽象，并通过接受公共的页面配置函数来管理路径。
* 记录应该按照每个页面单独写在自己的文件中。目前，写入最后一次成功的配置。上述解决方案可以解决这个问题。
* 像linting和cleaning这样的过程现在运行两次。 *Targets* 这章详细的介绍了该问题的解决方案。

通过删除multi-compiler模式，可以将方法推向另一个方向 尽管处理这种构建的速度较慢，但它可以实现代码共享和shell。实现shell配置的第一步是重新调整配置，以便它获取页面之间共享的代码。

## 生成多个页面（页面间共享代码）

由于使用模式匹配，当前配置可以巧妙地共享代码。页面只有一小部分代码不同，它们的manifest和构建包会根据entries配置来生成。

在更复杂的应用程序中，你应该跨页面应用 [*构建拆分*](https://lvzhenbang.github.io/webpack-book/dist/zh/building/02_bundle_splitting.html) ，书中专门有一章介绍这个技术。因此，删除multi-compiler模式是值得的。

### 调整配置

需要进行调整以在页面之间共享代码。大多数代码可以保持不变，但将它暴露给webpack的方式必须改变，以便它接收单个配置对象。由于 `HtmlWebpackPlugin` 默认选择所有块，因此你必须调整它以仅选取与每个页面相关的块：

**webpack.config.js**

```javascript
...

module.exports = mode => {
  const pages = [
    parts.page({
      title: "Webpack demo",
      entry: {
        app: PATHS.app,
      },
      chunks: ["app", "manifest", "vendors~app"],
    }),
    parts.page({
      title: "Another demo",
      path: "another",
      entry: {
        another: path.join(PATHS.app, "another.js"),
      },
      chunks: ["another", "manifest", "vendors~app"],
    }),
  ];
  const config =
    mode === "production" ? productionConfig : developmentConfig;

  // return pages.map(page =>
  //   merge(commonConfig, config, page, { mode })
  // )
  return merge([commonConfig, config, { mode }].concat(pages));
};
```

指定页面的配置也需要做一些小的调整：

**webpack.parts.js**

```javascript
exports.page = (
  {
    path = "",
    template = require.resolve(
      "html-webpack-plugin/default_index.ejs"
    ),
    title,
    entry,
    chunks,
  } = {}
) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      chunks,
      ...
    }),
  ],
});
```

运行 `npm run build` 脚本命令，你应该注意到与第一个多页构建相比有些不同。不是原来的两个manifest文件，只有一个。由于新的配置，manifest包含对生成的所有包的引用。反过来，特定的entries文件指向manifest的不同部分，manifest根据entry的不同而运行不同的代码。因此不需要多个单独的manifest。

### 赞成和反对观点

与之前的方法相比，获得了一些东西，但也丢失了一些：

* 鉴于配置不再是multi-compiler形式，编译处理可能会更慢。
* 如果不做额外的考虑，如 `CleanWebpackPlugin` 之类的插件就无法运行。
* manifest不是多个，只剩下一个。但结果不是问题，因为entry会根据其设置使用它不同。

## 渐进式 Web 应用程序

如果通过将其与代码拆分和智能路由相结合来进一步推动这一想法，你将最终实现渐进式Web应用程序（PWA）的理念。[webpack-pwa]（https://github.com/webpack/webpack-pwa）示例说明了如何通过app shell或页面shell使用webpack实现该方法。

App shell在初始化的时候加载，它管理整个应用程序，包括其路由。页面shell更精细，并且在使用应用程序时会加载更多内容。在这种情况下，应用程序的总大小更大。相反，你可以更快地加载初始内容。

PWA与[offline-plugin]（https://www.npmjs.com/package/offline-plugin）和[sw-precache-webpack-plugin]等插件完美结合（https://www.npmjs.com/package/sw-precache-webpack-plugin）。使用[Service Worker]（https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API）并改善离线体验。

> [Twitter](https://developers.google.com/web/showcase/2017/twitter) 和 [Tinder](https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0) 案例研究说明了PWA方法如何提升用户体验。

## 总结

Webpack允许你管理多个页面设置。PWA方法允许应用程序在使用时加载，webpack允许实现它。

内容回顾：

* Webpack可用于通过multi-cpmpiler模式生成单独的页面，也可以将所有页面配置包含在一个页面中。
* multi-compiler配置可以使用外部解决方案并行运行，但是应用构建拆分等技术会更加困难。
* 多页面设置可以修改为 **渐进式Web应用程序**。在这种情况下，你可以使用各种webpack技术来提供快速加载并根据需要获取功能的应用程序。这种技术的两种风格都有其自身的优点。

在下一章中，将详细的介绍如何实现服务端渲染（SSR）。
