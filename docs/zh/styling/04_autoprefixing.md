# Autoprefixing && styleint

要记住特定CSS规则必须使用哪些厂商前缀才能支持大量用户，这是一项非常很有挑战性的工作。 **Autoprefixing** 解决了这个问题。你可以使用PostCSS 和 [autoprefixer](https://www.npmjs.com/package/autoprefixer) 插件开启这个功能。 *autoprefixer* 使用 [Can I Use](http://caniuse.com/) 提供服务，用来识别那个样式应该添加前缀。

## 配置 Autoprefixing

要在构建的项目中添加 autoprefixing功能，你首先需要在项目引入 *postcss-loader* 和 *autoprefixer* 依赖：

```bash
npm install postcss-loader autoprefixer --save-dev
```

在 **webpack.parts.js** 添加这样一个功能函数可以开启autoprefixing：

```javascript
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});
```
在extractCSS这个接口中添加引入autoprefix功能，代码如下：

**webpack.config.js**

```javascript
const productionConfig = merge([
  parts.extractCSS({
    // use: "css-loader",
    use: ["css-loader", parts.autoprefix()],
  }),
  ...
]);
```

为了确认配置起作用，运行 `npm run build` 脚本命令后，查看输出样式，你可以看到如下的代码：

**src/main.css**

```css
...

.pure-button {
  -webkit-border-radius: 1em;
  border-radius: 1em;
}
```

如果你知道都需要兼容哪些浏览器，可以创建一个 [.browserslistrc](https://www.npmjs.com/package/browserslist) 文件。包括 *autoprefixer* 在内，有很多浏览器都支持。

**.browserslistrc**

```
> 1% # Browser usage over 1%
Last 2 versions # Or last two versions
IE 8 # Or IE 8
```

运行 `npm run build` 脚本命令，完成后，检查生成的css代码，你会发现样式中少了webkit前缀的部分：

```css
...

.pure-button {
  border-radius: 1em;
}
```

*autoprefixer* 可以 **移除** 不必要的规则，也可以更具需要支持的浏览器范围信息来达到兼容性的需求。

## CSS语法检测

你可以用 [Stylelint](http://stylelint.io/) 对css进行语法检测。用法同autoprefix一样，但它需要放在在 *autoprefixing* 之后。

引入`stylelint` 依赖:

```bash
npm install stylelint --save-dev
```

在 *webapck.parts.js* 添加如下配置配置代码：

```
...
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [
      require("autoprefixer")(),
      require("stylelint")()
    ],
  },
});
```

运行 `npm run build` 脚本命令，你会发现输出类似下面的错误：

```
ERROR in ./src/css/style.css (./node_modules/css-loader!./node_modules/postcss-loader/src??ref--7-2!./src/css/style.css)
    Module build failed (from ./node_modules/postcss-loader/src/index.js):
    Error: No configuration provided for E:\workspace\me\webpack4-demo\src\css\style.css
        at module.exports (E:\workspace\me\webpack4-demo\node_modules\stylelint\lib\utils\configurationError.js:8:28)
        at searchForConfig.then.then.config (E:\workspace\me\webpack4-demo\node_modules\stylelint\lib\getConfigForFile.js:49:15)
```

错误信息提示，需要一个配置文件，所以 可以创建一个 `.stylelintrc` 文件，用来存放css书写规范信息，可以定义如下规则：

```
"rules": {
    "at-rule-no-vendor-prefix": true,
    "at-rule-whitelist": [
    "import",
    "media"
    ],
    "color-named": "always-where-possible",
    "color-no-hex": true,
    "custom-media-pattern": "^([a-z]+-?)*([a-z]+)$",
    "custom-property-pattern": "^([a-z]+-?)*([a-z]+)$",
    "declaration-block-no-duplicate-properties": true,
    "font-family-name-quotes": "always-where-recommended",
    "font-weight-notation": "numeric",
    "function-url-quotes": "always",
    "function-whitelist": [
    "color"
    ]
}
```

再一次运行 `npm run build` 脚本命令，可以看到相关的警告信息。具体使用可参考[stylelint官方文档](https://stylelint.io/user-guide/rules/)

你还可以通过`extends`选项引用一个配置依赖，如：*[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)* 、*[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)*

## 总结

Autoprefixing是很方便的一个技术，当写CSS代码的时候，它能减少你的工作量。你可以在 *.browserslistrc* 文件中定义你要支持的浏览器范围，autoprefixing工具可以使用这个文件优化输出。

内容回顾：

* Autoprefixing 这个功能可以通过在 PostCSS 插件中引入 *autoprefixer* 来实现。
* Autoprefixing 根据你定义的支持的浏览器，来自动补全不同供应商支持的样式规则。
* *.browserslistrc* 是一个支持配置 *autoprefixer* 的标准文件，但它不仅限于配置 *autoprefixer* 。
