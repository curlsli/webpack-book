# 组合配置

尽管webpack还没有做太多的工作，但是配置的规模逐渐变大。现在，你需要注意组合它的方式，因为你在项目中有独立的生产和开发目标。当你希望向项目添加更多功能时，情况只会变得更糟。

使用单一的配置文件会影响理解，并消除任何可重用性的潜力。随着项目需求的增长，你将必须找到更有效地管理webpack配置的方法。

## 管理配置的一些方法

你可以使用下面一些方法管理webpack配置：

* 为每个环境（env）维护一个配置文件，通过 `--config` 参数配置文件传递给webpack，通过模块导入的方式共享配置。
* 将配置存放到库中，然后使用它。如：[hjs-webpack](https://www.npmjs.com/package/hjs-webpack), [Neutrino](https://neutrino.js.org/), [webpack-blocks](https://www.npmjs.com/package/webpack-blocks).
*  将配置存放到工具中。如：[create-react-app](https://www.npmjs.com/package/create-react-app), [kyt](https://www.npmjs.com/package/kyt), [nwb](https://www.npmjs.com/package/nwb).
* 维护单个文件中的所有配置，然后依赖 `--env` 参数。本章稍后将详细讲解这种方法。

可以将这些方法组合起来使用，从而创建一个高级的配置，这个配置由更小的部分组成；然后将这些部分添加到一个库中；最后通过npm使用这个库，从而可以跨多个项目使用相同的配置。

## 组合配置——合并

如果配置文件被分解成单独的部分，它们必须以某种方式重新组合。通常这意味着合并对象和数组。[webpack-merge](https://www.npmjs.org/package/webpack-merge)被开发出来解决 `Object.assign` 和 `Array.concat` 存在的问题。

*webpack-merge* 做了两件事：它时拼接数组和对象，而不是重载它们而实现组合的目的。下面距离说明：

```bash
> merge = require("webpack-merge")
...
> merge(
... { a: [1], b: 5, c: 20 },
... { a: [2], b: 10, d: 421 }
... )
{ a: [ 1, 2 ], b: 10, c: 20, d: 421 }
```

*webpack-merge* 提供了很多的控制方法，使你可以控制每个字段，它们允许你实现目标内部的前面添加(prepend)，目标内部的后边添加（append），目标内容替换（replace）的目的。

虽然 *webpack-merge* 是专门为wepack而设计的，但事实证明它是一种非常有价值的工具。你可以把它当作一个学习工具，如果你觉得它方便的话，你可以在工作中学习它。

> [webpack-chain](https://www.npmjs.com/package/webpack-chain) 提供一个流畅的API来配置webpack。通常，在你尝试在项目之间共享这些对象配置，并尝试后期对其进行修改时，这是比较麻烦的事儿，因为你需要深入的了解这些被修改的对象的底层结构，但是 `webpack-chain` 就是为了解决这个问题而开发的。

## 引入 *webpack-merge*

首先，添加 *webpack-merge* 依赖：

```bash
npm install webpack-merge --save-dev
```
为了实现一定程度的抽象，你可以定义 *webpack.config.js* 文件来写入高级的配置，定义 *webpack.parts.js* 存放通用的配置。下面提供了一个从现有配置代码中抽象出来的函数形式的接口：

**webpack.parts.js**

```javascript
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});
```

> 同样 `stats` 思想也适用于生产模式的配置。 参考 [官方文档](https://webpack.js.org/configuration/stats/) 可以查看所有可用的选项。

在 *webpack.config.js* 中引入 *webpack.parts.js* :

**webpack.config.js**

```javascript
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
```

代替直接返回配置，而是一个函数（process）捕获传递的 `env` 参数被返回，然后把它返回配置，并将webpack `mode` 映射到它。这样意味着*package.json* 需要做如下修改:

**package.json**

```json
"scripts": {
  // "start": "webpack-dev-server --mode development",
  // "build": "webpack --mode production"
  "start": "webpack-dev-server --env development",
  "build": "webpack --env production"
},
```

在做了这些更改之后，构建的行为应该与以前一样。然而，这一次你将拥有对配置扩展的空间，你不不用担心如何实现不同部分配置的组合。

你可以通过扩展*package.json*定义来添加更多的目标。随着 * webpack.parts。js* 包含更多的特定功能的技术，然后你可以使用组合配置，然后合并到 *webpack.config。js* 中。

> `productionConfig` 随着我们进一步扩展配置，它将逐步增长.

> 在Node中，[process](https://nodejs.org/api/process.html) 模块是一个暴露的全局变量。除了 `env` ，它还提供了许多其它的功能，这些功能可以让用户更方便地获得主机系统信息。

### 理解 `--env`

虽然利用 `--env` 可以向配置中传递一个字符串，但它可以做的更多，如下面所示：

**package.json**

```json
"scripts": {
  "start": "webpack-dev-server --env development",
  "build": "webpack --env.target production"
},
```

现在，在配置中你将接受一个对象（`{ target: "production" }`），而不是接受一个字符串。你也可以添加更多的键值对，它们最终将被被传递到 `env` 对象。如果你在npm脚本中使用了 `--env foo`，而不是`--env.target` 的格式，那么在配置中将得到字符串。webpack依赖于 [yargs](http://yargs.js.org/docs/#parsing-tricks-dot-notation) 实现底层的解析。

## 组合配置的好处

配置分割可以让你轻松的扩展配置。最重要的好处是你可以提取不同目标之间的相同撇脂。你还可以确定要组成最终配置的最小配置单元，将这些配置单元单独保存在一个文件中，就可以跨项目使用。

现在，你可以将配置当作依赖项进行管理，而不是在不同的项目之间重复类似的配置。当你找到实现某些功能的更好解决方案时，你所有的项目都将得到改进。

每种方案都有其优缺点。它虽然提供了组合配置的功能，但它带给了你查看配置代码的不便。因此查看其他人是如何做的，对自己也是有很好的帮助。不管怎么说，你可以根据自己的喜好找到最有效的方案。

对于合成配置来说，也许最大的问题是，你需要知道你在做什么，但是你不会在第一次组合完成的时候就得到答案，这是一个超越webpack的软件工程问题。

You can always iterate on the interfaces and find better ones. By passing in a configuration object instead of multiple arguments you can change the behavior of a part without affecting its API, effectively exposing the API as you need it.

## 配置的框架

在这本书中，你的所有配置被放在 *webpack.config.js* 和 *webpack.parts.js* 文件中：前者包含一些高级的配置，后者则包含一些基础的、细节化的配置。

### 根据目标拆分配置文件

如果你根据目标将配置进行拆分，那么最终你会得到如下所示的配置文件结构：

```bash
.
└── config
    ├── webpack.common.js
    ├── webpack.development.js
    ├── webpack.parts.js
    └── webpack.production.js
```

在这个例子中，你可以通过webpack的 `--config` 参数指向目标，用 `merge` 来合并配置，如： `module.exports = merge(common, config);` 。

### 根据不同的目的分离Parts

为了实现配置功能的模块化管理，可以引入层次结构。你可以将 *webpack.parts.js* 拆分如下：

```bash
.
└── config
    ├── parts
    │   ├── devserver.js
    ...
    │   ├── index.js
    │   └── javascript.js
    └── ...
```

这样你就可以到相关的配置目录中快速的找到配置信息。一个好的推荐方案就是将各个部分的配置都放在一个文件中，然后用注释将他们分割开来。

### 将配置做成NPM包(package)

由于所有的配置都是JavaScript，所以你可以将它们当作一个NPM包（package）来使用。你可以将共享配置做成一个NPM包，然后你就可以跨项目的使用。具体实现可参考 [survival - Maintenance](https://resourvejs.com/maintenance/) 这本书。

## 总结

虽然配置在技术上与以前相同，但你仍然有空间来扩展它。

内容回顾：

* 因为webpack的底层实现是JavaScript，所以你可以有很多方法来管理他。
* 你可以用 [webpack-merge](https://www.npmjs.com/package/webpack-merge) 来实现配置的合并。
* 通过在终端使用 `--env` 参数，你可以向webpack传递构建的目标。在webpack中你可以使用Node的Process 模块来接受 `env` 传递的字符串或对象。
* 组合可以支持配置共享。你不必维护每个项目自定义配置，而是可以共享配置。使用npm包可以做到这一点。

本书的下一部分将介绍不同的技术，因此 *webpack.parts.js* 文件中将增加很多代码块。随之而来， *webpack.config.js* 文件将做很大的修改，幸运的是它将变得更小。
