
        const window = this;
    !function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){const n={stores:[{id:1,name:"Store 1",location:"flushing",hours:"Mon-Sun 9:00am - 9:00pm",redirect:"https://nytui.com/us/store"},{id:2,name:"Store 2",location:"shanhai",hours:"Mon-Sun 10:00am - 7:00pm",redirect:"https://nytui.com/cn/store"}]},o=t=>STORE_METADATA.get(t),r=(t,e)=>STORE_METADATA.put(t,e),i=t=>`\n<!doctype html>\n<html>\n\t<body>\t\n\t\t<div>Store name: <span id="store_name"></span></div>\n\t\t<div>Store location: <span id="store_location"></span></div>\n\t\t<div>Store hours: <span id="store_hours"></span></div>\n\t\t\n\t\t<p> You will be redirect to: <strong><span id="store_redirect"></span></strong> in 10 seconds.</p>\t\t\n\t</body>\n\t\n\n\t<script>\n\tdocument.addEventListener("DOMContentLoaded", function(){\n \t\twindow.store = ${t||[]}\n \t\tdocument.getElementById('store_name').innerHTML = store.name;\n \t\tdocument.getElementById('store_location').innerHTML = store.location;\n \t\tdocument.getElementById('store_hours').innerHTML = store.hours;\n \t\tdocument.getElementById('store_redirect').innerHTML = store.redirect;\n\t\tconsole.log(store);\n\n\n\t\twindow.setTimeout(function(){\n\t\t\twindow.location = store.redirect;\n\t\t}, 10000);\n\n\n\t});\n\n\t<\/script>\n</html>\n`;addEventListener("fetch",t=>{t.respondWith(async function(t){let e=t.request,s=caches.default,a=await s.match(e);if(!a){let u=new URL(t.request.url),c=[],d=u.pathname.split("/");d=(d=d.slice(1,-1)).map(encodeURIComponent);for(let t=0;t<d.length;t++)c[t]=u.hostname+"/"+d.slice(0,t+1).join("/")+"/*";a=await async function(t){const e=await o("stores");let s;e?s=JSON.parse(e):(await r("stores",JSON.stringify(n.stores)),s=n);let a=t.url.split("/").pop(),u=s.filter(function(t){return t.id==a}).pop();const c=i(JSON.stringify(u||[]));return new Response(c,{headers:{"Content-Type":"text/html"}})}(e),(a=new Response(a.body,a)).headers.append("Cache-Tag",c.join(",")),t.waitUntil(s.put(e,a.clone()))}return a}(t))})}]);