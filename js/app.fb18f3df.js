(function(){"use strict";var e={7899:function(e,u,n){var t=n(5130),l=n(6768),a=(n(4114),n(4232)),o=n(144);const r=100,v=3e3,i=5,c=[];function s(e){for(let u=1;u<=e;u++)c.unshift(u)}s(i);const f={class:"container"},p={class:"containerLift"},d={key:0,class:"indicator"},g={key:1},b={class:"containerButtons"},h=["onClick"];var m={__name:"MyLift",setup(e){const u=(0,o.KR)(c);let n=(0,o.KR)(100/u.value.length),t=n.value/r,i=(0,o.KR)(String(u.value[1]*n.value)+"%"),s=(0,o.KR)(1),m=(0,o.KR)(!1),k=(0,o.KR)(!1);const y=(0,o.KR)([]);function C(){return"top: "+i.value}function I(){localStorage.getItem("queue")&&(y.value=localStorage.getItem("queue").split(",").map((e=>Number(e))),s.value=Number(localStorage.getItem("liftMemory")),w())}function O(){localStorage.setItem("queue",y.value),localStorage.setItem("liftMemory",s.value)}(0,l.sV)(I);const R=(0,l.EW)((()=>s.value<y.value[0]&&m.value?y.value[0]+" up":s.value>y.value[0]&&m.value?y.value[0]+" down":k.value?s.value:null));function _(){k.value=!0,y.value.splice(0,1),O(),setTimeout((()=>{k.value=!1,m.value=!1,y.value[0]&&w()}),v)}function E(e){return!(!m.value||e!==y.value[0])}function w(){m.value=!0,S(y.value[0])}function K(e){y.value.includes(e)||s.value===e?e!==s.value||!m.value||y.value.includes(e)||k.value||(y.value.push(e),O()):(y.value.push(e),O(),m.value||w())}function S(e){if(e>s.value){let l=1,a=u.value[s.value]*n.value;const o=setInterval((function(){i.value=String(a-t)+"%",O(),l++,a-=t,l===(e-s.value)*r&&(s.value=e,_(),clearInterval(o))}),10)}else if(e<s.value){let l=1,a=0;a=s.value===u.value.length?0:u.value[s.value]*n.value;const o=setInterval((function(){l===(s.value-e)*r&&(s.value=e,_(),clearInterval(o),i.value=String(u.value[e]*n.value)+"%"),i.value=String(a+t)+"%",l++,a+=t,O()}),10)}}return(e,n)=>((0,l.uX)(),(0,l.CE)("div",f,[(0,l.Lk)("div",p,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(u.value,(e=>((0,l.uX)(),(0,l.CE)("div",{key:e,class:"liftPlace"})))),128)),(0,l.Lk)("div",{class:(0,a.C4)(["lift",{blink:(0,o.R1)(k)}]),style:(0,a.Tr)(C())},[(0,o.R1)(m)&&!(0,o.R1)(k)?((0,l.uX)(),(0,l.CE)("div",d,(0,a.v_)(R.value),1)):((0,l.uX)(),(0,l.CE)("div",g,(0,a.v_)((0,o.R1)(s)),1))],6)]),(0,l.Lk)("div",b,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(u.value,(e=>((0,l.uX)(),(0,l.CE)("div",{key:e,class:"buttonBox"},[(0,l.Lk)("div",{class:(0,a.C4)(["button",{colored:y.value.includes(e)},{blink:E(e)}]),onClick:u=>K(e)},(0,a.v_)(e),11,h)])))),128))])]))}},k=n(1241);const y=(0,k.A)(m,[["__scopeId","data-v-e3bec328"]]);var C=y,I={__name:"App",setup(e){return(e,u)=>((0,l.uX)(),(0,l.Wv)(C))}};const O=I;var R=O;(0,t.Ef)(R).mount("#app")}},u={};function n(t){var l=u[t];if(void 0!==l)return l.exports;var a=u[t]={exports:{}};return e[t].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(u,t,l,a){if(!t){var o=1/0;for(c=0;c<e.length;c++){t=e[c][0],l=e[c][1],a=e[c][2];for(var r=!0,v=0;v<t.length;v++)(!1&a||o>=a)&&Object.keys(n.O).every((function(e){return n.O[e](t[v])}))?t.splice(v--,1):(r=!1,a<o&&(o=a));if(r){e.splice(c--,1);var i=l();void 0!==i&&(u=i)}}return u}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[t,l,a]}}(),function(){n.n=function(e){var u=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(u,{a:u}),u}}(),function(){n.d=function(e,u){for(var t in u)n.o(u,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:u[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,u){return Object.prototype.hasOwnProperty.call(e,u)}}(),function(){var e={524:0};n.O.j=function(u){return 0===e[u]};var u=function(u,t){var l,a,o=t[0],r=t[1],v=t[2],i=0;if(o.some((function(u){return 0!==e[u]}))){for(l in r)n.o(r,l)&&(n.m[l]=r[l]);if(v)var c=v(n)}for(u&&u(t);i<o.length;i++)a=o[i],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},t=self["webpackChunklift"]=self["webpackChunklift"]||[];t.forEach(u.bind(null,0)),t.push=u.bind(null,t.push.bind(t))}();var t=n.O(void 0,[504],(function(){return n(7899)}));t=n.O(t)})();
//# sourceMappingURL=app.fb18f3df.js.map