import{m as g,f as i,j as d,I as y,p as U,v,F as p,r as x,u as D,o as s,t as V}from"./entry.0f0947e0.js";import{u as I}from"./resourcesStore.2047b89c.js";import"./transactionsStore.cbc79b0f.js";import"./useDateUtils.f5dea9a8.js";let c;const R=new Uint8Array(16);function _(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(R)}const t=[];for(let e=0;e<256;++e)t.push((e+256).toString(16).slice(1));function h(e,n=0){return(t[e[n+0]]+t[e[n+1]]+t[e[n+2]]+t[e[n+3]]+"-"+t[e[n+4]]+t[e[n+5]]+"-"+t[e[n+6]]+t[e[n+7]]+"-"+t[e[n+8]]+t[e[n+9]]+"-"+t[e[n+10]]+t[e[n+11]]+t[e[n+12]]+t[e[n+13]]+t[e[n+14]]+t[e[n+15]]).toLowerCase()}const w=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),m={randomUUID:w};function S(e,n,o){if(m.randomUUID&&!n&&!e)return m.randomUUID();e=e||{};const r=e.random||(e.rng||_)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,n){o=o||0;for(let u=0;u<16;++u)n[o+u]=r[u];return n}return h(r)}const j={__name:"resources",setup(e){const n=I(),o=g("");function r(){console.log(n.resources),n.resources.push({agregador:o.value,id:S()})}return(u,l)=>(s(),i(p,null,[d("div",null,[d("label",null,[y(" Agregador "),U(d("input",{type:"text","onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a),name:"",id:""},null,512),[[v,o.value]])]),d("button",{onClick:r},"+")]),(s(!0),i(p,null,x(D(n).resources,a=>(s(),i("div",{key:a.agregador},V(a.agregador),1))),128))],64))}};export{j as default};
