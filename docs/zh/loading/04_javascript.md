# 加载 JavaScript

Webpack虽然默认情况下处理ES2015模块定义的转换，但它不支持代码语法的转换，如：`const` 语法，这就导致打包后的代码不能再旧版本的浏览器中运行。

为了更好的了解默认的转换，可以参考下面的示例(`npm run build -- --devtool false --mode development`)：

**dist/main.js**

```javascript
...
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((text = "Hello world") => {
  const element = document.createElement("div");

  element.className = "pure-button";
  element.innerHTML = text;

  return element;
});
...
```

这个问题可以通过[Babel](https://babeljs.io/)来解决，这是一个非常有名的JavaScript编译器，支持ES2015+特性等等。它类似于ESLint，因为它是建立在预社和插件之上的。预设是插件的集合，你也可以定义你自己的。

> 考虑到有时扩展现有的预设是不够的，[modify-babel-preset](https://www.npmjs.com/package/modify-babel-preset]允许你进一步配置基础预设，并以更灵活的方式配置。

## 在Webpack引入Babel

Babel可以单独使用，也可以将它引入webpack中使用。在开发过阶段，如果你使用的浏览器支持你是使用的语言特性,
且你不依赖任何自定义语言特性，那么跳过Babel处理是一个很好的选择。不过，在为生产编译代码阶段，通过Babel进行处理几乎成为了一种必需。

你可以通过在项目中引入 [babel-loader](https://www.npmjs.com/package/babel-loader)，然后再配置文件中引入它的配置。[babel-webpack-plugin](https://www.npmjs.com/package/babel-webpack-plugin)（这个插件不常用） 是其他的一个选择。

为了启动项目的babel转换，你可以定义一个 *webpack.config.babel.js* 配置文件。[interpret](https://www.npmjs.com/package/interpret) 包可以使用这个配置文件，并且它也支持其他的编译器。

> 鉴于 [Node](http://node.green/) 现在已经很好地支持ES2015规范。所以应用执行在Node环境时，你看可以不用在配置中引入Babel。

> 如果你使用 *webpack.config.babel.js*，要注意有无 `"modules": false,` 这个配置。如果想要使用ES2015模块，你需要去掉它。

### 配置 *babel-loader*

为了让 [babel-loader](https://www.npmjs.com/package/babel-loader) 在webpack中工作。首先，需要安装 *babel-loader* 和它的同版本的依赖 *@babel/core*：

```bash
npm install babel-loader @babel/core --save-dev
```

和往常一样，让我们定义一个 Babel 函数：

**webpack.parts.js**

```javascript
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});
```

然后，在你的主配置文件中引用它。如果你使用的是现代浏览器，你可以在表示生产阶段的那个模块引入它，如下面所示：

**webpack.config.js**

```javascript
const commonConfig = merge([
  ...
  parts.loadJavaScript({ include: PATHS.app }),
]);
```

即使你已经安装并在webpack中配置了babel，但还是少了一点关于babel的设置。你可以用 `.babelrc` 这样的点文件对babel进行详细的配置，webpack使用的其它的工具也都有一个相似的文件。

> 如果你试图将文件输出到根目录外，然后通过 *babel-loader* 处理它们，这将会失败。 这个 [issue](https://github.com/babel/babel-loader/issues/313) 经过讨论，有一个变通的方法，可以在项目的更高层级目录下维护 *.babelrc* ，然后通过webpack中的 `require.resolve` 解决Babel预设问题。

### 配置 *.babelrc*

在某些情况下，你需要用到 [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) 。Babel预设会根据你传入的环境变量启用插件可选择的插件。

首先安装babel预设：

```bash
npm install @babel/preset-env --save-dev
```

为了让Babel意识到预设的存在，你需要定义一个 *.babelrc* 。如果跳过ES2015规范中的module，你可以通过  *.babelrc* 中的定义来告诉Babel，但这样做会影响HMR运行，而生产中的构建则不会影响。你还可以通过它，将构建输出的运行环境限制为最新版本的Chrome。

你可以根据自己的项目要求调整目标的定义，你要遵循 [browserslist 标准](https://www.npmjs.com/package/browserslist) 即可。下面是一个样例配置：

**.babelrc**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
      }
    ]
  ]
}
```

现在执行 `npm run build -- --devtool false --mode development` 脚本命令，然后检查 *dist/main.js* 中的代码。

然后，在 `.babelrc` 中，只定义 `IE 8` ，然后再一次运行`npm run build -- --devtool false --mode development` 脚本命令，你会发现代码变为：

**dist/main.js**

```javascript
...
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Hello world";

  var element = document.createElement("div");

  element.className = "pure-button";
  element.innerHTML = text;

  return element;
});
...
```

特别注意函数是如何转换的。你可以尝试不同的浏览器定义和语言特性，然后查看输出是如何根据`.babelrc`进行更改。

## 转换语言特性

*babel-preset-env* 允许你将代码转换为某种特定的语言特性，来实现构建输出对旧版本浏览器的支持。为了实现这个功能，你需要启用 `useBuiltIns` 选项功能 (`"useBuiltIns": true`) ，然后安装 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) 依赖。你也可以通过 `import` 引入，或者配置webpack入口配置项为 `app: ["babel-polyfill", PATHS.app]` 。 *babel-preset-env* 根据浏览器的定义重写引入（import），然后只加载它们需要的plyfill。

*babel-polyfill* 的对象污染了全局作用域，如：`Promise`。对于这个问题，你可以用 [transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/) 选项，它可以作为一个Babel插件来启用，并且通过不需要全局变量的方式重写代码，来避免全局变量的问题。

> 某些 webpack 特性，如：*代码分割* 。在webpack处理了loader后，写基于 `Promise` 的代码到webpack的启动程序。这个问题可以被解决，通过使用（[shim](https://www.webpackjs.com/guides/shimming/#%E5%8A%A0%E8%BD%BD-polyfills)）来解决，如：`entry: { app: ["core-js/es6/promise", PATHS.app] }` 。

## Babel 知识点

通过 [*.babelrc* options](https://babeljs.io/docs/usage/options/) 还可以配置其他一些功能，如：ESLint，*.babelrc* 支持 [JSON5](https://www.npmjs.com/package/json5) 作为它的配置格式，这意味着你可以在源代码中包含注释，使用单引号字符串等。

有时候，你希望使用适合项目的实验性特性。虽然你可以在所谓的阶段预置中找到很多，但是一个一个地启用它们，然后它们组织到它们自己的预置，这虽然是一个好主意，但是除非你在做一个一次性的项目。如果你希望你的项目能够持续很长时间，那么最好记录你正在使用的特性。

Babel虽然很流行，但它并不是唯一的选择。[Buble](https://buble.surge.sh)也是一个值得体验的编译器。有一个实验性的[buble-loader](https://www.npmjs.com/package/buble-loader)允许你在webpack中使用它。虽然Buble不支持ES2015模块，但是webpack提供了这个功能。

## Babel 插件

也许Babel最大的优点是可以使用插件进行扩展：

* [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) 重写了模块导入，这样你就可以不用使用一个确切的路径引入模块，而是像 `import { Button } from "antd";` 这样引入模块。
* [babel-plugin-import-asserts](https://www.npmjs.com/package/babel-plugin-import-asserts) 可以在你导入的时候对已定义的内容做断言。
* [babel-plugin-jsdoc-to-assert](https://www.npmjs.com/package/babel-plugin-jsdoc-to-assert) 将 [JSDoc](http://usejsdoc.org/) 注释转化为可运行的断言。
* [babel-plugin-log-deprecated](https://www.npmjs.com/package/babel-plugin-log-deprecated) 为注释中含有 `@deprecate` 的注释函数添加 `console.warn` 。
* [babel-plugin-annotate-console-log](https://www.npmjs.com/package/babel-plugin-annotate-console-log) 用调用上下文的信息注释 `console.log` 调用，因此更容易看到他们的位置。
* [babel-plugin-sitrep](https://www.npmjs.com/package/babel-plugin-sitrep) 记录函数的所有赋值并打印它们。
* [Babel -plugin-webpack-loaders](https://www.npmjs.com/package/babel-plugin-webpack-loaders)允许你通过Babel使用特定的webpack loader。
* [babel-plugin-syntax-trailing-function-commas](https://www.npmjs.com/package/babel-plugin-syntax-trailing-function-commas) 为函数添加结尾逗号支持。
* [babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types) 允许你从生产构建中删除 `propType` 相关代码。它还允许组件作者生成包装好的代码，以便在‘DefinePlugin’设置环境可以像书中讨论的那样发挥作用。

> 可以通过[Babel -register](https://www.npmjs.com/package/babel-register)或[Babel -cli](https://www.npmjs.com/package/babel-cli)将Babel与Node联系起来。如果你想在不使用webpack的情况下通过Babel执行代码，那么这些包非常方便。

## 根据环境开启预设和插件

Babel允许你通过它的 [env option](https://babeljs.io/docs/usage/babelrc/#env-option) 控制每个环境使用哪些预置和插件。通过这种方式，你可以管理每个构建目标的Babel行为。

`env` 会检测 `NODE_ENV` 和 `BABEL_ENV` ，并依据它们为构建添加功能。如果 `BABEL_ENV` 被设置，它将覆盖 `NODE_ENV` 。可参考下面这个配置：

**.babelrc**

```json
{
  ...
  "env": {
    "development": {
      "plugins": [
        "annotate-console-log"
      ]
    }
  }
}
```

任何共享预置和插件仍然对所有目标可用。`env` 允许你进一步专门化Babel配置。

可以通过如下的设置将webpack环境传递给Babel：

**webpack.config.js**

```javascript
module.exports = mode => {
  process.env.BABEL_ENV = mode;

  ...
};
```

> `env` 的运作方式很微妙。需要考虑记录 `env` ，并确保它与你的Babel配置相匹配，否则你期望的功能不会应用到你的构建中。

## 配置 TypeScript

微软的[TypeScript](http://www.typescriptlang.org/)是一种编译过的语言，类似于Babel。除了JavaScript之外，它还可以提供类型定义。一个好的编辑器可以获得这些信息并提供更好的编辑体验。更强的类型对于开发是有价值的，因为声明类型契约变得更容易。

与Facebook的类型检查器Flow相比，TypeScript是一个更安全的选项。因此，你会发现它有更多的预设类型定义，总体来说，支持的效果应该更好。

你可以在webpack中引用下面的loader来处理TypeScript ：

* [ts-loader](https://www.npmjs.com/package/ts-loader)
* [awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)

>  有一个可用于ESLint的 [TypeScript语法解析](https://www.npmjs.com/package/typescript-eslint-parser)插件。也可以用 [tslint](https://www.npmjs.com/package/tslint) 来实现对TypeScript的语法检测。

## 配置 Flow

[Flow](https://flow.org/)根据代码及其类型注释执行静态分析。你必须将其安装为一个单独的工具，然后根据你的代码运行它。有一个[flow-status-webpack-plugin](https://www.npmjs.com/package/flow-status-webpack-plugin)允许你在开发期间通过webpack运行它。

如果你使用React，Babel的特定预设会通过[Babel-plugin-syntax-flow](https://www.npmjs.com/package/babel-plugin-syntax流)来完成大部分工作。它可以剥离流注释，并将你的代码转换为可以进一步传输的格式。

还有一个[babel-plugin-typecheck](https://www.npmjs.com/package/babel-plugin-typecheck])，允许你基于流注释执行运行时检查。[flow-runtime](https://codemix.github.io/flow-runtime/)更进一步，提供了更多的功能。这些方法补充了流静态检查器，并允许你捕获更多的问题。

> [flow-coverage-report](https://www.npmjs.com/package/flow-coverage-report)显示流类型注释包含了多少代码。

## 总结

Babel已经成为开发人员不可或缺的工具，因为它可以将标准与较老的浏览器连接起来。即使你的目标是现代浏览器，通过Babel进行转换也是一种选择。

内容回顾：

* Babel让你可以控制要支持的浏览器。 它转换 ES2015+ 特性为旧版本浏览器理解的特性。*babel-preset-env* 是很有用的，因为它可以你定义的要支持的浏览器来选择要编译的特性和要启用的polyfill。
* Babel允许你使用实验语言特性。你可以找到许多插件，通过优化来改善开发体验和产品构建。
* 可以根据开发目标启用Babel功能。通过这种方式，你可以确保在正确的位置使用了正确的插件。
* 除了Babel之外，webpack还支持其他解决方案，比如TypeScript或Flow。Flow可以作为Babel的补充，而TypeScript表示d对整个语言的JavaScript编译。

