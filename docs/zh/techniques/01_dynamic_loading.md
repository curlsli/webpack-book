# 动态加载

虽然你通过学习 *代码分割* 章节，已经了解了webpack的众多功能，但还有更多功能。Webpack通过`require.context` 提供了许多动态处理代码的方法。

## 用 `require.context` 实现动态加载

[require.context]（https://webpack.js.org/api/module-methods/#require-context）提供了一种代码分割的一般形式。假设你正在webpack上编写静态站点生成器。你可以通过包含Markdown文件的 `./ pages /` 目录在目录结构中添加你的站点内容。

这些文件中的每一个都有一个用于metadata的YAML前端。可以基于文件名确定每个页面的URL并将其映射为站点。要使用 `require.context` 对这个想法进行建模，你可能会得到如下代码：

```javascript
// 通过`yaml-frontmatter-loader`和`json-loader`处理页面。
// `yaml-frontmatter-loader`转换文件中的YAML，
// `json-loader`将其转换为JSON结构以便稍后使用。markdown尚未处理。
const req = require.context(
  "json-loader!yaml-frontmatter-loader!./pages",
  true, // Load files recursively. Pass false to skip recursion.
  /^\.\/.*\.md$/ // Match files ending with .md.
);
```

> 可以将loader定义添加到webpack配置。内联格式用于保持示例的最小化.

`require.context` 返回一个函数给 `require`。它还知道它的模块 `id`，它提供了一个`keys（）` 方法来计算上下文的内容。以下是示例代码：

```javascript
req.keys(); // ["./demo.md", "./another-demo.md"]
req.id; // 42

// {title: "Demo", body: "# Demo page\nDemo content\n\n"}
const demoPage = req("./demo.md");
```

该技术可用于其他目的，如：测试或为添加webpack可监视的文件。在这种情况下，你可以在文件中设置`require.context`，然后通过 `webpack` 的 `entry`指向该文件。

> 可以生成一个用来展示足够信息的站点，如： [Antwar](https://github.com/antwarjs/antwar)。

## 用动态的 `import` 实现动态路径

同样的想法适用于动态`import`。你可以传递部分路径，而不是传递完整路径。Webpack在内部设置上下文。如下面的例子：

```javascript
// Set up a target or derive this somehow
const target = "fi";

// Elsewhere in code
import(`translations/${target}.json`).then(...).catch(...);
```

同样的想法适用于 `require`，因为webpack可以执行静态分析。如：`require（`assets/modals /${imageSrc}.js`）;` 将生成一个上下文，并根据传递给`require`的`imageSrc`来解析图像。

> 使用动态导入时，请在路径中指定文件扩展名，以便通过保持较小的上下文来提高性能。

## 多个 `require.context` 的合并

多个单独的`require.context`，可以通过将它们包装在函数后面来组合成一个：

```javascript
const { concat, uniq } = require("lodash");

const combineContexts = (...contexts) => {
  function webpackContext(req) {
    // Find the first match and execute
    const matches = contexts
      .map(context => context.keys().indexOf(req) >= 0 && context)
      .filter(a => a);

    return matches[0] && matches[0](req);
  }
  webpackContext.keys = () =>
    uniq(
      concat.apply(null, contexts.map(context => context.keys()))
    );

  return webpackContext;
};
```

## 动态路径的处理方案

鉴于这里讨论的方法依赖于静态分析，webpack必须找到有问题的文件，它并不适用于所有可能的情况。 如果您需要的文件在另一台服务器上或必须通过特定端点访问，那么webpack是不够的。

在这种情况下，考虑使用浏览器端loader，如：[$ script.js]（https://www.npmjs.com/package/scriptjs）或[little-loader]（https://www.npmjs.com/package/little-loader ）。

## 总结

尽管`require.context`是一个小众功能，但要注意它的优势。如果你必须对文件系统中可用的多个文件执行查找，它将变得很有用。如果你的查找比这更复杂，则必须使用其他允许你执行加载运行时的替代方法。

内容回顾：

* `require.context` 是一个经常隐藏在幕后的高级功能。 如果必须对大量文件执行查找，请使用它。
* 如果以某种形式编写一个动态`import`，webpack会生成一个`require.context` 调用。在这种情况下，代码读取稍微好一些。
* 这些技术仅适用于文件系统。如果你要对网址进行操作，则应该考虑客户端解决方案。

在下一章中，将详细介绍在webpack中使用web workers。
