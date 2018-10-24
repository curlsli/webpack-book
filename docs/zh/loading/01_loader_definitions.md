# Loader 的基本定义

Webpack提供了灵活的配置方法来使用模块loader。Webpack2.x 引入`use`这个选项，来简化在webpack中引入loader。在这里选择绝对路径是一个好主意，因为它们允许你在不破坏预设的情况下移动配置。

另一个方法是使用 `context` 选项，它可以通过改变入口点和loader的解析来实现相似的效果。它不影响输出，你仍然需要在这里用绝对路径或者`/` 。

即使你使用了 `include` 和 `exclude` 规则，但依赖仍然可以从 *node_modules* 引入并工作，这是因为它们就是这样实现的，这些依赖大多数斗志经过严格的测试的，所以基本不存在什么问题，没必要再进行一遍解析，这样只引用不解析，可以大大提高构建编译效率。这将在 *[Consuming Packages](https://lvzhenbang.github.io/webpack-book/dist/zh/techniques/06_consuming.html)* 这一章详解。

> `include`/`exclude` 用在 *node_modules* 目录上可以极大的提高webpack的效率。因为webpack默认情况下，是需要处理和遍历引入项目中的所有JavaScript，通过使用`include`/`exclude`，你可以避免这个引入。其他类型的文件没有这个问题。

## 剖析Loader

Webpack 可以通过 *loaders* 实现对多种文件格式的处理，它同样支持由JavaScript模块变化而来的很多模块格式。处理他们的思想相同。你总是能够配置一个或几个loader实现对你项目的文件的处理。

下面是webpack使用Babel对JavaScript的处理：

**webpack.config.js**

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        // **Conditions** to match files using RegExp, function.
        test: /\.js$/,

        // **Restrictions**
        // Restrict matching to a directory. This
        // also accepts an array of paths or a function.
        // The same applies to `exclude`.
        include: path.join(__dirname, "app"),
        exclude(path) {
          // You can perform more complicated checks  as well.
          return path.match(/node_modules/);
        },

        // **Actions** to apply loaders to the matched files.
        use: "babel-loader",
      },
    ],
  },
};
```

> 如果你对RegExp匹配不太了解，你可以考虑使用一个在线工具，如： [regex101](https://regex101.com/)， [RegExr](http://regexr.com/)，或者[Regexper](https://regexper.com)。

## Loader 的执行顺序

使用loader你需要明白这一点，webpack的loader是按照从右到左，从下到上的顺序来逐个使用的。理解从右到左的规则，可以借助于函数的使用，你可以把 `use: ["style-loader", "css-loader"]` 这样的loader定义看作 `style(css(input))` 。

可以通过下面的例子来理解rule的使用：

```javascript
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
},
```

你可以把这种从右到左的规则分开，写成这种从下到上的形式：

```javascript
{
  test: /\.css$/,
  use: "style-loader",
},
{
  test: /\.css$/,
  use: "css-loader",
},
```

### 使用强制顺序

即使上面的规则可以任意的配置，你也可以使用强制的方式来定义某个特定的规则的执行顺序。你可以使用 `enforce` 字段，它可以被设置为 `pre` 或 `post`，用来强调这个特定规则是在其他所有loader规则之前或之后。

语法检测是使用`enforce`的一个好例子。这是因为构建除了语法检测这件事儿之外，应该在它没有做任何其他的事之前，就应该失败（如果入到遇到错误）。使用 `enforce: "post"` 意味着你要对所有源代码执行loader操作。

因此你应该像下面这样配置：

```javascript
{
  // Conditions
  test: /\.js$/,
  enforce: "pre", // "post" too

  // Actions
  use: "eslint-loader",
},
```

如果你小心地将声明与 `test` 相关的其他loader串联起来，那么就有可能在不使用 `enforce `的情况下实现相同的效果。使用 `enforce` 可以消除这样做的必要性，那么你就可以将loader拆分为更容易组合的部分。

## 向Loader传递参数

有一个查询格式，允许传递参数给loader：

```javascript
{
  // Conditions
  test: /\.js$/,
  include: PATHS.app,

  // Actions
  use: "babel-loader?presets[]=env",
},
```

webpack也接受这种entries和source引入的配置方式。这种方式在个人的使用上很方便，但建议最好还是使用可读性更好的方式。

`use` 这种方式更容易让人接受：

```javascript
{
  // Conditions
  test: /\.js$/,
  include: PATHS.app,

  // Actions
  use: {
    loader: "babel-loader",
    options: {
      presets: ["env"],
    },
  },
},
```

如果你需要使用不止一个loader，你可以给 `use`设置一个数组：

```javascript
{
  test: /\.js$/,
  include: PATHS.app,

  use: [
    {
      loader: "babel-loader",
      options: {
        presets: ["env"],
      },
    },
    // Add more loaders here
  ],
},
```

## 用函数的形式配置`use`

你可以在一个更高的层面上组合配置。webpack 允许你使用函数的形式扩展 `use` ，来向配置中添加loader，参考例子如下：

```javascript
{
  test: /\.css$/,

  // `resource` refers to the resource path matched.
  // `resourceQuery` contains possible query passed to it
  // `issuer` tells about match context path
  use: ({ resource, resourceQuery, issuer }) => {
    // You have to return something falsy, object, or a
    // string (i.e., "style-loader") from here.
    //
    // Returning an array fails! Nest rules instead.
    if (env === "development") {
      return {
        use: {
          loader: "css-loader", // css-loader first
          rules: [
            "style-loader", // style-loader after
          ],
        },
      };
    }
  },
},
```

这种方式可以用在不同形式的组合配置中。

## 内联的基本定义

虽然配置级别loader定义比较受欢迎，但是你也可以使用内联的loader定义：

```javascript
// Process foo.png through url-loader and other
// possible matches.
import "url-loader!./foo.png";

// Override possible higher level match completely
import "!!url-loader!./bar.png";
```

这种方法的问题在于它将源代码与webpack结合在一起。尽管如此，它仍然不失为是一种很好的使用方式。由于配置入口经过相同的机制，所以也以同样的格式在那里工作：

```javascript
{
  entry: {
    app: "babel-loader!./app",
  },
},
```

## 可使用的匹配文件方式

`test` 与 `include` 或 `exclude`结合在一起形成约束匹配，这是最常见的文件匹配方法。它们接受如下所列的数据类型：

* `test` - RegExp, string, function, object, array。
* `include` - 同上。
* `exclude` - 同上，它和 `include` 的目的相反。
* `resource: /inline/` - 匹配资源的路径。如： `/path/foo.inline.js`，`/path/bar.png?inline`。
* `issuer: /bar.js/` - 从一个已经匹配的资源中，查找匹配。如：在 `/path/bar.js` 中的 `/path/foo.png` 的匹配。
* `resourcePath: /inline/` - 匹配一个没有查询条件的资源路径。如： `/path/foo.inline.png`。
* `resourceQuery: /inline/` - 匹配一个带有查询条件的资源。如： `/path/foo.png?inline`。

下面这些布尔类型的字段可以进一步的约束匹配：

* `not` - 匹配 `test` 可接受的值
* `and` - 数组类型
* `or` - 数组类型

## 使用 `resourceQuery` 选项

`oneOf` 为webpack开启了路由的功能，可以为不同的资源指定特定的loader：

```javascript
{
  test: /\.png$/,
  oneOf: [
    {
      resourceQuery: /inline/,
      use: "url-loader",
    },
    {
      resourceQuery: /external/,
      use: "file-loader",
    },
  ],
},
```

如果你想要将context嵌入到文件名中，你可以用 `resourcePath` 代替 `resourceQuery`。

## 使用 `issuer` 选项

`issuer` can be used to control behavior based on where a resource was imported。下面的例子采纳了 [css-loader issue 287](https://github.com/webpack-contrib/css-loader/pull/287#issuecomment-261269199)，*style-loader* 是被用在webpack中，处理当在JavaScript中引入一个css文件的情况：

```javascript
{
  test: /\.css$/,

  rules: [
    {
      issuer: /\.js$/,
      use: "style-loader",
    },
    {
      use: "css-loader",
    },
  ],
},
```

也可以混合 `issuer` 和 `not` 使用：

```javascript
{
  test: /\.css$/,

  rules: [
    // CSS imported from other modules is added to the DOM
    {
      issuer: { not: /\.css$/ },
      use: "style-loader",
    },
    // Apply css-loader against CSS imports to return CSS
    {
      use: "css-loader",
    },
  ],
}
```

## Loader的工作机制

Loader的运行机制，你可以通过监视它，来了解它。[loader-runner](https://www.npmjs.com/package/loader-runner) 允许你在不使用webpack的情况下运行它们。Webpack的内部如何使用包（package），*[Extending with Loaders](https://lvzhenbang.github.io/webpack-book/dist/zh/extending/01_loaders.html)* 这章将详细介绍。

[inspect-loader](https://www.npmjs.com/package/inspect-loader) 允许你监视loader之间是如何传递信息的，你不需要在 *node_modules* 内插入 `console.log` ，你可以将它添加到你的配置中来了解loader间的信息是如何流动的。

## 总结

虽然Webpack提供了多种方式配置loaders，但在webpack4.x中会用 `use` 就足够了。另外注意loader的顺序，它是常见问题的来源。

内容回顾：

* **Loaders** 允许你来决定应该发生什么，当webpack的模块解析机制遇到一个文件时。
* 一个模块定义由两部分组成， 匹配的条件（**conditions**）和 匹配成功后应该做什么（**actions** ）。
* Webpack 2 引入了 `use` 字段。它将 `loader` 和 `loaders` 字段放入了一个结构中。
* Webpack 4 提供了多种匹配方式来改变loader的行为。 到loader匹配完成后，你可以用 **resource query** 根据不同的路由使用特定的loader。

在下一章中，将详细介绍使用webpack加载图片资源。
