# 介绍

[Webpack](https://webpack.js.org/) 简化Web开发通过解决一个基本的问题: 打包。 它处理各种静态资源，例如JavaScript, CSS, 和 HTML，然后把它们成一种浏览器能运行的代码格式。 由于做的好，减少了web开发带来的大量痛苦。

由于它的配置驱动实现方式，所以不是一个容易学习的工具, 但是它拥有难以置信的强大力量。 这篇指导的目的是你在开始使用webpack的时候起到帮助作用，然后拥有超越基础的能力。

## Webpack是什么

Web浏览器被设计用来执行 HTML, CSS, 和 JavaScript。随着项目规模的增长，跟踪和配置所有这些形的文件变得太复杂，没有帮助将变得无法管理。Webpack就是为了解决这些问题而设计的。 项目管理的复杂性是Web开发的基本问题之一，那么解决这个问题的帮助将显而意见。

Webpack不仅仅是一个有用的打包工具，还集成了很多工具。任务运行工具（Task runners）, 像Grunt和Gulp这样的高级工具。问题是你需要手写工作流，但Webpack将这些问题推给了打包工具，这是一个明显的进步。

{pagebreak}

### Webpack如何改变现状

Webpack takes another route. It allows you to treat your project as a dependency graph。通过标准的 `require` 或 `import` 语法，你可以在你的项目中的 *index.js* 文件中添加你需要的依赖。你也可以通过同样的方式引入你的样式文件和其他静态资源（assets）。

webpack为你完成所有的预处理工作，然后根据你定义的配置和你写的代码生成打包文件。这种声明方式是通用的但学习起来很难。

当你理解了webpack的工作原理后，它将变成一个你工作中不可或缺的工具。这本书的目的就是为了初始化你的学习曲线，甚至让你更进一步。

## 你会学到什么

这本书完善了[webpack官方文档](https://webpack.js.org/)。这本书可以看作它的伴侣。

本书教你写用于开发和生产目的可组合的webpack配置。本书所涵盖的高级技术可以让你最大限度地使用webpack4.x。

{pagebreak}

## 该书是如何组织的

本书开发解释webpack是什么。之后，你会发现很多章节从不同的角度讲解webpack。在阅读这些章节时，你将形成你自己的webpack配置，同时掌握基本的技术。

这本书分为以下几部分:

* **Developing** 让你用webpack启动和运行项目。这一部分介绍诸如浏览器自动刷新的一些特性，以及解释如何合成你的配置并让它保持可维护性。
* **Styling** 侧重样式的相关主题。你将学习如何使用webpack加载样式，以及介绍如何配置来自动添加不同浏览器厂商支持的样式前缀。
* **Loading** 详细介绍webpack加载起的意义，并向你展示如何加载静态资源，如：images, fonts, 和 JavaScript。
* **Building** 介绍source-map， 并讲解打包和代码分离的思想。你将学会如何整理你的生产模式配置。
* **Optimizing** 将你的的构建提升到生产质量级别，然后进行一系列小的调整使最终打包文件变得更小，你将学会如何调整来提升webpack性能。
* **Output** 讲解webpack输出的相关技术。与名字无关，webpack不仅用于web。webpack可是实现多页面的配置， 并学习服务端渲染的思想ssr（Server Side Rendering）。
* **Techniques** 讲解技术思想，如：动态加载，web workers, 国际化（i118），部署你的项目, 以及webpack添加npm依赖.
* **Extending** 展示如何用加载器（loader）和插件（plugins）扩展webpack。

最后，有一个结束章节简短的概括了本书的主要观点。它包含一个技术清单，可以让你有条不紊的完成项目。

The appendices at the end of the book cover secondary topics and sometimes dig deeper into the main ones.根据你的兴趣，你可以不按照顺序去访问它们。

书的结尾附录了 *Troubleshooting* 章节介绍webpack报给你一个错误时，你该做什么。它讲述的是一个过程, 使你明白该做什么，以及如何调试这个问题。当你有疑问，你可以翻阅书的附录。如果你不确定一个术语及其含义，你可以查阅本书最后的 *词汇表* 。

## 谁适合读这本书

你需要有基本的 JavaScript, Node, 和 npm知识。如果你知道一些webpack知识，那将更好。通过读这本书，你将加深对这些工具的理解。

如果你对webapck不太了解，可以考虑仔细阅读前面的部分。你也可以挑选哪些你认为值得阅读的部分；反之，略读（跳读）并选择你认为有价值的技术。

如果你已经很了解webpack，那么在这本书中还有一些东西适合你，略读以下，看看是否学到了新技术，尤其要阅读各章节的结尾部分和各章节的总结。

## 书的版本

鉴于这本书由于创新的速度而获得了相当数量的维护和改进，因此有了一个版本化计划。 每个新版本的发行说明都保存在 [博客](https://survivejs.com/blog/)上。你可以用GitHub *compare* 工具达成这个目标。 例如:

```
https://github.com/survivejs/webpack-book/compare/v2.1.7...v2.4.6
```

页面显示了在给定版本范围内提交到项目的个人提交。你可以看到书中那些改变的线条.

本书的当前版本号为 **2.4.6** 。

## 获取支持

如果你遇到麻烦，或者对某些内容有问题，有下面几种选择可选：

* 通过 [GitHub Issue Tracker](https://github.com/survivejs/webpack-book/issues) 联系我。
* 加入我的 [Gitter聊天室](https://gitter.im/survivejs/webpack)。
* 在 [info@survivejs.com](mailto:info@survivejs.com)上给我发送电子邮件。
* 在 [SurviveJS AmA](https://github.com/survivejs/ama/issues) 向我提问任何问题。

如果你在Stack Overflow上发送一个问题，添加一个 **survivejs** 标签。在 Twitter上，添加一个hash标签（**#survivejs**）为同一个目的。

## 其他资料

You can find more related material from the following sources:

* Join the [mailing list](https://eepurl.com/bth1v5) for occasional updates.
* Follow [@survivejs](https://twitter.com/survivejs) on Twitter.
* Subscribe to the [blog RSS](https://survivejs.com/atom.xml) to get access interviews and more.
* Subscribe to the [Youtube channel](https://www.youtube.com/channel/UCvUR-BJcbrhmRQZEEr4_bnw).
* Check out [SurviveJS related presentation slides](https://presentations.survivejs.com/).

## 致谢

Big thanks to [Christian Alfoni](http://www.christianalfoni.com/) for helping me craft the first version of this book. This is what inspired the entire SurviveJS effort. The version you see now is a complete rewrite.

This book wouldn’t be half as good as it's without patient editing and feedback by my editors [Jesús Rodríguez](https://github.com/Foxandxss), [Artem Sapegin](https://github.com/sapegin), and [Pedr Browne](https://github.com/Undistraction). Thank you.

This book wouldn’t have been possible without the original "SurviveJS - Webpack and React" effort. Anyone who contributed to it deserves my thanks. You can check that book for more accurate attributions.

Thanks to Mike "Pomax" Kamermans, Cesar Andreu, Dan Palmer, Viktor Jančík, Tom Byrer, Christian Hettlage, David A. Lee, Alexandar Castaneda, Marcel Olszewski, Steve Schwartz, Chris Sanders, Charles Ju, Aditya Bhardwaj, Rasheed Bustamam, José Menor, Ben Gale, Jake Goulding, Andrew Ferk, gabo, Giang Nguyen, @Coaxial, @khronic, Henrik Raitasola, Gavin Orland, David Riccitelli, Stephen Wright, Majky Bašista, Gunnari Auvinen, Jón Levy, Alexander Zaytsev, Richard Muller, Ava Mallory (Fiverr), Sun Zheng’an, Nancy (Fiverr), Aluan Haddad, Steve Mao, Craig McKenna, Tobias Koppers, Stefan Frede, Vladimir Grenaderov, Scott Thompson, Rafael De Leon, Gil Forcada Codinachs, Jason Aller, @pikeshawn, Stephan Klinger, Daniel Carral, Nick Yianilos, Stephen Bolton, Felipe Reis, Rodolfo Rodriguez, Vicky Koblinski, Pyotr Ermishkin, Ken Gregory, Dmitry Kaminski, John Darryl Pelingo, Brian Cui, @st-sloth, Nathan Klatt, Muhamadamin Ibragimov, Kema Akpala, Roberto Fuentes, Eric Johnson, Luca Poldelmengo, Giovanni Iembo, Dmitry Anderson , Douglas Cerna, and many others who have contributed direct feedback for this book!
