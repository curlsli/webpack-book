# 整理

当前的配置不会清除多次构建之间的 *build* 目录。因此，它随着项目的变化，不断地累积文件。针对这个问题，你应该在两次构建之间进行清理。

另一个不错的方法，在生成的每个文件顶部的注释中，添加本身的构建信息，至少包括版本信息。

## 清除构建目录

可以通过使用webpack插件或在其外部的工具来解决此问题。你可以在npm脚本中触发`rm -rf ./build && webpack`或`rimraf ./build && webpack`以使其保持跨平台。一个任务运行工具也可以实现相同的目的。

### 配置 `CleanWebpackPlugin`

首先，在项目中安装 [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 依赖：

```bash
npm install clean-webpack-plugin --save-dev
```

接下来，你需要定义一个函数来包装基本的配置。你可以直接使用该插件，这样可以保证跨项目的使用，因此将其推送到库是有意义的：

**webpack.parts.js**

```javascript
...
const CleanWebpackPlugin = require("clean-webpack-plugin");

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});
```

Connect it with the project:

**webpack.config.js**

```javascript
const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};

...

const productionConfig = merge([
  parts.clean(PATHS.build),
  ...
]);
```

配置做如上更改之后，`build` 目录在构建时会保持良好和整洁。你可以通过构验证建输出并确保输出目录中没有旧文件。

## 添加 Revision 到构建中

将与当前构建版本相关的信息附加到构建文件中，这样便于调试。 [webpack.BannerPlugin]（https://webpack.js.org/plugins/banner-plugin/）允许你实现此目的。 它可以与[git-revision-webpack-plugin]（https://www.npmjs.com/package/git-revision-webpack-plugin）结合使用，在生成的文件的开头生成一个小注释。

### 配置 `BannerPlugin` 和 `GitRevisionPlugin`

在项目中安装revision插件：

```bash
npm install git-revision-webpack-plugin --save-dev
```

在 **webpack.parts.js** 中定义如下一个函数：

```javascript
...
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});
```

在 **webpack.config.js** 中，引入上面创建的函数：

```javascript
const productionConfig = merge([
  ...
  parts.attachRevision(),
]);
```

用 `npm run build` 脚本命令执行构建，你应该注意到构建的生成的文件头部包含像 `/ *这样的注释！ 0b5bb05 * /` 或 `/ *！ v1.7.0-9-g5f82fe8 * /` 这样的信息。

可以通过调整 `banner` 进一步自定义输出。你还可以使用 `webpack.DefinePlugin` 将revision信息传递给应用程序。在 [*环境变量*](https://lvzhenbang.github.io/webpack-book/dist/zh/optimizing/03_environment_variables.html) 这一章中将详细介绍这种技术。

> 在webpack4.x中使用这个插件，将会遇到问题，[github issue](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/222)中有详细讨论。

> 代码期望你在Git存储库中使用它！否则，你得到一个 `fatal: Not a git repository (or any of the parent directories): .git` 错误。如果你不使用Git，则可以将banner替换为其他数据。

## 拷贝文件

复制文件，是你可以使用webpack处理的另一个普通操作。如果你需要将外部数据带到你的构建中而不需要webpack直接指向它们，那么[copy-webpack-plugin]（https://www.npmjs.com/package/copy-webpack-plugin）用起来很方便。

如果你想以跨平台的方式在webpack之外完成复制，那么[cpy-cli]（https://www.npmjs.com/package/cpy-cli）是一个不错的选择。

## 总结

通常，你可以通过鉴别问题，然后找到解决问题的插件，并把它用于webpack处理。在webpack之外解决这些类型的问题是完全可以接受的，但是也可以通过webpack来处理它们。

内容回顾：

* 你可以找到许多可用作任务的小插件，并将webpack推向任务运行器。
* 这些任务包括清理构建和部署。[*部署应用程序*](https://lvzhenbang.github.io/webpack-book/dist/zh/techniques/05_deploying.html) 这章详细讨论了后一个主题。
* 向生产构建生成文件中添加注释信息，来来告知开发者已部署的版本，这是一个好主意。这样你就可以更快地调试潜在问题。
* 像这样的辅助任务可以在webpack之外执行。如果您使用 [*多页构建*（这章详细讲解如何实现多页构建）](https://lvzhenbang.github.io/webpack-book/dist/zh/output/02_multiple_pages.html),则必须使用此功能。
