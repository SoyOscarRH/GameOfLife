(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[2],[,,,,,,,,,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n.d(t,"a",(function(){return i}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return l}));var r=n(11),i=n(12),o=n(14),c=new("undefined"===typeof TextDecoder?n(15).TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();var u=null;function f(e,t){return c.decode((null!==u&&u.buffer===o.b.buffer||(u=new Uint8Array(o.b.buffer)),u).subarray(e,e+t))}var a=Object.freeze({Dead:0,Alive:1}),s=function(){function e(){Object(r.a)(this,e)}return Object(i.a)(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,o.a(e)}},{key:"toggle_cell",value:function(e,t){o.f(this.ptr,e,t)}},{key:"cells",value:function(){return o.c(this.ptr)}},{key:"tick",value:function(){o.e(this.ptr)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}},{key:"create",value:function(t,n){var r=o.d(t,n);return e.__wrap(r)}}]),e}(),l=function(e,t){throw new Error(f(e,t))}},function(e,t,n){"use strict";var r=n.w[e.i];e.exports=r;n(13);r.g()},function(e,t,n){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},i=/%[sdj%]/g;t.format=function(e){if(!y(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(u(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,c=String(e).replace(i,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}})),f=r[n];n<o;f=r[++n])g(f)||!b(f)?c+=" "+f:c+=" "+u(f);return c},t.deprecate=function(n,r){if("undefined"!==typeof e&&!0===e.noDeprecation)return n;if("undefined"===typeof e)return function(){return t.deprecate(n,r).apply(this,arguments)};var i=!1;return function(){if(!i){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),i=!0}return n.apply(this,arguments)}};var o,c={};function u(e,n){var r={seen:[],stylize:a};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),h(n)?r.showHidden=n:n&&t._extend(r,n),A(r.showHidden)&&(r.showHidden=!1),A(r.depth)&&(r.depth=2),A(r.colors)&&(r.colors=!1),A(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=f),s(r,e,r.depth)}function f(e,t){var n=u.styles[t];return n?"\x1b["+u.colors[n][0]+"m"+e+"\x1b["+u.colors[n][1]+"m":e}function a(e,t){return e}function s(e,n,r){if(e.customInspect&&n&&P(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,e);return y(i)||(i=s(e,i,r)),i}var o=function(e,t){if(A(t))return e.stylize("undefined","undefined");if(y(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(v(t))return e.stylize(""+t,"number");if(h(t))return e.stylize(""+t,"boolean");if(g(t))return e.stylize("null","null")}(e,n);if(o)return o;var c=Object.keys(n),u=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(c);if(e.showHidden&&(c=Object.getOwnPropertyNames(n)),w(n)&&(c.indexOf("message")>=0||c.indexOf("description")>=0))return l(n);if(0===c.length){if(P(n)){var f=n.name?": "+n.name:"";return e.stylize("[Function"+f+"]","special")}if(O(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(m(n))return e.stylize(Date.prototype.toString.call(n),"date");if(w(n))return l(n)}var a,b="",D=!1,z=["{","}"];(d(n)&&(D=!0,z=["[","]"]),P(n))&&(b=" [Function"+(n.name?": "+n.name:"")+"]");return O(n)&&(b=" "+RegExp.prototype.toString.call(n)),m(n)&&(b=" "+Date.prototype.toUTCString.call(n)),w(n)&&(b=" "+l(n)),0!==c.length||D&&0!=n.length?r<0?O(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),a=D?function(e,t,n,r,i){for(var o=[],c=0,u=t.length;c<u;++c)X(t,String(c))?o.push(p(e,t,n,r,String(c),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(p(e,t,n,r,i,!0))})),o}(e,n,r,u,c):c.map((function(t){return p(e,n,r,u,t,D)})),e.seen.pop(),function(e,t,n){if(e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(a,b,z)):z[0]+b+z[1]}function l(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,n,r,i,o){var c,u,f;if((f=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?u=f.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):f.set&&(u=e.stylize("[Setter]","special")),X(r,i)||(c="["+i+"]"),u||(e.seen.indexOf(f.value)<0?(u=g(n)?s(e,f.value,null):s(e,f.value,n-1)).indexOf("\n")>-1&&(u=o?u.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+u.split("\n").map((function(e){return"   "+e})).join("\n")):u=e.stylize("[Circular]","special")),A(c)){if(o&&i.match(/^\d+$/))return u;(c=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(c=c.substr(1,c.length-2),c=e.stylize(c,"name")):(c=c.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),c=e.stylize(c,"string"))}return c+": "+u}function d(e){return Array.isArray(e)}function h(e){return"boolean"===typeof e}function g(e){return null===e}function v(e){return"number"===typeof e}function y(e){return"string"===typeof e}function A(e){return void 0===e}function O(e){return b(e)&&"[object RegExp]"===D(e)}function b(e){return"object"===typeof e&&null!==e}function m(e){return b(e)&&"[object Date]"===D(e)}function w(e){return b(e)&&("[object Error]"===D(e)||e instanceof Error)}function P(e){return"function"===typeof e}function D(e){return Object.prototype.toString.call(e)}function z(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(A(o)&&(o=Object({NODE_ENV:"production",PUBLIC_URL:"/GameOfLife",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NODE_DEBUG||""),n=n.toUpperCase(),!c[n])if(new RegExp("\\b"+n+"\\b","i").test(o)){var r=e.pid;c[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,r,e)}}else c[n]=function(){};return c[n]},t.inspect=u,u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=d,t.isBoolean=h,t.isNull=g,t.isNullOrUndefined=function(e){return null==e},t.isNumber=v,t.isString=y,t.isSymbol=function(e){return"symbol"===typeof e},t.isUndefined=A,t.isRegExp=O,t.isObject=b,t.isDate=m,t.isError=w,t.isFunction=P,t.isPrimitive=function(e){return null===e||"boolean"===typeof e||"number"===typeof e||"string"===typeof e||"symbol"===typeof e||"undefined"===typeof e},t.isBuffer=n(17);var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function j(){var e=new Date,t=[z(e.getHours()),z(e.getMinutes()),z(e.getSeconds())].join(":");return[e.getDate(),T[e.getMonth()],t].join(" ")}function X(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",j(),t.format.apply(t,arguments))},t.inherits=n(18),t._extend=function(e,t){if(!t||!b(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e};var B="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function S(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}t.promisify=function(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');if(B&&e[B]){var t;if("function"!==typeof(t=e[B]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,B,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,i)}catch(c){n(c)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),B&&Object.defineProperty(t,B,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=B,t.callbackify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var i=n.pop();if("function"!==typeof i)throw new TypeError("The last argument must be of type Function");var o=this,c=function(){return i.apply(o,arguments)};t.apply(this,n).then((function(t){e.nextTick(c,null,t)}),(function(t){e.nextTick(S,t,c)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,r(t)),n}}).call(this,n(16))},function(e,t){var n,r,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"===typeof setTimeout?setTimeout:o}catch(e){n=o}try{r="function"===typeof clearTimeout?clearTimeout:c}catch(e){r=c}}();var f,a=[],s=!1,l=-1;function p(){s&&f&&(s=!1,f.length?a=f.concat(a):l=-1,a.length&&d())}function d(){if(!s){var e=u(p);s=!0;for(var t=a.length;t;){for(f=a,a=[];++l<t;)f&&f[l].run();l=-1,t=a.length}f=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function g(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new h(e,t)),1!==a.length||s||u(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t){e.exports=function(e){return e&&"object"===typeof e&&"function"===typeof e.copy&&"function"===typeof e.fill&&"function"===typeof e.readUInt8}},function(e,t){"function"===typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t,n){e.exports={displayContainer:"main_displayContainer__3Bk7r",icon:"main_icon__Y9SFi",header:"main_header__3aNL7"}},function(e,t){e.exports="data:image/png;base64,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"},function(e,t,n){e.exports=n.p+"static/media/pause.50608822.png"},function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,i=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(f){i=!0,o=f}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.r(t);var o=n(0),c=n.n(o),u=n(11),f=n(12),a=n(14),s=n(13),l=function(){function e(t,n,r,i){var o=this;Object(u.a)(this,e),this.cell_size=void 0,this.cell_space=void 0,this.width=void 0,this.height=void 0,this.DEAD_COLOR="#393e4a",this.ALIVE_COLOR="#989fb0",this.cells=new Uint8Array,this.universe=void 0,this.context=void 0,this.id=0,this.width=n,this.height=r,this.cell_size=t,this.cell_space=this.cell_size+1,this.universe=s.b.create(n,r),i.height=this.cell_space*r+1,i.width=this.cell_space*n+1,this.context=i.getContext("2d"),this.drawCells(),i.addEventListener("click",(function(e){if(!o.isRunning()){var t=i.getBoundingClientRect(),c=i.width/t.width,u=i.height/t.height,f=(e.clientX-t.left)*c,a=(e.clientY-t.top)*u,s=Math.min(Math.floor(a/o.cell_space),r-1),l=Math.min(Math.floor(f/o.cell_space),n-1);o.universe.toggle_cell(s,l),o.drawCells()}}))}return Object(f.a)(e,[{key:"drawCells",value:function(){var e=this.universe.cells(),t=this.width*this.height;this.cells=new Uint8Array(a.b.buffer,e,t),this.context.beginPath();for(var n=0;n<this.height;n++)for(var r=0;r<this.width;r++){this.context.fillStyle=this.getColor(n,r);var i=r*this.cell_space+1,o=n*this.cell_space+1;this.context.fillRect(i,o,this.cell_size,this.cell_size)}this.context.stroke()}},{key:"getColor",value:function(e,t){var n=this.DEAD_COLOR,r=this.ALIVE_COLOR,i=this.width*e+t;return this.cells[i]===s.a.Dead?n:r}},{key:"isRunning",value:function(){return!!this.id}},{key:"renderLoop",value:function(){var e=this,t=function t(){e.universe.tick(),e.drawCells(),e.id=requestAnimationFrame(t)};return[t,function(){if(!e.isRunning())return t();cancelAnimationFrame(e.id),e.id=0}]}}]),e}(),p=n(19),d=n.n(p),h=n(20),g=n.n(h),v=n(21),y=n.n(v);t.default=function(){var e=Object(o.useRef)(null),t=Object(o.useRef)(null);return Object(o.useEffect)((function(){var n=window.innerWidth<650,r=n?100:250,o=n?Math.round(.14*window.innerHeight):200,c=i(new l(n?5:4,r,o,e.current).renderLoop(),2),u=c[0],f=c[1];u(),t.current.addEventListener("click",f)}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:d.a.header},c.a.createElement("h2",null,"Game of Life"),c.a.createElement("img",{alt:"pause",className:d.a.icon,ref:t,src:y.a}),c.a.createElement("img",{alt:"edit",className:d.a.icon,src:g.a})),c.a.createElement("div",{className:d.a.displayContainer},c.a.createElement("canvas",{ref:e})))}}]]);
//# sourceMappingURL=2.6073620a.chunk.js.map