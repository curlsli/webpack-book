# 进入正题

进入正题之前，请保证你使用过[Node](http://nodejs.org/)的最新版本，至少你应该使用过它的一个长期维护的（LTS）版本。本书中的配置考虑到一部分人使用长期维护版本的情况。同时你要确保你使用的终端设备上安装了`node` 和 `npm`。[Yarn](https://yarnpkg.com/) 是一个不错的 `npm` 替代方案，也适用于本书。

通过使用[Docker](https://www.docker.com/)、[Vagrant](https://www.vagrantup.com/)或[nvm](https://www.npmjs.com/package/nvm)等解决方案，可以获得更受控制的环境。由于依赖于虚拟机，Vagrant会带来性能损失，但在团队中这是有意义的，它可以让每个开发人员都可以拥有与生产环境相同的环境。

> 一个已经完成的demo源码： [GitHub](https://github.com/survivejs-demos/webpack-demo)

## 创建一个项目

在配置之前，你应该创建一个目录，目录中包含一个 *package.json* 文件，`npm` 用这个文件管理项目的依赖。通过下面是连续的命令输入可完成基本的要求：

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y # -y 生成 *package.json* 时，跳过所有的选择操作
```

你可以手动的对 *package.json* 做进一步的调整，甚至一部分操作会为你自动修改文件。更多的详情请参考官方文档 [package.json options](https://docs.npmjs.com/files/package.json)。

> 你可以设置 `npm init` 的配置，文件在 *~/.npmrc*。

> 这是使用 [Git](https://git-scm.com/) 做版本控制的一次绝好机会。你可以在每个步骤创建提交，在每个章节中创建标记，这样如果你愿意，来回移动就更容易了。

> 这本书中的例子已经使用[Prettier](https://www.npmjs.com/package/prettier) （它的配置项 `"trailingComma": "es5",` 和 `"printWidth": 68`）格式化过了，这样使得它们变得更干净和适合页面。

## 安装 Webpack

虽然webpack可以被全局安装 (`npm install webpack -g`)，但是把webpack当做一个依赖安装到你的项目中，不仅方便维护，还可以避免一些问题。这样你就可以控制你运行的webpack的确切版本。这种方法在 **持续集成** （CI）的创建中能很好的工作，CI系统可以安装本地依赖项，使用它们来编译项目，然后将结果推送到服务器。

在项目中，添加webpack依赖，命令如下：

```bash
npm install webpack webpack-cli --save-dev # -D to type less
```

完成后，你可以在 *package.json* 的 `devDependencies` 部分看到 webpack，除了在 *node_modules* 目录下本地安装包外，npm还为它提供了一个可执行的入口。

> 你可以用 `--save` 和 `--save-dev` 分离应用程序和开发中应用的依赖。前者安装依赖到 *package.json* `dependencies` 部分，后者安装依赖到 `devDependencies` 部分。

> [webpack-cli](https://www.npmjs.com/package/webpack-cli) 提供了 `init` 和 `migrate` 两个命令。前者 可以让你快速创建新的webpack配置，后者可以让你快速的从旧版本切换到新版本。

## 运行 Webpack

你可以运行 `npm bin` 命令，查看npm安装的可执行文件的路径。webpack 的入口点是*./node_modules/.bin*，你可以通过执行`node_modules/.bin/webpack` 命令来运行webpack，或者使用类似的命令。

命令执行后，你会看到一个版本信息，虽然在项目里大多数情况下没什么用，但是通过它你可以到官网上查看这个版本的工具的相关的信息，了解更多功能。

```bash
$ node_modules/.bin/webpack
Hash: 6736210d3313db05db58
Version: webpack 4.1.1
Time: 88ms
Built at: 3/16/2018 3:35:07 PM

WARNING in configuration
The 'mode' option has not been set. Set 'mode' option to 'development' or 'production' to enable defaults for this environment.

ERROR in Entry module not found: Error: Can't resolve './src' in '.../webpack-demo'
```
输出信息告诉你webpack不能找到要编译的源文件。同时也缺少一个 `mode` 配置项来告诉webpack当前运行是在开发还是生产模式，但项目默认执行在生产模式下。

为了快速的实现输出，只需要两步：

1. 创建 *src/index.js* 文件，在文件中添加 `console.log("Hello world");` 代码。
2. 运行 `node_modules/.bin/webpack --mode development` 命令。Webpack 将通过它默认的节点找到源文件。
3. 查看 *dist/main.js* 文件，你会在这个启动脚本中找到和 *src/index.js* 中一样的代码。

> 尝试使用 `--mode production` 然后比较和上面运行的不同之处。

## 创建静态文件（Assets）目录

为了实现更加复杂的构建，我们可以向项目中添加其他的模块，并尝试做一个小的应用程序：

**src/component.js**

```javascript
export default (text = "Hello world") => {
  const element = document.createElement("div");

  element.innerHTML = text;

  return element;
};
```
这样，我们需要修改原始的文件（`src/index.js`），以便能引入新的文件，然后通过DOM来展示应用：

**src/index.js**

```javascript
import component from "./component";

document.body.appendChild(component());
```

构建( bash命令`node_modules/.bin/webpack --mode development`，为开发模式下执行webpack)完成后，然后检查输出，你会在 `dist` 目录中发现两个打包的文件。

向 webpack 传递 `--devtool false` 参数，可以去除对输出的检查功能。默认的 webpack 使用输出检查功能，它基于源代码的映射生成 `eval` 。[*Source Maps*](https://lvzhenbang.github.io/webpack-book/dist/zh/building/01_source_maps.html) 这章将重点介绍。

不过，有一个问题是：我们如何在浏览器上测试应用？

## 配置 *html-webpack-plugin* 插件

这个问题可以被这样解决：通过写一个 *index.html* 文件，在它里面指定打包生成的文件。我们可以使用一个插件，并在webpack中完成插件引用配置，最后执行 `node_modules/.bin/webpack` 命令，来完成相同的功能。

首先，安装 *html-webpack-plugin* 依赖：

```bash
npm install html-webpack-plugin --save-dev
```

然后，在webpack中完成插件的引用，创建如下的配置文件：

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
  ],
};
```
最后，完成了上面的配置后，你可以这样做：

1. 你可以运行 `node_modules/.bin/webpack --mode production` 命令来构建项目。你也可以使用 `development` 模式。
2. 运行 `cd dist` 命令，进入构建目录。
3. 用 [`serve`](https://github.com/zeit/serve) (首先，你要安装该依赖，用 `npm i serve -g` 命令) 来运行服务器，或者使用一个相似的命令。
4. 通过浏览器来检查结果。你会看到如下的结果。

![Hello world](../../images/hello_01.png)

> 本书使用 **Trailing commas** 来提供更简洁的代码展示。

## 检查构建输出

如果你执行 `node_modules/.bin/webpack --mode production` 命令，你应该看到类似下面的输出：

```bash
Hash: aafe36ba210b0fbb7073
Version: webpack 4.1.1
Time: 338ms
Built at: 3/16/2018 3:40:14 PM
     Asset       Size  Chunks             Chunk Names
   main.js  679 bytes       0  [emitted]  main
index.html  181 bytes          [emitted]
Entrypoint main = main.js
   [0] ./src/index.js + 1 modules 219 bytes {0} [built]
       | ./src/index.js 77 bytes [built]
       | ./src/component.js 142 bytes [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
       [0] (webpack)/buildin/module.js 519 bytes {0} [built]
       [1] (webpack)/buildin/global.js 509 bytes {0} [built]
        + 2 hidden modules
```

输出告诉了我们许多：

* `Hash: aafe36ba210b0fbb7073` - 构建生成的唯一hash标志。 你可以 `[hash]` 来验证静态资源（assets）是否有效。hash的使用将在 [*在文件名中添加hash*](https://lvzhenbang.github.io/webpack-book/dist/zh/optimizing/04_adding_hashes_to_filenames.html) 这章详解。
* `Version: webpack 4.1.1` - Webpack的版本。
* `Time: 338ms` - 构建完成所花费的时间。
* `main.js  679 bytes       0  [emitted]  main` - 生成的静态资源名称、大小、相关联模块的ID、状态、模块名字。
* `index.html  181 bytes          [emitted]` - 构建过程中生成的另一个静态资源。
* `[0] ./src/index.js + 1 modules 219 bytes {0} [built]` - 入口静态资源的ID、名字、大小、入口ID、生成方式。
* `Child html-webpack-plugin for "index.html":` - 输出使用的插件。

查看 `dist/` 目录，仔细查看生成的代码你将会发现。

> 除了一个对象形式的配置，webpack也接受数组形式的配置。你还可以返回一个 `Promise` ，最后用 `resolve` 返回一个配置。

> 你可以考虑使用一个轻量级的 *html-webpack-plugin* ，如： [mini-html-webpack-plugin](https://www.npmjs.com/package/mini-html-webpack-plugin)。

## 为构建添加一个快捷键

考虑到 `node_modules/.bin/webpack` 命令不容易记，你可以在 *package.json* 文件中添加如下：

**package.json**

```json
"scripts": {
  "build": "webpack --mode production"
},
```

运行 `npm run build` 命令之后的输出同之前一样，这里npm将 *node_modules/.bin* 暂时添加到命令路径中，从而实现最终的目的。你可以用 `"build": "webpack"` 代替 `"build": "node_modules/.bin/webpack"`。
你可以用 *npm run* 来执行这种类型的脚本，你也可以在你的项目中的任何地方使用它。你直接运行 `npm run` 后，它将列出所有可以执行的脚本。

> 当你使用像 *npm start* 和 *npm test* 这样的快捷键时，它也能执行应用。在匆忙之下，你可以用 *npm t* 来执行你的测试操作。

> 进一步，你可以使用系统级别的别名（`alias`）命令，例如：你可以构建 `nrb` 到`npm run build` 的映射。

## `HtmlWebpackPlugin` 插件的扩展

虽然你可以使用 `HtmlWebpackPlugin` 引用你自己定义的html模板，但是你也可以考虑用 [html-webpack-template](https://www.npmjs.com/package/html-webpack-template) 或 [html-webpack-template-pug](https://www.npmjs.com/package/html-webpack-template-pug)这样的半成品。

也有一些特定功能的插件被用来扩展 `HtmlWebpackPlugin` 的功能：

* [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin) 可以生成站点图标。
* [script-ext-html-webpack-plugin](https://www.npmjs.com/package/script-ext-html-webpack-plugin) 它为你提供更多对脚本的控制，并允许你进一步优化脚本的加载。
* [style-ext-html-webpack-plugin](https://www.npmjs.com/package/style-ext-html-webpack-plugin) 将css引用转换为内联css，这个技术可以作为初始有效负载的一部分，快速为客户端提供关键的css。
* [resource-hints-webpack-plugin](https://www.npmjs.com/package/resource-hints-webpack-plugin)添加[隐藏资源](https://www.w3.org/TR/resource-hints/) 到你的html中来提升加载时间。
* [preload-webpack-plugin](https://www.npmjs.com/package/preload-webpack-plugin) 帮脚本启动 `rel=preload` 功能，实现懒加载。这个技术将在 [*构建*](https://lvzhenbang.github.io/webpack-book/dist/zh/building/01_source_maps.html) 这部分详细介绍。
* [webpack-cdn-plugin](https://www.npmjs.com/package/webpack-cdn-plugin) 允许你指定所需依赖存放的 CDN（Content Delivery Network）。这项常用的技术可用来快速加载你引用的库，如：jquery。
* [dynamic-cdn-webpack-plugin](https://www.npmjs.com/package/dynamic-cdn-webpack-plugin) 实现相似的功能。

## 总结

虽然你成功的让webpack运行起来了，但是它展露出来的力量，只是一部分。在应用它开发的时候，还是比较痛苦，因为每次改变源代码后，你都需要运行 `npm run build` 来手动构建（打包）一次，然后在刷新浏览器。下一部分将介绍如何使用webpack的高级功能来解决这个问题。

内容回顾：

* 相对于将webpack全局引入来说，而将它当做本地依赖引入是个好想法。这样你就可以知道你使用的webpack版本，本地依赖也可以工作在一个[持续集成（CI）](https://www.martinfowler.com/articles/continuousIntegration.html)环境中。
* Webpack通过 [*webpack-cli*](https://github.com/webpack/webpack-cli) 包提供了接口。除了一些高级功能需要自定义配置外，一般情况下，你用它无需配置。
* 为了实现复杂的构建，你需要一个 *webpack.config.js* 。
* `HtmlWebpackPlugin` 可以生成一个html文件，用来打开你的应用。在 [*Multiple Pages*](https://lvzhenbang.github.io/webpack-book/dist/zh/output/02_multiple_pages.html) 这章将详解如何生成多页面的构建。
* 用NPM的 *package.json* 管理webpack的命令是很方便的。你可以把它当作一个轻量级的任务运行工具，你也可以通过它使用webpack之外的系统功能。

在下一章中，你将学习如何启动浏览器的自动刷新功能来提升开发体验。
