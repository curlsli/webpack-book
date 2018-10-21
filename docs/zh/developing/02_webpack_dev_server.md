# webpack-dev-server（WDS）

你可以使用 [LiveReload](http://livereload.com/)、 [Browsersync](http://www.browsersync.io/) 来实现应用改变，浏览器自动刷新。你也可以使用 [browser-sync-webpack-plugin](https://www.npmjs.com/package/browser-sync-webpack-plugin) 插件实现浏览器的同步刷新，但webpack还有一些隐藏的功能。

## Webpack 的 `watch` 模式 和 *webpack-dev-server*

实现更好的开发环境的第一步就是使用webpack的监视模式。通过向webpack传递 `--watch` 来激活它。 如：`npm run build -- --watch` 。

这个功能一旦开启，监视模式将检测文件是否发生改变，如果改变，将自动重新编译。*webpack-dev-server* (WDS) 同样实现了监视模式，但它更进一步。

WDS 是运行在内存的服务器，也就是说打包的内容不被写在输出文件中，而是存在内存中。在你调试代码和样式的时候，你要明白这个区别。

WDS默认配置是自动刷新浏览器，因此在你开发的时候，不用自己设置。此外，它也支持webpack的高级功能——模块热替换（HMR）。

HMR 允许修改浏览器的状态是部分刷新，而不是全部。就像 React(vue.js，angular.js) y一样。附录中 [*模块热替换*](https://lvzhenbang.github.io/webpack-book/dist/zh/appendices/02_hmr.html) 这一部分将详细介绍。

WDS提供了一个接口，使即时修改代码成为可能，但要想高效的工作，你必须在客户端代码实现这个接口。css是无状态的，所以很简单，但是js框架和库实现起来有点困难。

## WDS 分发文件

虽然因为性能原因WDS在内存中进行操作，但有时分发文件到文件系统中比较好。如果你正在集成另一个服务器，这个服务器需要访问同样文件，那么后者将变得很有必要。这个插件[write-file-webpack-plugin](https://www.npmjs.com/package/write-file-webpack-plugin)
可以帮你实现这个功能。

> 你应该严格的用WDS在开发模式。如果你想要托管你的应用程序，你可以使用其他的解决方案，如：Apache、Nginx。

## 添加WDS依赖

使用前，需要在项目中添加 WDS 依赖：

```bash
npm install webpack-dev-server --save-dev
```

之后，将在 `npm bin` 目录下生成一个命令文件，你可以从这儿运行 *webpack-dev-server*，启动WDS之后, 你将有一个开发模式下的服务器，运行在`http://localhost:8080`。这样自动刷新浏览器的功能就实现了。

## 在项目中引入 WDS

将WDS集成到项目中，定义一个npm脚本命令来启动它，代码修改如下：

**package.json**

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
},
```

> WDS 不仅可以使用webpack的配置，也可以使用它的命令。

如果现在你运行 *npm run start* 或 *npm start* 命令，在终端中你会看到下面的内容：

```bash
> webpack-dev-server --mode development

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: Hash: eb06816060088d633767
Version: webpack 4.1.1
Time: 608ms
Built at: 3/16/2018 3:44:04 PM
     Asset       Size  Chunks                    Chunk Names
   main.js    338 KiB    main  [emitted]  [big]  main
index.html  181 bytes          [emitted]
Entrypoint main [big] = main.js
...
```

这是服务器已经启动，如果你在浏览器中访问 `http://localhost:8080/` ，你会看到与下面一样的效果：

![Hello world](../../images/hello_01.png)

如果你修改了源代码，你将在终端看到新的输出内容，同时浏览器也将自动刷新，完成后，显示新的内容。

> 如果默认端口被占用，WDS 将尝试打开新的端口。你可以用 `netstat -na | grep 8080` 命令，查看端口情况。

> 除了 `production` 和 `development`，webpack还有一个 `none` 模式（禁用所有内容）。

## 在webpack中配置 WDS

可以同webpack的 `devServer` 选项来自定以 WDS 的功能。当然你也可以在 CLI 中定义，但是在webpack中定义可能更方便管理。

可以启动下面这些功能：

**webpack.config.js**

```javascript
...

module.exports = {
  devServer: {
    // 为了减少输出量，可以只显示错误
    stats: "errors-only",

    // 开发环境的 host 和 port，允许自定义
    //
    // 如果你使用 Docker, Vagrant 或 Cloud9 虚拟机，
    // 你可以设置 host: "0.0.0.0";
    //
    // 不像默认的 `localhost`，0.0.0.0 适用于所有的网络设备。
    host: process.env.HOST, // 默认是：`localhost`
    port: process.env.PORT, // 默认是：8080
    open: true, // 浏览器自启动
  },
  ...
};
```

之后，你就可以用 host 和 port 选项，配置服务器 (如： `PORT=3000 npm start`)。

> [dotenv](https://www.npmjs.com/package/dotenv) 允许你用 *.env* 文件来定义环境变量，实现快速的配置。

> 如果你的路由使用了HTML5 History API，则开启`devServer.historyApiFallback`。

## 开启浏览器端的错误浮层功能

WDS 提供了一个浏览器端的错误浮层的功能：

**webpack.config.js**

```javascript
module.exports = {
  devServer: {
    ...
    overlay: true,
  },
  ...
};
```

用 `npm start` 命令启动服务器，然后破坏源代码，你将在浏览器中看到一个包含错误和警告弹出层：

![Error overlay](../../images/error-overlay.png)

> 如果你想要更好的错误提示，可以考虑 [error-overlay-webpack-plugin](https://www.npmjs.com/package/error-overlay-webpack-plugin) ，因为它展示错误的效果更好。

> WDS 错误提示浮层 *not* 不提示应用的运行时错误。

## 开启模块热替换功能

模块热替换功能使webpack变得与众不同。实现它需要从服务器和客户端同时着手。 附录 [*模块热替换*](https://lvzhenbang.github.io/webpack-book/dist/zh/appendices/02_hmr.html) 将详细介绍。 

## 可以通过网络访问开发服务器

你可以通过环境来自定义port和host, (如：在Unix上 `export PORT=3000`，在windows上 `SET PORT=3000`)。

访问你的服务器，你需要知道你的机器的ip。在Unix上，你可以用 `ifconfig | grep inet` 获得。在Windows上，你可以用 `ipconfig` 获得。[node-ip](https://www.npmjs.com/package/node-ip)使用起来更方便。特别是在windows上，你需要设置 `HOST` 完成。

这样可以模拟一个本地服务器的网络运行环境。

## 在开发模式的配置中用它更高效

当你改变构建文件时，WDS将重启服务器。如果你改变webpack配置时呢？你需要手动的重启开发服务器，这是一个无聊的工作。[GitHub上讨论的结果](https://github.com/webpack/webpack-dev-server/issues/440#issuecomment-205757892)，你可以使用[nodemon](https://www.npmjs.com/package/nodemon) 监视器工具。

为了让它工作，你不得不用 `npm install nodemon --save-dev` 安装它。之后，当源代码改变时，你可以用它监视webpack的配置和重启WDS，NPM脚本修改如下：

**package.json**

```json
"scripts": {
  "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --mode development\"",
  "build": "webpack --mode production"
},
```

WDS在未来 [将支持这个功能](https://github.com/webpack/webpack-cli/issues/15)。如果配置文件发生改变，你想要实现它自己调用自己，你可以尝试实现这个解决方案。

## 用轮询机制替代监视机制

当你的系统时老版本的Windows、Ubuntu、Vagrant 或 Docker时，开启轮询（polling）是一个好的选择：

**webpack.config.js**

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devServer: {
    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,

      // Poll using interval (in ms, accepts boolean too)
      poll: 1000,
    },
  },
  plugins: [
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
  ],
};
```

设置它比用默认的设置更消耗内存资源，但值得尝试。

## WDS的替代方案

你可以通过终端传递WDS选项。在webpack配置中管理选项更清楚，因为这有助于保持 *package。json* 漂亮和整洁。也更容易理解发生了什么，因为你不需要从webpack源代码中找出答案。


你可以创建Express服务器并使用中间件。有下面几个选择:

* [The official WDS middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)
* [webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)
* [webpack-isomorphic-dev-middleware](https://www.npmjs.com/package/webpack-isomorphic-dev-middleware)

有一个 [Node API](https://webpack.js.org/configuration/dev-server/)可以给你更多且更灵活的选择。

> CLI 和 Node API之间[有些许不同](https://github.com/webpack/webpack-dev-server/issues/616) 

## WDS的其他特性

WDS 提供的功能不止上面描述的。你需要留意这些下面这些：

* `devServer.contentBase` - 如果你不动态的生成 *index.html* 且比较喜欢在特定的目录操作它，这是你可以用 `contentBase` 向 WDS 做说明，`contentBase` 接受 一个路径（如：`"build"`）或者一个路径数组（如：`["build", "images"]`）。它的默认值是项目根目录。
* `devServer.proxy` - 如果你使用多个服务器，你需要将WDS代理给它们。`proxy` 选项接受一个代理映射对象(`{ "/api": "http://localhost:3000/api" }`) 。默认不能代理。
* `devServer.headers` - 定义你的请求headers。

> [官方文档](https://webpack.js.org/configuration/dev-server/) 包含所有的选项。

## Development Plugins

Webapck的生态系统多样化，所以有很多插件辅助开发：

* [case-sensitive-paths-webpack-plugin](https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin) 当你在macOS或Windows等不区分大小写的环境上进行开发，但使用Linux等区分大小写的环境进行生产时，这将非常方便。
* [npm-install-webpack-plugin](https://www.npmjs.com/package/npm-install-webpack-plugin) 允许webpack在你导入新包到你的项目时，用 *package.json* 来安装和连接已经安装的包。
* [react-dev-utils](https://www.npmjs.com/package/react-dev-utils) 包含所有 为[创建React应用](https://www.npmjs.com/package/create-react-app)的工具集，不管它的名字是什么，都可以在React中找到用途。如果你只想要webpack信息被格式化，你可以考虑用[webpack-format-messages](https://www.npmjs.com/package/webpack-format-messages).
* [start-server-webpack-plugin](https://www.npmjs.com/package/start-server-webpack-plugin) 能够在你完成构建后重启服务器。

## Output Plugins

还有一些插件可以使webpack输出更容易被注意到和理解:

* [system-bell-webpack-plugin](https://www.npmjs.com/package/system-bell-webpack-plugin) 在失败时提醒系统，而不是webpack失败时保持静默。
* [webpack-notifier](https://www.npmjs.com/package/webpack-notifier) 使用系统通知让你知道webpack状态。
* [nyan-progress-webpack-plugin](https://www.npmjs.com/package/nyan-progress-webpack-plugin) 可用于在构建过程中获得更整洁的输出。如果你使用的是像Travis这样的持续集成(CI)系统，请小心，因为它们会破坏输出。Webpack提供了 `ProgressPlugin` 用于同样的目的。
* [friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin) 改进了webpack的错误提示，它可以捕获常见错误并用更友好的方式显示它们。
* [webpack-dashboard](https://www.npmjs.com/package/webpack-dashboard) 在标准webpack输出上提供一个基于终端的仪表板。如果你更喜欢清晰的视觉输出，这个会很有用。

## 总结

WDS完善了webpack，并通过提供面向开发的功能使其对开发人员更友好

内容回顾：

* Webpack的 `watch` 模式，为提升开体验迈出了重要的一步。但你改变了源代码时，webpack能实现重新编译。
* 但源代码改变后，WDS 能刷新浏览器，它也实现了 **模块的热替换**。
* WDS在某些旧系统上使用会出现问题，基于这个原因，轮询是一个不错的替代方案。
* WDS可以以中间件的形式集成在一个Node服务器中。与依赖命令行接口相比，这样做可以提供更多的控制。
* WDS不仅可以做自动刷新和HMR。如：通过代理连接其它服务器。

在下一章，你将学习如何组合配置，以便本书后面部分的进一步使用。
