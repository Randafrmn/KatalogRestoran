/*! For license information please see sw.bundle.js.LICENSE.txt */
(()=>{"use strict";var e={535:()=>{try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(e){}},136:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},626:()=>{try{self["workbox:expiration:7.0.0"]&&_()}catch(e){}},447:()=>{try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},227:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},390:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}(()=>{n(136);class e extends Error{constructor(e,t){super(((e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),s=e=>e||r(t.precache),a=e=>e||r(t.runtime);function i(e,t){const n=t();return e.waitUntil(n),n}function o(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:n,url:r}=t;if(!r)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!n){const e=new URL(r,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(r,location.href),a=new URL(r,location.href);return s.searchParams.set("__WB_REVISION__",n),{cacheKey:s.href,url:a.href}}n(447);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:n})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;n?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return n}}}class h{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const n=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return n?new Request(n,{headers:e.headers}):e},this._precacheController=e}}let l;function u(e,t){const n=new URL(e);for(const e of t)n.searchParams.delete(e);return n.href}class d{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const f=new Set;function p(e){return"string"==typeof e?new Request(e):e}n(390);class g{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new d,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:n}=this;let r=p(t);if("navigate"===r.mode&&n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))r=await e({request:r.clone(),event:n})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const a=r.clone();try{let e;e=await fetch(r,"navigate"===r.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:n,request:a,response:e});return e}catch(e){throw s&&await this.runCallbacks("fetchDidFail",{error:e,event:n,originalRequest:s.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),n=t.clone();return this.waitUntil(this.cachePut(e,n)),t}async cacheMatch(e){const t=p(e);let n;const{cacheName:r,matchOptions:s}=this._strategy,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},s),{cacheName:r});n=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))n=await e({cacheName:r,matchOptions:s,cachedResponse:n,request:a,event:this.event})||void 0;return n}async cachePut(t,n){const r=p(t);var s;await(s=0,new Promise((e=>setTimeout(e,s))));const a=await this.getCacheKey(r,"write");if(!n)throw new e("cache-put-with-no-response",{url:(i=a.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const o=await this._ensureResponseSafeToCache(n);if(!o)return!1;const{cacheName:c,matchOptions:h}=this._strategy,l=await self.caches.open(c),d=this.hasCallback("cacheDidUpdate"),g=d?await async function(e,t,n,r){const s=u(t.url,n);if(t.url===s)return e.match(t,r);const a=Object.assign(Object.assign({},r),{ignoreSearch:!0}),i=await e.keys(t,a);for(const t of i)if(s===u(t.url,n))return e.match(t,r)}(l,a.clone(),["__WB_REVISION__"],h):null;try{await l.put(a,d?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of f)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:g,newResponse:o.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const n=`${e.url} | ${t}`;if(!this._cacheKeys[n]){let r=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))r=p(await e({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[n]=r}return this._cacheKeys[n]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const n of this.iterateCallbacks(e))await n(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const n=this._pluginStateMap.get(t),r=r=>{const s=Object.assign(Object.assign({},r),{state:n});return t[e](s)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,n=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,n=!0,!t)break;return n||t&&200!==t.status&&(t=void 0),t}}class y{constructor(e={}){this.cacheName=a(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,n="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,s=new g(this,{event:t,request:n,params:r}),a=this._getResponse(s,n,t);return[a,this._awaitComplete(a,s,n,t)]}async _getResponse(t,n,r){let s;await t.runCallbacks("handlerWillStart",{event:r,request:n});try{if(s=await this._handle(n,t),!s||"error"===s.type)throw new e("no-response",{url:n.url})}catch(e){if(e instanceof Error)for(const a of t.iterateCallbacks("handlerDidError"))if(s=await a({error:e,event:r,request:n}),s)break;if(!s)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))s=await e({event:r,request:n,response:s});return s}async _awaitComplete(e,t,n,r){let s,a;try{s=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:n,response:s}),await t.doneWaiting()}catch(e){e instanceof Error&&(a=e)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:n,response:s,error:a}),t.destroy(),a)throw a}}class w extends y{constructor(e={}){e.cacheName=s(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(w.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,n){let r;const s=n.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=s.integrity,a=t.integrity,i=!a||a===e;r=await n.fetch(new Request(t,{integrity:"no-cors"!==t.mode?a||e:void 0})),e&&i&&"no-cors"!==t.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await n.cachePut(t,r.clone()))}return r}async _handleInstall(t,n){this._useDefaultCacheabilityPluginIfNeeded();const r=await n.fetch(t);if(!await n.cachePut(t,r.clone()))throw new e("bad-precaching-response",{url:t.url,status:r.status});return r}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[n,r]of this.plugins.entries())r!==w.copyRedirectedCacheableResponsesPlugin&&(r===w.defaultPrecacheCacheabilityPlugin&&(e=n),r.cacheWillUpdate&&t++);0===t?this.plugins.push(w.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}w.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},w.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,n){let r=null;if(t.url&&(r=new URL(t.url).origin),r!==self.location.origin)throw new e("cross-origin-copy-response",{origin:r});const s=t.clone(),a={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=n?n(a):a,o=function(){if(void 0===l){const e=new Response("");if("body"in e)try{new Response(e.body),l=!0}catch(e){l=!1}l=!1}return l}()?s.body:await s.blob();return new Response(o,i)}(t):t};class m{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:n=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new w({cacheName:s(e),plugins:[...t,new h({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const n=[];for(const r of t){"string"==typeof r?n.push(r):r&&void 0===r.revision&&n.push(r.url);const{cacheKey:t,url:s}=o(r),a="string"!=typeof r&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:t});if("string"!=typeof r&&r.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==r.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(t,r.integrity)}if(this._urlsToCacheKeys.set(s,t),this._urlsToCacheModes.set(s,a),n.length>0){const e=`Workbox is precaching URLs without revision info: ${n.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return i(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,n]of this._urlsToCacheKeys){const r=this._cacheKeysToIntegrities.get(n),s=this._urlsToCacheModes.get(t),a=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:n},request:a,event:e}))}const{updatedURLs:n,notUpdatedURLs:r}=t;return{updatedURLs:n,notUpdatedURLs:r}}))}activate(e){return i(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),r=[];for(const s of t)n.has(s.url)||(await e.delete(s),r.push(s.url));return{deletedURLs:r}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n)return(await self.caches.open(this.strategy.cacheName)).match(n)}createHandlerBoundToURL(t){const n=this.getCacheKeyForURL(t);if(!n)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:n},e.params),this.strategy.handle(e))}}let v;const _=()=>(v||(v=new m),v);n(227);const b=e=>e&&"object"==typeof e?e:{handle:e};class x{constructor(e,t,n="GET"){this.handler=b(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=b(e)}}class R extends x{constructor(e,t,n){super((({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)}),t,n)}}class L{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const n=new Request(...t);return this.handleRequest({request:n,event:e})})));e.waitUntil(n),e.ports&&e.ports[0]&&n.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const r=n.origin===location.origin,{params:s,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:n});let i=a&&a.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let c;try{c=i.handle({url:n,request:e,event:t,params:s})}catch(e){c=Promise.reject(e)}const h=a&&a.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async r=>{if(h)try{return await h.handle({url:n,request:e,event:t,params:s})}catch(e){e instanceof Error&&(r=e)}if(this._catchHandler)return this._catchHandler.handle({url:n,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:n,event:r}){const s=this._routes.get(n.method)||[];for(const a of s){let s;const i=a.match({url:e,sameOrigin:t,request:n,event:r});if(i)return s=i,(Array.isArray(s)&&0===s.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(s=void 0),{route:a,params:s}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,b(e))}setCatchHandler(e){this._catchHandler=b(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const n=this._routes.get(t.method).indexOf(t);if(!(n>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(n,1)}}let E;function C(t,n,r){let s;if("string"==typeof t){const e=new URL(t,location.href);s=new x((({url:t})=>t.href===e.href),n,r)}else if(t instanceof RegExp)s=new R(t,n,r);else if("function"==typeof t)s=new x(t,n,r);else{if(!(t instanceof x))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=t}return(E||(E=new L,E.addFetchListener(),E.addCacheListener()),E).registerRoute(s),s}class k extends x{constructor(e,t){super((({request:n})=>{const r=e.getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:r=!0,urlManipulation:s}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some((e=>e.test(n)))&&e.searchParams.delete(n);return e}(a,t);if(yield i.href,n&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=n,yield e.href}if(r){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(s){const e=s({url:a});for(const t of e)yield t.href}}(n.url,t)){const t=r.get(s);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class D extends y{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(N)}async _handle(t,n){const r=n.fetchAndCachePut(t).catch((()=>{}));n.waitUntil(r);let s,a=await n.cacheMatch(t);if(a);else try{a=await r}catch(e){e instanceof Error&&(s=e)}if(!a)throw new e("no-response",{url:t.url,error:s});return a}}function U(e){e.then((()=>{}))}const q=(e,t)=>t.some((t=>e instanceof t));let T,O;const S=new WeakMap,P=new WeakMap,I=new WeakMap,K=new WeakMap,M=new WeakMap;let A={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return P.get(e);if("objectStoreNames"===t)return e.objectStoreNames||I.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return W(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function j(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(O||(O=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(B(this),e),W(S.get(this))}:function(...e){return W(t.apply(B(this),e))}:function(e,...n){const r=t.call(B(this),e,...n);return I.set(r,e.sort?e.sort():[e]),W(r)}:(e instanceof IDBTransaction&&function(e){if(P.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",a),e.removeEventListener("abort",a)},s=()=>{t(),r()},a=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",a),e.addEventListener("abort",a)}));P.set(e,t)}(e),q(e,T||(T=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,A):e);var t}function W(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",a)},s=()=>{t(W(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",a)}));return t.then((t=>{t instanceof IDBCursor&&S.set(t,e)})).catch((()=>{})),M.set(t,e),t}(e);if(K.has(e))return K.get(e);const t=j(e);return t!==e&&(K.set(e,t),M.set(t,e)),t}const B=e=>M.get(e),F=["get","getKey","getAll","getAllKeys","count"],H=["put","add","delete","clear"],G=new Map;function V(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(G.get(t))return G.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=H.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!F.includes(n))return;const a=async function(e,...t){const a=this.transaction(e,s?"readwrite":"readonly");let i=a.store;return r&&(i=i.index(t.shift())),(await Promise.all([i[n](...t),s&&a.done]))[0]};return G.set(t,a),a}var $;$=A,A={...$,get:(e,t,n)=>V(e,t)||$.get(e,t,n),has:(e,t)=>!!V(e,t)||$.has(e,t)},n(626);const Q="cache-entries",Y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class J{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(Q,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e))),W(n).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const n={url:e=Y(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},r=(await this.getDb()).transaction(Q,"readwrite",{durability:"relaxed"});await r.store.put(n),await r.done}async getTimestamp(e){const t=await this.getDb(),n=await t.get(Q,this._getId(e));return null==n?void 0:n.timestamp}async expireEntries(e,t){const n=await this.getDb();let r=await n.transaction(Q).store.index("timestamp").openCursor(null,"prev");const s=[];let a=0;for(;r;){const n=r.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&a>=t?s.push(r.value):a++),r=await r.continue()}const i=[];for(const e of s)await n.delete(Q,e.id),i.push(e.url);return i}_getId(e){return this._cacheName+"|"+Y(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const i=indexedDB.open(e,t),o=W(i);return r&&i.addEventListener("upgradeneeded",(e=>{r(W(i.result),e.oldVersion,e.newVersion,W(i.transaction),e)})),n&&i.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),o.then((e=>{a&&e.addEventListener("close",(()=>a())),s&&e.addEventListener("versionchange",(e=>s(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class z{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new J(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),n=await self.caches.open(this._cacheName);for(const e of t)await n.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,U(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),n=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<n}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class X{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:n,cachedResponse:r})=>{if(!r)return null;const s=this._isResponseDateFresh(r),a=this._getCacheExpiration(n);U(a.expireEntries());const i=a.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return s?r:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const n=this._getCacheExpiration(e);await n.updateTimestamp(t.url),await n.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),f.add(t))}_getCacheExpiration(t){if(t===a())throw new e("expire-custom-caches-only");let n=this._cacheExpirations.get(t);return n||(n=new z(t,this._config),this._cacheExpirations.set(t,n)),n}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),n=new Date(t).getTime();return isNaN(n)?null:n}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var Z;n(535);class ee{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class te{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new ee(e)}}function ne(e){return ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ne(e)}function re(){re=function(){return t};var e,t={},n=Object.prototype,r=n.hasOwnProperty,s=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function h(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{h({},"")}catch(e){h=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var a=t&&t.prototype instanceof w?t:w,i=Object.create(a.prototype),o=new U(r||[]);return s(i,"_invoke",{value:C(e,n,o)}),i}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",p="executing",g="completed",y={};function w(){}function m(){}function v(){}var _={};h(_,i,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(q([])));x&&x!==n&&r.call(x,i)&&(_=x);var R=v.prototype=w.prototype=Object.create(_);function L(e){["next","throw","return"].forEach((function(t){h(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){function n(s,a,i,o){var c=u(e[s],e,a);if("throw"!==c.type){var h=c.arg,l=h.value;return l&&"object"==ne(l)&&r.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,i,o)}),(function(e){n("throw",e,i,o)})):t.resolve(l).then((function(e){h.value=e,i(h)}),(function(e){return n("throw",e,i,o)}))}o(c.arg)}var a;s(this,"_invoke",{value:function(e,r){function s(){return new t((function(t,s){n(e,r,t,s)}))}return a=a?a.then(s,s):s()}})}function C(t,n,r){var s=d;return function(a,i){if(s===p)throw Error("Generator is already running");if(s===g){if("throw"===a)throw i;return{value:e,done:!0}}for(r.method=a,r.arg=i;;){var o=r.delegate;if(o){var c=k(o,r);if(c){if(c===y)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(s===d)throw s=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);s=p;var h=u(t,n,r);if("normal"===h.type){if(s=r.done?g:f,h.arg===y)continue;return{value:h.arg,done:r.done}}"throw"===h.type&&(s=g,r.method="throw",r.arg=h.arg)}}}function k(t,n){var r=n.method,s=t.iterator[r];if(s===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),y;var a=u(s,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,y;var i=a.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,y):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function N(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function D(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function U(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(N,this),this.reset(!0)}function q(t){if(t||""===t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var s=-1,a=function n(){for(;++s<t.length;)if(r.call(t,s))return n.value=t[s],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}throw new TypeError(ne(t)+" is not iterable")}return m.prototype=v,s(R,"constructor",{value:v,configurable:!0}),s(v,"constructor",{value:m,configurable:!0}),m.displayName=h(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,h(e,c,"GeneratorFunction")),e.prototype=Object.create(R),e},t.awrap=function(e){return{__await:e}},L(E.prototype),h(E.prototype,o,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,s,a){void 0===a&&(a=Promise);var i=new E(l(e,n,r,s),a);return t.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},L(R),h(R,c,"Generator"),h(R,i,(function(){return this})),h(R,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=q,U.prototype={constructor:U,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(D),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function s(r,s){return o.type="throw",o.arg=t,n.next=r,s&&(n.method="next",n.arg=e),!!s}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],o=i.completion;if("root"===i.tryLoc)return s("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),h=r.call(i,"finallyLoc");if(c&&h){if(this.prev<i.catchLoc)return s(i.catchLoc,!0);if(this.prev<i.finallyLoc)return s(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return s(i.catchLoc,!0)}else{if(!h)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return s(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var s=this.tryEntries[n];if(s.tryLoc<=this.prev&&r.call(s,"finallyLoc")&&this.prev<s.finallyLoc){var a=s;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),D(n),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var s=r.arg;D(n)}return s}}throw Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:q(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),y}},t}function se(e,t,n,r,s,a,i){try{var o=e[a](i),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(r,s)}Z=[{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'./sw.bundle.js.LICENSE.txt'},{'revision':'010ffccf542ced1a647679f3ba8bb990','url':'531.bundle.js'},{'revision':'895f69118d3184a88046da769b226b5a','url':'555.bundle.js'},{'revision':'718cc07b90869881f646ce24adfab11f','url':'607.bundle.js'},{'revision':'0ded1e1cbe8b79ac441b0ee3e3b38953','url':'607.bundle.js.LICENSE.txt'},{'revision':'24fc923bcb942966eedf2684144d8f18','url':'app~2ace9197.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app~2ace9197.bundle.js.LICENSE.txt'},{'revision':'f119d88beab8bdac6d7e12e5e71d6110','url':'app~4e5ec22b.bundle.js'},{'revision':'3b97c23a42f2e32bbc2ac7a874bbbdb1','url':'app~a51fa3f5.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app~a51fa3f5.bundle.js.LICENSE.txt'},{'revision':'a05171120542f3c1152cce1e7c41273f','url':'app~ca0940c6.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app~ca0940c6.bundle.js.LICENSE.txt'},{'revision':'d04355ba92a2ddf7cf7b07d46ce3e1d2','url':'app~e4317507.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app~e4317507.bundle.js.LICENSE.txt'},{'revision':'25cedaf259c35d021ec5c91d6ace98de','url':'favicon.png'},{'revision':'22e90a68736fb21da0b7de9986e2694f','url':'icons/icon128x128.png'},{'revision':'eda4b2723f0bdb7c9bc3771669a81901','url':'icons/icon144x144.png'},{'revision':'35629449c562c502a1591c5e9522664f','url':'icons/icon152x152.png'},{'revision':'adff9750003894065b99d612c609773d','url':'icons/icon192x192.png'},{'revision':'0d6f59accc17af16bac7c0cd14e18c5c','url':'icons/icon384x384.png'},{'revision':'2369c036a1be2e7a2669199ee1a07f98','url':'icons/icon512x512.png'},{'revision':'2889c51db0bba40973a57687a60ed063','url':'icons/icon72x72.png'},{'revision':'3a85bf189bf22b2fd304d57065e399fd','url':'icons/icon96x96.png'},{'revision':'49c33a65853e7b9c0ed71b811dbd5c59','url':'index.html'},{'revision':'b5f900e757e8fdd1d4a2a6c4a464f760','url':'manifest.json'}],_().precache(Z),function(e){const t=_();C(new k(t,e))}(undefined),C((function(e){return"/list"===e.url.pathname}),new D({cacheName:"restaurant-list-api",plugins:[new te({statuses:[0,200]}),new X({maxAgeSeconds:86400})]})),C((function(e){return e.url.pathname.startsWith("/detail/")}),new class extends y{async _handle(t,n){let r,s=await n.cacheMatch(t);if(s);else try{s=await n.fetchAndCachePut(t)}catch(e){e instanceof Error&&(r=e)}if(!s)throw new e("no-response",{url:t.url,error:r});return s}}({cacheName:"restaurant-detail-api",plugins:[new te({statuses:[0,200]}),new X({maxEntries:50,maxAgeSeconds:604800})]})),C((function(e){return e.url.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/")}),new D({cacheName:"restaurant-image-api"})),self.addEventListener("install",(function(){console.log("Service Worker: Installed"),self.skipWaiting()})),self.addEventListener("push",(function(e){var t,n;console.log("Service Worker: Pushed");try{var r,s,a;n={title:(t=e.data.json()).title||"Default Title",options:{body:(null===(r=t.options)||void 0===r?void 0:r.body)||"Default body",icon:(null===(s=t.options)||void 0===s?void 0:s.icon)||"/default-icon.png",image:(null===(a=t.options)||void 0===a?void 0:a.image)||"/default-image.png"}}}catch(t){n={title:"Notification",options:{body:e.data.text(),icon:"/default-icon.png"}}}e.waitUntil(self.registration.showNotification(n.title,n.options))})),self.addEventListener("notificationclick",(function(e){e.notification.close();var t=function(){var e,t=(e=re().mark((function e(){return re().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Notification has been clicked"),e.next=3,self.clients.openWindow("https://www.dicoding.com/");case 3:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function i(e){se(a,r,s,i,o,"next",e)}function o(e){se(a,r,s,i,o,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}();e.waitUntil(t())}))})()})();
//# sourceMappingURL=sw.bundle.js.map