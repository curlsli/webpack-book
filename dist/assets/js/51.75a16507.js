(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{232:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[t._m(0),t._m(1),t._m(2),s("p",[s("a",{attrs:{href:"https://webpack.js.org/api/module-methods/#require-context",target:"_blank",rel:"noopener noreferrer"}},[t._v("require.context"),s("OutboundLink")],1),t._v(" provides a general form of code splitting. Let's say you are writing a static site generator on top of webpack. You could model your site contents within a directory structure by having a "),s("code",[t._v("./pages/")]),t._v(" directory which would contain the Markdown files.")]),t._m(3),t._m(4),s("p",[t._v("T> The loader definition could be pushed to webpack configuration. The inline form is used to keep the example minimal.")]),t._m(5),t._m(6),t._m(7),s("p",[t._v("T> The information is enough for generating an entire site as showcased in "),s("a",{attrs:{href:"https://github.com/antwarjs/antwar",target:"_blank",rel:"noopener noreferrer"}},[t._v("Antwar"),s("OutboundLink")],1),t._v(".")]),t._m(8),t._m(9),t._m(10),t._m(11),s("p",[t._v("T> When using dynamic imports, specify file extension in the path as that helps with performance by keeping the context smaller.")]),t._m(12),t._m(13),t._m(14),s("p",[t._v("{pagebreak}")]),t._m(15),s("p",[t._v("Given the approaches discussed here rely on static analysis and webpack has to find the files in question, it doesn't work for every possible case. If the files you need are on another server or have to be accessed through a particular end-point, then webpack isn't enough.")]),s("p",[t._v("Consider using browser-side loaders like "),s("a",{attrs:{href:"https://www.npmjs.com/package/scriptjs",target:"_blank",rel:"noopener noreferrer"}},[t._v("$script.js"),s("OutboundLink")],1),t._v(" or "),s("a",{attrs:{href:"https://www.npmjs.com/package/little-loader",target:"_blank",rel:"noopener noreferrer"}},[t._v("little-loader"),s("OutboundLink")],1),t._v(" on top of webpack in this case.")]),t._m(16),t._m(17),s("p",[t._v("To recap:")]),t._m(18),s("p",[t._v("The next chapter shows how to use web workers with webpack.")])])},[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"dynamic-loading"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-loading","aria-hidden":"true"}},[this._v("#")]),this._v(" Dynamic Loading")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Even though you can get far with webpack's code splitting features covered in the "),a("em",[this._v("Code Splitting")]),this._v(" chapter, there's more to it. Webpack provides more dynamic ways to deal with code through "),a("code",[this._v("require.context")]),this._v(".")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"dynamic-loading-with-require-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-loading-with-require-context","aria-hidden":"true"}},[this._v("#")]),this._v(" Dynamic Loading with "),a("code",[this._v("require.context")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Each of these files would have a YAML frontmatter for their metadata. The url of each page could be determined based on the filename and mapped as a site. To model the idea using "),a("code",[this._v("require.context")]),this._v(", you could end up with the code as below:")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v("// Process pages through `yaml-frontmatter-loader` and `json-loader`.")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// The first one extracts the front matter and the body and the latter")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// converts it into a JSON structure to use later. Markdown")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// hasn't been processed yet.")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" req "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" require"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("context")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),s("span",{attrs:{class:"token string"}},[t._v('"json-loader!yaml-frontmatter-loader!./pages"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{attrs:{class:"token boolean"}},[t._v("true")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// Load files recursively. Pass false to skip recursion.")]),t._v("\n  "),s("span",{attrs:{class:"token operator"}},[t._v("/")]),s("span",{attrs:{class:"token operator"}},[t._v("^")]),t._v("\\"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\\"),s("span",{attrs:{class:"token operator"}},[t._v("/")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("\\"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("md$"),s("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// Match files ending with .md.")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("p",[s("code",[t._v("require.context")]),t._v(" returns a function to "),s("code",[t._v("require")]),t._v(" against. It also knows its module "),s("code",[t._v("id")]),t._v(" and it provides a "),s("code",[t._v("keys()")]),t._v(" method for figuring out the contents of the context. To give you a better example, consider the code below:")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("req"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("keys")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v('// ["./demo.md", "./another-demo.md"]')]),t._v("\nreq"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// 42")]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v('// {title: "Demo", body: "# Demo page\\nDemo content\\n\\n"}')]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" demoPage "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("req")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"./demo.md"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("The technique can be valuable for other purposes, such as testing or adding files for webpack to watch. In that case, you would set up a "),a("code",[this._v("require.context")]),this._v(" within a file which you then point to through a webpack "),a("code",[this._v("entry")]),this._v(".")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"dynamic-paths-with-a-dynamic-import"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-paths-with-a-dynamic-import","aria-hidden":"true"}},[this._v("#")]),this._v(" Dynamic Paths with a Dynamic "),a("code",[this._v("import")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("The same idea works with dynamic "),a("code",[this._v("import")]),this._v(". Instead of passing a complete path, you can pass a partial one. Webpack sets up a context internally. Here's a brief example:")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v("// Set up a target or derive this somehow")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"fi"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("// Elsewhere in code")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("import")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token template-string"}},[s("span",{attrs:{class:"token string"}},[t._v("`translations/")]),s("span",{attrs:{class:"token interpolation"}},[s("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("target"),s("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{attrs:{class:"token string"}},[t._v(".json`")])]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("then")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token operator"}},[t._v("...")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token keyword"}},[t._v("catch")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token operator"}},[t._v("...")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("p",[t._v("The same idea works with "),s("code",[t._v("require")]),t._v(" as webpack can then perform static analysis. For example, "),s("code",[t._v("require(")]),t._v("assets/modals/${imageSrc}.js"),s("code",[t._v(");")]),t._v(" would generate a context and resolve against an image based on the "),s("code",[t._v("imageSrc")]),t._v(" that was passed to the "),s("code",[t._v("require")]),t._v(".")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"combining-multiple-require-contexts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#combining-multiple-require-contexts","aria-hidden":"true"}},[this._v("#")]),this._v(" Combining Multiple "),a("code",[this._v("require.context")]),this._v("s")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Multiple separate "),a("code",[this._v("require.context")]),this._v("s can be combined into one by wrapping them behind a function:")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" concat"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" uniq "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"lodash"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{attrs:{class:"token function-variable function"}},[t._v("combineContexts")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("contexts"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("webpackContext")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// Find the first match and execute")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" matches "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" contexts\n      "),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("map")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" context"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("keys")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("indexOf")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" context"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("filter")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" a"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" matches"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" matches"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  webpackContext"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function-variable function"}},[t._v("keys")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n    "),s("span",{attrs:{class:"token function"}},[t._v("uniq")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      concat"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("apply")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("null")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" contexts"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("map")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("context "),s("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" context"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("keys")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" webpackContext"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"dealing-with-dynamic-paths"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dealing-with-dynamic-paths","aria-hidden":"true"}},[this._v("#")]),this._v(" Dealing with Dynamic Paths")])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"conclusion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[this._v("#")]),this._v(" Conclusion")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Even though "),a("code",[this._v("require.context")]),this._v(" is a niche feature, it's good to be aware of it. It becomes valuable if you have to perform lookups against multiple files available within the file system. If your lookup is more complicated than that, you have to resort to other alternatives that allow you to perform loading runtime.")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",[s("li",[s("code",[t._v("require.context")]),t._v(" is an advanced feature that's often hidden behind the scenes. Use it if you have to perform a lookup against a large number of files.")]),s("li",[t._v("If you write a dynamic "),s("code",[t._v("import")]),t._v(" in a certain form, webpack generates a "),s("code",[t._v("require.context")]),t._v(" call. The code reads slightly better in this case.")]),s("li",[t._v("The techniques work only against the file system. If you have to operate against urls, you should look into client-side solutions.")])])}],!1,null,null,null);e.options.__file="01_dynamic_loading.md";a.default=e.exports}}]);