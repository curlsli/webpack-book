(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{141:function(t,n,s){t.exports=s.p+"assets/img/bundle_02.cc11f7e5.png"},285:function(t,n,s){"use strict";s.r(n);var a=[function(){var t=this.$createElement,n=this._self._c||t;return n("h1",{attrs:{id:"bundle-splitting"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#bundle-splitting","aria-hidden":"true"}},[this._v("#")]),this._v(" Bundle Splitting")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("T> To invalidate the bundles correctly, you have to attach hashes to the generated bundles as discussed in the "),n("em",[this._v("Adding Hashes to Filenames")]),this._v(" chapter.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"the-idea-of-bundle-splitting"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#the-idea-of-bundle-splitting","aria-hidden":"true"}},[this._v("#")]),this._v(" The Idea of Bundle Splitting")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("To give you a quick example, instead of having "),n("em",[this._v("main.js")]),this._v(" (100 kB), you could end up with "),n("em",[this._v("main.js")]),this._v(" (10 kB) and "),n("em",[this._v("vendor.js")]),this._v(" (90 kB). Now changes made to the application are cheap for the clients that have already used the application earlier.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("Caching comes with its problems. One of those is cache invalidation. A potential approach related to that is discussed in the "),n("em",[this._v("Adding Hashes to Filenames")]),this._v(" chapter.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("Bundle splitting isn't the only way out. The "),n("em",[this._v("Code Splitting")]),this._v(" chapter discusses another, more granular way.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"adding-something-to-split"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#adding-something-to-split","aria-hidden":"true"}},[this._v("#")]),this._v(" Adding Something to Split")])},function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),n("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" react react-dom --save\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("strong",[this._v("src/index.js")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v('leanpub-start-insert\nimport "react";\nimport "react-dom";\nleanpub-end-insert\n...\n')])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("Execute "),n("code",[this._v("npm run build")]),this._v(" to get a baseline build. You should end up with something as below:")])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("Hash: 80f9bb6fc04c54949644\nVersion: webpack 4.1.1\nTime: 3276ms\nBuilt at: 3/16/2018 4:59:25 PM\n       Asset       Size  Chunks             Chunk Names\nleanpub-start-insert\n     main.js   97.5 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\nleanpub-end-insert\n    main.css   3.49 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n main.js.map    240 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\nmain.css.map   85 bytes       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n  index.html  220 bytes          "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nEntrypoint main "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" main.js main.css main.js.map main.css.map\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("As you can see, "),n("em",[this._v("main.js")]),this._v(" is big. That is something to fix next.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"setting-up-a-vendor-bundle"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-a-vendor-bundle","aria-hidden":"true"}},[this._v("#")]),this._v(" Setting Up a "),n("code",[this._v("vendor")]),this._v(" Bundle")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("Before webpack 4, there used to be "),n("code",[this._v("CommonsChunkPlugin")]),this._v(" for managing bundle splitting. The plugin has been replaced with automation and configuration. To extract a vendor bundle from the "),n("em",[this._v("node_modules")]),this._v(" directory, adjust the code as follows:")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("strong",[this._v("webpack.config.js")])])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" productionConfig "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("merge")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\nleanpub"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("start"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    optimization"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      splitChunks"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        chunks"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"initial"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nleanpub"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("end"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("If you try to generate a build now ("),n("code",[this._v("npm run build")]),this._v("), you should see something along this:")])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("Hash: 6c499f10237fdbb07378\nVersion: webpack 4.1.1\nTime: 3172ms\nBuilt at: 3/16/2018 5:00:03 PM\n               Asset       Size  Chunks             Chunk Names\nleanpub-start-insert\n     vendors~main.js   96.8 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\nleanpub-end-insert\n             main.js   1.35 KiB       1  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n            main.css   1.27 KiB       1  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\nleanpub-start-insert\n    vendors~main.css   2.27 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\n vendors~main.js.map    235 KiB       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\nvendors~main.css.map   93 bytes       0  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  vendors~main\nleanpub-end-insert\n         main.js.map   7.11 KiB       1  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n        main.css.map   85 bytes       1  "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  main\n          index.html  329 bytes          "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("emitted"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nEntrypoint main "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" vendors~main.js vendors~main.css "),s("span",{attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("img",{attrs:{src:s(141),alt:"Main and vendor bundles after applying configuration"}})])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"controlling-bundle-splitting"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#controlling-bundle-splitting","aria-hidden":"true"}},[this._v("#")]),this._v(" Controlling Bundle Splitting")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("The configuration above can be rewritten with an explicit test against "),n("em",[this._v("node_modules")]),this._v(" as below:")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("strong",[this._v("webpack.config.js")])])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" productionConfig "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("merge")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\nleanpub"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("start"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    optimization"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      splitChunks"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        cacheGroups"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          commons"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            test"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token regex"}},[t._v("/[\\\\/]node_modules[\\\\/]/")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            name"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"vendor"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            chunks"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"initial"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nleanpub"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("end"),s("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("insert\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"splitting-and-merging-chunks"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#splitting-and-merging-chunks","aria-hidden":"true"}},[this._v("#")]),this._v(" Splitting and Merging Chunks")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("Webpack provides more control over the generated chunks by two plugins: "),n("code",[this._v("AggressiveSplittingPlugin")]),this._v(" and "),n("code",[this._v("AggressiveMergingPlugin")]),this._v(". The former allows you to emit more and smaller bundles. The behavior is handy with HTTP/2 due to the way the new standard works.")])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  plugins"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("webpack"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("optimize"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AggressiveSplittingPlugin")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        minSize"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("10000")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        maxSize"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("30000")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  plugins"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("AggressiveMergingPlugin")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        minSizeReduce"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token number"}},[t._v("2")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        moveToParents"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token boolean"}},[t._v("true")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("It's possible to get good caching behavior with these plugins if a webpack "),n("strong",[this._v("records")]),this._v(" are used. The idea is discussed in detail in the "),n("em",[this._v("Adding Hashes to Filenames")]),this._v(" chapter.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("code",[this._v("webpack.optimize")]),this._v(" contains "),n("code",[this._v("LimitChunkCountPlugin")]),this._v(" and "),n("code",[this._v("MinChunkSizePlugin")]),this._v(" which give further control over chunk size.")])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"chunk-types-in-webpack"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#chunk-types-in-webpack","aria-hidden":"true"}},[this._v("#")]),this._v(" Chunk Types in Webpack")])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ul",[s("li",[s("strong",[t._v("Entry chunks")]),t._v(" - Entry chunks contain webpack runtime and modules it then loads.")]),s("li",[s("strong",[t._v("Normal chunks")]),t._v(" - Normal chunks "),s("strong",[t._v("don't")]),t._v(" contain webpack runtime. Instead, these can be loaded dynamically while the application is running. A suitable wrapper (JSONP for example) is generated for these. You generate a normal chunk in the next chapter as you set up code splitting.")]),s("li",[s("strong",[t._v("Initial chunks")]),t._v(" - Initial chunks are normal chunks that count towards initial loading time of the application. As a user, you don't have to care about these. It's the split between entry chunks and normal chunks that is important.")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("h2",{attrs:{id:"conclusion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#conclusion","aria-hidden":"true"}},[this._v("#")]),this._v(" Conclusion")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("The situation is better now compared to the earlier. Note how small "),n("code",[this._v("main")]),this._v(" bundle compared to the "),n("code",[this._v("vendor")]),this._v(" bundle. To benefit from this split, you set up caching in the next part of this book in the "),n("em",[this._v("Adding Hashes to Filenames")]),this._v(" chapter.")])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ul",[s("li",[t._v("Webpack allows you to split bundles from configuration entries through the "),s("code",[t._v("optimization.splitChunks.cacheGroups")]),t._v(" field. It performs bundle splitting by default in production mode as well.")]),s("li",[t._v("A vendor bundle contains the third party code of your project. The vendor dependencies can be detected by inspecting where the modules are imported.")]),s("li",[t._v("Webpack offers more control over chunking through specific plugins, such as "),s("code",[t._v("AggressiveSplittingPlugin")]),t._v(" and "),s("code",[t._v("AggressiveMergingPlugin")]),t._v(". Mainly the splitting plugin can be handy in HTTP/2 oriented setups.")]),s("li",[t._v("Internally webpack relies on three chunk types: entry, normal, and initial chunks.")])])}],e=s(0),i=Object(e.a)({},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"content"},[t._m(0),s("p",[t._v("Currently, the production version of the application is a single JavaScript file. If the application is changed, the client must download vendor dependencies as well.")]),s("p",[t._v("It would be better to download only the changed portion. If the vendor dependencies change, then the client should fetch only the vendor dependencies. The same goes for actual application code. "),s("strong",[t._v("Bundle splitting")]),t._v(" can be achieved using "),s("code",[t._v("optimization.splitChunks.cacheGroups")]),t._v(". When running in production mode, "),s("a",{attrs:{href:"https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693",target:"_blank",rel:"noopener noreferrer"}},[t._v("webpack 4 can perform a series of splits out of the box"),s("OutboundLink")],1),t._v(" but in this case, we'll do something manually.")]),t._m(1),t._m(2),s("p",[t._v("With bundle splitting, you can push the vendor dependencies to a bundle of their own and benefit from client level caching. The process can be done in such a way that the whole size of the application remains the same. Given there are more requests to perform, there's a slight overhead. But the benefit of caching makes up for this cost.")]),t._m(3),t._m(4),t._m(5),t._m(6),s("p",[t._v("Given there's not much to split into the vendor bundle yet, you should add something there. Add React to the project first:")]),t._m(7),s("p",[t._v("Then make the project depend on it:")]),t._m(8),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13),t._m(14),t._m(15),t._m(16),t._m(17),t._m(18),s("p",[t._v("Now the bundles look the way they should. The image below illustrates the current situation.")]),t._m(19),s("p",[t._v("{pagebreak}")]),t._m(20),t._m(21),t._m(22),t._m(23),s("p",[t._v("Following this format gives you more control over the splitting process if you don't prefer to rely on automation.")]),t._m(24),t._m(25),s("p",[t._v("{pagebreak}")]),s("p",[t._v("Here's the basic idea of aggressive splitting:")]),t._m(26),s("p",[t._v("There's a trade-off as you lose out in caching if you split to multiple small bundles. You also get request overhead in HTTP/1 environment. For now, the approach doesn't work when "),s("code",[t._v("HtmlWebpackPlugin")]),t._v(" is enabled due to "),s("a",{attrs:{href:"https://github.com/ampedandwired/html-webpack-plugin/issues/446",target:"_blank",rel:"noopener noreferrer"}},[t._v("a bug in the plugin"),s("OutboundLink")],1),t._v(".")]),s("p",[t._v("The aggressive merging plugin works the opposite way and allows you to combine small bundles into bigger ones:")]),t._m(27),t._m(28),t._m(29),s("p",[t._v("T> Tobias Koppers discusses "),s("a",{attrs:{href:"https://medium.com/webpack/webpack-http-2-7083ec3f3ce6",target:"_blank",rel:"noopener noreferrer"}},[t._v("aggressive merging in detail at the official blog of webpack"),s("OutboundLink")],1),t._v(".")]),t._m(30),s("p",[t._v("In the example above, you used different types of webpack chunks. Webpack treats chunks in three types:")]),t._m(31),t._m(32),t._m(33),s("p",[t._v("To recap:")]),t._m(34),s("p",[t._v("In the next chapter, you'll learn about code splitting and loading code on demand.")])])},a,!1,null,null,null);i.options.__file="02_bundle_splitting.md";n.default=i.exports}}]);