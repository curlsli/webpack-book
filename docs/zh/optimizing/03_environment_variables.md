# 环境变量

有时，你的一部分代码应该仅在开发期间执行。或者在构建中，你可能使用一些非生产模式下的实验性功能。通过控制 `环境变量` 得很有价值，你可以使用它们来切换功能。

由于JavaScript压缩可以删除死代码（`if（false）`），你可以构建这个想法并编写转换成这个形式的代码。Webpack的`DefinePlugin`允许替换`自由变量`，这样你就可以将`if(process.env.NODE_ENV === "development")`代码转换为 `if（true）` 或 `if（false）` 取决于环境。

你可以找到依赖此行为的包。React可能是早期采用该技术的最着名的例子。使用 `DefinePlugin` 可以在某种程度上降低React生产构建的大小，并且你也可以看到与其他包类似的效果。

Webpack4.x根据给定的模式设置 `process.env.NODE_ENV` 。因此了解技术及其工作原理是件好事。

## `DefinePlugin` 的原理

为了更好的了解 `DefinePlugin` 的原理，可以参考下面的例子：

```javascript
var foo;

// Not free due to "foo" above, not ok to replace
if (foo === "bar") {
  console.log("bar");
}

// Free since you don't refer to "bar", ok to replace
if (bar === "bar") {
  console.log("bar");
}
```

如果用 `foobar` 这样的字符串替换 `bar`，那么你最终会得到如下代码：

```javascript
var foo;

// Not free due to "foo" above, not ok to replace
if (foo === "bar") {
  console.log("bar");
}

// Free since you don't refer to "bar", ok to replace
if ("foobar" === "bar") {
  console.log("bar");
}
```

Further analysis shows that `"foobar" === "bar"` equals `false` so a minifier gives the following:

```javascript
var foo;

// Not free due to "foo" above, not ok to replace
if (foo === "bar") {
  console.log("bar");
}

// Free since you don't refer to "bar", ok to replace
if (false) {
  console.log("bar");
}
```

使用压缩来消除 `if` 声明的代码：

```javascript
var foo;

// Not free, not ok to replace
if (foo === "bar") {
  console.log("bar");
}

// if (false) means the block can be dropped entirely
```

消除是`DefinePlugin`的核心思想，它允许切换。压缩执行分析并切换代码的整个部分。

## 配置 `process.env.NODE_ENV`

和以前一样，将这个原理封装到一个函数中。由于webpack替换自由变量，你可以通过 `JSON.stringify` 推送它。 你最终会得到一个类似`'demo'`的字符串，然后webpack将它插入它找到的插槽中：

**webpack.parts.js**

```javascript
const webpack = require("webpack");

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};
```

在`webpack.config.js`中引入它：

```javascript
const commonConfig = merge([
  ...
  parts.setFreeVariable("HELLO", "hello from config"),
]);
```

最后，在 `src/component.js` 中，添加如下代码：

```javascript
// export default (text = "Hello world") => {
export default (text = HELLO) => {
  const element = document.createElement("div");

  ...
};
```

运行应用程序，你将在按钮中看到新的信息。

> [webpack-conditional-loader](https://www.npmjs.com/package/webpack-conditional-loader) 根据代码注释执行类似的操作。它可以用来消除整个代码块。

> `webpack.EnvironmentPlugin(["NODE_ENV"])` 允许你使用 `环境变量` 的快捷键。它依赖 `DefinePlugin` ，你可以通过 `process.env.NODE_ENV` 实现相似的效果。

## 使用Babel代替自由变量

[babel-plugin-transform-inline-environment-variables](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) 可以实现相似的效果。[babel-plugin-transform-define](https://www.npmjs.com/package/babel-plugin-transform-define) 和 [babel-plugin-minify-replace](https://www.npmjs.com/package/babel-plugin-minify-replace) 是其它可实现的替代方案。

## 选择使用的模块

本章中讨论的技术可用于根据环境选择使用模块。如上所示，基于 `DefinePlugin` 的拆分允许你选择要使用的代码分支以及要丢弃的代码。参考下面的文件结构：

```bash
.
└── store
    ├── index.js
    ├── store.dev.js
    └── store.prod.js
```

你根据环境变量选择 `dev` 或 `prod` ， 在 `index.js` 中做了这个工作：

```javascript
if (process.env.NODE_ENV === "production") {
  module.exports = require("./store.prod");
} else {
  module.exports = require("./store.dev");
}
```

Webpack can pick the right code based on the `DefinePlugin` declaration and this code. You have to use CommonJS module definition style here as ES2015 `import`s don't allow dynamic behavior by design.

> `aliasing` 是一个相似的技术，[`Consuming Packages`](https://lvzhenbang.github.io/webpack-book/zh/techniques/06_consuming.html) 章节中有详细的介绍。

## 总结

设置环境变量，可以控制构建的输出中包含哪些模块。

内容回顾：

* webpack通过 `DefinePlugin` 和 `EnvironmentPlugin` 使用 `环境变量` 。后者将系统级环境变量映射到源。
* `DefinePlugin` 通过 `free variables` 操作环境变量。当webpack分析源代码时，它会替换它们。你可以使用Babel插件获得类似的结果。
* 鉴于压缩清除了死代码，使用插件允许你从生成的构建中删除代码。
* 插件启用模块级模式。通过实现包装器，你可以选择webpack包含哪个文件到生成的构建中。
* 除了这些插件之外，你还可以找到其他与优化相关的插件，这些插件允许你以多种方式控制构建结果。

为确保构建具有良好的缓存失效行为，将在下一章中[将hash值注入到生成的文件名中](https://lvzhenbang.github.io/webpack-book/zh/optimizing/04_adding_hashes_to_filenames.html)。 这样客户端会注意到静态资源是否已更改，并且可以获取更新的版本。