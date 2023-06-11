import{U as P,m as k,Z as F,$ as M,E as D,D as A,u as S,a0 as U,a1 as R,e as j,a2 as N,i as L,o as H,f as E,J as $,A as T}from"./entry.68909b65.js";const I=()=>null;function W(...s){var l;const n=typeof s[s.length-1]=="string"?s.pop():void 0;typeof s[0]!="string"&&s.unshift(n);let[r,e,t={}]=s;if(typeof r!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof e!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");t.server=t.server??!0,t.default=t.default??I,t.lazy=t.lazy??!1,t.immediate=t.immediate??!0;const a=P(),o=()=>a.isHydrating?a.payload.data[r]:a.static.data[r],c=()=>o()!==void 0;a._asyncData[r]||(a._asyncData[r]={data:k(o()??((l=t.default)==null?void 0:l.call(t))??null),pending:k(!c()),error:F(a.payload._errors,r)});const i={...a._asyncData[r]};i.refresh=i.execute=(d={})=>{if(a._asyncDataPromises[r]){if(d.dedupe===!1)return a._asyncDataPromises[r];a._asyncDataPromises[r].cancelled=!0}if(d._initial&&c())return o();i.pending.value=!0;const _=new Promise((u,p)=>{try{u(e(a))}catch(B){p(B)}}).then(u=>{if(_.cancelled)return a._asyncDataPromises[r];let p=u;t.transform&&(p=t.transform(u)),t.pick&&(p=J(p,t.pick)),i.data.value=p,i.error.value=null}).catch(u=>{var p;if(_.cancelled)return a._asyncDataPromises[r];i.error.value=u,i.data.value=S(((p=t.default)==null?void 0:p.call(t))??null)}).finally(()=>{_.cancelled||(i.pending.value=!1,a.payload.data[r]=i.data.value,i.error.value&&(a.payload._errors[r]=U(i.error.value)),delete a._asyncDataPromises[r])});return a._asyncDataPromises[r]=_,a._asyncDataPromises[r]};const f=()=>i.refresh({_initial:!0}),h=t.server!==!1&&a.payload.serverRendered;{const d=R();if(d&&!d._nuxtOnBeforeMountCbs){d._nuxtOnBeforeMountCbs=[];const u=d._nuxtOnBeforeMountCbs;d&&(M(()=>{u.forEach(p=>{p()}),u.splice(0,u.length)}),D(()=>u.splice(0,u.length)))}h&&a.isHydrating&&c()?i.pending.value=!1:d&&(a.payload.serverRendered&&a.isHydrating||t.lazy)&&t.immediate?d._nuxtOnBeforeMountCbs.push(f):t.immediate&&f(),t.watch&&A(t.watch,()=>i.refresh());const _=a.hook("app:data:refresh",u=>{if(!u||u.includes(r))return i.refresh()});d&&D(_)}const y=Promise.resolve(a._asyncDataPromises[r]).then(()=>i);return Object.assign(y,i),y}function J(s,n){const r={};for(const e of n)r[e]=s[e];return r}const K={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function q(s,n={}){n={...K,...n};const r=O(n);return r.dispatch(s),r.toString()}function O(s){const n=[];let r=[];const e=t=>{n.push(t)};return{toString(){return n.join("")},getContext(){return r},dispatch(t){return s.replacer&&(t=s.replacer(t)),this["_"+(t===null?"null":typeof t)](t)},_object(t){if(t&&typeof t.toJSON=="function")return this._object(t.toJSON());const a=/\[object (.*)]/i,o=Object.prototype.toString.call(t),c=a.exec(o),i=c?c[1].toLowerCase():"unknown:["+o.toLowerCase()+"]";let f=null;if((f=r.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(r.push(t),typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(t))return e("buffer:"),e(t.toString("utf8"));if(i!=="object"&&i!=="function"&&i!=="asyncfunction")this["_"+i]?this["_"+i](t):s.ignoreUnknown||this._unkown(t,i);else{let h=Object.keys(t);s.unorderedObjects&&(h=h.sort()),s.respectType!==!1&&!C(t)&&h.splice(0,0,"prototype","__proto__","letructor"),s.excludeKeys&&(h=h.filter(function(y){return!s.excludeKeys(y)})),e("object:"+h.length+":");for(const y of h)this.dispatch(y),e(":"),s.excludeValues||this.dispatch(t[y]),e(",")}},_array(t,a){if(a=typeof a<"u"?a:s.unorderedArrays!==!1,e("array:"+t.length+":"),!a||t.length<=1){for(const i of t)this.dispatch(i);return}const o=[],c=t.map(i=>{const f=O(s);return f.dispatch(i),o.push(f.getContext()),f.toString()});return r=[...r,...o],c.sort(),this._array(c,!1)},_date(t){return e("date:"+t.toJSON())},_symbol(t){return e("symbol:"+t.toString())},_unkown(t,a){if(e(a),!!t&&(e(":"),t&&typeof t.entries=="function"))return this._array(Array.from(t.entries()),!0)},_error(t){return e("error:"+t.toString())},_boolean(t){return e("bool:"+t.toString())},_string(t){e("string:"+t.length+":"),e(t.toString())},_function(t){e("fn:"),C(t)?this.dispatch("[native]"):this.dispatch(t.toString()),s.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),s.respectFunctionProperties&&this._object(t)},_number(t){return e("number:"+t.toString())},_xml(t){return e("xml:"+t.toString())},_null(){return e("Null")},_undefined(){return e("Undefined")},_regexp(t){return e("regex:"+t.toString())},_uint8array(t){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint8clampedarray(t){return e("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(t))},_int8array(t){return e("int8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint16array(t){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},_int16array(t){return e("int16array:"),this.dispatch(Array.prototype.slice.call(t))},_uint32array(t){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},_int32array(t){return e("int32array:"),this.dispatch(Array.prototype.slice.call(t))},_float32array(t){return e("float32array:"),this.dispatch(Array.prototype.slice.call(t))},_float64array(t){return e("float64array:"),this.dispatch(Array.prototype.slice.call(t))},_arraybuffer(t){return e("arraybuffer:"),this.dispatch(new Uint8Array(t))},_url(t){return e("url:"+t.toString())},_map(t){e("map:");const a=[...t];return this._array(a,s.unorderedSets!==!1)},_set(t){e("set:");const a=[...t];return this._array(a,s.unorderedSets!==!1)},_file(t){return e("file:"),this.dispatch([t.name,t.size,t.type,t.lastModfied])},_blob(){if(s.ignoreUnknown)return e("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return e("domwindow")},_bigint(t){return e("bigint:"+t.toString())},_process(){return e("process")},_timer(){return e("timer")},_pipe(){return e("pipe")},_tcp(){return e("tcp")},_udp(){return e("udp")},_tty(){return e("tty")},_statwatcher(){return e("statwatcher")},_securecontext(){return e("securecontext")},_connection(){return e("connection")},_zlib(){return e("zlib")},_context(){return e("context")},_nodescript(){return e("nodescript")},_httpparser(){return e("httpparser")},_dataview(){return e("dataview")},_signal(){return e("signal")},_fsevent(){return e("fsevent")},_tlswrap(){return e("tlswrap")}}}function C(s){return typeof s!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code]\s+}$/i.exec(Function.prototype.toString.call(s))!=null}class v{constructor(n,r){n=this.words=n||[],this.sigBytes=r!==void 0?r:n.length*4}toString(n){return(n||V).stringify(this)}concat(n){if(this.clamp(),this.sigBytes%4)for(let r=0;r<n.sigBytes;r++){const e=n.words[r>>>2]>>>24-r%4*8&255;this.words[this.sigBytes+r>>>2]|=e<<24-(this.sigBytes+r)%4*8}else for(let r=0;r<n.sigBytes;r+=4)this.words[this.sigBytes+r>>>2]=n.words[r>>>2];return this.sigBytes+=n.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new v([...this.words])}}const V={stringify(s){const n=[];for(let r=0;r<s.sigBytes;r++){const e=s.words[r>>>2]>>>24-r%4*8&255;n.push((e>>>4).toString(16),(e&15).toString(16))}return n.join("")}},Y={stringify(s){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=[];for(let e=0;e<s.sigBytes;e+=3){const t=s.words[e>>>2]>>>24-e%4*8&255,a=s.words[e+1>>>2]>>>24-(e+1)%4*8&255,o=s.words[e+2>>>2]>>>24-(e+2)%4*8&255,c=t<<16|a<<8|o;for(let i=0;i<4&&e*8+i*6<s.sigBytes*8;i++)r.push(n.charAt(c>>>6*(3-i)&63))}return r.join("")}},Z={parse(s){const n=s.length,r=[];for(let e=0;e<n;e++)r[e>>>2]|=(s.charCodeAt(e)&255)<<24-e%4*8;return new v(r,n)}},G={parse(s){return Z.parse(unescape(encodeURIComponent(s)))}};class Q{constructor(){this._minBufferSize=0,this.blockSize=512/32,this.reset()}reset(){this._data=new v,this._nDataBytes=0}_append(n){typeof n=="string"&&(n=G.parse(n)),this._data.concat(n),this._nDataBytes+=n.sigBytes}_doProcessBlock(n,r){}_process(n){let r,e=this._data.sigBytes/(this.blockSize*4);n?e=Math.ceil(e):e=Math.max((e|0)-this._minBufferSize,0);const t=e*this.blockSize,a=Math.min(t*4,this._data.sigBytes);if(t){for(let o=0;o<t;o+=this.blockSize)this._doProcessBlock(this._data.words,o);r=this._data.words.splice(0,t),this._data.sigBytes-=a}return new v(r,a)}}class X extends Q{update(n){return this._append(n),this._process(),this}finalize(n){n&&this._append(n)}}const tt=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],et=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],b=[];class rt extends X{constructor(){super(),this.reset()}reset(){super.reset(),this._hash=new v([...tt])}_doProcessBlock(n,r){const e=this._hash.words;let t=e[0],a=e[1],o=e[2],c=e[3],i=e[4],f=e[5],h=e[6],y=e[7];for(let l=0;l<64;l++){if(l<16)b[l]=n[r+l]|0;else{const x=b[l-15],w=(x<<25|x>>>7)^(x<<14|x>>>18)^x>>>3,m=b[l-2],z=(m<<15|m>>>17)^(m<<13|m>>>19)^m>>>10;b[l]=w+b[l-7]+z+b[l-16]}const d=i&f^~i&h,_=t&a^t&o^a&o,u=(t<<30|t>>>2)^(t<<19|t>>>13)^(t<<10|t>>>22),p=(i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25),B=y+p+d+et[l]+b[l],g=u+_;y=h,h=f,f=i,i=c+B|0,c=o,o=a,a=t,t=B+g|0}e[0]=e[0]+t|0,e[1]=e[1]+a|0,e[2]=e[2]+o|0,e[3]=e[3]+c|0,e[4]=e[4]+i|0,e[5]=e[5]+f|0,e[6]=e[6]+h|0,e[7]=e[7]+y|0}finalize(n){super.finalize(n);const r=this._nDataBytes*8,e=this._data.sigBytes*8;return this._data.words[e>>>5]|=128<<24-e%32,this._data.words[(e+64>>>9<<4)+14]=Math.floor(r/4294967296),this._data.words[(e+64>>>9<<4)+15]=r,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function st(s){return new rt().finalize(s).toString(Y)}function nt(s,n={}){const r=typeof s=="string"?s:q(s,n);return st(r).slice(0,10)}function at(s,n,r){const[e={},t]=typeof n=="string"?[{},n]:[n,r],a=e.key||nt([t,S(e.baseURL),typeof s=="string"?s:"",S(e.params||e.query)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const o=a===t?"$f"+a:a,c=j(()=>{let w=s;return typeof w=="function"&&(w=w()),S(w)});if(!e.baseURL&&typeof c.value=="string"&&c.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:i,lazy:f,default:h,transform:y,pick:l,watch:d,immediate:_,...u}=e,p=N({...u,cache:typeof e.cache=="boolean"?void 0:e.cache}),B={server:i,lazy:f,default:h,transform:y,pick:l,immediate:_,watch:d===!1?[]:[p,c,...d||[]]};let g;return W(o,()=>{var m;return(m=g==null?void 0:g.abort)==null||m.call(g),g=typeof AbortController<"u"?new AbortController:{},typeof c.value=="string"&&c.value.startsWith("/"),(e.$fetch||globalThis.$fetch)(c.value,{signal:g.signal,...p})},B)}const it={},ot={class:"box"};function ct(s,n){return H(),E("div",ot,[$(s.$slots,"default",{},void 0,!0)])}const lt=L(it,[["render",ct],["__scopeId","data-v-a24969ec"]]),ft=()=>{const s=t=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t),n=k(0),r=()=>0;function e(t,a,o){const c=n.value/100;console.log("juros: ",c),console.log("capital: ",t),console.log("aporte: ",a),console.log("tempo: ",o);const i=t*Math.pow(1+c/12,12*o)+a*((Math.pow(1+c/12,12*o)-1)/(c/12));return console.log("montate: ",i),i}return T(async()=>{const{data:t}=await at(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.4392/dados?formato=json&dataInicial=${new Date(new Date().getFullYear(),0,1).toLocaleDateString("pt-br")}&dataFinal=${new Date().toLocaleDateString("pt-br")}`,"$3wkDtUOdqz");console.log("onMounted: ",t.value),typeof t.value=="string"?n.value=Number(JSON.parse(t.value).pop().valor):n.value=Number(t.value.pop().valor)}),{currency:s,calcularMontanteComposto:e,somaParcelas:r}};export{lt as _,W as a,ft as u};
