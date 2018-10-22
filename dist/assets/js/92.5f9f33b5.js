(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{191:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("Since webpack 4, the production output gets minified using UglifyJS by default. That said, it's good to understand the technique and further possibilities.")]),t._m(1),t._m(2),a("p",[t._v("Unsafe transformations can break code as they can lose something implicit the underlying code relies upon. For example, Angular 1 expects specific function parameter naming when using modules. Rewriting the parameters breaks code unless you take precautions against it in this case.")]),t._m(3),t._m(4),a("p",[t._v("To tune the defaults, we'll attach "),a("a",{attrs:{href:"https://www.npmjs.com/package/uglifyjs-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("uglifyjs-webpack-plugin"),a("OutboundLink")],1),t._v(" to the project so that it's possible to tune it.")]),a("p",[t._v("To get started, include the plugin to the project:")]),t._m(5),a("p",[t._v("{pagebreak}")]),a("p",[t._v("To attach it to the configuration, define a part for it first:")]),t._m(6),t._m(7),a("p",[t._v("Hook it up to the configuration:")]),t._m(8),t._m(9),t._m(10),t._m(11),a("p",[t._v("T> To strip "),a("code",[t._v("console.log")]),t._v(" calls from the resulting source, set "),a("code",[t._v("uglifyOptions.compress.drop_console")]),t._v(" to "),a("code",[t._v("true")]),t._v(" as "),a("a",{attrs:{href:"https://stackoverflow.com/questions/49101152/webpack-v4-remove-console-logs-with-webpack-uglify",target:"_blank",rel:"noopener noreferrer"}},[t._v("discussed on Stack Overflow"),a("OutboundLink")],1),t._v(".")]),a("p",[t._v("{pagebreak}")]),t._m(12),t._m(13),a("ul",[a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/babel-minify-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("babel-minify-webpack-plugin"),a("OutboundLink")],1),t._v(" relies on "),a("a",{attrs:{href:"https://www.npmjs.com/package/babel-preset-minify",target:"_blank",rel:"noopener noreferrer"}},[t._v("babel-preset-minify"),a("OutboundLink")],1),t._v(" underneath and it has been developed by the Babel team. It's slower than UglifyJS, though.")]),a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/webpack-closure-compiler",target:"_blank",rel:"noopener noreferrer"}},[t._v("webpack-closure-compiler"),a("OutboundLink")],1),t._v(" runs parallel and gives even smaller result than "),a("em",[t._v("babel-minify-webpack-plugin")]),t._v(" at times. "),a("a",{attrs:{href:"https://www.npmjs.com/package/closure-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("closure-webpack-plugin"),a("OutboundLink")],1),t._v(" is another option.")]),a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/butternut-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("butternut-webpack-plugin"),a("OutboundLink")],1),t._v(" uses Rich Harris' experimental "),a("a",{attrs:{href:"https://www.npmjs.com/package/butternut",target:"_blank",rel:"noopener noreferrer"}},[t._v("butternut"),a("OutboundLink")],1),t._v(" minifier underneath.")])]),t._m(14),t._m(15),t._m(16),a("p",[t._v("Since webpack 4, it applies scope hoisting in production mode by default. It hoists all modules to a single scope instead of writing a separate closure for each. Doing this slows down the build but gives you bundles that are faster to execute. "),a("a",{attrs:{href:"https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f",target:"_blank",rel:"noopener noreferrer"}},[t._v("Read more about scope hoisting"),a("OutboundLink")],1),t._v(" at the webpack blog.")]),t._m(17),t._m(18),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/prepack-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("prepack-webpack-plugin"),a("OutboundLink")],1),t._v(" uses "),a("a",{attrs:{href:"https://prepack.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Prepack"),a("OutboundLink")],1),t._v(", a partial JavaScript evaluator. It rewrites computations that can be done compile-time and therefore speeds up code execution. See also "),a("a",{attrs:{href:"https://www.npmjs.com/package/val-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("val-loader"),a("OutboundLink")],1),t._v(" and "),a("a",{attrs:{href:"https://www.npmjs.com/package/babel-plugin-preval",target:"_blank",rel:"noopener noreferrer"}},[t._v("babel-plugin-preval"),a("OutboundLink")],1),t._v(" for alternative solutions.")]),t._m(19),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/optimize-js-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("optimize-js-plugin"),a("OutboundLink")],1),t._v(" complements the other solutions by wrapping eager functions, and it enhances the way your JavaScript code gets parsed initially. The plugin relies on "),a("a",{attrs:{href:"https://github.com/nolanlawson/optimize-js",target:"_blank",rel:"noopener noreferrer"}},[t._v("optimize-js"),a("OutboundLink")],1),t._v(" by Nolan Lawson.")]),t._m(20),a("p",[t._v("If you consume HTML templates through your code using "),a("a",{attrs:{href:"https://www.npmjs.com/package/html-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("html-loader"),a("OutboundLink")],1),t._v(", you can preprocess it through "),a("a",{attrs:{href:"https://www.npmjs.com/package/posthtml",target:"_blank",rel:"noopener noreferrer"}},[t._v("posthtml"),a("OutboundLink")],1),t._v(" with "),a("a",{attrs:{href:"https://www.npmjs.com/package/posthtml-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("posthtml-loader"),a("OutboundLink")],1),t._v(". You can use "),a("a",{attrs:{href:"https://www.npmjs.com/package/posthtml-minifier",target:"_blank",rel:"noopener noreferrer"}},[t._v("posthtml-minifier"),a("OutboundLink")],1),t._v(" to minify your HTML through it.")]),t._m(21),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/clean-css-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("clean-css-loader"),a("OutboundLink")],1),t._v(" allows you to use a popular CSS minifier "),a("a",{attrs:{href:"https://www.npmjs.com/package/clean-css",target:"_blank",rel:"noopener noreferrer"}},[t._v("clean-css"),a("OutboundLink")],1),t._v(".")]),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/optimize-css-assets-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("optimize-css-assets-webpack-plugin"),a("OutboundLink")],1),t._v(" is a plugin based option that applies a chosen minifier on CSS assets. Using "),a("code",[t._v("MiniCssExtractPlugin")]),t._v(" can lead to duplicated CSS given it only merges text chunks. "),a("code",[t._v("OptimizeCSSAssetsPlugin")]),t._v(" avoids this problem by operating on the generated result and thus can lead to a better result.")]),t._m(22),a("p",[t._v("Out of the available solutions, "),a("code",[t._v("OptimizeCSSAssetsPlugin")]),t._v(" composes the best. To attach it to the setup, install it and "),a("a",{attrs:{href:"http://cssnano.co/",target:"_blank",rel:"noopener noreferrer"}},[t._v("cssnano"),a("OutboundLink")],1),t._v(" first:")]),t._m(23),a("p",[t._v("{pagebreak}")]),a("p",[t._v("Like for JavaScript, you can wrap the idea in a configuration part:")]),t._m(24),t._m(25),t._m(26),a("p",[t._v("{pagebreak}")]),a("p",[t._v("Then, connect with the main configuration:")]),t._m(27),t._m(28),t._m(29),t._m(30),a("p",[t._v("T> "),a("a",{attrs:{href:"https://www.npmjs.com/package/compression-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("compression-webpack-plugin"),a("OutboundLink")],1),t._v(" allows you to push the problem of generating compressed files to webpack to potentially save processing time on the server.")]),t._m(31),a("p",[t._v("Image size can be reduced by using "),a("a",{attrs:{href:"https://www.npmjs.com/package/img-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("img-loader"),a("OutboundLink")],1),t._v(", "),a("a",{attrs:{href:"https://www.npmjs.com/package/imagemin-webpack",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-webpack"),a("OutboundLink")],1),t._v(", and "),a("a",{attrs:{href:"https://www.npmjs.com/package/imagemin-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-webpack-plugin"),a("OutboundLink")],1),t._v(". The packages use image optimizers underneath.")]),t._m(32),t._m(33),a("p",[t._v("Minification is the most comfortable step you can take to make your build smaller. To recap:")]),t._m(34),a("p",[t._v("You'll learn to apply tree shaking against code in the next chapter.")])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"minifying"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#minifying","aria-hidden":"true"}},[this._v("#")]),this._v(" Minifying")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"minifying-javascript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#minifying-javascript","aria-hidden":"true"}},[this._v("#")]),this._v(" Minifying JavaScript")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("The point of "),s("strong",[this._v("minification")]),this._v(" is to convert the code into a smaller form. Safe "),s("strong",[this._v("transformations")]),this._v(" do this without losing any meaning by rewriting code. Good examples of this include renaming variables or even removing entire blocks of code based on the fact that they are unreachable ("),s("code",[this._v("if (false)")]),this._v(").")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"modifying-javascript-minification-process"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#modifying-javascript-minification-process","aria-hidden":"true"}},[this._v("#")]),this._v(" Modifying JavaScript Minification Process")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("In webpack 4, minification process is controlled through two configuration fields: "),s("code",[this._v("optimization.minimize")]),this._v(" flag to toggle it and "),s("code",[this._v("optimization.minimizer")]),this._v(" array to configure the process.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" uglifyjs-webpack-plugin --save-dev\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("webpack.parts.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" UglifyWebpackPlugin "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"uglifyjs-webpack-plugin"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nexports"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("minifyJavaScript")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  optimization"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    minimizer"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("UglifyWebpackPlugin")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" sourceMap"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("webpack.config.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" productionConfig "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("merge")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  parts"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("clean")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token constant"}},[t._v("PATHS")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("build"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  parts"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("minifyJavaScript")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("If you execute "),s("code",[this._v("npm run build")]),this._v(" now, you should see result close to the same as before. The outcome may be a slightly better as you are likely using a newer version of UglifyJS this way.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("T> Source maps are disabled by default. You can enable them through the "),s("code",[this._v("sourceMap")]),this._v(" flag. You should check "),s("em",[this._v("uglifyjs-webpack-plugin")]),this._v(" for more options.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"other-ways-to-minify-javascript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#other-ways-to-minify-javascript","aria-hidden":"true"}},[this._v("#")]),this._v(" Other Ways to Minify JavaScript")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Although the defaults and "),s("em",[this._v("uglifyjs-webpack-plugin")]),this._v(" works for this use case, there are more options you can consider:")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"speeding-up-javascript-execution"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#speeding-up-javascript-execution","aria-hidden":"true"}},[this._v("#")]),this._v(" Speeding Up JavaScript Execution")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Specific solutions allow you to preprocess code so that it will run faster. They complement the minification technique and can be split into "),s("strong",[this._v("scope hoisting")]),this._v(", "),s("strong",[this._v("pre-evaluation")]),this._v(", and "),s("strong",[this._v("improving parsing")]),this._v(". It's possible these techniques grow overall bundle size sometimes while allowing faster execution.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"scope-hoisting"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scope-hoisting","aria-hidden":"true"}},[this._v("#")]),this._v(" Scope Hoisting")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("T>  Pass "),s("code",[this._v("--display-optimization-bailout")]),this._v(" flag to webpack to gain debugging information related to hoisting results.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"pre-evaluation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pre-evaluation","aria-hidden":"true"}},[this._v("#")]),this._v(" Pre-evaluation")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"improving-parsing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#improving-parsing","aria-hidden":"true"}},[this._v("#")]),this._v(" Improving Parsing")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"minifying-html"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#minifying-html","aria-hidden":"true"}},[this._v("#")]),this._v(" Minifying HTML")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"minifying-css"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#minifying-css","aria-hidden":"true"}},[this._v("#")]),this._v(" Minifying CSS")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"setting-up-css-minification"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-css-minification","aria-hidden":"true"}},[this._v("#")]),this._v(" Setting Up CSS Minification")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" optimize-css-assets-webpack-plugin cssnano --save-dev\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("webpack.parts.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" OptimizeCSSAssetsPlugin "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"optimize-css-assets-webpack-plugin"')]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" cssnano "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"cssnano"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nexports"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("minifyCSS")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" options "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  plugins"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("OptimizeCSSAssetsPlugin")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      cssProcessor"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" cssnano"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      cssProcessorOptions"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" options"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      canPrint"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("false")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("W> If you use "),s("code",[this._v("--json")]),this._v(" output with webpack as discussed in the "),s("em",[this._v("Build Analysis")]),this._v(" chapter, you should set "),s("code",[this._v("canPrint: false")]),this._v(" for the plugin.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("webpack.config.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" productionConfig "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("merge")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n  parts"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("minifyJavaScript")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  parts"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("minifyCSS")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    options"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      discardComments"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        removeAll"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// Run cssnano in safe mode to avoid")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// potentially unsafe transformations.")]),t._v("\n      safe"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("If you build the project now ("),s("code",[this._v("npm run build")]),this._v("), you should notice that CSS has become smaller as it's missing comments:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("Hash: f51ecf99e0da4db99834\nVersion: webpack 4.1.1\nTime: 3125ms\nBuilt at: 3/16/2018 5:32:55 PM\n           Asset       Size  Chunks             Chunk Names\n      chunk.0.js  162 bytes       0  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      chunk.1.js   96.8 KiB       1  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\n         main.js   2.19 KiB       2  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n        main.css    1.2 KiB       2  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\nvendors~main.css   1.32 KiB       1  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\n  chunk.0.js.map  204 bytes       0  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  chunk.1.js.map    235 KiB       1  "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"minifying-images"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#minifying-images","aria-hidden":"true"}},[this._v("#")]),this._v(" Minifying Images")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("It can be a good idea to use "),s("em",[this._v("cache-loader")]),this._v(" and "),s("em",[this._v("thread-loader")]),this._v(" with these as discussed in the "),s("em",[this._v("Performance")]),this._v(" chapter given they can be substantial operations.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"conclusion"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[this._v("#")]),this._v(" Conclusion")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("strong",[this._v("Minification")]),this._v(" process analyzes your source code and turns it into a smaller form with the same meaning if you use safe transformations. Specific unsafe transformations allow you to reach even smaller results while potentially breaking code that relies, for example, on exact parameter naming.")]),s("li",[this._v("Webpack performs minification in production mode using UglifyJS by default. Other solutions, such as "),s("em",[this._v("babel-minify-webpack-plugin")]),this._v(", provide similar functionality with costs of their own.")]),s("li",[this._v("Besides JavaScript, it's possible to minify other assets, such as CSS, HTML, and images, too. Minifying these requires specific technologies that have to be applied through loaders and plugins of their own.")])])}],!1,null,null,null);e.options.__file="01_minifying.md";s.default=e.exports}}]);