# 使用包(依赖)

有时包没有按照你期望的方式打包，你必须调整webpack解释它们的方式。Webpack提供了多种方法来实现这一目标。

## `resolve.alias`

有时包不符合标准规则，它们的 `package.json` 包含一个错误的 `main` 字段。它可能完全丢失，在这里使用 `resolve.alias` 字段，如下例所示：

```javascript
{
  resolve: {
    alias: {
      demo: path.resolve(
        __dirname,
        "node_modules/demo/dist/demo.js"
      ),
    },
  },
},
```

它的意思是，如果webpack解析器解析目标，从匹配 `demo` 开始。你可以使用类似 `demo $`  的模式，将它约束为确切的名称。

轻量级的React替代品，如[Preact](https://www.npmjs.com/package/preact)，[react-lite](https://www.npmjs.com/package/react-lite)，或[ Inferno](https://www.npmjs.com/package/inferno)提供更小的尺寸，同时权衡诸如"propTypes"和合成事件处理之类的功能。用更轻的替代品替换React可以节省大量空间。

如果你正在用 `react-lite`，你可以像下面这样配置它：

```javascript
{
  resolve: {
    alias: {
      // Swap the target based on your need
      react: "react-lite",
      "react-dom": "react-lite",
    },
  },
},
```

> 同样的技术也适用于loader，可以使用类似地 `resolveLoader.alias` 字段。你可以在webpack中，使用这种方法构建RequireJS项目。

## `resolve.extensions`

默认情况下，webpack在没有扩展名的情况下，只会解析`.js`，`.json`文件，和JSX文件，配置如下：

```javascript
{
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
},
```

## `resolve.modules`

可以通过更改webpack查找模块的位置，来更改模块解析过程。默认情况下，它仅在 `node_modules` 目录中查找。如果你想覆盖那里的包，你可以做如下配置：

```javascript
{
  resolve: {
    modules: ["my_modules", "node_modules"],
  },
},
```

更改后，webpack将首先尝试查看 `my_modules` 目录。该方法适用于需要自定义行为的大型项目。

## `resolve.plugins`

Webpack允许你使用 `resolve.plugins` 字段自定义模块的解析行为。具体可参考下插件的使用：

* [directory-named-webpack-plugin](https://www.npmjs.com/package/directory-named-webpack-plugin)建立目录的导入与目录名匹配的文件的映射关系。例如，它会将 `import foo from './foo';` 映射到 `import foo from './foo/foo.js';`。该模式在React中很受欢迎，使用该插件可以简化代码。[babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)通过Babel实现了相同的行为。
* [webpack-resolve-short-path-plugin](https://www.npmjs.com/package/webpack-resolve-short-path-plugin)旨在避免深度嵌套的导入，如 `import foo from '../../../foo';` 通过添加对tilde(`~`)语法的支持。如果使用插件，`import from "~foo"` 将解析项目根目录。

## 使用webpack之外的包

常见的浏览器依赖(如jQuery)通过公共可用的CDN提供。CDN允许你在其他地方加载流行软件包。 如果已经从CDN加载了一个包并且它在用户缓存中，则无需加载它。

要项目中使用此技术，你应首先将所引用的依赖标记为外部：

```javascript
externals: {
  jquery: "jquery",
},
```

你仍然需要在使用的页面添加指向CDN的引用，并且提供理想情况下的本地回退。因此如果CDN不适用于客户端，则需要加载：

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></scrip>
<scrip>
    window.jQuery || document.write('<script src="js/jquery-3.1.1.min.js"><\/scrip>')
</scrip>
```

> [html-webpack-cdn-plugin](https://www.npmjs.com/package/html-webpack-cdn-plugin) 如果你使用 `HtmlWebpackPlugin` 并想要自动注入 `script` 标签，这是一个选择。

## 处理 Globals

有时模块依赖于全局变量。jQuery提供的 `$` 就是一个很好的例子。Webpack提供了一些允许你处理它们的方法。

### 注入 Globals

[imports-loader](https://www.npmjs.com/package/imports-loader) 允许你像下面这样注入全局变量：

```javascript
{
  module: {
    rules: [
      {
        // Resolve against package path.
        // require.resolve returns a path to it.
        test: require.resolve("jquery-plugin"),
        loader: "imports-loader?$=jquery",
      },
    ],
  },
},
```

### 解析 Globals

Webpack的 `ProvidePlugin` 允许webpack在遇到全局变量时解析它们：

```javascript
{
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
    }),
  ],
},
```

### 暴露 Globals 给浏览器

有时你必须将包公开给第三方脚本。[expose-loader](https://www.npmjs.com/package/expose-loader) 允许你像下面这样做：

```javascript
{
  test: require.resolve("react"),
  use: "expose-loader?React",
},
```

通过小范围的调整，该技术可通过 `React.Perf` 将React性能方面的功能部件公开给浏览器。你必须将以下代码插入到应用程序入口点才能使其正常工作：

```javascript
if (process.env.NODE_ENV !== "production") {
  React.Perf = require("react-addons-perf");
}
```

> [React Developer Tools](https://github.com/facebook/react-devtools) 可以让Chrome获取更多信息，因为它允许你检查应用程序的 `props` 和 `state` 。

> [script-loader](https://www.npmjs.com/package/script-loader) 允许你在全局上下文中执行脚本。如果你使用的脚本依赖于全局注册设置，则必须执行此操作。

## 移除未使用的模块

尽管包可以很好地开箱即用，但它们有时会为你的项目带来太多代码。[Moment.js](https://www.npmjs.com/package/moment) 是一个很受欢迎的例子。默认情况下，它会将本地数据带到项目中。

禁用该行为的最简单方法是使用 `IgnorePlugin` 忽略语言环境：

```javascript
{
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
},
```

> 你可以使用相同的机制来解决有问题的依赖项。如： `new webpack.IgnorePlugin(/^(buffertools)$/)`.

要将特定的部分引入项目，你应该使用 `ContextReplacementPlugin`:

```javascript
{
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /de|fi/
    ),
  ],
},
```

> 有一个 [Stack Overflow question](https://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack/25426019) 详细介绍了这些知识点。你也可以参考 [Ivan Akulov's explanation of `ContextReplacementPlugin`](https://iamakulov.com/notes/webpack-contextreplacementplugin/)。

## 管理预构建的依赖包

webpack可能会给出某些依赖项的警告，如下所示：

```bash
WARNING in ../~/jasmine-promises/dist/jasmine-promises.js
Critical dependencies:
1:113-120 This seems to be a pre-built javascript file. Though this is possible, it's not recommended. Try to require the original source to get better results.
 @ ../~/jasmine-promises/dist/jasmine-promises.js 1:113-120
```

如果包指向预构建(如：最小化和已经处理)的文件，则可能发生警告。Webpack检测到这种情况并发出警告。

如上所述，可以通过将包别名化为源版本来消除警告。考虑到有时源不可用，另一个选择是告诉webpack跳过通过 `module.noParse` 解析文件。它接受RegExp或RegExps数组，配置如下：

```javascript
{
  module: {
    noParse: /node_modules\/demo-package\/dist\/demo-package.js/,
  },
},
```

> Take care when disabling warnings as it can hide underlying issues. Consider alternatives first. There's a [webpack issue](https://github.com/webpack/webpack/issues/1617) that discusses the problem in detail.

## 管理Symbolic链接

Symbolic链接或symlinks，是一种操作系统级功能，允许你通过文件系统指向其他文件而无需复制它们。你可以使用 `npm link` 为正在开发的包创建全局的symbolic链接，然后使用 `npm unlink` 删除链接。

Webpack将Symbolic 链接解析为 Node 的完整路径。 问题是，如果你不知道这个情况，这种行为会让你感到惊讶，特别是如果你依赖webpack处理。可以解决webpack问题[＃1643](https://github.com/webpack/webpack/issues/1643)和[＃985](https://github.com/webpack/webpack/issues/985)中讨论的行为。Webpack核心行为将来可能会有所改进，使这些变通方法变得不必要。

> 你可以通过将 `resolve.symlinks` 设置为 `false` 来禁用webpack的symbolic链接处理。

## 深入了解包

为了获得更多信息，npm为基本查询提供了`npm info <package>`命令。你可以使用它来检查与包关联的元数据（metadata），同时确定版本相关信息。 请考虑以下工具：

* [package-config-checker](https://www.npmjs.com/package/package-config-checker) 更进一步。 它允许你更好地了解项目的哪些软件包最近更新，并提供了深入了解依赖项的方法。例如，它显示了哪些包可以使用与下载大小等相关信息。
* [slow-deps](https://www.npmjs.com/package/slow-deps) 可以提示项目的哪些依赖项安装是最慢的。
* [weigh](https://www.npmjs.com/package/weigh) 当用于以不同方式（未压缩，缩小，压缩）的浏览器提供包时，可以使用它来计算包的大致大小。

## 总结

Webpack可以毫无问题地使用大多数npm软件包。但有时候，使用webpack的解析机制需要额外的配置辅助。

内容回顾：

* 使用webpack的模块解析对你的开发有帮助。有时你可以通过调整解析来解决某些问题。不过，尝试将改进流（upstream）推到项目本身通常是个好主意。
* Webpack允许你修补已解析的模块。给出特定的依赖关系需要全局变量，你可以通过注入处理它们。你还可以将模块公开为全局变量，因为这对于某些开发工具来说是必需的。
