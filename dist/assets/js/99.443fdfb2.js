(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{184:function(e,t,r){"use strict";r.r(t);var a=r(0),s=Object(a.a)({},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[e._m(0),r("p",[e._v("Even though webpack is used most commonly for bundling web applications, it can do more. You can use it to target Node or desktop environments, such as Electron. Webpack can also bundle as a library while writing an appropriate output wrapper making it possible to consume the library.")]),e._m(1),e._m(2),e._m(3),e._m(4),r("p",[e._v("The "),r("em",[e._v("webworker")]),e._v(" target wraps your application as a "),r("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API",target:"_blank",rel:"noopener noreferrer"}},[e._v("web worker"),r("OutboundLink")],1),e._v(". Using web workers is valuable if you want to execute computation outside of the main thread of the application without slowing down the user interface. There are a couple of limitations you should be aware of:")]),e._m(5),e._m(6),e._m(7),e._m(8),e._m(9),e._m(10),r("p",[e._v("There are desktop shells, such as "),r("a",{attrs:{href:"https://nwjs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("NW.js"),r("OutboundLink")],1),e._v(" (previously "),r("em",[e._v("node-webkit")]),e._v(") and "),r("a",{attrs:{href:"http://electron.atom.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Electron"),r("OutboundLink")],1),e._v(" (previously "),r("em",[e._v("Atom")]),e._v("). Webpack can target these as follows:")]),r("ul",[e._m(11),r("li",[r("code",[e._v("atom")]),e._v(", "),r("code",[e._v("electron")]),e._v(", "),r("code",[e._v("electron-main")]),e._v(" - Targets "),r("a",{attrs:{href:"https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Electron main process"),r("OutboundLink")],1),e._v(".")]),e._m(12)]),r("p",[r("a",{attrs:{href:"https://github.com/chentsulin/electron-react-boilerplate",target:"_blank",rel:"noopener noreferrer"}},[e._v("electron-react-boilerplate"),r("OutboundLink")],1),e._v(" is a good starting point if you want hot loading webpack setup for Electron and React based development. Using "),r("a",{attrs:{href:"https://github.com/electron/electron-quick-start",target:"_blank",rel:"noopener noreferrer"}},[e._v("the official quick start for Electron"),r("OutboundLink")],1),e._v(" is one way.")]),r("p",[e._v("{pagebreak}")]),e._m(13),r("p",[e._v('Webpack supports targets beyond the web. Based on this you can say name "webpack" is an understatement considering its capabilities.')]),r("p",[e._v("To recap:")]),e._m(14),r("p",[e._v("You'll learn how to handle multi-page setups in the next chapter.")])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"build-targets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#build-targets","aria-hidden":"true"}},[this._v("#")]),this._v(" Build Targets")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Webpack's output target is controlled by the "),t("code",[this._v("target")]),this._v(" field. You'll learn about the primary targets next and dig into library specific options after that.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"web-targets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#web-targets","aria-hidden":"true"}},[this._v("#")]),this._v(" Web Targets")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Webpack uses the "),t("em",[this._v("web")]),this._v(" target by default. The target is ideal for a web application like the one you have developed in this book. Webpack bootstraps the application and loads its modules. The initial list of modules to load is maintained in a manifest, and then the modules can load each other as defined.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"web-workers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#web-workers","aria-hidden":"true"}},[this._v("#")]),this._v(" Web Workers")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("You cannot use webpack's hashing features when the "),t("em",[this._v("webworker")]),this._v(" target is used.")]),t("li",[this._v("You cannot manipulate the DOM from a web worker. If you wrapped the book project as a worker, it would not display anything.")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("T> Web workers and their usage are discussed in detail in the "),t("em",[this._v("Web Workers")]),this._v(" chapter.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"node-targets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-targets","aria-hidden":"true"}},[this._v("#")]),this._v(" Node Targets")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("Webpack provides two Node-specific targets: "),r("code",[e._v("node")]),e._v(" and "),r("code",[e._v("async-node")]),e._v(". It uses standard Node "),r("code",[e._v("require")]),e._v(" to load chunks unless async mode is used. In that case, it wraps modules so that they are loaded asynchronously through Node "),r("code",[e._v("fs")]),e._v(" and "),r("code",[e._v("vm")]),e._v(" modules.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The main use case for using the Node target is "),t("em",[this._v("Server Side Rendering")]),this._v(" (SSR). The idea is discussed in the "),t("em",[this._v("Server Side Rendering")]),this._v(" chapter.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"desktop-targets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#desktop-targets","aria-hidden":"true"}},[this._v("#")]),this._v(" Desktop Targets")])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("code",[this._v("node-webkit")]),this._v(" - Targets NW.js while considered experimental.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("code",[this._v("electron-renderer")]),this._v(" - Targets Electron renderer process.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"conclusion"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[this._v("#")]),this._v(" Conclusion")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Webpack's output target can be controlled through the "),t("code",[this._v("target")]),this._v(" field. It defaults to "),t("code",[this._v("web")]),this._v(" but accepts other options too.")]),t("li",[this._v("Webpack can target the desktop, Node, and web workers in addition to its web target.")]),t("li",[this._v("The Node targets come in handy if especially in Server Side Rendering setups.")])])}],!1,null,null,null);s.options.__file="01_targets.md";t.default=s.exports}}]);