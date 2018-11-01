# 部署应用

使用webpack构建的项目可以部署到各种环境中。可以使用 `gh-pages` 包将不依赖后端的公共项目推送到 `GitHub Pages`。此外，还有各种webpack插件可以针对其他环境，例如S3。

## 用 `gh-pages` 部署应用

[gh-pages](https://www.npmjs.com/package/gh-pages) 允许你轻松地在 `GitHub Pages` 上托管独立的应用程序。首先必须指向构建目录。它赋值指定内容，并将它们推送到 `gh-pages` 分支。

不管它的名称是什么，该包可以与支持Git存储库托管的其他服务一起使用。鉴于GitHub的受欢迎程度，可以用它来进行验证。在实践中，你可能会有更复杂的配置，通过持续集成系统将结果推送到另一个服务。

### 引入 `gh-pages` 依赖

首先，安装 `gh-pages` 依赖到项目：

```bash
npm install gh-pages --save-dev
```

然后，在 `package.json` 中配置快捷命令：

**package.json**

```json
"scripts": {
  "deploy": "gh-pages -d build",
  ...
},
```

要使静态资源路径在 `GitHub Pages` 上运行，必须调整 `output.publicPath` 字段。否则，静态资源路径最终指向根，除非你直接在域根(例如`survivaljs.com`)之后托管，否则这不起作用。

例如，`publicPath` 控制你访问 `index.html` 时看到结果的url。如果你在CDN上托管静态资源，这里就是需要调整的地方。

在这种情况下，将其设置为指向GitHub项目就足够了，如下所示：

**webpack.config.js**

```javascript
const productionConfig = merge([
  {
    ...
    output: {
      ...
      // Needed for code splitting to work in nested paths
      // publicPath: "/",
      // Tweak this to match your GitHub project name
      publicPath: "/webpack-demo/",
    },
  },
  ...
]);
```

运行 `npm run build` 脚本命令后，执行 `npm run deploy` 命令，你应该从 `GitHub Pages`上托管的 `build/` 目录中获取你的应用程序。然后在浏览器中，访问 `https://<name>.github.io/<project>` ，并查看结果。

> 如果你需要更精细的控制，请使用 `gh-pages` 提供的Node API。但通常情况下，它提供的默认命令行工具足以满足基本目的。

> `GitHub Pages` 允许你选择部署的分支。即使对于不需要打包的最小站点来说，它也可以使用`master` 分支。你还可以指向 `master` 分支中的 `./docs` 目录下方并维护你的站点。

### 将旧版本存档管理

`gh-pages` 为存档目的提供`add`选项。 这个想法如下：

1. 将旧版本的站点复制到临时目录中，并从中删除 `archive` 目录。 你可以根据需要命名存档目录。
2. 清理并构建项目。
3. 复制以下旧版本 `build/archive/<version>`
4. 设置脚本以通过Node调用* gh-pages *，如下所示，并捕获回调中可能的错误：

```javascript
ghpages.publish(path.join(__dirname, "build"), { add: true }, cb);
```

## 部署到其它环境

即使你可以将部署问题放到webpack之外，但有一些特定于webpack的实用程序可以派上用场：

* [webpack-deploy](https://www.npmjs.com/package/webpack-deploy) 是部署应用程序的集合，甚至可以在webpack之外工作。
* [webpack-s3-sync-plugin](https://www.npmjs.com/package/webpack-s3-sync-plugin) 和 [webpack-s3-plugin](https://www.npmjs.com/package/webpack-s3-plugin) 将静态资源同步到 Amazon。
* [ssh-webpack-plugin](https://www.npmjs.com/package/ssh-webpack-plugin) 专为SSH部署而设计。
* [now-loader](https://www.npmjs.com/package/now-loader) 在资源级别上运行，并允许你将特定资源部署到Now托管服务。

> 要访问生成的文件及其路径，请考虑使用[assets-webpack-plugin](https://www.npmjs.com/package/assets-webpack-plugin)。路径信息允许你在部署时将webpack与其他环境集成。

> 为确保在部署新版本后，依赖旧版构建包的客户端仍然有效，请不要删除旧文件，直到它们足够大。你可以对部署时要删除的内容执行特定检查，而不是删除每个旧的静态资源。

## 动态的解析 `output.publicPath` 

如果你事先不知道 `publicPath`，则可以通过以下步骤，根据环境解决它：

1. 设置 `__webpack_public_path__ = window.myDynamicPublicPath;` 在应用程序入口点，并根据需要调整它。
2. 从项目配置中移除 `output.publicPath` 选项。
3. 如果你使用的是ESLint，通过`globals.__webpack_public_path__: true` ，将它设置为忽略全局。

编译时，webpack选择 `__webpack_public_path__` 并重写它，使其指向webpack逻辑。

## 总结

虽然webpack不是部署工具，但你可以找到相关的插件，使其具有部署功能。

内容回顾：

* 可以处理webpack之外的部署问题。如，可以在npm脚本中实现此目的。
* 你可以动态配置webpack的 `output.publicPath` 。如果你不知道compile-time，并希望在这之后下决定，这种技术很有用。可以通过 `__webpack_public_path__` global来实现。

在下一章中，将详细的介绍如何在webpack中使用依赖包。
