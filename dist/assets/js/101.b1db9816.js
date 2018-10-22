(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{182:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._m(1),a("p",[t._v("Even though the idea does not sound that unique, there is a technical cost. The approach was popularized by React. Since then frameworks encapsulating the tricky bits, such as "),a("a",{attrs:{href:"https://www.npmjs.com/package/next",target:"_blank",rel:"noopener noreferrer"}},[t._v("Next.js"),a("OutboundLink")],1),t._v(" and "),a("a",{attrs:{href:"https://www.npmjs.com/package/razzle",target:"_blank",rel:"noopener noreferrer"}},[t._v("razzle"),a("OutboundLink")],1),t._v(", have appeared.")]),a("p",[t._v("To demonstrate SSR, you can use webpack to compile a client-side build that then gets picked up by a server that renders it using React following the principle. Doing this is enough to understand how it works and also where the problems begin.")]),a("p",[t._v("T> SSR isn't the only solution to the SEO problem. "),a("strong",[t._v("Prerendering")]),t._v(" is an alternate technique that is easier to implement if it fits your use case. The approach won't work well with highly dynamic data. "),a("a",{attrs:{href:"https://www.npmjs.com/package/prerender-spa-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("prerender-spa-plugin"),a("OutboundLink")],1),t._v(" allows you to implement it with webpack.")]),t._m(2),a("p",[t._v("The "),a("em",[t._v("Loading JavaScript")]),t._v(" chapter covers the essentials of using Babel with webpack. There's setup that is particular to React you should perform, though. Given most of React projects rely on "),a("a",{attrs:{href:"https://facebook.github.io/jsx/",target:"_blank",rel:"noopener noreferrer"}},[t._v("JSX"),a("OutboundLink")],1),t._v(" format, you have to enable it through Babel.")]),a("p",[t._v("{pagebreak}")]),a("p",[t._v("To get React, and particularly JSX, work with Babel, install the preset first:")]),t._m(3),a("p",[t._v("Connect the preset with Babel configuration as follows:")]),t._m(4),t._m(5),t._m(6),a("p",[t._v("To make sure the project has the dependencies in place, install React and "),a("a",{attrs:{href:"https://www.npmjs.com/package/react-dom",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-dom"),a("OutboundLink")],1),t._v(". The latter package is needed to render the application to the DOM.")]),t._m(7),t._m(8),a("p",[t._v("{pagebreak}")]),a("p",[t._v("Adjust as follows:")]),t._m(9),t._m(10),a("p",[t._v("You are still missing webpack configuration to turn this file into something the server can pick up.")]),a("p",[t._v("W> Given ES2015 style imports and CommonJS exports cannot be mixed, the entry point was written in CommonJS style.")]),a("p",[t._v("{pagebreak}")]),t._m(11),a("p",[t._v("To keep things nice, we will define a separate configuration file. A lot of the work has been done already. Given you have to consume the same output from multiple environments, using UMD as the library target makes sense:")]),t._m(12),t._m(13),a("p",[t._v("{pagebreak}")]),a("p",[t._v("To make it convenient to generate a build, add a helper script:")]),t._m(14),t._m(15),t._m(16),t._m(17),a("p",[t._v("To keep things clear to understand, you can set up a standalone Express server that picks up the generated bundle and renders it following the SSR principle. Install Express first:")]),t._m(18),a("p",[t._v("Then, to get something running, implement a server as follows:")]),t._m(19),t._m(20),t._m(21),t._m(22),a("p",[t._v("{pagebreak}")]),t._m(23),t._m(24),t._m(25),t._m(26),t._m(27),a("p",[t._v("The remaining part is harder than what was done so far. How to make the server aware of the changes and how to communicate the changes to the browser?")]),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/browser-refresh",target:"_blank",rel:"noopener noreferrer"}},[t._v("browser-refresh"),a("OutboundLink")],1),t._v(" can come in handy as it solves both of the problems. Install it first:")]),t._m(28),a("p",[t._v("{pagebreak}")]),a("p",[t._v("The client portion requires two small changes to the server code:")]),t._m(29),t._m(30),t._m(31),t._m(32),a("p",[t._v("If the server crashes, it loses the WebSocket connection. You have to force a refresh in the browser in this case. If the server was managed through webpack as well, the problem could have been avoided.")]),a("p",[t._v("{pagebreak}")]),a("p",[t._v("To prove that SSR works, check out the browser inspector. You should see something familiar there:")]),t._m(33),t._m(34),a("p",[t._v("T> The implementation could be refined further by implementing a production mode for the server that would skip injecting the browser refresh script at a minimum. The server could inject initial data payload into the generated HTML. Doing this would avoid queries on the client-side.")]),t._m(35),a("p",[t._v("Even though the demo illustrates the basic idea of SSR, it still leaves open questions:")]),t._m(36),a("p",[t._v("Questions like these are the reason why solutions such as Next.js or razzle exist. They have been designed to solve SSR-specific problems like these.")]),a("p",[t._v("T> Routing is a big problem of its own solved by frameworks like Next.js. Patrick Hund "),a("a",{attrs:{href:"https://ebaytech.berlin/universal-web-apps-with-react-router-4-15002bb30ccb",target:"_blank",rel:"noopener noreferrer"}},[t._v("discusses how to solve it with React and React Router 4"),a("OutboundLink")],1),t._v(".")]),t._m(37),a("p",[t._v("SSR comes with a technical challenge, and for this reason, specific solutions have appeared around it. Webpack is a good fit for SSR setups.")]),a("p",[t._v("To recap:")]),t._m(38)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"server-side-rendering"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#server-side-rendering","aria-hidden":"true"}},[this._v("#")]),this._v(" Server Side Rendering")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("Server Side Rendering")]),this._v(" (SSR) is a technique that allows you to serve an initial payload with HTML, JavaScript, CSS, and even application state. You serve a fully rendered HTML page that would make sense even without JavaScript enabled. In addition to providing potential performance benefits, this can help with Search Engine Optimization (SEO).")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"setting-up-babel-with-react"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-babel-with-react","aria-hidden":"true"}},[this._v("#")]),this._v(" Setting Up Babel with React")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" @babel/preset-react --save-dev\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v(".babelrc")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  ...\n  "),a("span",{attrs:{class:"token property"}},[t._v('"presets"')]),a("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\nleanpub-start-insert\n    "),a("span",{attrs:{class:"token string"}},[t._v('"@babel/preset-react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nleanpub-end-insert\n    ...\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"setting-up-a-react-demo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-a-react-demo","aria-hidden":"true"}},[this._v("#")]),this._v(" Setting Up a React Demo")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" react react-dom --save\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Next, the React code needs a small entry point. If you are on the browser side, you should mount "),s("code",[this._v("Hello world")]),s("code",[this._v("div")]),this._v(' to the document. To prove it works, clicking it should give a dialog with a "hello" message. On server-side, the React component is returned and the server can pick it up.')])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("src/ssr.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" React "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ReactDOM "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"react-dom"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("SSR")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("div onClick"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("alert")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"hello"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("Hello world"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Render only in the browser, export otherwise")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" document "),a("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"undefined"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("SSR")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  ReactDOM"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("hydrate")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token constant"}},[t._v("SSR")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"app"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"configuring-webpack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuring-webpack","aria-hidden":"true"}},[this._v("#")]),this._v(" Configuring Webpack")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("webpack.ssr.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"path"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" merge "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"webpack-merge"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" parts "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"./webpack.parts"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("PATHS")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  build"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("join")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"static"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  ssrDemo"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("join")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"src"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"ssr.js"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("merge")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    mode"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"production"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    entry"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      index"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("PATHS")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ssrDemo"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    output"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      path"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("PATHS")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("build"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"[name].js"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      libraryTarget"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"umd"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      globalObject"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"this"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  parts"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("loadJavaScript")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" include"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("PATHS")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ssrDemo "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("package.json")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\nleanpub-start-insert\n  "),a("span",{attrs:{class:"token property"}},[t._v('"build:ssr"')]),a("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"webpack --config webpack.ssr.js"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nleanpub-end-insert\n  ...\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("If you build the SSR demo ("),s("code",[this._v("npm run build:ssr")]),this._v("), you should see a new file at "),s("em",[this._v("./static/index.js")]),this._v(". The next step is to set up a server to render it.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"setting-up-a-server"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-a-server","aria-hidden":"true"}},[this._v("#")]),this._v(" Setting Up a Server")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" express --save-dev\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("server.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" express "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"express"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" renderToString "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"react-dom/server"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("SSR")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"./static"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token function"}},[t._v("server")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("PORT")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("8080")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("server")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("express")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  app"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("use")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("express"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token keyword"}},[t._v("static")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"static"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  app"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token keyword"}},[t._v("get")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"/"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n    res"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("status")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("200")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("send")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("renderMarkup")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("renderToString")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token constant"}},[t._v("SSR")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  app"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("listen")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("renderMarkup")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("html"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token template-string"}},[a("span",{attrs:{class:"token string"}},[t._v('`<!DOCTYPE html>\n<html>\n  <head>\n    <title>Webpack SSR Demo</title>\n    <meta charset="utf-8" />\n  </head>\n  <body>\n    <div id="app">')]),a("span",{attrs:{class:"token interpolation"}},[a("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("html"),a("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{attrs:{class:"token string"}},[t._v('</div>\n    <script src="./index.js"><\/script>\n  </body>\n</html>`')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Run the server now ("),s("code",[this._v("node ./server.js")]),this._v(") and go below "),s("code",[this._v("http://localhost:8080")]),this._v(", you should see something familiar:")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"images/hello_01.png",alt:"Hello world"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Even though there is a React application running now, it's difficult to develop. If you try to modify the code, nothing happens. The problem can be solved running webpack in a multi-compiler mode as earlier in this book. Another option is to run webpack in "),s("strong",[this._v("watch mode")]),this._v(" against the current configuration and set up a watcher for the server. You'll learn the setup next.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("T> If you want to debug output from the server, set "),s("code",[this._v("export DEBUG=express:application")]),this._v(".")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("T> The references to the assets generated by webpack could be written automatically to the server side template if you wrote a manifest as discussed in the "),s("em",[this._v("Separating a Manifest")]),this._v(" chapter.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"watching-ssr-changes-and-refreshing-the-browser"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watching-ssr-changes-and-refreshing-the-browser","aria-hidden":"true"}},[this._v("#")]),this._v(" Watching SSR Changes and Refreshing the Browser")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("The first portion of the problem is fast to solve. Run "),s("code",[this._v("npm run build:ssr -- --watch")]),this._v(" in a terminal. That forces webpack to run in a watch mode. It would be possible to wrap this idea within an npm script for convenience, but this is enough for this demo.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" browser-refresh --save-dev\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("server.js")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{attrs:{class:"token function"}},[t._v("server")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("PORT")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("8080")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("server")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n\nleanpub"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("start"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),a("span",{attrs:{class:"token keyword"}},[t._v("delete")]),t._v("\n  app"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("listen")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nleanpub"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("end"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),a("span",{attrs:{class:"token keyword"}},[t._v("delete")]),t._v("\nleanpub"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("start"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n  app"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("listen")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" process"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("send "),a("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" process"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("send")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"online"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nleanpub"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("end"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("renderMarkup")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("html"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token template-string"}},[a("span",{attrs:{class:"token string"}},[t._v('`<!DOCTYPE html>\n<html>\n  ...\n  <body>\n    ...\nleanpub-start-insert\n    <script src="')]),a("span",{attrs:{class:"token interpolation"}},[a("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("process"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("BROWSER_REFRESH_URL")]),a("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{attrs:{class:"token string"}},[t._v('"><\/script>\nleanpub-end-insert\n  </body>\n</html>`')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("The first change tells the client that the application is online and ready to go. The latter change attaches the client script to the output. "),s("em",[this._v("browser-refresh")]),this._v(" manages the environment variable in question.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("Run "),a("code",[t._v("node_modules/.bin/browser-refresh ./server.js")]),t._v(" in another terminal and open the browser at "),a("code",[t._v("http://localhost:8080")]),t._v(" as earlier to test the setup. Remember to have webpack running in the watch mode at another terminal ("),a("code",[t._v("npm run build:ssr -- --watch")]),t._v("). If everything went right, any change you make to the demo client script ("),a("em",[t._v("app/ssr.js")]),t._v(") should show up in the browser or cause a failure at the server.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"images/ssr.png",alt:"SSR output"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Instead of a "),s("code",[this._v("div")]),this._v(" where to mount an application, you can see all related HTML there. It's not much in this particular case, but it's enough to showcase the approach.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"open-questions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#open-questions","aria-hidden":"true"}},[this._v("#")]),this._v(" Open Questions")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("How to deal with styles? Node doesn't understand CSS related imports.")]),s("li",[this._v("How to deal with anything other than JavaScript? If the server side is processed through webpack, this is less of an issue as you can patch it at webpack.")]),s("li",[this._v("How to run the server through something else other than Node? One option would be to wrap the Node instance in a service you then run through your host environment. Ideally, the results would be cached, and you can find more specific solutions for this particular per platform.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"conclusion"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[this._v("#")]),this._v(" Conclusion")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("strong",[this._v("Server Side Rendering")]),this._v(" can provide more for the browser to render initially. Instead of waiting for the JavaScript to load, you can display markup instantly.")]),s("li",[this._v("Server Side Rendering also allows you to pass initial payload of data to the client to avoid unnecessary queries to the server.")]),s("li",[this._v("Webpack can manage the client-side portion of the problem. It can be used to generate the server as well if a more integrated solution is required. Abstractions, such as Next.js, hide these details.")]),s("li",[this._v("Server Side Rendering does not come without a cost, and it leads to new problems as you need better approaches for dealing with aspects, such as styling or routing. The server and the client environment differ in essential manners, so the code has to be written so that it does not rely on platform-specific features too much.")])])}],!1,null,null,null);e.options.__file="03_server_side_rendering.md";s.default=e.exports}}]);