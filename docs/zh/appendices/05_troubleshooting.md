# 问题

使用webpack可能会产生各种运行时警告或错误。通常，构建的特定部分会因某种原因而失败。可以使用下面的手段来解决这些问题：

1. 向webpack传递 `--display-error-details` 参数，这样可以得到关于错误的更精确的信息。 如：`npm run build -- --display-error-details` 。
2. 仔细研究错误的出处。有时你可以推断出上下文有什么问题。如果要解析模块，它可能不会通过你期望的loader。
3. 尝试了解错误的来源。它来自你的代码，依赖项或Webpack？
4. 删除代码，直到错误消失。尽可能简化以解决问题。
5. 如果代码在另一个项目中工作，请找出不同之处。项目之间的依赖关系可能会有所不同，或者设置会有所不同。在最糟糕的情况下，你依赖的包已经获得了回归。出于这个原因，使用 `lockfile` 是一个好主意。
6. 仔细研究相关的包。有时候查看 `package.json` 可以发现有问题的包。你使用的依赖包可能无法按预期方式解析。
7. 在线搜索错误。或许其他人遇到过这样的问题。[Stack Overflow](https://stackoverflow.com/questions/tagged/webpack) 和 [the official issue tracker](https://github.com/webpack/webpack/issues) 是一个很好的查找来源。
8. 启用 `stats: "verbose"` 功能，以便获取更多的webpack输出信息。[官方文档](https://webpack.js.org/configuration/stats/) 提供详细的使用说明。
9. 在错误的附近添加一个临时的 `console.log` ，这样可以更深入的了解问题。一个更好的选择是 [Chrome Dev-Tools](https://medium.com/webpack/webpack-bits-learn-and-debug-webpack-with-chrome-dev-tools-da1c5b19554)。
10. 在[Stack Overflow](https://stackoverflow.com/questions/tagged/webpack) 或 [use the official Gitter channel](https://gitter.im/webpack/webpack) 上进行提问。
11. 如果上面的方法都失败了，你确信你发现了一个bug， 可以在[官方的issue-tracker](https://github.com/webpack/webpack/issues) 上报告一个错误。如果它是一个依赖的问题，请仔细遵循问题模板，并提供最小的可运行示例，因为这有助于解决问题。

有时可以快速将错误丢弃到搜索引擎并获得答案。但最好还是有一个好的调试顺序。如果你的配置在过去有效，你还可以考虑使用[git bisect](https://git-scm.com/docs/git-bisect) 之类的命令来弄清楚发生了什么。

接下来将详细的介绍最常见的错误以及它们的解决方案。

## ERROR in Entry module not found

如果设置不存在的入口路径点，就会出现这个错误。错误消息告诉你webpack找不到什么路径。

## ERROR ... Module not found

有两种情况你会得到这个错误。破坏loader定义，使其指向不存在的loader；破坏代码中的导入路径，使其指向不存在的模块。这条错误信息指出了应该如何修复。

## Module parse failed

尽管webpack可以很好地解析你的模块，但是它仍然不能构建它们。如果你正在使用loader不理解的语法，这种情况可能会发生。你可能忘记向处理过程传递某些内容。

## Loader Not Found

还有另一个与loader相关的错误。如果存在一个与没有实现loader接口的包，它与loader的名称匹配webpack就会匹配该包，并给出一个运行时错误，说明该包不是loader。

这个错误可能是用 `loader: "eslint"` 代替了 `loader: "eslint-loader"`。如果loader完全不存在，那么 `Module not found` 这个错误就会出现。

## Module build failed: Unknown word

这个错误属于一类的错误。解析文件成功，但语法未知。问题很可能是输入错误，但是当Webpack跟随导入，并遇到它不理解的语法时，这个错误就会发生。这很可能意味着该特定文件类型的loader丢失。

## SyntaxError: Unexpected token

`SyntaxError` 是另一类的错误。如果你使用的是与ES2015语法不一致的UglifyJS，那么这个错误是可能的。当遇到它无法识别的语法结构时，它会引发错误。

## DeprecationWarning

特别是webpack被更新到一个新的主要版本之后，需要Node提供的 `DeprecationWarning` 参数。 你使用的插件或loader的更新，通常需要的改变很少。为了弄清楚警告从何而来，在Node中运行webpack：`node --trace-deprecation node_modules/.bin/webpack --env production` 。

向Node传递 `--trace-deprecation` 参数，可以指导警告的来源。用 `--trace-warnings` 参数是另一个选择，它将捕获所有警告的跟踪信息，而不仅仅是跟弃用相关的。

## 总结

这些只是错误的例子。webpack方面发生了特定的错误，但其他的错误都来自它通过loader和插件使用的第三方依赖包。逐步简化你的项目是一个很好的方案，因为它可以更容易地理解错误发生的位置。

在大多数情况下，如果你知道错误在哪里，错误几乎都可以解决；但在最坏的情况下，你可能碰巧遇到工具自身需要修复的一个bug。在这种情况下，你应该提供有关项目的高质量报告来帮助解决它。