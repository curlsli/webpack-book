# Tree Shaking

`Tree shaking` 是需要使用ES2015模块定义才能起作用的功能。你可以静态地分析模块定义而不运行它，webpack可以告诉代码的哪些部分正在使用，哪些部分没有。可以通过扩展应用程序，并在那里添加应该删除的代码来验证此行为。

> `Tree shaking` 通过[webpack-common-shake](https://www.npmjs.com/package/webpack-common-shake)对CommonJS模块定义进行了一定程度的处理工作。由于大多数npm软件包都是使用旧版定义编写的，因此该插件具有价值。

## Tree-Shaking demo

要 `Tree shaking` 代码，你必须定义一个模块，并仅使用其部分代码。模块定义如下：

`src/shake.js`

```javascript
const shake = () => console.log("shake");
const bake = () => console.log("bake");

export { shake, bake };
```

要确保使用部分代码，请更改应用程序入口点：

`src/index.js`

```javascript
...
import { bake } from "./shake";

bake();

...
```

运行 `npm run build` 脚本命令，然后检查构建输出 `dist/main.js`，它应该只包含 `console.log("bake")`，而没有 `console.log("shake")` 。如果是这样，那么这个功能就实现了。

为了更好地了解webpack用于 `Tree shaking` 的内容，你可以运行 `npm run build - --display-used-exports` 脚本命令。在终端中，你看到额外的输出，如：`[no exports used]` 或 `[only some exports used: bake]`。

> 如果您使用`UglifyJsPlugin`，请启用类似效果的消息提示。除了其他消息之外，你应该看到诸如`Dropping unused variable treeShakingDemo [./src/component.js:17,6]`之类的信息。

> 有一个 CSS 模块相关的 `Tree shaking` loader ，如：[dead-css-loader](https://github.com/simlrh/dead-css-loader)。

## 包级别的Tree-Shaking

同样的想法适用于使用ES2015模块定义的依赖项。鉴于相关的包装标准仍在修订中，在使用此类包装时必须小心。由于这个原因，Webpack尝试着去解析 `package.json` 的 `module`字段。

对于像webpack这样的工具来允许 `Tree shaking` npm包，你应该创建一个构建，它已经转换了除ES2015模块定义之外的所有其他内容，然后通过 `package.json` 的 `module` 字段指向它。在Babel术语中，你必须通过设置 `"modules"：false` 让webpack来管理ES2015模块。

为了最大限度地利用外部软件包的 `Tree shaking` ，你必须使用[babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)重写导入，以便他们使用webpack的 `Tree shaking` 逻辑。有关详细信息，请参阅[webpack issue＃2867](https://github.com/webpack/webpack/issues/2867)。

> [SurviveJS - Maintenance](https://survivejs.com/maintenance/packaging/building/) 介绍如何编写包，以便可以对它们应用 `Tree shaking` 。

## 总结

`Tree shaking`是一种潜在的强大技术。为了让源代码受益于`Tree shaking`，必须使用ES2015模块语法引入npm包，并且必须通过 `package.json` 的 `module` 的字段来公开，这样webpack可以获取到它。

内容回顾：

* `Tree shaking` 根据静态代码分析丢弃未使用的代码片段。Webpack在遍历依赖关系图时，为你执行此过程。
* 要从 `Tree shaking` 中受益，你必须使用ES2015模块定义。
* 作为软件包(npm)作者，你可以专门提供支持ES2015模块的软件包版本，其余版本已转换为ES5

在下一章中，将详细的介绍如何在webpack中管理环境变量。
