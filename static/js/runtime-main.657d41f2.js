!function(e){function t(t){for(var r,o,u=t[0],f=t[1],s=t[2],c=0,l=[];c<u.length;c++)o=u[c],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&l.push(i[o][0]),i[o]=0;for(r in f)Object.prototype.hasOwnProperty.call(f,r)&&(e[r]=f[r]);for(d&&d(t);l.length;)l.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==i[u]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={1:0},i={1:0},a=[];var u={};var f={12:function(){return{"./game_of_life_algorithm.js":{__wbindgen_object_drop_ref:function(e){return r[11].exports.j(e)},__wbg_getRandomValues_f5e14ab7ac8e995d:function(e,t,n){return r[11].exports.e(e,t,n)},__wbg_randomFillSync_d5bd2d655fdf256a:function(e,t,n){return r[11].exports.f(e,t,n)},__wbg_self_1b7a39e3a92c949c:function(){return r[11].exports.h()},__wbg_require_604837428532a733:function(e,t){return r[11].exports.g(e,t)},__wbg_crypto_968f1772287e2df0:function(e){return r[11].exports.c(e)},__wbindgen_is_undefined:function(e){return r[11].exports.i(e)},__wbg_getRandomValues_a3d34b4fee3c2869:function(e){return r[11].exports.d(e)},__wbindgen_throw:function(e,t){return r[11].exports.k(e,t)}}}}};function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[];o[e]?t.push(o[e]):0!==o[e]&&{2:1}[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="static/css/"+({}[e]||e)+"."+{2:"cf37cb6b",4:"31d6cfe0"}[e]+".chunk.css",i=s.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var f=(l=a[u]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===i))return t()}var c=document.getElementsByTagName("style");for(u=0;u<c.length;u++){var l;if((f=(l=c[u]).getAttribute("data-href"))===r||f===i)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],p.parentNode.removeChild(p),n(a)},p.href=i,document.getElementsByTagName("head")[0].appendChild(p)})).then((function(){o[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=i[e]=[t,r]}));t.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=function(e){return s.p+"static/js/"+({}[e]||e)+"."+{2:"ed71e4b9",4:"0e3f2240"}[e]+".chunk.js"}(e);var l=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(p);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}i[e]=void 0}};var p=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return({2:[12]}[e]||[]).forEach((function(e){var n=u[e];if(n)t.push(n);else{var r,o=f[e](),i=fetch(s.p+""+{12:"9c1bb20f17ee4079f570"}[e]+".module.wasm");if(o instanceof Promise&&"function"===typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(i),o]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"===typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(i,o);else{r=i.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,o)}))}t.push(u[e]=r.then((function(t){return s.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/GameOfLife/",s.oe=function(e){throw console.error(e),e},s.w={};var c=this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var p=0;p<c.length;p++)t(c[p]);var d=l;n()}([]);
//# sourceMappingURL=runtime-main.657d41f2.js.map