(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function la(n,t){const e=new Set(n.split(","));return i=>e.has(i)}const ne={},Vi=[],Ge=()=>{},Uh=()=>!1,Ns=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ca=n=>n.startsWith("onUpdate:"),_e=Object.assign,ua=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Nh=Object.prototype.hasOwnProperty,Yt=(n,t)=>Nh.call(n,t),Bt=Array.isArray,dr=n=>Fs(n)==="[object Map]",Fh=n=>Fs(n)==="[object Set]",Gt=n=>typeof n=="function",ve=n=>typeof n=="string",Pr=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",Jc=n=>(ue(n)||Gt(n))&&Gt(n.then)&&Gt(n.catch),Oh=Object.prototype.toString,Fs=n=>Oh.call(n),Bh=n=>Fs(n).slice(8,-1),zh=n=>Fs(n)==="[object Object]",ha=n=>ve(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,pr=la(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Os=n=>{const t=Object.create(null);return e=>t[e]||(t[e]=n(e))},Hh=/-(\w)/g,Yi=Os(n=>n.replace(Hh,(t,e)=>e?e.toUpperCase():"")),Vh=/\B([A-Z])/g,Ji=Os(n=>n.replace(Vh,"-$1").toLowerCase()),Qc=Os(n=>n.charAt(0).toUpperCase()+n.slice(1)),Qs=Os(n=>n?`on${Qc(n)}`:""),Wn=(n,t)=>!Object.is(n,t),to=(n,t)=>{for(let e=0;e<n.length;e++)n[e](t)},tu=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Gh=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Va;const eu=()=>Va||(Va=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function fa(n){if(Bt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],r=ve(i)?Yh(i):fa(i);if(r)for(const s in r)t[s]=r[s]}return t}else if(ve(n)||ue(n))return n}const kh=/;(?![^(]*\))/g,Wh=/:([^]+)/,Xh=/\/\*[^]*?\*\//g;function Yh(n){const t={};return n.replace(Xh,"").split(kh).forEach(e=>{if(e){const i=e.split(Wh);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function da(n){let t="";if(ve(n))t=n;else if(Bt(n))for(let e=0;e<n.length;e++){const i=da(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const qh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",jh=la(qh);function nu(n){return!!n||n===""}/**
* @vue/reactivity v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let qe;class Zh{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=qe,!t&&qe&&(this.index=(qe.scopes||(qe.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=qe;try{return qe=this,t()}finally{qe=e}}}on(){qe=this}off(){qe=this.parent}stop(t){if(this._active){let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.scopes)for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function Kh(n,t=qe){t&&t.active&&t.effects.push(n)}function $h(){return qe}let mi;class pa{constructor(t,e,i,r){this.fn=t,this.trigger=e,this.scheduler=i,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Kh(this,r)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,Zn();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(Jh(e.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),Kn()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=zn,e=mi;try{return zn=!0,mi=this,this._runnings++,Ga(this),this.fn()}finally{ka(this),this._runnings--,mi=e,zn=t}}stop(){this.active&&(Ga(this),ka(this),this.onStop&&this.onStop(),this.active=!1)}}function Jh(n){return n.value}function Ga(n){n._trackId++,n._depsLength=0}function ka(n){if(n.deps.length>n._depsLength){for(let t=n._depsLength;t<n.deps.length;t++)iu(n.deps[t],n);n.deps.length=n._depsLength}}function iu(n,t){const e=n.get(t);e!==void 0&&t._trackId!==e&&(n.delete(t),n.size===0&&n.cleanup())}let zn=!0,Wo=0;const ru=[];function Zn(){ru.push(zn),zn=!1}function Kn(){const n=ru.pop();zn=n===void 0?!0:n}function ma(){Wo++}function ga(){for(Wo--;!Wo&&Xo.length;)Xo.shift()()}function su(n,t,e){if(t.get(n)!==n._trackId){t.set(n,n._trackId);const i=n.deps[n._depsLength];i!==t?(i&&iu(i,n),n.deps[n._depsLength++]=t):n._depsLength++}}const Xo=[];function ou(n,t,e){ma();for(const i of n.keys()){let r;i._dirtyLevel<t&&(r??(r=n.get(i)===i._trackId))&&(i._shouldSchedule||(i._shouldSchedule=i._dirtyLevel===0),i._dirtyLevel=t),i._shouldSchedule&&(r??(r=n.get(i)===i._trackId))&&(i.trigger(),(!i._runnings||i.allowRecurse)&&i._dirtyLevel!==2&&(i._shouldSchedule=!1,i.scheduler&&Xo.push(i.scheduler)))}ga()}const au=(n,t)=>{const e=new Map;return e.cleanup=n,e.computed=t,e},Yo=new WeakMap,gi=Symbol(""),qo=Symbol("");function Ie(n,t,e){if(zn&&mi){let i=Yo.get(n);i||Yo.set(n,i=new Map);let r=i.get(e);r||i.set(e,r=au(()=>i.delete(e))),su(mi,r)}}function Sn(n,t,e,i,r,s){const a=Yo.get(n);if(!a)return;let o=[];if(t==="clear")o=[...a.values()];else if(e==="length"&&Bt(n)){const l=Number(i);a.forEach((c,u)=>{(u==="length"||!Pr(u)&&u>=l)&&o.push(c)})}else switch(e!==void 0&&o.push(a.get(e)),t){case"add":Bt(n)?ha(e)&&o.push(a.get("length")):(o.push(a.get(gi)),dr(n)&&o.push(a.get(qo)));break;case"delete":Bt(n)||(o.push(a.get(gi)),dr(n)&&o.push(a.get(qo)));break;case"set":dr(n)&&o.push(a.get(gi));break}ma();for(const l of o)l&&ou(l,4);ga()}const Qh=la("__proto__,__v_isRef,__isVue"),lu=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Pr)),Wa=tf();function tf(){const n={};return["includes","indexOf","lastIndexOf"].forEach(t=>{n[t]=function(...e){const i=$t(this);for(let s=0,a=this.length;s<a;s++)Ie(i,"get",s+"");const r=i[t](...e);return r===-1||r===!1?i[t](...e.map($t)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{n[t]=function(...e){Zn(),ma();const i=$t(this)[t].apply(this,e);return ga(),Kn(),i}}),n}function ef(n){Pr(n)||(n=String(n));const t=$t(this);return Ie(t,"has",n),t.hasOwnProperty(n)}class cu{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){const r=this._isReadonly,s=this._isShallow;if(e==="__v_isReactive")return!r;if(e==="__v_isReadonly")return r;if(e==="__v_isShallow")return s;if(e==="__v_raw")return i===(r?s?mf:du:s?fu:hu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const a=Bt(t);if(!r){if(a&&Yt(Wa,e))return Reflect.get(Wa,e,i);if(e==="hasOwnProperty")return ef}const o=Reflect.get(t,e,i);return(Pr(e)?lu.has(e):Qh(e))||(r||Ie(t,"get",e),s)?o:Ue(o)?a&&ha(e)?o:o.value:ue(o)?r?pu(o):xa(o):o}}class uu extends cu{constructor(t=!1){super(!1,t)}set(t,e,i,r){let s=t[e];if(!this._isShallow){const l=Sr(s);if(!Es(i)&&!Sr(i)&&(s=$t(s),i=$t(i)),!Bt(t)&&Ue(s)&&!Ue(i))return l?!1:(s.value=i,!0)}const a=Bt(t)&&ha(e)?Number(e)<t.length:Yt(t,e),o=Reflect.set(t,e,i,r);return t===$t(r)&&(a?Wn(i,s)&&Sn(t,"set",e,i):Sn(t,"add",e,i)),o}deleteProperty(t,e){const i=Yt(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&i&&Sn(t,"delete",e,void 0),r}has(t,e){const i=Reflect.has(t,e);return(!Pr(e)||!lu.has(e))&&Ie(t,"has",e),i}ownKeys(t){return Ie(t,"iterate",Bt(t)?"length":gi),Reflect.ownKeys(t)}}class nf extends cu{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const rf=new uu,sf=new nf,of=new uu(!0);const _a=n=>n,Bs=n=>Reflect.getPrototypeOf(n);function Or(n,t,e=!1,i=!1){n=n.__v_raw;const r=$t(n),s=$t(t);e||(Wn(t,s)&&Ie(r,"get",t),Ie(r,"get",s));const{has:a}=Bs(r),o=i?_a:e?Sa:yr;if(a.call(r,t))return o(n.get(t));if(a.call(r,s))return o(n.get(s));n!==r&&n.get(t)}function Br(n,t=!1){const e=this.__v_raw,i=$t(e),r=$t(n);return t||(Wn(n,r)&&Ie(i,"has",n),Ie(i,"has",r)),n===r?e.has(n):e.has(n)||e.has(r)}function zr(n,t=!1){return n=n.__v_raw,!t&&Ie($t(n),"iterate",gi),Reflect.get(n,"size",n)}function Xa(n){n=$t(n);const t=$t(this);return Bs(t).has.call(t,n)||(t.add(n),Sn(t,"add",n,n)),this}function Ya(n,t){t=$t(t);const e=$t(this),{has:i,get:r}=Bs(e);let s=i.call(e,n);s||(n=$t(n),s=i.call(e,n));const a=r.call(e,n);return e.set(n,t),s?Wn(t,a)&&Sn(e,"set",n,t):Sn(e,"add",n,t),this}function qa(n){const t=$t(this),{has:e,get:i}=Bs(t);let r=e.call(t,n);r||(n=$t(n),r=e.call(t,n)),i&&i.call(t,n);const s=t.delete(n);return r&&Sn(t,"delete",n,void 0),s}function ja(){const n=$t(this),t=n.size!==0,e=n.clear();return t&&Sn(n,"clear",void 0,void 0),e}function Hr(n,t){return function(i,r){const s=this,a=s.__v_raw,o=$t(a),l=t?_a:n?Sa:yr;return!n&&Ie(o,"iterate",gi),a.forEach((c,u)=>i.call(r,l(c),l(u),s))}}function Vr(n,t,e){return function(...i){const r=this.__v_raw,s=$t(r),a=dr(s),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=r[n](...i),u=e?_a:t?Sa:yr;return!t&&Ie(s,"iterate",l?qo:gi),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function An(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function af(){const n={get(s){return Or(this,s)},get size(){return zr(this)},has:Br,add:Xa,set:Ya,delete:qa,clear:ja,forEach:Hr(!1,!1)},t={get(s){return Or(this,s,!1,!0)},get size(){return zr(this)},has:Br,add:Xa,set:Ya,delete:qa,clear:ja,forEach:Hr(!1,!0)},e={get(s){return Or(this,s,!0)},get size(){return zr(this,!0)},has(s){return Br.call(this,s,!0)},add:An("add"),set:An("set"),delete:An("delete"),clear:An("clear"),forEach:Hr(!0,!1)},i={get(s){return Or(this,s,!0,!0)},get size(){return zr(this,!0)},has(s){return Br.call(this,s,!0)},add:An("add"),set:An("set"),delete:An("delete"),clear:An("clear"),forEach:Hr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Vr(s,!1,!1),e[s]=Vr(s,!0,!1),t[s]=Vr(s,!1,!0),i[s]=Vr(s,!0,!0)}),[n,e,t,i]}const[lf,cf,uf,hf]=af();function va(n,t){const e=t?n?hf:uf:n?cf:lf;return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(Yt(e,r)&&r in i?e:i,r,s)}const ff={get:va(!1,!1)},df={get:va(!1,!0)},pf={get:va(!0,!1)};const hu=new WeakMap,fu=new WeakMap,du=new WeakMap,mf=new WeakMap;function gf(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function _f(n){return n.__v_skip||!Object.isExtensible(n)?0:gf(Bh(n))}function xa(n){return Sr(n)?n:Ma(n,!1,rf,ff,hu)}function vf(n){return Ma(n,!1,of,df,fu)}function pu(n){return Ma(n,!0,sf,pf,du)}function Ma(n,t,e,i,r){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const s=r.get(n);if(s)return s;const a=_f(n);if(a===0)return n;const o=new Proxy(n,a===2?i:e);return r.set(n,o),o}function mr(n){return Sr(n)?mr(n.__v_raw):!!(n&&n.__v_isReactive)}function Sr(n){return!!(n&&n.__v_isReadonly)}function Es(n){return!!(n&&n.__v_isShallow)}function mu(n){return n?!!n.__v_raw:!1}function $t(n){const t=n&&n.__v_raw;return t?$t(t):n}function xf(n){return Object.isExtensible(n)&&tu(n,"__v_skip",!0),n}const yr=n=>ue(n)?xa(n):n,Sa=n=>ue(n)?pu(n):n;class gu{constructor(t,e,i,r){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new pa(()=>t(this._value),()=>_s(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=i}get value(){const t=$t(this);return(!t._cacheable||t.effect.dirty)&&Wn(t._value,t._value=t.effect.run())&&_s(t,4),_u(t),t.effect._dirtyLevel>=2&&_s(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Mf(n,t,e=!1){let i,r;const s=Gt(n);return s?(i=n,r=Ge):(i=n.get,r=n.set),new gu(i,r,s||!r,e)}function _u(n){var t;zn&&mi&&(n=$t(n),su(mi,(t=n.dep)!=null?t:n.dep=au(()=>n.dep=void 0,n instanceof gu?n:void 0)))}function _s(n,t=4,e){n=$t(n);const i=n.dep;i&&ou(i,t)}function Ue(n){return!!(n&&n.__v_isRef===!0)}function eo(n){return Sf(n,!1)}function Sf(n,t){return Ue(n)?n:new yf(n,t)}class yf{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:$t(t),this._value=e?t:yr(t)}get value(){return _u(this),this._value}set value(t){const e=this.__v_isShallow||Es(t)||Sr(t);t=e?t:$t(t),Wn(t,this._rawValue)&&(this._rawValue=t,this._value=e?t:yr(t),_s(this,4))}}function Ef(n){return Ue(n)?n.value:n}const Tf={get:(n,t,e)=>Ef(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const r=n[t];return Ue(r)&&!Ue(e)?(r.value=e,!0):Reflect.set(n,t,e,i)}};function vu(n){return mr(n)?n:new Proxy(n,Tf)}/**
* @vue/runtime-core v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Hn(n,t,e,i){try{return i?n(...i):n()}catch(r){zs(r,t,e)}}function $e(n,t,e,i){if(Gt(n)){const r=Hn(n,t,e,i);return r&&Jc(r)&&r.catch(s=>{zs(s,t,e)}),r}if(Bt(n)){const r=[];for(let s=0;s<n.length;s++)r.push($e(n[s],t,e,i));return r}}function zs(n,t,e,i=!0){const r=t?t.vnode:null;if(t){let s=t.parent;const a=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${e}`;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,a,o)===!1)return}s=s.parent}const l=t.appContext.config.errorHandler;if(l){Zn(),Hn(l,null,10,[n,a,o]),Kn();return}}bf(n,e,r,i)}function bf(n,t,e,i=!0){console.error(n)}let Er=!1,jo=!1;const Te=[];let nn=0;const Gi=[];let In=null,ui=0;const xu=Promise.resolve();let ya=null;function Af(n){const t=ya||xu;return n?t.then(this?n.bind(this):n):t}function wf(n){let t=nn+1,e=Te.length;for(;t<e;){const i=t+e>>>1,r=Te[i],s=Tr(r);s<n||s===n&&r.pre?t=i+1:e=i}return t}function Ea(n){(!Te.length||!Te.includes(n,Er&&n.allowRecurse?nn+1:nn))&&(n.id==null?Te.push(n):Te.splice(wf(n.id),0,n),Mu())}function Mu(){!Er&&!jo&&(jo=!0,ya=xu.then(yu))}function Rf(n){const t=Te.indexOf(n);t>nn&&Te.splice(t,1)}function Cf(n){Bt(n)?Gi.push(...n):(!In||!In.includes(n,n.allowRecurse?ui+1:ui))&&Gi.push(n),Mu()}function Za(n,t,e=Er?nn+1:0){for(;e<Te.length;e++){const i=Te[e];if(i&&i.pre){if(n&&i.id!==n.uid)continue;Te.splice(e,1),e--,i()}}}function Su(n){if(Gi.length){const t=[...new Set(Gi)].sort((e,i)=>Tr(e)-Tr(i));if(Gi.length=0,In){In.push(...t);return}for(In=t,ui=0;ui<In.length;ui++)In[ui]();In=null,ui=0}}const Tr=n=>n.id==null?1/0:n.id,Pf=(n,t)=>{const e=Tr(n)-Tr(t);if(e===0){if(n.pre&&!t.pre)return-1;if(t.pre&&!n.pre)return 1}return e};function yu(n){jo=!1,Er=!0,Te.sort(Pf);try{for(nn=0;nn<Te.length;nn++){const t=Te[nn];t&&t.active!==!1&&Hn(t,null,14)}}finally{nn=0,Te.length=0,Su(),Er=!1,ya=null,(Te.length||Gi.length)&&yu()}}function Lf(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ne;let r=e;const s=t.startsWith("update:"),a=s&&t.slice(7);if(a&&a in i){const u=`${a==="modelValue"?"model":a}Modifiers`,{number:h,trim:f}=i[u]||ne;f&&(r=e.map(m=>ve(m)?m.trim():m)),h&&(r=e.map(Gh))}let o,l=i[o=Qs(t)]||i[o=Qs(Yi(t))];!l&&s&&(l=i[o=Qs(Ji(t))]),l&&$e(l,n,6,r);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,$e(c,n,6,r)}}function Eu(n,t,e=!1){const i=t.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let a={},o=!1;if(!Gt(n)){const l=c=>{const u=Eu(c,t,!0);u&&(o=!0,_e(a,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!o?(ue(n)&&i.set(n,null),null):(Bt(s)?s.forEach(l=>a[l]=null):_e(a,s),ue(n)&&i.set(n,a),a)}function Hs(n,t){return!n||!Ns(t)?!1:(t=t.slice(2).replace(/Once$/,""),Yt(n,t[0].toLowerCase()+t.slice(1))||Yt(n,Ji(t))||Yt(n,t))}let sn=null,Vs=null;function Ts(n){const t=sn;return sn=n,Vs=n&&n.type.__scopeId||null,t}function Df(n){Vs=n}function If(){Vs=null}function Uf(n,t=sn,e){if(!t||n._n)return n;const i=(...r)=>{i._d&&sl(-1);const s=Ts(t);let a;try{a=n(...r)}finally{Ts(s),i._d&&sl(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function no(n){const{type:t,vnode:e,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:f,setupState:m,ctx:x,inheritAttrs:v}=n,p=Ts(n);let d,b;try{if(e.shapeFlag&4){const A=r||i,U=A;d=tn(c.call(U,A,u,h,m,f,x)),b=o}else{const A=t;d=tn(A.length>1?A(h,{attrs:o,slots:a,emit:l}):A(h,null)),b=t.props?o:Nf(o)}}catch(A){vr.length=0,zs(A,n,1),d=Vn(br)}let S=d;if(b&&v!==!1){const A=Object.keys(b),{shapeFlag:U}=S;A.length&&U&7&&(s&&A.some(ca)&&(b=Ff(b,s)),S=qi(S,b,!1,!0))}return e.dirs&&(S=qi(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(e.dirs):e.dirs),e.transition&&(S.transition=e.transition),d=S,Ts(p),d}const Nf=n=>{let t;for(const e in n)(e==="class"||e==="style"||Ns(e))&&((t||(t={}))[e]=n[e]);return t},Ff=(n,t)=>{const e={};for(const i in n)(!ca(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Of(n,t,e){const{props:i,children:r,component:s}=n,{props:a,children:o,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?Ka(i,a,c):!!a;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(a[f]!==i[f]&&!Hs(c,f))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Ka(i,a,c):!0:!!a;return!1}function Ka(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(t[s]!==n[s]&&!Hs(e,s))return!0}return!1}function Bf({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const zf=Symbol.for("v-ndc"),Hf=n=>n.__isSuspense;function Vf(n,t){t&&t.pendingBranch?Bt(n)?t.effects.push(...n):t.effects.push(n):Cf(n)}const Gf=Symbol.for("v-scx"),kf=()=>xs(Gf),Gr={};function io(n,t,e){return Tu(n,t,e)}function Tu(n,t,{immediate:e,deep:i,flush:r,once:s,onTrack:a,onTrigger:o}=ne){if(t&&s){const C=t;t=(...R)=>{C(...R),U()}}const l=Re,c=C=>i===!0?C:zi(C,i===!1?1:void 0);let u,h=!1,f=!1;if(Ue(n)?(u=()=>n.value,h=Es(n)):mr(n)?(u=()=>c(n),h=!0):Bt(n)?(f=!0,h=n.some(C=>mr(C)||Es(C)),u=()=>n.map(C=>{if(Ue(C))return C.value;if(mr(C))return c(C);if(Gt(C))return Hn(C,l,2)})):Gt(n)?t?u=()=>Hn(n,l,2):u=()=>(m&&m(),$e(n,l,3,[x])):u=Ge,t&&i){const C=u;u=()=>zi(C())}let m,x=C=>{m=S.onStop=()=>{Hn(C,l,4),m=S.onStop=void 0}},v;if(Ws)if(x=Ge,t?e&&$e(t,l,3,[u(),f?[]:void 0,x]):u(),r==="sync"){const C=kf();v=C.__watcherHandles||(C.__watcherHandles=[])}else return Ge;let p=f?new Array(n.length).fill(Gr):Gr;const d=()=>{if(!(!S.active||!S.dirty))if(t){const C=S.run();(i||h||(f?C.some((R,I)=>Wn(R,p[I])):Wn(C,p)))&&(m&&m(),$e(t,l,3,[C,p===Gr?void 0:f&&p[0]===Gr?[]:p,x]),p=C)}else S.run()};d.allowRecurse=!!t;let b;r==="sync"?b=d:r==="post"?b=()=>Ce(d,l&&l.suspense):(d.pre=!0,l&&(d.id=l.uid),b=()=>Ea(d));const S=new pa(u,Ge,b),A=$h(),U=()=>{S.stop(),A&&ua(A.effects,S)};return t?e?d():p=S.run():r==="post"?Ce(S.run.bind(S),l&&l.suspense):S.run(),v&&v.push(U),U}function Wf(n,t,e){const i=this.proxy,r=ve(n)?n.includes(".")?bu(i,n):()=>i[n]:n.bind(i,i);let s;Gt(t)?s=t:(s=t.handler,e=t);const a=Lr(this),o=Tu(r,s.bind(i),e);return a(),o}function bu(n,t){const e=t.split(".");return()=>{let i=n;for(let r=0;r<e.length&&i;r++)i=i[e[r]];return i}}function zi(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Set,e.has(n)))return n;if(e.add(n),t--,Ue(n))zi(n.value,t,e);else if(Bt(n))for(let i=0;i<n.length;i++)zi(n[i],t,e);else if(Fh(n)||dr(n))n.forEach(i=>{zi(i,t,e)});else if(zh(n))for(const i in n)zi(n[i],t,e);return n}function Qn(n,t,e,i){const r=n.dirs,s=t&&t.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(Zn(),$e(l,e,8,[n.el,o,n,t]),Kn())}}/*! #__NO_SIDE_EFFECTS__ */function Au(n,t){return Gt(n)?_e({name:n.name},t,{setup:n}):n}const vs=n=>!!n.type.__asyncLoader,wu=n=>n.type.__isKeepAlive;function Xf(n,t){Ru(n,"a",t)}function Yf(n,t){Ru(n,"da",t)}function Ru(n,t,e=Re){const i=n.__wdc||(n.__wdc=()=>{let r=e;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Gs(t,i,e),e){let r=e.parent;for(;r&&r.parent;)wu(r.parent.vnode)&&qf(i,t,e,r),r=r.parent}}function qf(n,t,e,i){const r=Gs(t,n,i,!0);Pu(()=>{ua(i[t],r)},e)}function Gs(n,t,e=Re,i=!1){if(e){const r=e[n]||(e[n]=[]),s=t.__weh||(t.__weh=(...a)=>{if(e.isUnmounted)return;Zn();const o=Lr(e),l=$e(t,e,n,a);return o(),Kn(),l});return i?r.unshift(s):r.push(s),s}}const yn=n=>(t,e=Re)=>(!Ws||n==="sp")&&Gs(n,(...i)=>t(...i),e),jf=yn("bm"),Cu=yn("m"),Zf=yn("bu"),Kf=yn("u"),$f=yn("bum"),Pu=yn("um"),Jf=yn("sp"),Qf=yn("rtg"),td=yn("rtc");function ed(n,t=Re){Gs("ec",n,t)}const Zo=n=>n?Yu(n)?wa(n)||n.proxy:Zo(n.parent):null,gr=_e(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Zo(n.parent),$root:n=>Zo(n.root),$emit:n=>n.emit,$options:n=>Ta(n),$forceUpdate:n=>n.f||(n.f=()=>{n.effect.dirty=!0,Ea(n.update)}),$nextTick:n=>n.n||(n.n=Af.bind(n.proxy)),$watch:n=>Wf.bind(n)}),ro=(n,t)=>n!==ne&&!n.__isScriptSetup&&Yt(n,t),nd={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=n;let c;if(t[0]!=="$"){const m=a[t];if(m!==void 0)switch(m){case 1:return i[t];case 2:return r[t];case 4:return e[t];case 3:return s[t]}else{if(ro(i,t))return a[t]=1,i[t];if(r!==ne&&Yt(r,t))return a[t]=2,r[t];if((c=n.propsOptions[0])&&Yt(c,t))return a[t]=3,s[t];if(e!==ne&&Yt(e,t))return a[t]=4,e[t];Ko&&(a[t]=0)}}const u=gr[t];let h,f;if(u)return t==="$attrs"&&Ie(n.attrs,"get",""),u(n);if((h=o.__cssModules)&&(h=h[t]))return h;if(e!==ne&&Yt(e,t))return a[t]=4,e[t];if(f=l.config.globalProperties,Yt(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:r,ctx:s}=n;return ro(r,t)?(r[t]=e,!0):i!==ne&&Yt(i,t)?(i[t]=e,!0):Yt(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(s[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:r,propsOptions:s}},a){let o;return!!e[a]||n!==ne&&Yt(n,a)||ro(t,a)||(o=s[0])&&Yt(o,a)||Yt(i,a)||Yt(gr,a)||Yt(r.config.globalProperties,a)},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:Yt(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function $a(n){return Bt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Ko=!0;function id(n){const t=Ta(n),e=n.proxy,i=n.ctx;Ko=!1,t.beforeCreate&&Ja(t.beforeCreate,n,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:m,updated:x,activated:v,deactivated:p,beforeDestroy:d,beforeUnmount:b,destroyed:S,unmounted:A,render:U,renderTracked:C,renderTriggered:R,errorCaptured:I,serverPrefetch:T,expose:M,inheritAttrs:G,components:$,directives:N,filters:et}=t;if(c&&rd(c,i,null),a)for(const nt in a){const k=a[nt];Gt(k)&&(i[nt]=k.bind(e))}if(r){const nt=r.call(e,e);ue(nt)&&(n.data=xa(nt))}if(Ko=!0,s)for(const nt in s){const k=s[nt],ct=Gt(k)?k.bind(e,e):Gt(k.get)?k.get.bind(e,e):Ge,ut=!Gt(k)&&Gt(k.set)?k.set.bind(e):Ge,Mt=Fd({get:ct,set:ut});Object.defineProperty(i,nt,{enumerable:!0,configurable:!0,get:()=>Mt.value,set:At=>Mt.value=At})}if(o)for(const nt in o)Lu(o[nt],i,e,nt);if(l){const nt=Gt(l)?l.call(e):l;Reflect.ownKeys(nt).forEach(k=>{ud(k,nt[k])})}u&&Ja(u,n,"c");function at(nt,k){Bt(k)?k.forEach(ct=>nt(ct.bind(e))):k&&nt(k.bind(e))}if(at(jf,h),at(Cu,f),at(Zf,m),at(Kf,x),at(Xf,v),at(Yf,p),at(ed,I),at(td,C),at(Qf,R),at($f,b),at(Pu,A),at(Jf,T),Bt(M))if(M.length){const nt=n.exposed||(n.exposed={});M.forEach(k=>{Object.defineProperty(nt,k,{get:()=>e[k],set:ct=>e[k]=ct})})}else n.exposed||(n.exposed={});U&&n.render===Ge&&(n.render=U),G!=null&&(n.inheritAttrs=G),$&&(n.components=$),N&&(n.directives=N)}function rd(n,t,e=Ge){Bt(n)&&(n=$o(n));for(const i in n){const r=n[i];let s;ue(r)?"default"in r?s=xs(r.from||i,r.default,!0):s=xs(r.from||i):s=xs(r),Ue(s)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):t[i]=s}}function Ja(n,t,e){$e(Bt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Lu(n,t,e,i){const r=i.includes(".")?bu(e,i):()=>e[i];if(ve(n)){const s=t[n];Gt(s)&&io(r,s)}else if(Gt(n))io(r,n.bind(e));else if(ue(n))if(Bt(n))n.forEach(s=>Lu(s,t,e,i));else{const s=Gt(n.handler)?n.handler.bind(e):t[n.handler];Gt(s)&&io(r,s,n)}}function Ta(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=n.appContext,o=s.get(t);let l;return o?l=o:!r.length&&!e&&!i?l=t:(l={},r.length&&r.forEach(c=>bs(l,c,a,!0)),bs(l,t,a)),ue(t)&&s.set(t,l),l}function bs(n,t,e,i=!1){const{mixins:r,extends:s}=t;s&&bs(n,s,e,!0),r&&r.forEach(a=>bs(n,a,e,!0));for(const a in t)if(!(i&&a==="expose")){const o=sd[a]||e&&e[a];n[a]=o?o(n[a],t[a]):t[a]}return n}const sd={data:Qa,props:tl,emits:tl,methods:hr,computed:hr,beforeCreate:be,created:be,beforeMount:be,mounted:be,beforeUpdate:be,updated:be,beforeDestroy:be,beforeUnmount:be,destroyed:be,unmounted:be,activated:be,deactivated:be,errorCaptured:be,serverPrefetch:be,components:hr,directives:hr,watch:ad,provide:Qa,inject:od};function Qa(n,t){return t?n?function(){return _e(Gt(n)?n.call(this,this):n,Gt(t)?t.call(this,this):t)}:t:n}function od(n,t){return hr($o(n),$o(t))}function $o(n){if(Bt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function be(n,t){return n?[...new Set([].concat(n,t))]:t}function hr(n,t){return n?_e(Object.create(null),n,t):t}function tl(n,t){return n?Bt(n)&&Bt(t)?[...new Set([...n,...t])]:_e(Object.create(null),$a(n),$a(t??{})):t}function ad(n,t){if(!n)return t;if(!t)return n;const e=_e(Object.create(null),n);for(const i in t)e[i]=be(n[i],t[i]);return e}function Du(){return{app:null,config:{isNativeTag:Uh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ld=0;function cd(n,t){return function(i,r=null){Gt(i)||(i=_e({},i)),r!=null&&!ue(r)&&(r=null);const s=Du(),a=new WeakSet;let o=!1;const l=s.app={_uid:ld++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Od,get config(){return s.config},set config(c){},use(c,...u){return a.has(c)||(c&&Gt(c.install)?(a.add(c),c.install(l,...u)):Gt(c)&&(a.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,h){if(!o){const f=Vn(i,r);return f.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),u&&t?t(f,c):n(f,c,h),o=!0,l._container=c,c.__vue_app__=l,wa(f.component)||f.component.proxy}},unmount(){o&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){const u=_r;_r=l;try{return c()}finally{_r=u}}};return l}}let _r=null;function ud(n,t){if(Re){let e=Re.provides;const i=Re.parent&&Re.parent.provides;i===e&&(e=Re.provides=Object.create(i)),e[n]=t}}function xs(n,t,e=!1){const i=Re||sn;if(i||_r){const r=i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:_r._context.provides;if(r&&n in r)return r[n];if(arguments.length>1)return e&&Gt(t)?t.call(i&&i.proxy):t}}const Iu={},Uu=()=>Object.create(Iu),Nu=n=>Object.getPrototypeOf(n)===Iu;function hd(n,t,e,i=!1){const r={},s=Uu();n.propsDefaults=Object.create(null),Fu(n,t,r,s);for(const a in n.propsOptions[0])a in r||(r[a]=void 0);e?n.props=i?r:vf(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function fd(n,t,e,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=n,o=$t(r),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Hs(n.emitsOptions,f))continue;const m=t[f];if(l)if(Yt(s,f))m!==s[f]&&(s[f]=m,c=!0);else{const x=Yi(f);r[x]=Jo(l,o,x,m,n,!1)}else m!==s[f]&&(s[f]=m,c=!0)}}}else{Fu(n,t,r,s)&&(c=!0);let u;for(const h in o)(!t||!Yt(t,h)&&((u=Ji(h))===h||!Yt(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(r[h]=Jo(l,o,h,void 0,n,!0)):delete r[h]);if(s!==o)for(const h in s)(!t||!Yt(t,h))&&(delete s[h],c=!0)}c&&Sn(n.attrs,"set","")}function Fu(n,t,e,i){const[r,s]=n.propsOptions;let a=!1,o;if(t)for(let l in t){if(pr(l))continue;const c=t[l];let u;r&&Yt(r,u=Yi(l))?!s||!s.includes(u)?e[u]=c:(o||(o={}))[u]=c:Hs(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=$t(e),c=o||ne;for(let u=0;u<s.length;u++){const h=s[u];e[h]=Jo(r,l,h,c[h],n,!Yt(c,h))}}return a}function Jo(n,t,e,i,r,s){const a=n[e];if(a!=null){const o=Yt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Gt(l)){const{propsDefaults:c}=r;if(e in c)i=c[e];else{const u=Lr(r);i=c[e]=l.call(null,t),u()}}else i=l}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===Ji(e))&&(i=!0))}return i}function Ou(n,t,e=!1){const i=t.propsCache,r=i.get(n);if(r)return r;const s=n.props,a={},o=[];let l=!1;if(!Gt(n)){const u=h=>{l=!0;const[f,m]=Ou(h,t,!0);_e(a,f),m&&o.push(...m)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return ue(n)&&i.set(n,Vi),Vi;if(Bt(s))for(let u=0;u<s.length;u++){const h=Yi(s[u]);el(h)&&(a[h]=ne)}else if(s)for(const u in s){const h=Yi(u);if(el(h)){const f=s[u],m=a[h]=Bt(f)||Gt(f)?{type:f}:_e({},f);if(m){const x=rl(Boolean,m.type),v=rl(String,m.type);m[0]=x>-1,m[1]=v<0||x<v,(x>-1||Yt(m,"default"))&&o.push(h)}}}const c=[a,o];return ue(n)&&i.set(n,c),c}function el(n){return n[0]!=="$"&&!pr(n)}function nl(n){return n===null?"null":typeof n=="function"?n.name||"":typeof n=="object"&&n.constructor&&n.constructor.name||""}function il(n,t){return nl(n)===nl(t)}function rl(n,t){return Bt(t)?t.findIndex(e=>il(e,n)):Gt(t)&&il(t,n)?0:-1}const Bu=n=>n[0]==="_"||n==="$stable",ba=n=>Bt(n)?n.map(tn):[tn(n)],dd=(n,t,e)=>{if(t._n)return t;const i=Uf((...r)=>ba(t(...r)),e);return i._c=!1,i},zu=(n,t,e)=>{const i=n._ctx;for(const r in n){if(Bu(r))continue;const s=n[r];if(Gt(s))t[r]=dd(r,s,i);else if(s!=null){const a=ba(s);t[r]=()=>a}}},Hu=(n,t)=>{const e=ba(t);n.slots.default=()=>e},pd=(n,t)=>{const e=n.slots=Uu();if(n.vnode.shapeFlag&32){const i=t._;i?(_e(e,t),tu(e,"_",i,!0)):zu(t,e)}else t&&Hu(n,t)},md=(n,t,e)=>{const{vnode:i,slots:r}=n;let s=!0,a=ne;if(i.shapeFlag&32){const o=t._;o?e&&o===1?s=!1:(_e(r,t),!e&&o===1&&delete r._):(s=!t.$stable,zu(t,r)),a=t}else t&&(Hu(n,t),a={default:1});if(s)for(const o in r)!Bu(o)&&a[o]==null&&delete r[o]};function Qo(n,t,e,i,r=!1){if(Bt(n)){n.forEach((f,m)=>Qo(f,t&&(Bt(t)?t[m]:t),e,i,r));return}if(vs(i)&&!r)return;const s=i.shapeFlag&4?wa(i.component)||i.component.proxy:i.el,a=r?null:s,{i:o,r:l}=n,c=t&&t.r,u=o.refs===ne?o.refs={}:o.refs,h=o.setupState;if(c!=null&&c!==l&&(ve(c)?(u[c]=null,Yt(h,c)&&(h[c]=null)):Ue(c)&&(c.value=null)),Gt(l))Hn(l,o,12,[a,u]);else{const f=ve(l),m=Ue(l);if(f||m){const x=()=>{if(n.f){const v=f?Yt(h,l)?h[l]:u[l]:l.value;r?Bt(v)&&ua(v,s):Bt(v)?v.includes(s)||v.push(s):f?(u[l]=[s],Yt(h,l)&&(h[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else f?(u[l]=a,Yt(h,l)&&(h[l]=a)):m&&(l.value=a,n.k&&(u[n.k]=a))};a?(x.id=-1,Ce(x,e)):x()}}}const Ce=Vf;function gd(n){return _d(n)}function _d(n,t){const e=eu();e.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:m=Ge,insertStaticContent:x}=n,v=(w,P,V,j=null,Z=null,rt=null,y=void 0,g=null,L=!!P.dynamicChildren)=>{if(w===P)return;w&&!sr(w,P)&&(j=dt(w),At(w,Z,rt,!0),w=null),P.patchFlag===-2&&(L=!1,P.dynamicChildren=null);const{type:D,ref:H,shapeFlag:X}=P;switch(D){case ks:p(w,P,V,j);break;case br:d(w,P,V,j);break;case oo:w==null&&b(P,V,j,y);break;case vn:$(w,P,V,j,Z,rt,y,g,L);break;default:X&1?U(w,P,V,j,Z,rt,y,g,L):X&6?N(w,P,V,j,Z,rt,y,g,L):(X&64||X&128)&&D.process(w,P,V,j,Z,rt,y,g,L,z)}H!=null&&Z&&Qo(H,w&&w.ref,rt,P||w,!P)},p=(w,P,V,j)=>{if(w==null)i(P.el=o(P.children),V,j);else{const Z=P.el=w.el;P.children!==w.children&&c(Z,P.children)}},d=(w,P,V,j)=>{w==null?i(P.el=l(P.children||""),V,j):P.el=w.el},b=(w,P,V,j)=>{[w.el,w.anchor]=x(w.children,P,V,j,w.el,w.anchor)},S=({el:w,anchor:P},V,j)=>{let Z;for(;w&&w!==P;)Z=f(w),i(w,V,j),w=Z;i(P,V,j)},A=({el:w,anchor:P})=>{let V;for(;w&&w!==P;)V=f(w),r(w),w=V;r(P)},U=(w,P,V,j,Z,rt,y,g,L)=>{P.type==="svg"?y="svg":P.type==="math"&&(y="mathml"),w==null?C(P,V,j,Z,rt,y,g,L):T(w,P,Z,rt,y,g,L)},C=(w,P,V,j,Z,rt,y,g)=>{let L,D;const{props:H,shapeFlag:X,transition:st,dirs:Q}=w;if(L=w.el=a(w.type,rt,H&&H.is,H),X&8?u(L,w.children):X&16&&I(w.children,L,null,j,Z,so(w,rt),y,g),Q&&Qn(w,null,j,"created"),R(L,w,w.scopeId,y,j),H){for(const gt in H)gt!=="value"&&!pr(gt)&&s(L,gt,null,H[gt],rt,w.children,j,Z,vt);"value"in H&&s(L,"value",null,H.value,rt),(D=H.onVnodeBeforeMount)&&Je(D,j,w)}Q&&Qn(w,null,j,"beforeMount");const it=vd(Z,st);it&&st.beforeEnter(L),i(L,P,V),((D=H&&H.onVnodeMounted)||it||Q)&&Ce(()=>{D&&Je(D,j,w),it&&st.enter(L),Q&&Qn(w,null,j,"mounted")},Z)},R=(w,P,V,j,Z)=>{if(V&&m(w,V),j)for(let rt=0;rt<j.length;rt++)m(w,j[rt]);if(Z){let rt=Z.subTree;if(P===rt){const y=Z.vnode;R(w,y,y.scopeId,y.slotScopeIds,Z.parent)}}},I=(w,P,V,j,Z,rt,y,g,L=0)=>{for(let D=L;D<w.length;D++){const H=w[D]=g?Un(w[D]):tn(w[D]);v(null,H,P,V,j,Z,rt,y,g)}},T=(w,P,V,j,Z,rt,y)=>{const g=P.el=w.el;let{patchFlag:L,dynamicChildren:D,dirs:H}=P;L|=w.patchFlag&16;const X=w.props||ne,st=P.props||ne;let Q;if(V&&ti(V,!1),(Q=st.onVnodeBeforeUpdate)&&Je(Q,V,P,w),H&&Qn(P,w,V,"beforeUpdate"),V&&ti(V,!0),D?M(w.dynamicChildren,D,g,V,j,so(P,Z),rt):y||k(w,P,g,null,V,j,so(P,Z),rt,!1),L>0){if(L&16)G(g,P,X,st,V,j,Z);else if(L&2&&X.class!==st.class&&s(g,"class",null,st.class,Z),L&4&&s(g,"style",X.style,st.style,Z),L&8){const it=P.dynamicProps;for(let gt=0;gt<it.length;gt++){const ot=it[gt],mt=X[ot],wt=st[ot];(wt!==mt||ot==="value")&&s(g,ot,mt,wt,Z,w.children,V,j,vt)}}L&1&&w.children!==P.children&&u(g,P.children)}else!y&&D==null&&G(g,P,X,st,V,j,Z);((Q=st.onVnodeUpdated)||H)&&Ce(()=>{Q&&Je(Q,V,P,w),H&&Qn(P,w,V,"updated")},j)},M=(w,P,V,j,Z,rt,y)=>{for(let g=0;g<P.length;g++){const L=w[g],D=P[g],H=L.el&&(L.type===vn||!sr(L,D)||L.shapeFlag&70)?h(L.el):V;v(L,D,H,null,j,Z,rt,y,!0)}},G=(w,P,V,j,Z,rt,y)=>{if(V!==j){if(V!==ne)for(const g in V)!pr(g)&&!(g in j)&&s(w,g,V[g],null,y,P.children,Z,rt,vt);for(const g in j){if(pr(g))continue;const L=j[g],D=V[g];L!==D&&g!=="value"&&s(w,g,D,L,y,P.children,Z,rt,vt)}"value"in j&&s(w,"value",V.value,j.value,y)}},$=(w,P,V,j,Z,rt,y,g,L)=>{const D=P.el=w?w.el:o(""),H=P.anchor=w?w.anchor:o("");let{patchFlag:X,dynamicChildren:st,slotScopeIds:Q}=P;Q&&(g=g?g.concat(Q):Q),w==null?(i(D,V,j),i(H,V,j),I(P.children||[],V,H,Z,rt,y,g,L)):X>0&&X&64&&st&&w.dynamicChildren?(M(w.dynamicChildren,st,V,Z,rt,y,g),(P.key!=null||Z&&P===Z.subTree)&&Vu(w,P,!0)):k(w,P,V,H,Z,rt,y,g,L)},N=(w,P,V,j,Z,rt,y,g,L)=>{P.slotScopeIds=g,w==null?P.shapeFlag&512?Z.ctx.activate(P,V,j,y,L):et(P,V,j,Z,rt,y,L):tt(w,P,L)},et=(w,P,V,j,Z,rt,y)=>{const g=w.component=Pd(w,j,Z);if(wu(w)&&(g.ctx.renderer=z),Ld(g),g.asyncDep){if(Z&&Z.registerDep(g,at),!w.el){const L=g.subTree=Vn(br);d(null,L,P,V)}}else at(g,w,P,V,Z,rt,y)},tt=(w,P,V)=>{const j=P.component=w.component;if(Of(w,P,V))if(j.asyncDep&&!j.asyncResolved){nt(j,P,V);return}else j.next=P,Rf(j.update),j.effect.dirty=!0,j.update();else P.el=w.el,j.vnode=P},at=(w,P,V,j,Z,rt,y)=>{const g=()=>{if(w.isMounted){let{next:H,bu:X,u:st,parent:Q,vnode:it}=w;{const yt=Gu(w);if(yt){H&&(H.el=it.el,nt(w,H,y)),yt.asyncDep.then(()=>{w.isUnmounted||g()});return}}let gt=H,ot;ti(w,!1),H?(H.el=it.el,nt(w,H,y)):H=it,X&&to(X),(ot=H.props&&H.props.onVnodeBeforeUpdate)&&Je(ot,Q,H,it),ti(w,!0);const mt=no(w),wt=w.subTree;w.subTree=mt,v(wt,mt,h(wt.el),dt(wt),w,Z,rt),H.el=mt.el,gt===null&&Bf(w,mt.el),st&&Ce(st,Z),(ot=H.props&&H.props.onVnodeUpdated)&&Ce(()=>Je(ot,Q,H,it),Z)}else{let H;const{el:X,props:st}=P,{bm:Q,m:it,parent:gt}=w,ot=vs(P);if(ti(w,!1),Q&&to(Q),!ot&&(H=st&&st.onVnodeBeforeMount)&&Je(H,gt,P),ti(w,!0),X&&Tt){const mt=()=>{w.subTree=no(w),Tt(X,w.subTree,w,Z,null)};ot?P.type.__asyncLoader().then(()=>!w.isUnmounted&&mt()):mt()}else{const mt=w.subTree=no(w);v(null,mt,V,j,w,Z,rt),P.el=mt.el}if(it&&Ce(it,Z),!ot&&(H=st&&st.onVnodeMounted)){const mt=P;Ce(()=>Je(H,gt,mt),Z)}(P.shapeFlag&256||gt&&vs(gt.vnode)&&gt.vnode.shapeFlag&256)&&w.a&&Ce(w.a,Z),w.isMounted=!0,P=V=j=null}},L=w.effect=new pa(g,Ge,()=>Ea(D),w.scope),D=w.update=()=>{L.dirty&&L.run()};D.id=w.uid,ti(w,!0),D()},nt=(w,P,V)=>{P.component=w;const j=w.vnode.props;w.vnode=P,w.next=null,fd(w,P.props,j,V),md(w,P.children,V),Zn(),Za(w),Kn()},k=(w,P,V,j,Z,rt,y,g,L=!1)=>{const D=w&&w.children,H=w?w.shapeFlag:0,X=P.children,{patchFlag:st,shapeFlag:Q}=P;if(st>0){if(st&128){ut(D,X,V,j,Z,rt,y,g,L);return}else if(st&256){ct(D,X,V,j,Z,rt,y,g,L);return}}Q&8?(H&16&&vt(D,Z,rt),X!==D&&u(V,X)):H&16?Q&16?ut(D,X,V,j,Z,rt,y,g,L):vt(D,Z,rt,!0):(H&8&&u(V,""),Q&16&&I(X,V,j,Z,rt,y,g,L))},ct=(w,P,V,j,Z,rt,y,g,L)=>{w=w||Vi,P=P||Vi;const D=w.length,H=P.length,X=Math.min(D,H);let st;for(st=0;st<X;st++){const Q=P[st]=L?Un(P[st]):tn(P[st]);v(w[st],Q,V,null,Z,rt,y,g,L)}D>H?vt(w,Z,rt,!0,!1,X):I(P,V,j,Z,rt,y,g,L,X)},ut=(w,P,V,j,Z,rt,y,g,L)=>{let D=0;const H=P.length;let X=w.length-1,st=H-1;for(;D<=X&&D<=st;){const Q=w[D],it=P[D]=L?Un(P[D]):tn(P[D]);if(sr(Q,it))v(Q,it,V,null,Z,rt,y,g,L);else break;D++}for(;D<=X&&D<=st;){const Q=w[X],it=P[st]=L?Un(P[st]):tn(P[st]);if(sr(Q,it))v(Q,it,V,null,Z,rt,y,g,L);else break;X--,st--}if(D>X){if(D<=st){const Q=st+1,it=Q<H?P[Q].el:j;for(;D<=st;)v(null,P[D]=L?Un(P[D]):tn(P[D]),V,it,Z,rt,y,g,L),D++}}else if(D>st)for(;D<=X;)At(w[D],Z,rt,!0),D++;else{const Q=D,it=D,gt=new Map;for(D=it;D<=st;D++){const Lt=P[D]=L?Un(P[D]):tn(P[D]);Lt.key!=null&&gt.set(Lt.key,D)}let ot,mt=0;const wt=st-it+1;let yt=!1,xt=0;const Ct=new Array(wt);for(D=0;D<wt;D++)Ct[D]=0;for(D=Q;D<=X;D++){const Lt=w[D];if(mt>=wt){At(Lt,Z,rt,!0);continue}let bt;if(Lt.key!=null)bt=gt.get(Lt.key);else for(ot=it;ot<=st;ot++)if(Ct[ot-it]===0&&sr(Lt,P[ot])){bt=ot;break}bt===void 0?At(Lt,Z,rt,!0):(Ct[bt-it]=D+1,bt>=xt?xt=bt:yt=!0,v(Lt,P[bt],V,null,Z,rt,y,g,L),mt++)}const Ft=yt?xd(Ct):Vi;for(ot=Ft.length-1,D=wt-1;D>=0;D--){const Lt=it+D,bt=P[Lt],_=Lt+1<H?P[Lt+1].el:j;Ct[D]===0?v(null,bt,V,_,Z,rt,y,g,L):yt&&(ot<0||D!==Ft[ot]?Mt(bt,V,_,2):ot--)}}},Mt=(w,P,V,j,Z=null)=>{const{el:rt,type:y,transition:g,children:L,shapeFlag:D}=w;if(D&6){Mt(w.component.subTree,P,V,j);return}if(D&128){w.suspense.move(P,V,j);return}if(D&64){y.move(w,P,V,z);return}if(y===vn){i(rt,P,V);for(let X=0;X<L.length;X++)Mt(L[X],P,V,j);i(w.anchor,P,V);return}if(y===oo){S(w,P,V);return}if(j!==2&&D&1&&g)if(j===0)g.beforeEnter(rt),i(rt,P,V),Ce(()=>g.enter(rt),Z);else{const{leave:X,delayLeave:st,afterLeave:Q}=g,it=()=>i(rt,P,V),gt=()=>{X(rt,()=>{it(),Q&&Q()})};st?st(rt,it,gt):gt()}else i(rt,P,V)},At=(w,P,V,j=!1,Z=!1)=>{const{type:rt,props:y,ref:g,children:L,dynamicChildren:D,shapeFlag:H,patchFlag:X,dirs:st}=w;if(g!=null&&Qo(g,null,V,w,!0),H&256){P.ctx.deactivate(w);return}const Q=H&1&&st,it=!vs(w);let gt;if(it&&(gt=y&&y.onVnodeBeforeUnmount)&&Je(gt,P,w),H&6)ht(w.component,V,j);else{if(H&128){w.suspense.unmount(V,j);return}Q&&Qn(w,null,P,"beforeUnmount"),H&64?w.type.remove(w,P,V,Z,z,j):D&&(rt!==vn||X>0&&X&64)?vt(D,P,V,!1,!0):(rt===vn&&X&384||!Z&&H&16)&&vt(L,P,V),j&&qt(w)}(it&&(gt=y&&y.onVnodeUnmounted)||Q)&&Ce(()=>{gt&&Je(gt,P,w),Q&&Qn(w,null,P,"unmounted")},V)},qt=w=>{const{type:P,el:V,anchor:j,transition:Z}=w;if(P===vn){J(V,j);return}if(P===oo){A(w);return}const rt=()=>{r(V),Z&&!Z.persisted&&Z.afterLeave&&Z.afterLeave()};if(w.shapeFlag&1&&Z&&!Z.persisted){const{leave:y,delayLeave:g}=Z,L=()=>y(V,rt);g?g(w.el,rt,L):L()}else rt()},J=(w,P)=>{let V;for(;w!==P;)V=f(w),r(w),w=V;r(P)},ht=(w,P,V)=>{const{bum:j,scope:Z,update:rt,subTree:y,um:g}=w;j&&to(j),Z.stop(),rt&&(rt.active=!1,At(y,w,P,V)),g&&Ce(g,P),Ce(()=>{w.isUnmounted=!0},P),P&&P.pendingBranch&&!P.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===P.pendingId&&(P.deps--,P.deps===0&&P.resolve())},vt=(w,P,V,j=!1,Z=!1,rt=0)=>{for(let y=rt;y<w.length;y++)At(w[y],P,V,j,Z)},dt=w=>w.shapeFlag&6?dt(w.component.subTree):w.shapeFlag&128?w.suspense.next():f(w.anchor||w.el);let Ut=!1;const Nt=(w,P,V)=>{w==null?P._vnode&&At(P._vnode,null,null,!0):v(P._vnode||null,w,P,null,null,null,V),Ut||(Ut=!0,Za(),Su(),Ut=!1),P._vnode=w},z={p:v,um:At,m:Mt,r:qt,mt:et,mc:I,pc:k,pbc:M,n:dt,o:n};let Zt,Tt;return{render:Nt,hydrate:Zt,createApp:cd(Nt,Zt)}}function so({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function ti({effect:n,update:t},e){n.allowRecurse=t.allowRecurse=e}function vd(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Vu(n,t,e=!1){const i=n.children,r=t.children;if(Bt(i)&&Bt(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=Un(r[s]),o.el=a.el),e||Vu(a,o)),o.type===ks&&(o.el=a.el)}}function xd(n){const t=n.slice(),e=[0];let i,r,s,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=e[e.length-1],n[r]<c){t[i]=r,e.push(i);continue}for(s=0,a=e.length-1;s<a;)o=s+a>>1,n[e[o]]<c?s=o+1:a=o;c<n[e[s]]&&(s>0&&(t[i]=e[s-1]),e[s]=i)}}for(s=e.length,a=e[s-1];s-- >0;)e[s]=a,a=t[a];return e}function Gu(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Gu(t)}const Md=n=>n.__isTeleport,vn=Symbol.for("v-fgt"),ks=Symbol.for("v-txt"),br=Symbol.for("v-cmt"),oo=Symbol.for("v-stc"),vr=[];let Ze=null;function ku(n=!1){vr.push(Ze=n?null:[])}function Sd(){vr.pop(),Ze=vr[vr.length-1]||null}let Ar=1;function sl(n){Ar+=n}function yd(n){return n.dynamicChildren=Ar>0?Ze||Vi:null,Sd(),Ar>0&&Ze&&Ze.push(n),n}function Wu(n,t,e,i,r,s){return yd(wr(n,t,e,i,r,s,!0))}function Ed(n){return n?n.__v_isVNode===!0:!1}function sr(n,t){return n.type===t.type&&n.key===t.key}const Xu=({key:n})=>n??null,Ms=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?ve(n)||Ue(n)||Gt(n)?{i:sn,r:n,k:t,f:!!e}:n:null);function wr(n,t=null,e=null,i=0,r=null,s=n===vn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Xu(t),ref:t&&Ms(t),scopeId:Vs,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:sn};return o?(Aa(l,e),s&128&&n.normalize(l)):e&&(l.shapeFlag|=ve(e)?8:16),Ar>0&&!a&&Ze&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Ze.push(l),l}const Vn=Td;function Td(n,t=null,e=null,i=0,r=null,s=!1){if((!n||n===zf)&&(n=br),Ed(n)){const o=qi(n,t,!0);return e&&Aa(o,e),Ar>0&&!s&&Ze&&(o.shapeFlag&6?Ze[Ze.indexOf(n)]=o:Ze.push(o)),o.patchFlag|=-2,o}if(Nd(n)&&(n=n.__vccOpts),t){t=bd(t);let{class:o,style:l}=t;o&&!ve(o)&&(t.class=da(o)),ue(l)&&(mu(l)&&!Bt(l)&&(l=_e({},l)),t.style=fa(l))}const a=ve(n)?1:Hf(n)?128:Md(n)?64:ue(n)?4:Gt(n)?2:0;return wr(n,t,e,i,r,a,s,!0)}function bd(n){return n?mu(n)||Nu(n)?_e({},n):n:null}function qi(n,t,e=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=n,c=t?wd(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Xu(c),ref:t&&t.ref?e&&s?Bt(s)?s.concat(Ms(t)):[s,Ms(t)]:Ms(t):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==vn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&qi(n.ssContent),ssFallback:n.ssFallback&&qi(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&(u.transition=l.clone(u)),u}function Ad(n=" ",t=0){return Vn(ks,null,n,t)}function tn(n){return n==null||typeof n=="boolean"?Vn(br):Bt(n)?Vn(vn,null,n.slice()):typeof n=="object"?Un(n):Vn(ks,null,String(n))}function Un(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:qi(n)}function Aa(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Bt(t))e=16;else if(typeof t=="object")if(i&65){const r=t.default;r&&(r._c&&(r._d=!1),Aa(n,r()),r._c&&(r._d=!0));return}else{e=32;const r=t._;!r&&!Nu(t)?t._ctx=sn:r===3&&sn&&(sn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Gt(t)?(t={default:t,_ctx:sn},e=32):(t=String(t),i&64?(e=16,t=[Ad(t)]):e=8);n.children=t,n.shapeFlag|=e}function wd(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const r in i)if(r==="class")t.class!==i.class&&(t.class=da([t.class,i.class]));else if(r==="style")t.style=fa([t.style,i.style]);else if(Ns(r)){const s=t[r],a=i[r];a&&s!==a&&!(Bt(s)&&s.includes(a))&&(t[r]=s?[].concat(s,a):a)}else r!==""&&(t[r]=i[r])}return t}function Je(n,t,e,i=null){$e(n,t,7,[e,i])}const Rd=Du();let Cd=0;function Pd(n,t,e){const i=n.type,r=(t?t.appContext:n.appContext)||Rd,s={uid:Cd++,vnode:n,type:i,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new Zh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ou(i,r),emitsOptions:Eu(i,r),emit:null,emitted:null,propsDefaults:ne,inheritAttrs:i.inheritAttrs,ctx:ne,data:ne,props:ne,attrs:ne,slots:ne,refs:ne,setupState:ne,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Lf.bind(null,s),n.ce&&n.ce(s),s}let Re=null,As,ta;{const n=eu(),t=(e,i)=>{let r;return(r=n[e])||(r=n[e]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};As=t("__VUE_INSTANCE_SETTERS__",e=>Re=e),ta=t("__VUE_SSR_SETTERS__",e=>Ws=e)}const Lr=n=>{const t=Re;return As(n),n.scope.on(),()=>{n.scope.off(),As(t)}},ol=()=>{Re&&Re.scope.off(),As(null)};function Yu(n){return n.vnode.shapeFlag&4}let Ws=!1;function Ld(n,t=!1){t&&ta(t);const{props:e,children:i}=n.vnode,r=Yu(n);hd(n,e,r,t),pd(n,i);const s=r?Dd(n,t):void 0;return t&&ta(!1),s}function Dd(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,nd);const{setup:i}=e;if(i){const r=n.setupContext=i.length>1?Ud(n):null,s=Lr(n);Zn();const a=Hn(i,n,0,[n.props,r]);if(Kn(),s(),Jc(a)){if(a.then(ol,ol),t)return a.then(o=>{al(n,o,t)}).catch(o=>{zs(o,n,0)});n.asyncDep=a}else al(n,a,t)}else qu(n,t)}function al(n,t,e){Gt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=vu(t)),qu(n,e)}let ll;function qu(n,t,e){const i=n.type;if(!n.render){if(!t&&ll&&!i.render){const r=i.template||Ta(n).template;if(r){const{isCustomElement:s,compilerOptions:a}=n.appContext.config,{delimiters:o,compilerOptions:l}=i,c=_e(_e({isCustomElement:s,delimiters:o},a),l);i.render=ll(r,c)}}n.render=i.render||Ge}{const r=Lr(n);Zn();try{id(n)}finally{Kn(),r()}}}const Id={get(n,t){return Ie(n,"get",""),n[t]}};function Ud(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,Id),slots:n.slots,emit:n.emit,expose:t}}function wa(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(vu(xf(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in gr)return gr[e](n)},has(t,e){return e in t||e in gr}}))}function Nd(n){return Gt(n)&&"__vccOpts"in n}const Fd=(n,t)=>Mf(n,t,Ws),Od="3.4.27";/**
* @vue/runtime-dom v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Bd="http://www.w3.org/2000/svg",zd="http://www.w3.org/1998/Math/MathML",Nn=typeof document<"u"?document:null,cl=Nn&&Nn.createElement("template"),Hd={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const r=t==="svg"?Nn.createElementNS(Bd,n):t==="mathml"?Nn.createElementNS(zd,n):Nn.createElement(n,e?{is:e}:void 0);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>Nn.createTextNode(n),createComment:n=>Nn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Nn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,r,s){const a=e?e.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),e),!(r===s||!(r=r.nextSibling)););else{cl.innerHTML=i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n;const o=cl.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}t.insertBefore(o,e)}return[a?a.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},Vd=Symbol("_vtc");function Gd(n,t,e){const i=n[Vd];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ul=Symbol("_vod"),kd=Symbol("_vsh"),Wd=Symbol(""),Xd=/(^|;)\s*display\s*:/;function Yd(n,t,e){const i=n.style,r=ve(e);let s=!1;if(e&&!r){if(t)if(ve(t))for(const a of t.split(";")){const o=a.slice(0,a.indexOf(":")).trim();e[o]==null&&Ss(i,o,"")}else for(const a in t)e[a]==null&&Ss(i,a,"");for(const a in e)a==="display"&&(s=!0),Ss(i,a,e[a])}else if(r){if(t!==e){const a=i[Wd];a&&(e+=";"+a),i.cssText=e,s=Xd.test(e)}}else t&&n.removeAttribute("style");ul in n&&(n[ul]=s?i.display:"",n[kd]&&(i.display="none"))}const hl=/\s*!important$/;function Ss(n,t,e){if(Bt(e))e.forEach(i=>Ss(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=qd(n,t);hl.test(e)?n.setProperty(Ji(i),e.replace(hl,""),"important"):n[i]=e}}const fl=["Webkit","Moz","ms"],ao={};function qd(n,t){const e=ao[t];if(e)return e;let i=Yi(t);if(i!=="filter"&&i in n)return ao[t]=i;i=Qc(i);for(let r=0;r<fl.length;r++){const s=fl[r]+i;if(s in n)return ao[t]=s}return t}const dl="http://www.w3.org/1999/xlink";function jd(n,t,e,i,r){if(i&&t.startsWith("xlink:"))e==null?n.removeAttributeNS(dl,t.slice(6,t.length)):n.setAttributeNS(dl,t,e);else{const s=jh(t);e==null||s&&!nu(e)?n.removeAttribute(t):n.setAttribute(t,s?"":e)}}function Zd(n,t,e,i,r,s,a){if(t==="innerHTML"||t==="textContent"){i&&a(i,r,s),n[t]=e??"";return}const o=n.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const c=o==="OPTION"?n.getAttribute("value")||"":n.value,u=e??"";(c!==u||!("_value"in n))&&(n.value=u),e==null&&n.removeAttribute(t),n._value=e;return}let l=!1;if(e===""||e==null){const c=typeof n[t];c==="boolean"?e=nu(e):e==null&&c==="string"?(e="",l=!0):c==="number"&&(e=0,l=!0)}try{n[t]=e}catch{}l&&n.removeAttribute(t)}function Kd(n,t,e,i){n.addEventListener(t,e,i)}function $d(n,t,e,i){n.removeEventListener(t,e,i)}const pl=Symbol("_vei");function Jd(n,t,e,i,r=null){const s=n[pl]||(n[pl]={}),a=s[t];if(i&&a)a.value=i;else{const[o,l]=Qd(t);if(i){const c=s[t]=np(i,r);Kd(n,o,c,l)}else a&&($d(n,o,a,l),s[t]=void 0)}}const ml=/(?:Once|Passive|Capture)$/;function Qd(n){let t;if(ml.test(n)){t={};let i;for(;i=n.match(ml);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ji(n.slice(2)),t]}let lo=0;const tp=Promise.resolve(),ep=()=>lo||(tp.then(()=>lo=0),lo=Date.now());function np(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;$e(ip(i,e.value),t,5,[i])};return e.value=n,e.attached=ep(),e}function ip(n,t){if(Bt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const gl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,rp=(n,t,e,i,r,s,a,o,l)=>{const c=r==="svg";t==="class"?Gd(n,i,c):t==="style"?Yd(n,e,i):Ns(t)?ca(t)||Jd(n,t,e,i,a):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):sp(n,t,i,c))?Zd(n,t,i,s,a,o,l):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),jd(n,t,i,c))};function sp(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&gl(t)&&Gt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return gl(t)&&ve(e)?!1:t in n}const op=_e({patchProp:rp},Hd);let _l;function ap(){return _l||(_l=gd(op))}const lp=(...n)=>{const t=ap().createApp(...n),{mount:e}=t;return t.mount=i=>{const r=up(i);if(!r)return;const s=t._component;!Gt(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const a=e(r,!1,cp(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},t};function cp(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function up(n){return ve(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ra="164",xi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hp=0,vl=1,fp=2,ju=1,dp=2,_n=3,Xn=0,Pe=1,xn=2,Gn=0,ki=1,xl=2,Ml=3,Sl=4,pp=5,hi=100,mp=101,gp=102,_p=103,vp=104,xp=200,Mp=201,Sp=202,yp=203,ea=204,na=205,Ep=206,Tp=207,bp=208,Ap=209,wp=210,Rp=211,Cp=212,Pp=213,Lp=214,Dp=0,Ip=1,Up=2,ws=3,Np=4,Fp=5,Op=6,Bp=7,Zu=0,zp=1,Hp=2,kn=0,Vp=1,Gp=2,kp=3,Wp=4,Xp=5,Yp=6,qp=7,Ku=300,ji=301,Zi=302,ia=303,ra=304,Xs=306,sa=1e3,di=1001,oa=1002,ke=1003,jp=1004,kr=1005,je=1006,co=1007,pi=1008,Yn=1009,Zp=1010,Kp=1011,$u=1012,Ju=1013,Ki=1014,Bn=1015,Ys=1016,Qu=1017,th=1018,Dr=1020,$p=35902,Jp=1021,Qp=1022,on=1023,tm=1024,em=1025,Wi=1026,Rr=1027,nm=1028,eh=1029,im=1030,nh=1031,ih=1033,uo=33776,ho=33777,fo=33778,po=33779,yl=35840,El=35841,Tl=35842,bl=35843,Al=36196,wl=37492,Rl=37496,Cl=37808,Pl=37809,Ll=37810,Dl=37811,Il=37812,Ul=37813,Nl=37814,Fl=37815,Ol=37816,Bl=37817,zl=37818,Hl=37819,Vl=37820,Gl=37821,mo=36492,kl=36494,Wl=36495,rm=36283,Xl=36284,Yl=36285,ql=36286,sm=3200,rh=3201,sh=0,om=1,On="",Qe="srgb",$n="srgb-linear",Ca="display-p3",qs="display-p3-linear",Rs="linear",te="srgb",Cs="rec709",Ps="p3",Si=7680,jl=519,am=512,lm=513,cm=514,oh=515,um=516,hm=517,fm=518,dm=519,Zl=35044,Kl="300 es",Mn=2e3,Ls=2001;class vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $l=1234567;const xr=Math.PI/180,Cr=180/Math.PI;function Qi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]).toLowerCase()}function Ee(n,t,e){return Math.max(t,Math.min(e,n))}function Pa(n,t){return(n%t+t)%t}function pm(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function mm(n,t,e){return n!==t?(e-n)/(t-n):0}function Mr(n,t,e){return(1-e)*n+e*t}function gm(n,t,e,i){return Mr(n,t,1-Math.exp(-e*i))}function _m(n,t=1){return t-Math.abs(Pa(n,t*2)-t)}function vm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function xm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Mm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Sm(n,t){return n+Math.random()*(t-n)}function ym(n){return n*(.5-Math.random())}function Em(n){n!==void 0&&($l=n);let t=$l+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Tm(n){return n*xr}function bm(n){return n*Cr}function Am(n){return(n&n-1)===0&&n!==0}function wm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Rm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Cm(n,t,e,i,r){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+i)/2),u=a((t+i)/2),h=s((t-i)/2),f=a((t-i)/2),m=s((i-t)/2),x=a((i-t)/2);switch(r){case"XYX":n.set(o*u,l*h,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*x,l*m,o*c);break;case"YXY":n.set(l*m,o*u,l*x,o*c);break;case"ZYZ":n.set(l*x,l*m,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Bi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ae(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Pm={DEG2RAD:xr,RAD2DEG:Cr,generateUUID:Qi,clamp:Ee,euclideanModulo:Pa,mapLinear:pm,inverseLerp:mm,lerp:Mr,damp:gm,pingpong:_m,smoothstep:vm,smootherstep:xm,randInt:Mm,randFloat:Sm,randFloatSpread:ym,seededRandom:Em,degToRad:Tm,radToDeg:bm,isPowerOfTwo:Am,ceilPowerOfTwo:wm,floorPowerOfTwo:Rm,setQuaternionFromProperEuler:Cm,normalize:Ae,denormalize:Bi};class Pt{constructor(t=0,e=0){Pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,i,r,s,a,o,l,c){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c)}set(t,e,i,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],m=i[5],x=i[8],v=r[0],p=r[3],d=r[6],b=r[1],S=r[4],A=r[7],U=r[2],C=r[5],R=r[8];return s[0]=a*v+o*b+l*U,s[3]=a*p+o*S+l*C,s[6]=a*d+o*A+l*R,s[1]=c*v+u*b+h*U,s[4]=c*p+u*S+h*C,s[7]=c*d+u*A+h*R,s[2]=f*v+m*b+x*U,s[5]=f*p+m*S+x*C,s[8]=f*d+m*A+x*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*s,m=c*s-a*l,x=e*h+i*f+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return t[0]=h*v,t[1]=(r*c-u*i)*v,t[2]=(o*i-r*a)*v,t[3]=f*v,t[4]=(u*e-r*l)*v,t[5]=(r*s-o*e)*v,t[6]=m*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(go.makeScale(t,e)),this}rotate(t){return this.premultiply(go.makeRotation(-t)),this}translate(t,e){return this.premultiply(go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const go=new Vt;function ah(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ds(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lm(){const n=Ds("canvas");return n.style.display="block",n}const Jl={};function Dm(n){n in Jl||(Jl[n]=!0,console.warn(n))}const Ql=new Vt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),tc=new Vt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wr={[$n]:{transfer:Rs,primaries:Cs,toReference:n=>n,fromReference:n=>n},[Qe]:{transfer:te,primaries:Cs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[qs]:{transfer:Rs,primaries:Ps,toReference:n=>n.applyMatrix3(tc),fromReference:n=>n.applyMatrix3(Ql)},[Ca]:{transfer:te,primaries:Ps,toReference:n=>n.convertSRGBToLinear().applyMatrix3(tc),fromReference:n=>n.applyMatrix3(Ql).convertLinearToSRGB()}},Im=new Set([$n,qs]),Jt={enabled:!0,_workingColorSpace:$n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Im.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Wr[t].toReference,r=Wr[e].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Wr[n].primaries},getTransfer:function(n){return n===On?Rs:Wr[n].transfer}};function Xi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function _o(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let yi;class Um{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{yi===void 0&&(yi=Ds("canvas")),yi.width=t.width,yi.height=t.height;const i=yi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ds("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Xi(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Xi(e[i]/255)*255):e[i]=Xi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nm=0;class lh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=Qi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(vo(r[a].image)):s.push(vo(r[a]))}else s=vo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Um.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fm=0;class Le extends vi{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,i=di,r=di,s=je,a=pi,o=on,l=Yn,c=Le.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Qi(),this.name="",this.source=new lh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ku)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sa:t.x=t.x-Math.floor(t.x);break;case di:t.x=t.x<0?0:1;break;case oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sa:t.y=t.y-Math.floor(t.y);break;case di:t.y=t.y<0?0:1;break;case oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Ku;Le.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,r=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],m=l[5],x=l[9],v=l[2],p=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(x-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(x+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,A=(m+1)/2,U=(d+1)/2,C=(u+f)/4,R=(h+v)/4,I=(x+p)/4;return S>A&&S>U?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=C/i,s=R/i):A>U?A<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),i=C/r,s=I/r):U<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(U),i=R/s,r=I/s),this.set(i,r,s,e),this}let b=Math.sqrt((p-x)*(p-x)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(p-x)/b,this.y=(h-v)/b,this.z=(f-u)/b,this.w=Math.acos((c+m+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Om extends vi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Le(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new lh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Om{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ch extends Le{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bm extends Le{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[a+0],m=s[a+1],x=s[a+2],v=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=x,t[e+3]=v;return}if(h!==v||l!==f||c!==m||u!==x){let p=1-o;const d=l*f+c*m+u*x+h*v,b=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const U=Math.sqrt(S),C=Math.atan2(U,d*b);p=Math.sin(p*C)/U,o=Math.sin(o*C)/U}const A=o*b;if(l=l*p+f*A,c=c*p+m*A,u=u*p+x*A,h=h*p+v*A,p===1-o){const U=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=U,c*=U,u*=U,h*=U}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],m=s[a+2],x=s[a+3];return t[e]=o*x+u*h+l*m-c*f,t[e+1]=l*x+u*f+c*h-o*m,t[e+2]=c*x+u*m+o*f-l*h,t[e+3]=u*x-o*h-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),m=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*m*x,this._y=c*m*h-f*u*x,this._z=c*u*x+f*m*h,this._w=c*u*h-f*m*x;break;case"YXZ":this._x=f*u*h+c*m*x,this._y=c*m*h-f*u*x,this._z=c*u*x-f*m*h,this._w=c*u*h+f*m*x;break;case"ZXY":this._x=f*u*h-c*m*x,this._y=c*m*h+f*u*x,this._z=c*u*x+f*m*h,this._w=c*u*h-f*m*x;break;case"ZYX":this._x=f*u*h-c*m*x,this._y=c*m*h+f*u*x,this._z=c*u*x-f*m*h,this._w=c*u*h+f*m*x;break;case"YZX":this._x=f*u*h+c*m*x,this._y=c*m*h+f*u*x,this._z=c*u*x-f*m*h,this._w=c*u*h-f*m*x;break;case"XZY":this._x=f*u*h-c*m*x,this._y=c*m*h-f*u*x,this._z=c*u*x+f*m*h,this._w=c*u*h+f*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ec.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ec.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*i),u=2*(o*e-s*r),h=2*(s*i-a*e);return this.x=e+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return xo.copy(this).projectOnVector(t),this.sub(xo)}reflect(t){return this.sub(xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new F,ec=new qn;class Ir{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,We):We.fromBufferAttribute(s,a),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(or),Yr.subVectors(this.max,or),Ei.subVectors(t.a,or),Ti.subVectors(t.b,or),bi.subVectors(t.c,or),wn.subVectors(Ti,Ei),Rn.subVectors(bi,Ti),ei.subVectors(Ei,bi);let e=[0,-wn.z,wn.y,0,-Rn.z,Rn.y,0,-ei.z,ei.y,wn.z,0,-wn.x,Rn.z,0,-Rn.x,ei.z,0,-ei.x,-wn.y,wn.x,0,-Rn.y,Rn.x,0,-ei.y,ei.x,0];return!Mo(e,Ei,Ti,bi,Yr)||(e=[1,0,0,0,1,0,0,0,1],!Mo(e,Ei,Ti,bi,Yr))?!1:(qr.crossVectors(wn,Rn),e=[qr.x,qr.y,qr.z],Mo(e,Ei,Ti,bi,Yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const fn=[new F,new F,new F,new F,new F,new F,new F,new F],We=new F,Xr=new Ir,Ei=new F,Ti=new F,bi=new F,wn=new F,Rn=new F,ei=new F,or=new F,Yr=new F,qr=new F,ni=new F;function Mo(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ni.fromArray(n,s);const o=r.x*Math.abs(ni.x)+r.y*Math.abs(ni.y)+r.z*Math.abs(ni.z),l=t.dot(ni),c=e.dot(ni),u=i.dot(ni);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const zm=new Ir,ar=new F,So=new F;class js{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zm.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ar.subVectors(t,this.center);const e=ar.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(ar,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(So.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ar.copy(t.center).add(So)),this.expandByPoint(ar.copy(t.center).sub(So))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new F,yo=new F,jr=new F,Cn=new F,Eo=new F,Zr=new F,To=new F;class La{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){yo.copy(t).add(e).multiplyScalar(.5),jr.copy(e).sub(t).normalize(),Cn.copy(this.origin).sub(yo);const s=t.distanceTo(e)*.5,a=-this.direction.dot(jr),o=Cn.dot(this.direction),l=-Cn.dot(jr),c=Cn.lengthSq(),u=Math.abs(1-a*a);let h,f,m,x;if(u>0)if(h=a*l-o,f=a*o-l,x=s*u,h>=0)if(f>=-x)if(f<=x){const v=1/u;h*=v,f*=v,m=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f<=-x?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c):f<=x?(h=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(yo).addScaledVector(jr,f),m}intersectSphere(t,e){dn.subVectors(t.center,this.origin);const i=dn.dot(this.direction),r=dn.dot(dn)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,i,r,s){Eo.subVectors(e,t),Zr.subVectors(i,t),To.crossVectors(Eo,Zr);let a=this.direction.dot(To),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Cn.subVectors(this.origin,t);const l=o*this.direction.dot(Zr.crossVectors(Cn,Zr));if(l<0)return null;const c=o*this.direction.dot(Eo.cross(Cn));if(c<0||l+c>a)return null;const u=-o*Cn.dot(To);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,r,s,a,o,l,c,u,h,f,m,x,v,p){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c,u,h,f,m,x,v,p)}set(t,e,i,r,s,a,o,l,c,u,h,f,m,x,v,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=m,d[7]=x,d[11]=v,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Ai.setFromMatrixColumn(t,0).length(),s=1/Ai.setFromMatrixColumn(t,1).length(),a=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=a*u,m=a*h,x=o*u,v=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=m+x*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=x+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,m=l*h,x=c*u,v=c*h;e[0]=f+v*o,e[4]=x*o-m,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=m*o-x,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,m=l*h,x=c*u,v=c*h;e[0]=f-v*o,e[4]=-a*h,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*u,e[9]=v-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,m=a*h,x=o*u,v=o*h;e[0]=l*u,e[4]=x*c-m,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=m*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,x=o*l,v=o*c;e[0]=l*u,e[4]=v-f*h,e[8]=x*h+m,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=m*h+x,e[10]=f-v*h}else if(t.order==="XZY"){const f=a*l,m=a*c,x=o*l,v=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+v,e[5]=a*u,e[9]=m*h-x,e[2]=x*h-m,e[6]=o*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hm,t,Vm)}lookAt(t,e,i){const r=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),Pn.crossVectors(i,Fe),Pn.lengthSq()===0&&(Math.abs(i.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),Pn.crossVectors(i,Fe)),Pn.normalize(),Kr.crossVectors(Fe,Pn),r[0]=Pn.x,r[4]=Kr.x,r[8]=Fe.x,r[1]=Pn.y,r[5]=Kr.y,r[9]=Fe.y,r[2]=Pn.z,r[6]=Kr.z,r[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],m=i[13],x=i[2],v=i[6],p=i[10],d=i[14],b=i[3],S=i[7],A=i[11],U=i[15],C=r[0],R=r[4],I=r[8],T=r[12],M=r[1],G=r[5],$=r[9],N=r[13],et=r[2],tt=r[6],at=r[10],nt=r[14],k=r[3],ct=r[7],ut=r[11],Mt=r[15];return s[0]=a*C+o*M+l*et+c*k,s[4]=a*R+o*G+l*tt+c*ct,s[8]=a*I+o*$+l*at+c*ut,s[12]=a*T+o*N+l*nt+c*Mt,s[1]=u*C+h*M+f*et+m*k,s[5]=u*R+h*G+f*tt+m*ct,s[9]=u*I+h*$+f*at+m*ut,s[13]=u*T+h*N+f*nt+m*Mt,s[2]=x*C+v*M+p*et+d*k,s[6]=x*R+v*G+p*tt+d*ct,s[10]=x*I+v*$+p*at+d*ut,s[14]=x*T+v*N+p*nt+d*Mt,s[3]=b*C+S*M+A*et+U*k,s[7]=b*R+S*G+A*tt+U*ct,s[11]=b*I+S*$+A*at+U*ut,s[15]=b*T+S*N+A*nt+U*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],m=t[14],x=t[3],v=t[7],p=t[11],d=t[15];return x*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*m-i*l*m)+v*(+e*l*m-e*c*f+s*a*f-r*a*m+r*c*u-s*l*u)+p*(+e*c*h-e*o*m-s*a*h+i*a*m+s*o*u-i*c*u)+d*(-r*o*u-e*l*h+e*o*f+r*a*h-i*a*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],m=t[11],x=t[12],v=t[13],p=t[14],d=t[15],b=h*p*c-v*f*c+v*l*m-o*p*m-h*l*d+o*f*d,S=x*f*c-u*p*c-x*l*m+a*p*m+u*l*d-a*f*d,A=u*v*c-x*h*c+x*o*m-a*v*m-u*o*d+a*h*d,U=x*h*l-u*v*l-x*o*f+a*v*f+u*o*p-a*h*p,C=e*b+i*S+r*A+s*U;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=b*R,t[1]=(v*f*s-h*p*s-v*r*m+i*p*m+h*r*d-i*f*d)*R,t[2]=(o*p*s-v*l*s+v*r*c-i*p*c-o*r*d+i*l*d)*R,t[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*m-i*l*m)*R,t[4]=S*R,t[5]=(u*p*s-x*f*s+x*r*m-e*p*m-u*r*d+e*f*d)*R,t[6]=(x*l*s-a*p*s-x*r*c+e*p*c+a*r*d-e*l*d)*R,t[7]=(a*f*s-u*l*s+u*r*c-e*f*c-a*r*m+e*l*m)*R,t[8]=A*R,t[9]=(x*h*s-u*v*s-x*i*m+e*v*m+u*i*d-e*h*d)*R,t[10]=(a*v*s-x*o*s+x*i*c-e*v*c-a*i*d+e*o*d)*R,t[11]=(u*o*s-a*h*s-u*i*c+e*h*c+a*i*m-e*o*m)*R,t[12]=U*R,t[13]=(u*v*r-x*h*r+x*i*f-e*v*f-u*i*p+e*h*p)*R,t[14]=(x*o*r-a*v*r-x*i*l+e*v*l+a*i*p-e*o*p)*R,t[15]=(a*h*r-u*o*r+u*i*l-e*h*l-a*i*f+e*o*f)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,f=s*c,m=s*u,x=s*h,v=a*u,p=a*h,d=o*h,b=l*c,S=l*u,A=l*h,U=i.x,C=i.y,R=i.z;return r[0]=(1-(v+d))*U,r[1]=(m+A)*U,r[2]=(x-S)*U,r[3]=0,r[4]=(m-A)*C,r[5]=(1-(f+d))*C,r[6]=(p+b)*C,r[7]=0,r[8]=(x+S)*R,r[9]=(p-b)*R,r[10]=(1-(f+v))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=Ai.set(r[0],r[1],r[2]).length();const a=Ai.set(r[4],r[5],r[6]).length(),o=Ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Xe.copy(this);const c=1/s,u=1/a,h=1/o;return Xe.elements[0]*=c,Xe.elements[1]*=c,Xe.elements[2]*=c,Xe.elements[4]*=u,Xe.elements[5]*=u,Xe.elements[6]*=u,Xe.elements[8]*=h,Xe.elements[9]*=h,Xe.elements[10]*=h,e.setFromRotationMatrix(Xe),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=Mn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),f=(i+r)/(i-r);let m,x;if(o===Mn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Ls)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=Mn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(a-s),f=(e+t)*c,m=(i+r)*u;let x,v;if(o===Mn)x=(a+s)*h,v=-2*h;else if(o===Ls)x=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ai=new F,Xe=new se,Hm=new F(0,0,0),Vm=new F(1,1,1),Pn=new F,Kr=new F,Fe=new F,nc=new se,ic=new qn;class ln{constructor(t=0,e=0,i=0,r=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class uh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gm=0;const rc=new F,wi=new qn,pn=new se,$r=new F,lr=new F,km=new F,Wm=new qn,sc=new F(1,0,0),oc=new F(0,1,0),ac=new F(0,0,1),lc={type:"added"},Xm={type:"removed"},Ri={type:"childadded",child:null},bo={type:"childremoved",child:null};class he extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=he.DEFAULT_UP.clone();const t=new F,e=new ln,i=new qn,r=new F(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new se},normalMatrix:{value:new Vt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=he.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(sc,t)}rotateY(t){return this.rotateOnAxis(oc,t)}rotateZ(t){return this.rotateOnAxis(ac,t)}translateOnAxis(t,e){return rc.copy(t).applyQuaternion(this.quaternion),this.position.add(rc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sc,t)}translateY(t){return this.translateOnAxis(oc,t)}translateZ(t){return this.translateOnAxis(ac,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?$r.copy(t):$r.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(lr,$r,this.up):pn.lookAt($r,lr,this.up),this.quaternion.setFromRotationMatrix(pn),r&&(pn.extractRotation(r.matrixWorld),wi.setFromRotationMatrix(pn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lc),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xm),bo.child=t,this.dispatchEvent(bo),bo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lc),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,km),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Wm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++){const s=e[i];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}he.DEFAULT_UP=new F(0,1,0);he.DEFAULT_MATRIX_AUTO_UPDATE=!0;he.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ye=new F,mn=new F,Ao=new F,gn=new F,Ci=new F,Pi=new F,cc=new F,wo=new F,Ro=new F,Co=new F;class rn{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Ye.subVectors(t,e),r.cross(Ye);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Ye.subVectors(r,e),mn.subVectors(i,e),Ao.subVectors(t,e);const a=Ye.dot(Ye),o=Ye.dot(mn),l=Ye.dot(Ao),c=mn.dot(mn),u=mn.dot(Ao),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,m=(c*l-o*u)*f,x=(a*u-o*l)*f;return s.set(1-m-x,x,m)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(t,e,i,r,s,a,o,l){return this.getBarycoord(t,e,i,r,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l)}static isFrontFacing(t,e,i,r){return Ye.subVectors(i,e),mn.subVectors(t,e),Ye.cross(mn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ye.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Ye.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return rn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;Ci.subVectors(r,i),Pi.subVectors(s,i),wo.subVectors(t,i);const l=Ci.dot(wo),c=Pi.dot(wo);if(l<=0&&c<=0)return e.copy(i);Ro.subVectors(t,r);const u=Ci.dot(Ro),h=Pi.dot(Ro);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(Ci,a);Co.subVectors(t,s);const m=Ci.dot(Co),x=Pi.dot(Co);if(x>=0&&m<=x)return e.copy(s);const v=m*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(i).addScaledVector(Pi,o);const p=u*x-m*h;if(p<=0&&h-u>=0&&m-x>=0)return cc.subVectors(s,r),o=(h-u)/(h-u+(m-x)),e.copy(r).addScaledVector(cc,o);const d=1/(p+v+f);return a=v*d,o=f*d,e.copy(i).addScaledVector(Ci,a).addScaledVector(Pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function Po(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Xt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Jt.workingColorSpace){if(t=Pa(t,1),e=Ee(e,0,1),i=Ee(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=Po(a,s,t+1/3),this.g=Po(a,s,t),this.b=Po(a,s,t-1/3)}return Jt.toWorkingColorSpace(this,r),this}setStyle(t,e=Qe){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const i=hh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}copyLinearToSRGB(t){return this.r=_o(t.r),this.g=_o(t.g),this.b=_o(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return Jt.fromWorkingColorSpace(ye.copy(this),t),Math.round(Ee(ye.r*255,0,255))*65536+Math.round(Ee(ye.g*255,0,255))*256+Math.round(Ee(ye.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(ye.copy(this),e);const i=ye.r,r=ye.g,s=ye.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(ye.copy(this),e),t.r=ye.r,t.g=ye.g,t.b=ye.b,t}getStyle(t=Qe){Jt.fromWorkingColorSpace(ye.copy(this),t);const e=ye.r,i=ye.g,r=ye.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(Jr);const i=Mr(Ln.h,Jr.h,e),r=Mr(Ln.s,Jr.s,e),s=Mr(Ln.l,Jr.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ye=new Xt;Xt.NAMES=hh;let Ym=0;class tr extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=ki,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ea,this.blendDst=na,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(i.blending=this.blending),this.side!==Xn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ea&&(i.blendSrc=this.blendSrc),this.blendDst!==na&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fh extends tr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Zu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ce=new F,Qr=new Pt;class an{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Zl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Dm("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Qr.fromBufferAttribute(this,e),Qr.applyMatrix3(t),this.setXY(e,Qr.x,Qr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix3(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix4(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyNormalMatrix(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.transformDirection(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Bi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ae(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),i=Ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),i=Ae(i,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),i=Ae(i,this.array),r=Ae(r,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zl&&(t.usage=this.usage),t}}class dh extends an{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ph extends an{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class De extends an{constructor(t,e,i){super(new Float32Array(t),e,i)}}let qm=0;const He=new se,Lo=new he,Li=new F,Oe=new Ir,cr=new Ir,me=new F;class cn extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ah(t)?ph:dh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Vt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,i){return He.makeTranslation(t,e,i),this.applyMatrix4(He),this}scale(t,e,i){return He.makeScale(t,e,i),this.applyMatrix4(He),this}lookAt(t){return Lo.lookAt(t),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=[];for(let i=0,r=t.length;i<r;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new De(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Oe.setFromBufferAttribute(s),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Oe.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Oe.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Oe.min),this.boundingBox.expandByPoint(Oe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new js);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Oe.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(Oe.min,cr.min),Oe.expandByPoint(me),me.addVectors(Oe.max,cr.max),Oe.expandByPoint(me)):(Oe.expandByPoint(cr.min),Oe.expandByPoint(cr.max))}Oe.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)me.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(me));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)me.fromBufferAttribute(o,c),l&&(Li.fromBufferAttribute(t,c),me.add(Li)),r=Math.max(r,i.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<i.count;I++)o[I]=new F,l[I]=new F;const c=new F,u=new F,h=new F,f=new Pt,m=new Pt,x=new Pt,v=new F,p=new F;function d(I,T,M){c.fromBufferAttribute(i,I),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,M),f.fromBufferAttribute(s,I),m.fromBufferAttribute(s,T),x.fromBufferAttribute(s,M),u.sub(c),h.sub(c),m.sub(f),x.sub(f);const G=1/(m.x*x.y-x.x*m.y);isFinite(G)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(G),p.copy(h).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(G),o[I].add(v),o[T].add(v),o[M].add(v),l[I].add(p),l[T].add(p),l[M].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,T=b.length;I<T;++I){const M=b[I],G=M.start,$=M.count;for(let N=G,et=G+$;N<et;N+=3)d(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const S=new F,A=new F,U=new F,C=new F;function R(I){U.fromBufferAttribute(r,I),C.copy(U);const T=o[I];S.copy(T),S.sub(U.multiplyScalar(U.dot(T))).normalize(),A.crossVectors(C,T);const G=A.dot(l[I])<0?-1:1;a.setXYZW(I,S.x,S.y,S.z,G)}for(let I=0,T=b.length;I<T;++I){const M=b[I],G=M.start,$=M.count;for(let N=G,et=G+$;N<et;N+=3)R(t.getX(N+0)),R(t.getX(N+1)),R(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(t)for(let f=0,m=t.count;f<m;f+=3){const x=t.getX(f+0),v=t.getX(f+1),p=t.getX(f+2);r.fromBufferAttribute(e,x),s.fromBufferAttribute(e,v),a.fromBufferAttribute(e,p),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let m=0,x=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*u;for(let d=0;d<u;d++)f[x++]=c[m++]}return new an(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new cn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],m=t(f,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];u.push(m.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uc=new se,ii=new La,ts=new js,hc=new F,Di=new F,Ii=new F,Ui=new F,Do=new F,es=new F,ns=new Pt,is=new Pt,rs=new Pt,fc=new F,dc=new F,pc=new F,ss=new F,os=new F;class Ke extends he{constructor(t=new cn,e=new fh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){es.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Do.fromBufferAttribute(h,t),a?es.addScaledVector(Do,u):es.addScaledVector(Do.sub(e),u))}e.add(es)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(s),ii.copy(t.ray).recast(t.near),!(ts.containsPoint(ii.origin)===!1&&(ii.intersectSphere(ts,hc)===null||ii.origin.distanceToSquared(hc)>(t.far-t.near)**2))&&(uc.copy(s).invert(),ii.copy(t.ray).applyMatrix4(uc),!(i.boundingBox!==null&&ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const p=f[x],d=a[p.materialIndex],b=Math.max(p.start,m.start),S=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let A=b,U=S;A<U;A+=3){const C=o.getX(A),R=o.getX(A+1),I=o.getX(A+2);r=as(this,d,t,i,c,u,h,C,R,I),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let p=x,d=v;p<d;p+=3){const b=o.getX(p),S=o.getX(p+1),A=o.getX(p+2);r=as(this,a,t,i,c,u,h,b,S,A),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const p=f[x],d=a[p.materialIndex],b=Math.max(p.start,m.start),S=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let A=b,U=S;A<U;A+=3){const C=A,R=A+1,I=A+2;r=as(this,d,t,i,c,u,h,C,R,I),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=x,d=v;p<d;p+=3){const b=p,S=p+1,A=p+2;r=as(this,a,t,i,c,u,h,b,S,A),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function jm(n,t,e,i,r,s,a,o){let l;if(t.side===Pe?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===Xn,o),l===null)return null;os.copy(o),os.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(os);return c<e.near||c>e.far?null:{distance:c,point:os.clone(),object:n}}function as(n,t,e,i,r,s,a,o,l,c){n.getVertexPosition(o,Di),n.getVertexPosition(l,Ii),n.getVertexPosition(c,Ui);const u=jm(n,t,e,i,Di,Ii,Ui,ss);if(u){r&&(ns.fromBufferAttribute(r,o),is.fromBufferAttribute(r,l),rs.fromBufferAttribute(r,c),u.uv=rn.getInterpolation(ss,Di,Ii,Ui,ns,is,rs,new Pt)),s&&(ns.fromBufferAttribute(s,o),is.fromBufferAttribute(s,l),rs.fromBufferAttribute(s,c),u.uv1=rn.getInterpolation(ss,Di,Ii,Ui,ns,is,rs,new Pt)),a&&(fc.fromBufferAttribute(a,o),dc.fromBufferAttribute(a,l),pc.fromBufferAttribute(a,c),u.normal=rn.getInterpolation(ss,Di,Ii,Ui,fc,dc,pc,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new F,materialIndex:0};rn.getNormal(Di,Ii,Ui,h.normal),u.face=h}return u}class Ur extends cn{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,m=0;x("z","y","x",-1,-1,i,e,t,a,s,0),x("z","y","x",1,-1,i,e,-t,a,s,1),x("x","z","y",1,1,t,i,e,r,a,2),x("x","z","y",1,-1,t,i,-e,r,a,3),x("x","y","z",1,-1,t,e,i,r,s,4),x("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(u,3)),this.setAttribute("uv",new De(h,2));function x(v,p,d,b,S,A,U,C,R,I,T){const M=A/R,G=U/I,$=A/2,N=U/2,et=C/2,tt=R+1,at=I+1;let nt=0,k=0;const ct=new F;for(let ut=0;ut<at;ut++){const Mt=ut*G-N;for(let At=0;At<tt;At++){const qt=At*M-$;ct[v]=qt*b,ct[p]=Mt*S,ct[d]=et,c.push(ct.x,ct.y,ct.z),ct[v]=0,ct[p]=0,ct[d]=C>0?1:-1,u.push(ct.x,ct.y,ct.z),h.push(At/R),h.push(1-ut/I),nt+=1}}for(let ut=0;ut<I;ut++)for(let Mt=0;Mt<R;Mt++){const At=f+Mt+tt*ut,qt=f+Mt+tt*(ut+1),J=f+(Mt+1)+tt*(ut+1),ht=f+(Mt+1)+tt*ut;l.push(At,qt,ht),l.push(qt,J,ht),k+=6}o.addGroup(m,k,T),m+=k,f+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function $i(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function we(n){const t={};for(let e=0;e<n.length;e++){const i=$i(n[e]);for(const r in i)t[r]=i[r]}return t}function Zm(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function mh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Km={clone:$i,merge:we};var $m=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends tr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$m,this.fragmentShader=Jm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$i(t.uniforms),this.uniformsGroups=Zm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Da extends he{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=Mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new F,mc=new Pt,gc=new Pt;class Ve extends Da{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cr*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z)}getViewSize(t,e){return this.getViewBounds(t,mc,gc),e.subVectors(gc,mc)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ni=-90,Fi=1;class Qm extends he{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ve(Ni,Fi,t,e);r.layers=this.layers,this.add(r);const s=new Ve(Ni,Fi,t,e);s.layers=this.layers,this.add(s);const a=new Ve(Ni,Fi,t,e);a.layers=this.layers,this.add(a);const o=new Ve(Ni,Fi,t,e);o.layers=this.layers,this.add(o);const l=new Ve(Ni,Fi,t,e);l.layers=this.layers,this.add(l);const c=new Ve(Ni,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ls)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,f,m),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class gh extends Le{constructor(t,e,i,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ji,super(t,e,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tg extends _i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new gh(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ur(5,5,5),s=new jn({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pe,blending:Gn});s.uniforms.tEquirect.value=e;const a=new Ke(r,s),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=je),new Qm(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}const Io=new F,eg=new F,ng=new Vt;class Fn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=Io.subVectors(i,e).cross(eg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Io),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||ng.getNormalMatrix(t),r=this.coplanarPoint(Io).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new js,ls=new F;class Ia{constructor(t=new Fn,e=new Fn,i=new Fn,r=new Fn,s=new Fn,a=new Fn){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Mn){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],m=r[8],x=r[9],v=r[10],p=r[11],d=r[12],b=r[13],S=r[14],A=r[15];if(i[0].setComponents(l-s,f-c,p-m,A-d).normalize(),i[1].setComponents(l+s,f+c,p+m,A+d).normalize(),i[2].setComponents(l+a,f+u,p+x,A+b).normalize(),i[3].setComponents(l-a,f-u,p-x,A-b).normalize(),i[4].setComponents(l-o,f-h,p-v,A-S).normalize(),e===Mn)i[5].setComponents(l+o,f+h,p+v,A+S).normalize();else if(e===Ls)i[5].setComponents(o,h,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(t){return ri.center.set(0,0,0),ri.radius=.7071067811865476,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(ls.x=r.normal.x>0?t.max.x:t.min.x,ls.y=r.normal.y>0?t.max.y:t.min.y,ls.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ls)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _h(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function ig(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l._updateRange,f=l.updateRanges;if(n.bindBuffer(c,o),h.count===-1&&f.length===0&&n.bufferSubData(c,0,u),f.length!==0){for(let m=0,x=f.length;m<x;m++){const v=f[m];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}h.count!==-1&&(n.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class Nr extends cn{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=t/o,f=e/l,m=[],x=[],v=[],p=[];for(let d=0;d<u;d++){const b=d*f-a;for(let S=0;S<c;S++){const A=S*h-s;x.push(A,-b,0),v.push(0,0,1),p.push(S/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const S=b+c*d,A=b+c*(d+1),U=b+1+c*(d+1),C=b+1+c*d;m.push(S,A,C),m.push(A,U,C)}this.setIndex(m),this.setAttribute("position",new De(x,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nr(t.width,t.height,t.widthSegments,t.heightSegments)}}var rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,og=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ag=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ug=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fg=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,pg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_g=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,wg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ig=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ug="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ng=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$g=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,t_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,r_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,d_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,__=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,x_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,M_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,S_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,y_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,A_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,w_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,C_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,D_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,I_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,z_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,H_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,G_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,k_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Y_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,n0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const i0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,r0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,u0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,h0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,f0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,p0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,g0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,y0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,T0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,N0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:rg,alphahash_pars_fragment:sg,alphamap_fragment:og,alphamap_pars_fragment:ag,alphatest_fragment:lg,alphatest_pars_fragment:cg,aomap_fragment:ug,aomap_pars_fragment:hg,batching_pars_vertex:fg,batching_vertex:dg,begin_vertex:pg,beginnormal_vertex:mg,bsdfs:gg,iridescence_fragment:_g,bumpmap_pars_fragment:vg,clipping_planes_fragment:xg,clipping_planes_pars_fragment:Mg,clipping_planes_pars_vertex:Sg,clipping_planes_vertex:yg,color_fragment:Eg,color_pars_fragment:Tg,color_pars_vertex:bg,color_vertex:Ag,common:wg,cube_uv_reflection_fragment:Rg,defaultnormal_vertex:Cg,displacementmap_pars_vertex:Pg,displacementmap_vertex:Lg,emissivemap_fragment:Dg,emissivemap_pars_fragment:Ig,colorspace_fragment:Ug,colorspace_pars_fragment:Ng,envmap_fragment:Fg,envmap_common_pars_fragment:Og,envmap_pars_fragment:Bg,envmap_pars_vertex:zg,envmap_physical_pars_fragment:Kg,envmap_vertex:Hg,fog_vertex:Vg,fog_pars_vertex:Gg,fog_fragment:kg,fog_pars_fragment:Wg,gradientmap_pars_fragment:Xg,lightmap_pars_fragment:Yg,lights_lambert_fragment:qg,lights_lambert_pars_fragment:jg,lights_pars_begin:Zg,lights_toon_fragment:$g,lights_toon_pars_fragment:Jg,lights_phong_fragment:Qg,lights_phong_pars_fragment:t_,lights_physical_fragment:e_,lights_physical_pars_fragment:n_,lights_fragment_begin:i_,lights_fragment_maps:r_,lights_fragment_end:s_,logdepthbuf_fragment:o_,logdepthbuf_pars_fragment:a_,logdepthbuf_pars_vertex:l_,logdepthbuf_vertex:c_,map_fragment:u_,map_pars_fragment:h_,map_particle_fragment:f_,map_particle_pars_fragment:d_,metalnessmap_fragment:p_,metalnessmap_pars_fragment:m_,morphinstance_vertex:g_,morphcolor_vertex:__,morphnormal_vertex:v_,morphtarget_pars_vertex:x_,morphtarget_vertex:M_,normal_fragment_begin:S_,normal_fragment_maps:y_,normal_pars_fragment:E_,normal_pars_vertex:T_,normal_vertex:b_,normalmap_pars_fragment:A_,clearcoat_normal_fragment_begin:w_,clearcoat_normal_fragment_maps:R_,clearcoat_pars_fragment:C_,iridescence_pars_fragment:P_,opaque_fragment:L_,packing:D_,premultiplied_alpha_fragment:I_,project_vertex:U_,dithering_fragment:N_,dithering_pars_fragment:F_,roughnessmap_fragment:O_,roughnessmap_pars_fragment:B_,shadowmap_pars_fragment:z_,shadowmap_pars_vertex:H_,shadowmap_vertex:V_,shadowmask_pars_fragment:G_,skinbase_vertex:k_,skinning_pars_vertex:W_,skinning_vertex:X_,skinnormal_vertex:Y_,specularmap_fragment:q_,specularmap_pars_fragment:j_,tonemapping_fragment:Z_,tonemapping_pars_fragment:K_,transmission_fragment:$_,transmission_pars_fragment:J_,uv_pars_fragment:Q_,uv_pars_vertex:t0,uv_vertex:e0,worldpos_vertex:n0,background_vert:i0,background_frag:r0,backgroundCube_vert:s0,backgroundCube_frag:o0,cube_vert:a0,cube_frag:l0,depth_vert:c0,depth_frag:u0,distanceRGBA_vert:h0,distanceRGBA_frag:f0,equirect_vert:d0,equirect_frag:p0,linedashed_vert:m0,linedashed_frag:g0,meshbasic_vert:_0,meshbasic_frag:v0,meshlambert_vert:x0,meshlambert_frag:M0,meshmatcap_vert:S0,meshmatcap_frag:y0,meshnormal_vert:E0,meshnormal_frag:T0,meshphong_vert:b0,meshphong_frag:A0,meshphysical_vert:w0,meshphysical_frag:R0,meshtoon_vert:C0,meshtoon_frag:P0,points_vert:L0,points_frag:D0,shadow_vert:I0,shadow_frag:U0,sprite_vert:N0,sprite_frag:F0},pt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},en={basic:{uniforms:we([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:we([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:we([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:we([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:we([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:we([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:we([pt.points,pt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:we([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:we([pt.common,pt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:we([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:we([pt.sprite,pt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:we([pt.common,pt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:we([pt.lights,pt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};en.physical={uniforms:we([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const cs={r:0,b:0,g:0},si=new ln,O0=new se;function B0(n,t,e,i,r,s,a){const o=new Xt(0);let l=s===!0?0:1,c,u,h=null,f=0,m=null;function x(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function v(b){let S=!1;const A=x(b);A===null?d(o,l):A&&A.isColor&&(d(A,1),S=!0);const U=n.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil)}function p(b,S){const A=x(S);A&&(A.isCubeTexture||A.mapping===Xs)?(u===void 0&&(u=new Ke(new Ur(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:$i(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),si.copy(S.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(O0.makeRotationFromEuler(si)),u.material.toneMapped=Jt.getTransfer(A.colorSpace)!==te,(h!==A||f!==A.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=A,f=A.version,m=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ke(new Nr(2,2),new jn({name:"BackgroundMaterial",uniforms:$i(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(A.colorSpace)!==te,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=A,f=A.version,m=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,S){b.getRGB(cs,mh(n)),i.buffers.color.setClear(cs.r,cs.g,cs.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(b,S=1){o.set(b),l=S,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:v,addToRenderList:p}}function z0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(M,G,$,N,et){let tt=!1;const at=h(N,$,G);s!==at&&(s=at,c(s.object)),tt=m(M,N,$,et),tt&&x(M,N,$,et),et!==null&&t.update(et,n.ELEMENT_ARRAY_BUFFER),(tt||a)&&(a=!1,A(M,G,$,N),et!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(et).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function h(M,G,$){const N=$.wireframe===!0;let et=i[M.id];et===void 0&&(et={},i[M.id]=et);let tt=et[G.id];tt===void 0&&(tt={},et[G.id]=tt);let at=tt[N];return at===void 0&&(at=f(l()),tt[N]=at),at}function f(M){const G=[],$=[],N=[];for(let et=0;et<e;et++)G[et]=0,$[et]=0,N[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:$,attributeDivisors:N,object:M,attributes:{},index:null}}function m(M,G,$,N){const et=s.attributes,tt=G.attributes;let at=0;const nt=$.getAttributes();for(const k in nt)if(nt[k].location>=0){const ut=et[k];let Mt=tt[k];if(Mt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),ut===void 0||ut.attribute!==Mt||Mt&&ut.data!==Mt.data)return!0;at++}return s.attributesNum!==at||s.index!==N}function x(M,G,$,N){const et={},tt=G.attributes;let at=0;const nt=$.getAttributes();for(const k in nt)if(nt[k].location>=0){let ut=tt[k];ut===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ut=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ut=M.instanceColor));const Mt={};Mt.attribute=ut,ut&&ut.data&&(Mt.data=ut.data),et[k]=Mt,at++}s.attributes=et,s.attributesNum=at,s.index=N}function v(){const M=s.newAttributes;for(let G=0,$=M.length;G<$;G++)M[G]=0}function p(M){d(M,0)}function d(M,G){const $=s.newAttributes,N=s.enabledAttributes,et=s.attributeDivisors;$[M]=1,N[M]===0&&(n.enableVertexAttribArray(M),N[M]=1),et[M]!==G&&(n.vertexAttribDivisor(M,G),et[M]=G)}function b(){const M=s.newAttributes,G=s.enabledAttributes;for(let $=0,N=G.length;$<N;$++)G[$]!==M[$]&&(n.disableVertexAttribArray($),G[$]=0)}function S(M,G,$,N,et,tt,at){at===!0?n.vertexAttribIPointer(M,G,$,et,tt):n.vertexAttribPointer(M,G,$,N,et,tt)}function A(M,G,$,N){v();const et=N.attributes,tt=$.getAttributes(),at=G.defaultAttributeValues;for(const nt in tt){const k=tt[nt];if(k.location>=0){let ct=et[nt];if(ct===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),ct!==void 0){const ut=ct.normalized,Mt=ct.itemSize,At=t.get(ct);if(At===void 0)continue;const qt=At.buffer,J=At.type,ht=At.bytesPerElement,vt=J===n.INT||J===n.UNSIGNED_INT||ct.gpuType===Ju;if(ct.isInterleavedBufferAttribute){const dt=ct.data,Ut=dt.stride,Nt=ct.offset;if(dt.isInstancedInterleavedBuffer){for(let z=0;z<k.locationSize;z++)d(k.location+z,dt.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let z=0;z<k.locationSize;z++)p(k.location+z);n.bindBuffer(n.ARRAY_BUFFER,qt);for(let z=0;z<k.locationSize;z++)S(k.location+z,Mt/k.locationSize,J,ut,Ut*ht,(Nt+Mt/k.locationSize*z)*ht,vt)}else{if(ct.isInstancedBufferAttribute){for(let dt=0;dt<k.locationSize;dt++)d(k.location+dt,ct.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let dt=0;dt<k.locationSize;dt++)p(k.location+dt);n.bindBuffer(n.ARRAY_BUFFER,qt);for(let dt=0;dt<k.locationSize;dt++)S(k.location+dt,Mt/k.locationSize,J,ut,Mt*ht,Mt/k.locationSize*dt*ht,vt)}}else if(at!==void 0){const ut=at[nt];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(k.location,ut);break;case 3:n.vertexAttrib3fv(k.location,ut);break;case 4:n.vertexAttrib4fv(k.location,ut);break;default:n.vertexAttrib1fv(k.location,ut)}}}}b()}function U(){I();for(const M in i){const G=i[M];for(const $ in G){const N=G[$];for(const et in N)u(N[et].object),delete N[et];delete G[$]}delete i[M]}}function C(M){if(i[M.id]===void 0)return;const G=i[M.id];for(const $ in G){const N=G[$];for(const et in N)u(N[et].object),delete N[et];delete G[$]}delete i[M.id]}function R(M){for(const G in i){const $=i[G];if($[M.id]===void 0)continue;const N=$[M.id];for(const et in N)u(N[et].object),delete N[et];delete $[M.id]}}function I(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:T,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:b}}function H0(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function a(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function o(c,u,h){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<h;m++)this.render(c[m],u[m]);else{f.multiDrawArraysWEBGL(i,c,0,u,0,h);let m=0;for(let x=0;x<h;x++)m+=u[x];e.update(m,i,1)}}function l(c,u,h,f){if(h===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<c.length;x++)a(c[x],u[x],f[x]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let x=0;for(let v=0;v<h;v++)x+=u[v];for(let v=0;v<f.length;v++)e.update(x,i,f[v])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function V0(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==on&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const R=C===Ys&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Yn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Bn&&!R)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,U=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:v,maxAttributes:p,maxVertexUniforms:d,maxVaryings:b,maxFragmentUniforms:S,vertexTextures:A,maxSamples:U}}function G0(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new Fn,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,m){const x=h.clippingPlanes,v=h.clipIntersection,p=h.clipShadows,d=n.get(h);if(!r||x===null||x.length===0||s&&!p)s?u(null):c();else{const b=s?0:i,S=b*4;let A=d.clippingState||null;l.value=A,A=u(x,f,S,m);for(let U=0;U!==S;++U)A[U]=e[U];d.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,m,x){const v=h!==null?h.length:0;let p=null;if(v!==0){if(p=l.value,x!==!0||p===null){const d=m+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let S=0,A=m;S!==v;++S,A+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(p,A),p[A+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function k0(n){let t=new WeakMap;function e(a,o){return o===ia?a.mapping=ji:o===ra&&(a.mapping=Zi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ia||o===ra)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new tg(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class vh extends Da{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Hi=4,_c=[.125,.215,.35,.446,.526,.582],fi=20,Uo=new vh,vc=new Xt;let No=null,Fo=0,Oo=0,Bo=!1;const ci=(1+Math.sqrt(5))/2,Oi=1/ci,xc=[new F(-ci,Oi,0),new F(ci,Oi,0),new F(-Oi,0,ci),new F(Oi,0,ci),new F(0,ci,-Oi),new F(0,ci,Oi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Mc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){No=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(No,Fo,Oo),this._renderer.xr.enabled=Bo,t.scissorTest=!1,us(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ji||t.mapping===Zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),No=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:Ys,format:on,colorSpace:$n,depthBuffer:!1},r=Sc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=W0(s)),this._blurMaterial=X0(s,t,e)}return r}_compileMaterial(t){const e=new Ke(this._lodPlanes[0],t);this._renderer.compile(e,Uo)}_sceneToCubeUV(t,e,i,r){const o=new Ve(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(vc),u.toneMapping=kn,u.autoClear=!1;const m=new fh({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1}),x=new Ke(new Ur,m);let v=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,v=!0):(m.color.copy(vc),v=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const S=this._cubeSize;us(r,b*S,d>2?S:0,S,S),u.setRenderTarget(r),v&&u.render(x,o),u.render(t,o)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===ji||t.mapping===Zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;us(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Uo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=xc[(r-s-1)%xc.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ke(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*fi-1),v=s/x,p=isFinite(s)?1+Math.floor(u*v):fi;p>fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${fi}`);const d=[];let b=0;for(let R=0;R<fi;++R){const I=R/v,T=Math.exp(-I*I/2);d.push(T),R===0?b+=T:R<p&&(b+=2*T)}for(let R=0;R<d.length;R++)d[R]=d[R]/b;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=x,f.mipInt.value=S-i;const A=this._sizeLods[r],U=3*A*(r>S-Hi?r-S+Hi:0),C=4*(this._cubeSize-A);us(e,U,C,3*A,2*A),l.setRenderTarget(e),l.render(h,Uo)}}function W0(n){const t=[],e=[],i=[];let r=n;const s=n-Hi+1+_c.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Hi?l=_c[a-n+Hi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,x=6,v=3,p=2,d=1,b=new Float32Array(v*x*m),S=new Float32Array(p*x*m),A=new Float32Array(d*x*m);for(let C=0;C<m;C++){const R=C%3*2/3-1,I=C>2?0:-1,T=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];b.set(T,v*x*C),S.set(f,p*x*C);const M=[C,C,C,C,C,C];A.set(M,d*x*C)}const U=new cn;U.setAttribute("position",new an(b,v)),U.setAttribute("uv",new an(S,p)),U.setAttribute("faceIndex",new an(A,d)),t.push(U),r>Hi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Sc(n,t,e){const i=new _i(n,t,e);return i.texture.mapping=Xs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function us(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function X0(n,t,e){const i=new Float32Array(fi),r=new F(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function yc(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ec(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ua(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ua(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Y0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ia||l===ra,u=l===ji||l===Zi;if(c||u){let h=t.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Mc(n)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const m=o.image;return c&&m&&m.height>0||u&&m&&r(m)?(e===null&&(e=new Mc(n)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function q0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function j0(n,t,e,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);for(const x in f.morphAttributes){const v=f.morphAttributes[x];for(let p=0,d=v.length;p<d;p++)t.remove(v[p])}f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(t.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const x in f)t.update(f[x],n.ARRAY_BUFFER);const m=h.morphAttributes;for(const x in m){const v=m[x];for(let p=0,d=v.length;p<d;p++)t.update(v[p],n.ARRAY_BUFFER)}}function c(h){const f=[],m=h.index,x=h.attributes.position;let v=0;if(m!==null){const b=m.array;v=m.version;for(let S=0,A=b.length;S<A;S+=3){const U=b[S+0],C=b[S+1],R=b[S+2];f.push(U,C,C,R,R,U)}}else if(x!==void 0){const b=x.array;v=x.version;for(let S=0,A=b.length/3-1;S<A;S+=3){const U=S+0,C=S+1,R=S+2;f.push(U,C,C,R,R,U)}}else return;const p=new(ah(f)?ph:dh)(f,1);p.version=v;const d=s.get(h);d&&t.remove(d),s.set(h,p)}function u(h){const f=s.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Z0(n,t,e){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,m){n.drawElements(i,m,s,f*a),e.update(m,i,1)}function c(f,m,x){x!==0&&(n.drawElementsInstanced(i,m,s,f*a,x),e.update(m,i,x))}function u(f,m,x){if(x===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let p=0;p<x;p++)this.render(f[p]/a,m[p]);else{v.multiDrawElementsWEBGL(i,m,0,s,f,0,x);let p=0;for(let d=0;d<x;d++)p+=m[d];e.update(p,i,1)}}function h(f,m,x,v){if(x===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)c(f[d]/a,m[d],v[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,v,0,x);let d=0;for(let b=0;b<x;b++)d+=m[b];for(let b=0;b<v.length;b++)e.update(d,i,v[b])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function K0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function $0(n,t,e){const i=new WeakMap,r=new ge;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let M=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const x=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let A=0;x===!0&&(A=1),v===!0&&(A=2),p===!0&&(A=3);let U=o.attributes.position.count*A,C=1;U>t.maxTextureSize&&(C=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const R=new Float32Array(U*C*4*h),I=new ch(R,U,C,h);I.type=Bn,I.needsUpdate=!0;const T=A*4;for(let G=0;G<h;G++){const $=d[G],N=b[G],et=S[G],tt=U*C*4*G;for(let at=0;at<$.count;at++){const nt=at*T;x===!0&&(r.fromBufferAttribute($,at),R[tt+nt+0]=r.x,R[tt+nt+1]=r.y,R[tt+nt+2]=r.z,R[tt+nt+3]=0),v===!0&&(r.fromBufferAttribute(N,at),R[tt+nt+4]=r.x,R[tt+nt+5]=r.y,R[tt+nt+6]=r.z,R[tt+nt+7]=0),p===!0&&(r.fromBufferAttribute(et,at),R[tt+nt+8]=r.x,R[tt+nt+9]=r.y,R[tt+nt+10]=r.z,R[tt+nt+11]=et.itemSize===4?r.w:1)}}f={count:h,texture:I,size:new Pt(U,C)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let x=0;for(let p=0;p<c.length;p++)x+=c[p];const v=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function J0(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class xh extends Le{constructor(t,e,i,r,s,a,o,l,c,u){if(u=u!==void 0?u:Wi,u!==Wi&&u!==Rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Wi&&(i=Ki),i===void 0&&u===Rr&&(i=Dr),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Mh=new Le,Sh=new xh(1,1);Sh.compareFunction=oh;const yh=new ch,Eh=new Bm,Th=new gh,Tc=[],bc=[],Ac=new Float32Array(16),wc=new Float32Array(9),Rc=new Float32Array(4);function er(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Tc[r];if(s===void 0&&(s=new Float32Array(r),Tc[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function fe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function de(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Zs(n,t){let e=bc[t];e===void 0&&(e=new Int32Array(t),bc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Q0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function tv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2fv(this.addr,t),de(e,t)}}function ev(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;n.uniform3fv(this.addr,t),de(e,t)}}function nv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4fv(this.addr,t),de(e,t)}}function iv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;Rc.set(i),n.uniformMatrix2fv(this.addr,!1,Rc),de(e,i)}}function rv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;wc.set(i),n.uniformMatrix3fv(this.addr,!1,wc),de(e,i)}}function sv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;Ac.set(i),n.uniformMatrix4fv(this.addr,!1,Ac),de(e,i)}}function ov(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function av(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2iv(this.addr,t),de(e,t)}}function lv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;n.uniform3iv(this.addr,t),de(e,t)}}function cv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4iv(this.addr,t),de(e,t)}}function uv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2uiv(this.addr,t),de(e,t)}}function fv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;n.uniform3uiv(this.addr,t),de(e,t)}}function dv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4uiv(this.addr,t),de(e,t)}}function pv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Sh:Mh;e.setTexture2D(t||s,r)}function mv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Eh,r)}function gv(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Th,r)}function _v(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||yh,r)}function vv(n){switch(n){case 5126:return Q0;case 35664:return tv;case 35665:return ev;case 35666:return nv;case 35674:return iv;case 35675:return rv;case 35676:return sv;case 5124:case 35670:return ov;case 35667:case 35671:return av;case 35668:case 35672:return lv;case 35669:case 35673:return cv;case 5125:return uv;case 36294:return hv;case 36295:return fv;case 36296:return dv;case 35678:case 36198:case 36298:case 36306:case 35682:return pv;case 35679:case 36299:case 36307:return mv;case 35680:case 36300:case 36308:case 36293:return gv;case 36289:case 36303:case 36311:case 36292:return _v}}function xv(n,t){n.uniform1fv(this.addr,t)}function Mv(n,t){const e=er(t,this.size,2);n.uniform2fv(this.addr,e)}function Sv(n,t){const e=er(t,this.size,3);n.uniform3fv(this.addr,e)}function yv(n,t){const e=er(t,this.size,4);n.uniform4fv(this.addr,e)}function Ev(n,t){const e=er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Tv(n,t){const e=er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function bv(n,t){const e=er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Av(n,t){n.uniform1iv(this.addr,t)}function wv(n,t){n.uniform2iv(this.addr,t)}function Rv(n,t){n.uniform3iv(this.addr,t)}function Cv(n,t){n.uniform4iv(this.addr,t)}function Pv(n,t){n.uniform1uiv(this.addr,t)}function Lv(n,t){n.uniform2uiv(this.addr,t)}function Dv(n,t){n.uniform3uiv(this.addr,t)}function Iv(n,t){n.uniform4uiv(this.addr,t)}function Uv(n,t,e){const i=this.cache,r=t.length,s=Zs(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Mh,s[a])}function Nv(n,t,e){const i=this.cache,r=t.length,s=Zs(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Eh,s[a])}function Fv(n,t,e){const i=this.cache,r=t.length,s=Zs(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Th,s[a])}function Ov(n,t,e){const i=this.cache,r=t.length,s=Zs(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||yh,s[a])}function Bv(n){switch(n){case 5126:return xv;case 35664:return Mv;case 35665:return Sv;case 35666:return yv;case 35674:return Ev;case 35675:return Tv;case 35676:return bv;case 5124:case 35670:return Av;case 35667:case 35671:return wv;case 35668:case 35672:return Rv;case 35669:case 35673:return Cv;case 5125:return Pv;case 36294:return Lv;case 36295:return Dv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Uv;case 35679:case 36299:case 36307:return Nv;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return Ov}}class zv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=vv(e.type)}}class Hv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bv(e.type)}}class Vv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const zo=/(\w+)(\])?(\[|\.)?/g;function Cc(n,t){n.seq.push(t),n.map[t.id]=t}function Gv(n,t,e){const i=n.name,r=i.length;for(zo.lastIndex=0;;){const s=zo.exec(i),a=zo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Cc(e,c===void 0?new zv(o,n,t):new Hv(o,n,t));break}else{let h=e.map[o];h===void 0&&(h=new Vv(o),Cc(e,h)),e=h}}}class ys{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);Gv(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function Pc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const kv=37297;let Wv=0;function Xv(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function Yv(n){const t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(n);let i;switch(t===e?i="":t===Ps&&e===Cs?i="LinearDisplayP3ToLinearSRGB":t===Cs&&e===Ps&&(i="LinearSRGBToLinearDisplayP3"),n){case $n:case qs:return[i,"LinearTransferOETF"];case Qe:case Ca:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Lc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Xv(n.getShaderSource(t),a)}else return r}function qv(n,t){const e=Yv(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function jv(n,t){let e;switch(t){case Vp:e="Linear";break;case Gp:e="Reinhard";break;case kp:e="OptimizedCineon";break;case Wp:e="ACESFilmic";break;case Yp:e="AgX";break;case qp:e="Neutral";break;case Xp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Zv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function Kv(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $v(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function fr(n){return n!==""}function Dc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ic(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function aa(n){return n.replace(Jv,tx)}const Qv=new Map;function tx(n,t){let e=Ht[t];if(e===void 0){const i=Qv.get(t);if(i!==void 0)e=Ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return aa(e)}const ex=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uc(n){return n.replace(ex,nx)}function nx(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ix(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ju?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===dp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function rx(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ji:case Zi:t="ENVMAP_TYPE_CUBE";break;case Xs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sx(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zi:t="ENVMAP_MODE_REFRACTION";break}return t}function ox(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Zu:t="ENVMAP_BLENDING_MULTIPLY";break;case zp:t="ENVMAP_BLENDING_MIX";break;case Hp:t="ENVMAP_BLENDING_ADD";break}return t}function ax(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function lx(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=ix(e),c=rx(e),u=sx(e),h=ox(e),f=ax(e),m=Zv(e),x=Kv(s),v=r.createProgram();let p,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fr).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fr).join(`
`),d.length>0&&(d+=`
`)):(p=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),d=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==kn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==kn?jv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,qv("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fr).join(`
`)),a=aa(a),a=Dc(a,e),a=Ic(a,e),o=aa(o),o=Dc(o,e),o=Ic(o,e),a=Uc(a),o=Uc(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=b+p+a,A=b+d+o,U=Pc(r,r.VERTEX_SHADER,S),C=Pc(r,r.FRAGMENT_SHADER,A);r.attachShader(v,U),r.attachShader(v,C),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function R(G){if(n.debug.checkShaderErrors){const $=r.getProgramInfoLog(v).trim(),N=r.getShaderInfoLog(U).trim(),et=r.getShaderInfoLog(C).trim();let tt=!0,at=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(tt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,U,C);else{const nt=Lc(r,U,"vertex"),k=Lc(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+$+`
`+nt+`
`+k)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(N===""||et==="")&&(at=!1);at&&(G.diagnostics={runnable:tt,programLog:$,vertexShader:{log:N,prefix:p},fragmentShader:{log:et,prefix:d}})}r.deleteShader(U),r.deleteShader(C),I=new ys(r,v),T=$v(r,v)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,kv)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=U,this.fragmentShader=C,this}let cx=0;class ux{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new hx(t),e.set(t,i)),i}}class hx{constructor(t){this.id=cx++,this.code=t,this.usedTimes=0}}function fx(n,t,e,i,r,s,a){const o=new uh,l=new ux,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function p(T,M,G,$,N){const et=$.fog,tt=N.geometry,at=T.isMeshStandardMaterial?$.environment:null,nt=(T.isMeshStandardMaterial?e:t).get(T.envMap||at),k=nt&&nt.mapping===Xs?nt.image.height:null,ct=x[T.type];T.precision!==null&&(m=r.getMaxPrecision(T.precision),m!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",m,"instead."));const ut=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Mt=ut!==void 0?ut.length:0;let At=0;tt.morphAttributes.position!==void 0&&(At=1),tt.morphAttributes.normal!==void 0&&(At=2),tt.morphAttributes.color!==void 0&&(At=3);let qt,J,ht,vt;if(ct){const jt=en[ct];qt=jt.vertexShader,J=jt.fragmentShader}else qt=T.vertexShader,J=T.fragmentShader,l.update(T),ht=l.getVertexShaderID(T),vt=l.getFragmentShaderID(T);const dt=n.getRenderTarget(),Ut=N.isInstancedMesh===!0,Nt=N.isBatchedMesh===!0,z=!!T.map,Zt=!!T.matcap,Tt=!!nt,w=!!T.aoMap,P=!!T.lightMap,V=!!T.bumpMap,j=!!T.normalMap,Z=!!T.displacementMap,rt=!!T.emissiveMap,y=!!T.metalnessMap,g=!!T.roughnessMap,L=T.anisotropy>0,D=T.clearcoat>0,H=T.dispersion>0,X=T.iridescence>0,st=T.sheen>0,Q=T.transmission>0,it=L&&!!T.anisotropyMap,gt=D&&!!T.clearcoatMap,ot=D&&!!T.clearcoatNormalMap,mt=D&&!!T.clearcoatRoughnessMap,wt=X&&!!T.iridescenceMap,yt=X&&!!T.iridescenceThicknessMap,xt=st&&!!T.sheenColorMap,Ct=st&&!!T.sheenRoughnessMap,Ft=!!T.specularMap,Lt=!!T.specularColorMap,bt=!!T.specularIntensityMap,_=Q&&!!T.transmissionMap,O=Q&&!!T.thicknessMap,W=!!T.gradientMap,lt=!!T.alphaMap,ft=T.alphaTest>0,Ot=!!T.alphaHash,kt=!!T.extensions;let ie=kn;T.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(ie=n.toneMapping);const pe={shaderID:ct,shaderType:T.type,shaderName:T.name,vertexShader:qt,fragmentShader:J,defines:T.defines,customVertexShaderID:ht,customFragmentShaderID:vt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:m,batching:Nt,instancing:Ut,instancingColor:Ut&&N.instanceColor!==null,instancingMorph:Ut&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:dt===null?n.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:$n,alphaToCoverage:!!T.alphaToCoverage,map:z,matcap:Zt,envMap:Tt,envMapMode:Tt&&nt.mapping,envMapCubeUVHeight:k,aoMap:w,lightMap:P,bumpMap:V,normalMap:j,displacementMap:f&&Z,emissiveMap:rt,normalMapObjectSpace:j&&T.normalMapType===om,normalMapTangentSpace:j&&T.normalMapType===sh,metalnessMap:y,roughnessMap:g,anisotropy:L,anisotropyMap:it,clearcoat:D,clearcoatMap:gt,clearcoatNormalMap:ot,clearcoatRoughnessMap:mt,dispersion:H,iridescence:X,iridescenceMap:wt,iridescenceThicknessMap:yt,sheen:st,sheenColorMap:xt,sheenRoughnessMap:Ct,specularMap:Ft,specularColorMap:Lt,specularIntensityMap:bt,transmission:Q,transmissionMap:_,thicknessMap:O,gradientMap:W,opaque:T.transparent===!1&&T.blending===ki&&T.alphaToCoverage===!1,alphaMap:lt,alphaTest:ft,alphaHash:Ot,combine:T.combine,mapUv:z&&v(T.map.channel),aoMapUv:w&&v(T.aoMap.channel),lightMapUv:P&&v(T.lightMap.channel),bumpMapUv:V&&v(T.bumpMap.channel),normalMapUv:j&&v(T.normalMap.channel),displacementMapUv:Z&&v(T.displacementMap.channel),emissiveMapUv:rt&&v(T.emissiveMap.channel),metalnessMapUv:y&&v(T.metalnessMap.channel),roughnessMapUv:g&&v(T.roughnessMap.channel),anisotropyMapUv:it&&v(T.anisotropyMap.channel),clearcoatMapUv:gt&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:ot&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(T.sheenRoughnessMap.channel),specularMapUv:Ft&&v(T.specularMap.channel),specularColorMapUv:Lt&&v(T.specularColorMap.channel),specularIntensityMapUv:bt&&v(T.specularIntensityMap.channel),transmissionMapUv:_&&v(T.transmissionMap.channel),thicknessMapUv:O&&v(T.thicknessMap.channel),alphaMapUv:lt&&v(T.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(j||L),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!tt.attributes.uv&&(z||lt),fog:!!et,useFog:T.fog===!0,fogExp2:!!et&&et.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:N.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:At,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:ie,useLegacyLights:n._useLegacyLights,decodeVideoTexture:z&&T.map.isVideoTexture===!0&&Jt.getTransfer(T.map.colorSpace)===te,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===xn,flipSided:T.side===Pe,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:kt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:kt&&T.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return pe.vertexUv1s=c.has(1),pe.vertexUv2s=c.has(2),pe.vertexUv3s=c.has(3),c.clear(),pe}function d(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const G in T.defines)M.push(G),M.push(T.defines[G]);return T.isRawShaderMaterial===!1&&(b(M,T),S(M,T),M.push(n.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function b(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function S(T,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),T.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.alphaToCoverage&&o.enable(20),T.push(o.mask)}function A(T){const M=x[T.type];let G;if(M){const $=en[M];G=Km.clone($.uniforms)}else G=T.uniforms;return G}function U(T,M){let G;for(let $=0,N=u.length;$<N;$++){const et=u[$];if(et.cacheKey===M){G=et,++G.usedTimes;break}}return G===void 0&&(G=new lx(n,M,T,s),u.push(G)),G}function C(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function R(T){l.remove(T)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:A,acquireProgram:U,releaseProgram:C,releaseShaderCache:R,programs:u,dispose:I}}function dx(){let n=new WeakMap;function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function e(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:r}}function px(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Fc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Oc(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(h,f,m,x,v,p){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:m,groupOrder:x,renderOrder:h.renderOrder,z:v,group:p},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=m,d.groupOrder=x,d.renderOrder=h.renderOrder,d.z=v,d.group=p),t++,d}function o(h,f,m,x,v,p){const d=a(h,f,m,x,v,p);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):e.push(d)}function l(h,f,m,x,v,p){const d=a(h,f,m,x,v,p);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||px),i.length>1&&i.sort(f||Fc),r.length>1&&r.sort(f||Fc)}function u(){for(let h=t,f=n.length;h<f;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function mx(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new Oc,n.set(i,[a])):r>=s.length?(a=new Oc,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function gx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Xt};break;case"SpotLight":e={position:new F,direction:new F,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function _x(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let vx=0;function xx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Mx(n){const t=new gx,e=_x(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new se,a=new se;function o(c,u){let h=0,f=0,m=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let x=0,v=0,p=0,d=0,b=0,S=0,A=0,U=0,C=0,R=0,I=0;c.sort(xx);const T=u===!0?Math.PI:1;for(let G=0,$=c.length;G<$;G++){const N=c[G],et=N.color,tt=N.intensity,at=N.distance,nt=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=et.r*tt*T,f+=et.g*tt*T,m+=et.b*tt*T;else if(N.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(N.sh.coefficients[k],tt);I++}else if(N.isDirectionalLight){const k=t.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity*T),N.castShadow){const ct=N.shadow,ut=e.get(N);ut.shadowBias=ct.bias,ut.shadowNormalBias=ct.normalBias,ut.shadowRadius=ct.radius,ut.shadowMapSize=ct.mapSize,i.directionalShadow[x]=ut,i.directionalShadowMap[x]=nt,i.directionalShadowMatrix[x]=N.shadow.matrix,S++}i.directional[x]=k,x++}else if(N.isSpotLight){const k=t.get(N);k.position.setFromMatrixPosition(N.matrixWorld),k.color.copy(et).multiplyScalar(tt*T),k.distance=at,k.coneCos=Math.cos(N.angle),k.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),k.decay=N.decay,i.spot[p]=k;const ct=N.shadow;if(N.map&&(i.spotLightMap[C]=N.map,C++,ct.updateMatrices(N),N.castShadow&&R++),i.spotLightMatrix[p]=ct.matrix,N.castShadow){const ut=e.get(N);ut.shadowBias=ct.bias,ut.shadowNormalBias=ct.normalBias,ut.shadowRadius=ct.radius,ut.shadowMapSize=ct.mapSize,i.spotShadow[p]=ut,i.spotShadowMap[p]=nt,U++}p++}else if(N.isRectAreaLight){const k=t.get(N);k.color.copy(et).multiplyScalar(tt),k.halfWidth.set(N.width*.5,0,0),k.halfHeight.set(0,N.height*.5,0),i.rectArea[d]=k,d++}else if(N.isPointLight){const k=t.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity*T),k.distance=N.distance,k.decay=N.decay,N.castShadow){const ct=N.shadow,ut=e.get(N);ut.shadowBias=ct.bias,ut.shadowNormalBias=ct.normalBias,ut.shadowRadius=ct.radius,ut.shadowMapSize=ct.mapSize,ut.shadowCameraNear=ct.camera.near,ut.shadowCameraFar=ct.camera.far,i.pointShadow[v]=ut,i.pointShadowMap[v]=nt,i.pointShadowMatrix[v]=N.shadow.matrix,A++}i.point[v]=k,v++}else if(N.isHemisphereLight){const k=t.get(N);k.skyColor.copy(N.color).multiplyScalar(tt*T),k.groundColor.copy(N.groundColor).multiplyScalar(tt*T),i.hemi[b]=k,b++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=m;const M=i.hash;(M.directionalLength!==x||M.pointLength!==v||M.spotLength!==p||M.rectAreaLength!==d||M.hemiLength!==b||M.numDirectionalShadows!==S||M.numPointShadows!==A||M.numSpotShadows!==U||M.numSpotMaps!==C||M.numLightProbes!==I)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=d,i.point.length=v,i.hemi.length=b,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=U,i.spotShadowMap.length=U,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=U+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=I,M.directionalLength=x,M.pointLength=v,M.spotLength=p,M.rectAreaLength=d,M.hemiLength=b,M.numDirectionalShadows=S,M.numPointShadows=A,M.numSpotShadows=U,M.numSpotMaps=C,M.numLightProbes=I,i.version=vx++)}function l(c,u){let h=0,f=0,m=0,x=0,v=0;const p=u.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){const S=c[d];if(S.isDirectionalLight){const A=i.directional[h];A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),h++}else if(S.isSpotLight){const A=i.spot[m];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const A=i.rectArea[x];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),a.identity(),s.copy(S.matrixWorld),s.premultiply(p),a.extractRotation(s),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const A=i.point[f];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const A=i.hemi[v];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function Bc(n){const t=new Mx(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function a(u){i.push(u)}function o(u){t.setup(e,u)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Sx(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Bc(n),t.set(r,[o])):s>=a.length?(o=new Bc(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class bh extends tr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class yx extends tr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ex=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function bx(n,t,e){let i=new Ia;const r=new Pt,s=new Pt,a=new ge,o=new bh({depthPacking:rh}),l=new yx,c={},u=e.maxTextureSize,h={[Xn]:Pe,[Pe]:Xn,[xn]:xn},f=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:Ex,fragmentShader:Tx}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const x=new cn;x.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ke(x,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ju;let d=this.type;this.render=function(C,R,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const T=n.getRenderTarget(),M=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),$=n.state;$.setBlending(Gn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const N=d!==_n&&this.type===_n,et=d===_n&&this.type!==_n;for(let tt=0,at=C.length;tt<at;tt++){const nt=C[tt],k=nt.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const ct=k.getFrameExtents();if(r.multiply(ct),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ct.x),r.x=s.x*ct.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ct.y),r.y=s.y*ct.y,k.mapSize.y=s.y)),k.map===null||N===!0||et===!0){const Mt=this.type!==_n?{minFilter:ke,magFilter:ke}:{};k.map!==null&&k.map.dispose(),k.map=new _i(r.x,r.y,Mt),k.map.texture.name=nt.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const ut=k.getViewportCount();for(let Mt=0;Mt<ut;Mt++){const At=k.getViewport(Mt);a.set(s.x*At.x,s.y*At.y,s.x*At.z,s.y*At.w),$.viewport(a),k.updateMatrices(nt,Mt),i=k.getFrustum(),A(R,I,k.camera,nt,this.type)}k.isPointLightShadow!==!0&&this.type===_n&&b(k,I),k.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(T,M,G)};function b(C,R){const I=t.update(v);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new _i(r.x,r.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(R,null,I,f,v,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(R,null,I,m,v,null)}function S(C,R,I,T){let M=null;const G=I.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(G!==void 0)M=G;else if(M=I.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const $=M.uuid,N=R.uuid;let et=c[$];et===void 0&&(et={},c[$]=et);let tt=et[N];tt===void 0&&(tt=M.clone(),et[N]=tt,R.addEventListener("dispose",U)),M=tt}if(M.visible=R.visible,M.wireframe=R.wireframe,T===_n?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const $=n.properties.get(M);$.light=I}return M}function A(C,R,I,T,M){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===_n)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,C.matrixWorld);const N=t.update(C),et=C.material;if(Array.isArray(et)){const tt=N.groups;for(let at=0,nt=tt.length;at<nt;at++){const k=tt[at],ct=et[k.materialIndex];if(ct&&ct.visible){const ut=S(C,ct,T,M);C.onBeforeShadow(n,C,R,I,N,ut,k),n.renderBufferDirect(I,null,N,ut,C,k),C.onAfterShadow(n,C,R,I,N,ut,k)}}}else if(et.visible){const tt=S(C,et,T,M);C.onBeforeShadow(n,C,R,I,N,tt,null),n.renderBufferDirect(I,null,N,tt,C,null),C.onAfterShadow(n,C,R,I,N,tt,null)}}const $=C.children;for(let N=0,et=$.length;N<et;N++)A($[N],R,I,T,M)}function U(C){C.target.removeEventListener("dispose",U);for(const I in c){const T=c[I],M=C.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}function Ax(n){function t(){let _=!1;const O=new ge;let W=null;const lt=new ge(0,0,0,0);return{setMask:function(ft){W!==ft&&!_&&(n.colorMask(ft,ft,ft,ft),W=ft)},setLocked:function(ft){_=ft},setClear:function(ft,Ot,kt,ie,pe){pe===!0&&(ft*=ie,Ot*=ie,kt*=ie),O.set(ft,Ot,kt,ie),lt.equals(O)===!1&&(n.clearColor(ft,Ot,kt,ie),lt.copy(O))},reset:function(){_=!1,W=null,lt.set(-1,0,0,0)}}}function e(){let _=!1,O=null,W=null,lt=null;return{setTest:function(ft){ft?vt(n.DEPTH_TEST):dt(n.DEPTH_TEST)},setMask:function(ft){O!==ft&&!_&&(n.depthMask(ft),O=ft)},setFunc:function(ft){if(W!==ft){switch(ft){case Dp:n.depthFunc(n.NEVER);break;case Ip:n.depthFunc(n.ALWAYS);break;case Up:n.depthFunc(n.LESS);break;case ws:n.depthFunc(n.LEQUAL);break;case Np:n.depthFunc(n.EQUAL);break;case Fp:n.depthFunc(n.GEQUAL);break;case Op:n.depthFunc(n.GREATER);break;case Bp:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}W=ft}},setLocked:function(ft){_=ft},setClear:function(ft){lt!==ft&&(n.clearDepth(ft),lt=ft)},reset:function(){_=!1,O=null,W=null,lt=null}}}function i(){let _=!1,O=null,W=null,lt=null,ft=null,Ot=null,kt=null,ie=null,pe=null;return{setTest:function(jt){_||(jt?vt(n.STENCIL_TEST):dt(n.STENCIL_TEST))},setMask:function(jt){O!==jt&&!_&&(n.stencilMask(jt),O=jt)},setFunc:function(jt,ae,Qt){(W!==jt||lt!==ae||ft!==Qt)&&(n.stencilFunc(jt,ae,Qt),W=jt,lt=ae,ft=Qt)},setOp:function(jt,ae,Qt){(Ot!==jt||kt!==ae||ie!==Qt)&&(n.stencilOp(jt,ae,Qt),Ot=jt,kt=ae,ie=Qt)},setLocked:function(jt){_=jt},setClear:function(jt){pe!==jt&&(n.clearStencil(jt),pe=jt)},reset:function(){_=!1,O=null,W=null,lt=null,ft=null,Ot=null,kt=null,ie=null,pe=null}}}const r=new t,s=new e,a=new i,o=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,f=[],m=null,x=!1,v=null,p=null,d=null,b=null,S=null,A=null,U=null,C=new Xt(0,0,0),R=0,I=!1,T=null,M=null,G=null,$=null,N=null;const et=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let tt=!1,at=0;const nt=n.getParameter(n.VERSION);nt.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(nt)[1]),tt=at>=1):nt.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),tt=at>=2);let k=null,ct={};const ut=n.getParameter(n.SCISSOR_BOX),Mt=n.getParameter(n.VIEWPORT),At=new ge().fromArray(ut),qt=new ge().fromArray(Mt);function J(_,O,W,lt){const ft=new Uint8Array(4),Ot=n.createTexture();n.bindTexture(_,Ot),n.texParameteri(_,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(_,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let kt=0;kt<W;kt++)_===n.TEXTURE_3D||_===n.TEXTURE_2D_ARRAY?n.texImage3D(O,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,ft):n.texImage2D(O+kt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ft);return Ot}const ht={};ht[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),ht[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ht[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),vt(n.DEPTH_TEST),s.setFunc(ws),V(!1),j(vl),vt(n.CULL_FACE),w(Gn);function vt(_){c[_]!==!0&&(n.enable(_),c[_]=!0)}function dt(_){c[_]!==!1&&(n.disable(_),c[_]=!1)}function Ut(_,O){return u[_]!==O?(n.bindFramebuffer(_,O),u[_]=O,_===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=O),_===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=O),!0):!1}function Nt(_,O){let W=f,lt=!1;if(_){W=h.get(O),W===void 0&&(W=[],h.set(O,W));const ft=_.textures;if(W.length!==ft.length||W[0]!==n.COLOR_ATTACHMENT0){for(let Ot=0,kt=ft.length;Ot<kt;Ot++)W[Ot]=n.COLOR_ATTACHMENT0+Ot;W.length=ft.length,lt=!0}}else W[0]!==n.BACK&&(W[0]=n.BACK,lt=!0);lt&&n.drawBuffers(W)}function z(_){return m!==_?(n.useProgram(_),m=_,!0):!1}const Zt={[hi]:n.FUNC_ADD,[mp]:n.FUNC_SUBTRACT,[gp]:n.FUNC_REVERSE_SUBTRACT};Zt[_p]=n.MIN,Zt[vp]=n.MAX;const Tt={[xp]:n.ZERO,[Mp]:n.ONE,[Sp]:n.SRC_COLOR,[ea]:n.SRC_ALPHA,[wp]:n.SRC_ALPHA_SATURATE,[bp]:n.DST_COLOR,[Ep]:n.DST_ALPHA,[yp]:n.ONE_MINUS_SRC_COLOR,[na]:n.ONE_MINUS_SRC_ALPHA,[Ap]:n.ONE_MINUS_DST_COLOR,[Tp]:n.ONE_MINUS_DST_ALPHA,[Rp]:n.CONSTANT_COLOR,[Cp]:n.ONE_MINUS_CONSTANT_COLOR,[Pp]:n.CONSTANT_ALPHA,[Lp]:n.ONE_MINUS_CONSTANT_ALPHA};function w(_,O,W,lt,ft,Ot,kt,ie,pe,jt){if(_===Gn){x===!0&&(dt(n.BLEND),x=!1);return}if(x===!1&&(vt(n.BLEND),x=!0),_!==pp){if(_!==v||jt!==I){if((p!==hi||S!==hi)&&(n.blendEquation(n.FUNC_ADD),p=hi,S=hi),jt)switch(_){case ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFunc(n.ONE,n.ONE);break;case Ml:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",_);break}else switch(_){case ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ml:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",_);break}d=null,b=null,A=null,U=null,C.set(0,0,0),R=0,v=_,I=jt}return}ft=ft||O,Ot=Ot||W,kt=kt||lt,(O!==p||ft!==S)&&(n.blendEquationSeparate(Zt[O],Zt[ft]),p=O,S=ft),(W!==d||lt!==b||Ot!==A||kt!==U)&&(n.blendFuncSeparate(Tt[W],Tt[lt],Tt[Ot],Tt[kt]),d=W,b=lt,A=Ot,U=kt),(ie.equals(C)===!1||pe!==R)&&(n.blendColor(ie.r,ie.g,ie.b,pe),C.copy(ie),R=pe),v=_,I=!1}function P(_,O){_.side===xn?dt(n.CULL_FACE):vt(n.CULL_FACE);let W=_.side===Pe;O&&(W=!W),V(W),_.blending===ki&&_.transparent===!1?w(Gn):w(_.blending,_.blendEquation,_.blendSrc,_.blendDst,_.blendEquationAlpha,_.blendSrcAlpha,_.blendDstAlpha,_.blendColor,_.blendAlpha,_.premultipliedAlpha),s.setFunc(_.depthFunc),s.setTest(_.depthTest),s.setMask(_.depthWrite),r.setMask(_.colorWrite);const lt=_.stencilWrite;a.setTest(lt),lt&&(a.setMask(_.stencilWriteMask),a.setFunc(_.stencilFunc,_.stencilRef,_.stencilFuncMask),a.setOp(_.stencilFail,_.stencilZFail,_.stencilZPass)),rt(_.polygonOffset,_.polygonOffsetFactor,_.polygonOffsetUnits),_.alphaToCoverage===!0?vt(n.SAMPLE_ALPHA_TO_COVERAGE):dt(n.SAMPLE_ALPHA_TO_COVERAGE)}function V(_){T!==_&&(_?n.frontFace(n.CW):n.frontFace(n.CCW),T=_)}function j(_){_!==hp?(vt(n.CULL_FACE),_!==M&&(_===vl?n.cullFace(n.BACK):_===fp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):dt(n.CULL_FACE),M=_}function Z(_){_!==G&&(tt&&n.lineWidth(_),G=_)}function rt(_,O,W){_?(vt(n.POLYGON_OFFSET_FILL),($!==O||N!==W)&&(n.polygonOffset(O,W),$=O,N=W)):dt(n.POLYGON_OFFSET_FILL)}function y(_){_?vt(n.SCISSOR_TEST):dt(n.SCISSOR_TEST)}function g(_){_===void 0&&(_=n.TEXTURE0+et-1),k!==_&&(n.activeTexture(_),k=_)}function L(_,O,W){W===void 0&&(k===null?W=n.TEXTURE0+et-1:W=k);let lt=ct[W];lt===void 0&&(lt={type:void 0,texture:void 0},ct[W]=lt),(lt.type!==_||lt.texture!==O)&&(k!==W&&(n.activeTexture(W),k=W),n.bindTexture(_,O||ht[_]),lt.type=_,lt.texture=O)}function D(){const _=ct[k];_!==void 0&&_.type!==void 0&&(n.bindTexture(_.type,null),_.type=void 0,_.texture=void 0)}function H(){try{n.compressedTexImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function X(){try{n.compressedTexImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function st(){try{n.texSubImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Q(){try{n.texSubImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function it(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function gt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function ot(){try{n.texStorage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function wt(){try{n.texImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function yt(){try{n.texImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function xt(_){At.equals(_)===!1&&(n.scissor(_.x,_.y,_.z,_.w),At.copy(_))}function Ct(_){qt.equals(_)===!1&&(n.viewport(_.x,_.y,_.z,_.w),qt.copy(_))}function Ft(_,O){let W=l.get(O);W===void 0&&(W=new WeakMap,l.set(O,W));let lt=W.get(_);lt===void 0&&(lt=n.getUniformBlockIndex(O,_.name),W.set(_,lt))}function Lt(_,O){const lt=l.get(O).get(_);o.get(O)!==lt&&(n.uniformBlockBinding(O,lt,_.__bindingPointIndex),o.set(O,lt))}function bt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},k=null,ct={},u={},h=new WeakMap,f=[],m=null,x=!1,v=null,p=null,d=null,b=null,S=null,A=null,U=null,C=new Xt(0,0,0),R=0,I=!1,T=null,M=null,G=null,$=null,N=null,At.set(0,0,n.canvas.width,n.canvas.height),qt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:vt,disable:dt,bindFramebuffer:Ut,drawBuffers:Nt,useProgram:z,setBlending:w,setMaterial:P,setFlipSided:V,setCullFace:j,setLineWidth:Z,setPolygonOffset:rt,setScissorTest:y,activeTexture:g,bindTexture:L,unbindTexture:D,compressedTexImage2D:H,compressedTexImage3D:X,texImage2D:wt,texImage3D:yt,updateUBOMapping:Ft,uniformBlockBinding:Lt,texStorage2D:ot,texStorage3D:mt,texSubImage2D:st,texSubImage3D:Q,compressedTexSubImage2D:it,compressedTexSubImage3D:gt,scissor:xt,viewport:Ct,reset:bt}}function wx(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pt,u=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(y,g){return m?new OffscreenCanvas(y,g):Ds("canvas")}function v(y,g,L){let D=1;const H=rt(y);if((H.width>L||H.height>L)&&(D=L/Math.max(H.width,H.height)),D<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const X=Math.floor(D*H.width),st=Math.floor(D*H.height);h===void 0&&(h=x(X,st));const Q=g?x(X,st):h;return Q.width=X,Q.height=st,Q.getContext("2d").drawImage(y,0,0,X,st),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+X+"x"+st+")."),Q}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),y;return y}function p(y){return y.generateMipmaps&&y.minFilter!==ke&&y.minFilter!==je}function d(y){n.generateMipmap(y)}function b(y,g,L,D,H=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let X=g;if(g===n.RED&&(L===n.FLOAT&&(X=n.R32F),L===n.HALF_FLOAT&&(X=n.R16F),L===n.UNSIGNED_BYTE&&(X=n.R8)),g===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.R8UI),L===n.UNSIGNED_SHORT&&(X=n.R16UI),L===n.UNSIGNED_INT&&(X=n.R32UI),L===n.BYTE&&(X=n.R8I),L===n.SHORT&&(X=n.R16I),L===n.INT&&(X=n.R32I)),g===n.RG&&(L===n.FLOAT&&(X=n.RG32F),L===n.HALF_FLOAT&&(X=n.RG16F),L===n.UNSIGNED_BYTE&&(X=n.RG8)),g===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.RG8UI),L===n.UNSIGNED_SHORT&&(X=n.RG16UI),L===n.UNSIGNED_INT&&(X=n.RG32UI),L===n.BYTE&&(X=n.RG8I),L===n.SHORT&&(X=n.RG16I),L===n.INT&&(X=n.RG32I)),g===n.RGB&&L===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),g===n.RGBA){const st=H?Rs:Jt.getTransfer(D);L===n.FLOAT&&(X=n.RGBA32F),L===n.HALF_FLOAT&&(X=n.RGBA16F),L===n.UNSIGNED_BYTE&&(X=st===te?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function S(y,g){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==ke&&y.minFilter!==je?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function A(y){const g=y.target;g.removeEventListener("dispose",A),C(g),g.isVideoTexture&&u.delete(g)}function U(y){const g=y.target;g.removeEventListener("dispose",U),I(g)}function C(y){const g=i.get(y);if(g.__webglInit===void 0)return;const L=y.source,D=f.get(L);if(D){const H=D[g.__cacheKey];H.usedTimes--,H.usedTimes===0&&R(y),Object.keys(D).length===0&&f.delete(L)}i.remove(y)}function R(y){const g=i.get(y);n.deleteTexture(g.__webglTexture);const L=y.source,D=f.get(L);delete D[g.__cacheKey],a.memory.textures--}function I(y){const g=i.get(y);if(y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(g.__webglFramebuffer[D]))for(let H=0;H<g.__webglFramebuffer[D].length;H++)n.deleteFramebuffer(g.__webglFramebuffer[D][H]);else n.deleteFramebuffer(g.__webglFramebuffer[D]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[D])}else{if(Array.isArray(g.__webglFramebuffer))for(let D=0;D<g.__webglFramebuffer.length;D++)n.deleteFramebuffer(g.__webglFramebuffer[D]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let D=0;D<g.__webglColorRenderbuffer.length;D++)g.__webglColorRenderbuffer[D]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[D]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const L=y.textures;for(let D=0,H=L.length;D<H;D++){const X=i.get(L[D]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(L[D])}i.remove(y)}let T=0;function M(){T=0}function G(){const y=T;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),T+=1,y}function $(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function N(y,g){const L=i.get(y);if(y.isVideoTexture&&j(y),y.isRenderTargetTexture===!1&&y.version>0&&L.__version!==y.version){const D=y.image;if(D===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(D.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{At(L,y,g);return}}e.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+g)}function et(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){At(L,y,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+g)}function tt(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){At(L,y,g);return}e.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+g)}function at(y,g){const L=i.get(y);if(y.version>0&&L.__version!==y.version){qt(L,y,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+g)}const nt={[sa]:n.REPEAT,[di]:n.CLAMP_TO_EDGE,[oa]:n.MIRRORED_REPEAT},k={[ke]:n.NEAREST,[jp]:n.NEAREST_MIPMAP_NEAREST,[kr]:n.NEAREST_MIPMAP_LINEAR,[je]:n.LINEAR,[co]:n.LINEAR_MIPMAP_NEAREST,[pi]:n.LINEAR_MIPMAP_LINEAR},ct={[am]:n.NEVER,[dm]:n.ALWAYS,[lm]:n.LESS,[oh]:n.LEQUAL,[cm]:n.EQUAL,[fm]:n.GEQUAL,[um]:n.GREATER,[hm]:n.NOTEQUAL};function ut(y,g){if(g.type===Bn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===je||g.magFilter===co||g.magFilter===kr||g.magFilter===pi||g.minFilter===je||g.minFilter===co||g.minFilter===kr||g.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,nt[g.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,nt[g.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,nt[g.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,k[g.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,k[g.minFilter]),g.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ct[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ke||g.minFilter!==kr&&g.minFilter!==pi||g.type===Bn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const L=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Mt(y,g){let L=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",A));const D=g.source;let H=f.get(D);H===void 0&&(H={},f.set(D,H));const X=$(g);if(X!==y.__cacheKey){H[X]===void 0&&(H[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),H[X].usedTimes++;const st=H[y.__cacheKey];st!==void 0&&(H[y.__cacheKey].usedTimes--,st.usedTimes===0&&R(g)),y.__cacheKey=X,y.__webglTexture=H[X].texture}return L}function At(y,g,L){let D=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(D=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(D=n.TEXTURE_3D);const H=Mt(y,g),X=g.source;e.bindTexture(D,y.__webglTexture,n.TEXTURE0+L);const st=i.get(X);if(X.version!==st.__version||H===!0){e.activeTexture(n.TEXTURE0+L);const Q=Jt.getPrimaries(Jt.workingColorSpace),it=g.colorSpace===On?null:Jt.getPrimaries(g.colorSpace),gt=g.colorSpace===On||Q===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let ot=v(g.image,!1,r.maxTextureSize);ot=Z(g,ot);const mt=s.convert(g.format,g.colorSpace),wt=s.convert(g.type);let yt=b(g.internalFormat,mt,wt,g.colorSpace,g.isVideoTexture);ut(D,g);let xt;const Ct=g.mipmaps,Ft=g.isVideoTexture!==!0,Lt=st.__version===void 0||H===!0,bt=X.dataReady,_=S(g,ot);if(g.isDepthTexture)yt=n.DEPTH_COMPONENT16,g.type===Bn?yt=n.DEPTH_COMPONENT32F:g.type===Ki?yt=n.DEPTH_COMPONENT24:g.type===Dr&&(yt=n.DEPTH24_STENCIL8),Lt&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,yt,ot.width,ot.height):e.texImage2D(n.TEXTURE_2D,0,yt,ot.width,ot.height,0,mt,wt,null));else if(g.isDataTexture)if(Ct.length>0){Ft&&Lt&&e.texStorage2D(n.TEXTURE_2D,_,yt,Ct[0].width,Ct[0].height);for(let O=0,W=Ct.length;O<W;O++)xt=Ct[O],Ft?bt&&e.texSubImage2D(n.TEXTURE_2D,O,0,0,xt.width,xt.height,mt,wt,xt.data):e.texImage2D(n.TEXTURE_2D,O,yt,xt.width,xt.height,0,mt,wt,xt.data);g.generateMipmaps=!1}else Ft?(Lt&&e.texStorage2D(n.TEXTURE_2D,_,yt,ot.width,ot.height),bt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ot.width,ot.height,mt,wt,ot.data)):e.texImage2D(n.TEXTURE_2D,0,yt,ot.width,ot.height,0,mt,wt,ot.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ft&&Lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_,yt,Ct[0].width,Ct[0].height,ot.depth);for(let O=0,W=Ct.length;O<W;O++)xt=Ct[O],g.format!==on?mt!==null?Ft?bt&&e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,O,0,0,0,xt.width,xt.height,ot.depth,mt,xt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,O,yt,xt.width,xt.height,ot.depth,0,xt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?bt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,O,0,0,0,xt.width,xt.height,ot.depth,mt,wt,xt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,O,yt,xt.width,xt.height,ot.depth,0,mt,wt,xt.data)}else{Ft&&Lt&&e.texStorage2D(n.TEXTURE_2D,_,yt,Ct[0].width,Ct[0].height);for(let O=0,W=Ct.length;O<W;O++)xt=Ct[O],g.format!==on?mt!==null?Ft?bt&&e.compressedTexSubImage2D(n.TEXTURE_2D,O,0,0,xt.width,xt.height,mt,xt.data):e.compressedTexImage2D(n.TEXTURE_2D,O,yt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?bt&&e.texSubImage2D(n.TEXTURE_2D,O,0,0,xt.width,xt.height,mt,wt,xt.data):e.texImage2D(n.TEXTURE_2D,O,yt,xt.width,xt.height,0,mt,wt,xt.data)}else if(g.isDataArrayTexture)Ft?(Lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_,yt,ot.width,ot.height,ot.depth),bt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,mt,wt,ot.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,ot.width,ot.height,ot.depth,0,mt,wt,ot.data);else if(g.isData3DTexture)Ft?(Lt&&e.texStorage3D(n.TEXTURE_3D,_,yt,ot.width,ot.height,ot.depth),bt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,mt,wt,ot.data)):e.texImage3D(n.TEXTURE_3D,0,yt,ot.width,ot.height,ot.depth,0,mt,wt,ot.data);else if(g.isFramebufferTexture){if(Lt)if(Ft)e.texStorage2D(n.TEXTURE_2D,_,yt,ot.width,ot.height);else{let O=ot.width,W=ot.height;for(let lt=0;lt<_;lt++)e.texImage2D(n.TEXTURE_2D,lt,yt,O,W,0,mt,wt,null),O>>=1,W>>=1}}else if(Ct.length>0){if(Ft&&Lt){const O=rt(Ct[0]);e.texStorage2D(n.TEXTURE_2D,_,yt,O.width,O.height)}for(let O=0,W=Ct.length;O<W;O++)xt=Ct[O],Ft?bt&&e.texSubImage2D(n.TEXTURE_2D,O,0,0,mt,wt,xt):e.texImage2D(n.TEXTURE_2D,O,yt,mt,wt,xt);g.generateMipmaps=!1}else if(Ft){if(Lt){const O=rt(ot);e.texStorage2D(n.TEXTURE_2D,_,yt,O.width,O.height)}bt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt,wt,ot)}else e.texImage2D(n.TEXTURE_2D,0,yt,mt,wt,ot);p(g)&&d(D),st.__version=X.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function qt(y,g,L){if(g.image.length!==6)return;const D=Mt(y,g),H=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+L);const X=i.get(H);if(H.version!==X.__version||D===!0){e.activeTexture(n.TEXTURE0+L);const st=Jt.getPrimaries(Jt.workingColorSpace),Q=g.colorSpace===On?null:Jt.getPrimaries(g.colorSpace),it=g.colorSpace===On||st===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);const gt=g.isCompressedTexture||g.image[0].isCompressedTexture,ot=g.image[0]&&g.image[0].isDataTexture,mt=[];for(let W=0;W<6;W++)!gt&&!ot?mt[W]=v(g.image[W],!0,r.maxCubemapSize):mt[W]=ot?g.image[W].image:g.image[W],mt[W]=Z(g,mt[W]);const wt=mt[0],yt=s.convert(g.format,g.colorSpace),xt=s.convert(g.type),Ct=b(g.internalFormat,yt,xt,g.colorSpace),Ft=g.isVideoTexture!==!0,Lt=X.__version===void 0||D===!0,bt=H.dataReady;let _=S(g,wt);ut(n.TEXTURE_CUBE_MAP,g);let O;if(gt){Ft&&Lt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_,Ct,wt.width,wt.height);for(let W=0;W<6;W++){O=mt[W].mipmaps;for(let lt=0;lt<O.length;lt++){const ft=O[lt];g.format!==on?yt!==null?Ft?bt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt,0,0,ft.width,ft.height,yt,ft.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt,Ct,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?bt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt,0,0,ft.width,ft.height,yt,xt,ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt,Ct,ft.width,ft.height,0,yt,xt,ft.data)}}}else{if(O=g.mipmaps,Ft&&Lt){O.length>0&&_++;const W=rt(mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_,Ct,W.width,W.height)}for(let W=0;W<6;W++)if(ot){Ft?bt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,mt[W].width,mt[W].height,yt,xt,mt[W].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ct,mt[W].width,mt[W].height,0,yt,xt,mt[W].data);for(let lt=0;lt<O.length;lt++){const Ot=O[lt].image[W].image;Ft?bt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt+1,0,0,Ot.width,Ot.height,yt,xt,Ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt+1,Ct,Ot.width,Ot.height,0,yt,xt,Ot.data)}}else{Ft?bt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,yt,xt,mt[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ct,yt,xt,mt[W]);for(let lt=0;lt<O.length;lt++){const ft=O[lt];Ft?bt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt+1,0,0,yt,xt,ft.image[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,lt+1,Ct,yt,xt,ft.image[W])}}}p(g)&&d(n.TEXTURE_CUBE_MAP),X.__version=H.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function J(y,g,L,D,H,X){const st=s.convert(L.format,L.colorSpace),Q=s.convert(L.type),it=b(L.internalFormat,st,Q,L.colorSpace);if(!i.get(g).__hasExternalTextures){const ot=Math.max(1,g.width>>X),mt=Math.max(1,g.height>>X);H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?e.texImage3D(H,X,it,ot,mt,g.depth,0,st,Q,null):e.texImage2D(H,X,it,ot,mt,0,st,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),V(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,D,H,i.get(L).__webglTexture,0,P(g)):(H===n.TEXTURE_2D||H>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,D,H,i.get(L).__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(y,g,L){if(n.bindRenderbuffer(n.RENDERBUFFER,y),g.depthBuffer&&!g.stencilBuffer){let D=n.DEPTH_COMPONENT24;if(L||V(g)){const H=g.depthTexture;H&&H.isDepthTexture&&(H.type===Bn?D=n.DEPTH_COMPONENT32F:H.type===Ki&&(D=n.DEPTH_COMPONENT24));const X=P(g);V(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,X,D,g.width,g.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,X,D,g.width,g.height)}else n.renderbufferStorage(n.RENDERBUFFER,D,g.width,g.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,y)}else if(g.depthBuffer&&g.stencilBuffer){const D=P(g);L&&V(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,D,n.DEPTH24_STENCIL8,g.width,g.height):V(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,D,n.DEPTH24_STENCIL8,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,y)}else{const D=g.textures;for(let H=0;H<D.length;H++){const X=D[H],st=s.convert(X.format,X.colorSpace),Q=s.convert(X.type),it=b(X.internalFormat,st,Q,X.colorSpace),gt=P(g);L&&V(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,it,g.width,g.height):V(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,it,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,it,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function vt(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),N(g.depthTexture,0);const D=i.get(g.depthTexture).__webglTexture,H=P(g);if(g.depthTexture.format===Wi)V(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,D,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,D,0);else if(g.depthTexture.format===Rr)V(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,D,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,D,0);else throw new Error("Unknown depthTexture format")}function dt(y){const g=i.get(y),L=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");vt(g.__webglFramebuffer,y)}else if(L){g.__webglDepthbuffer=[];for(let D=0;D<6;D++)e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[D]),g.__webglDepthbuffer[D]=n.createRenderbuffer(),ht(g.__webglDepthbuffer[D],y,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer=n.createRenderbuffer(),ht(g.__webglDepthbuffer,y,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(y,g,L){const D=i.get(y);g!==void 0&&J(D.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&dt(y)}function Nt(y){const g=y.texture,L=i.get(y),D=i.get(g);y.addEventListener("dispose",U);const H=y.textures,X=y.isWebGLCubeRenderTarget===!0,st=H.length>1;if(st||(D.__webglTexture===void 0&&(D.__webglTexture=n.createTexture()),D.__version=g.version,a.memory.textures++),X){L.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[Q]=[];for(let it=0;it<g.mipmaps.length;it++)L.__webglFramebuffer[Q][it]=n.createFramebuffer()}else L.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let Q=0;Q<g.mipmaps.length;Q++)L.__webglFramebuffer[Q]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(st)for(let Q=0,it=H.length;Q<it;Q++){const gt=i.get(H[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&V(y)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let Q=0;Q<H.length;Q++){const it=H[Q];L.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[Q]);const gt=s.convert(it.format,it.colorSpace),ot=s.convert(it.type),mt=b(it.internalFormat,gt,ot,it.colorSpace,y.isXRRenderTarget===!0),wt=P(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,wt,mt,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,L.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(L.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture),ut(n.TEXTURE_CUBE_MAP,g);for(let Q=0;Q<6;Q++)if(g.mipmaps&&g.mipmaps.length>0)for(let it=0;it<g.mipmaps.length;it++)J(L.__webglFramebuffer[Q][it],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else J(L.__webglFramebuffer[Q],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(g)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Q=0,it=H.length;Q<it;Q++){const gt=H[Q],ot=i.get(gt);e.bindTexture(n.TEXTURE_2D,ot.__webglTexture),ut(n.TEXTURE_2D,gt),J(L.__webglFramebuffer,y,gt,n.COLOR_ATTACHMENT0+Q,n.TEXTURE_2D,0),p(gt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Q=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,D.__webglTexture),ut(Q,g),g.mipmaps&&g.mipmaps.length>0)for(let it=0;it<g.mipmaps.length;it++)J(L.__webglFramebuffer[it],y,g,n.COLOR_ATTACHMENT0,Q,it);else J(L.__webglFramebuffer,y,g,n.COLOR_ATTACHMENT0,Q,0);p(g)&&d(Q),e.unbindTexture()}y.depthBuffer&&dt(y)}function z(y){const g=y.textures;for(let L=0,D=g.length;L<D;L++){const H=g[L];if(p(H)){const X=y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,st=i.get(H).__webglTexture;e.bindTexture(X,st),d(X),e.unbindTexture()}}}const Zt=[],Tt=[];function w(y){if(y.samples>0){if(V(y)===!1){const g=y.textures,L=y.width,D=y.height;let H=n.COLOR_BUFFER_BIT;const X=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=i.get(y),Q=g.length>1;if(Q)for(let it=0;it<g.length;it++)e.bindFramebuffer(n.FRAMEBUFFER,st.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,st.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let it=0;it<g.length;it++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(H|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(H|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,st.__webglColorRenderbuffer[it]);const gt=i.get(g[it]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,gt,0)}n.blitFramebuffer(0,0,L,D,0,0,L,D,H,n.NEAREST),l===!0&&(Zt.length=0,Tt.length=0,Zt.push(n.COLOR_ATTACHMENT0+it),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Zt.push(X),Tt.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Tt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Zt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let it=0;it<g.length;it++){e.bindFramebuffer(n.FRAMEBUFFER,st.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,st.__webglColorRenderbuffer[it]);const gt=i.get(g[it]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,st.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.TEXTURE_2D,gt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const g=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function P(y){return Math.min(r.maxSamples,y.samples)}function V(y){const g=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function j(y){const g=a.render.frame;u.get(y)!==g&&(u.set(y,g),y.update())}function Z(y,g){const L=y.colorSpace,D=y.format,H=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||L!==$n&&L!==On&&(Jt.getTransfer(L)===te?(D!==on||H!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),g}function rt(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=M,this.setTexture2D=N,this.setTexture2DArray=et,this.setTexture3D=tt,this.setTextureCube=at,this.rebindTextures=Ut,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=w,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=V}function Rx(n,t){function e(i,r=On){let s;const a=Jt.getTransfer(r);if(i===Yn)return n.UNSIGNED_BYTE;if(i===Qu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===th)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$p)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Zp)return n.BYTE;if(i===Kp)return n.SHORT;if(i===$u)return n.UNSIGNED_SHORT;if(i===Ju)return n.INT;if(i===Ki)return n.UNSIGNED_INT;if(i===Bn)return n.FLOAT;if(i===Ys)return n.HALF_FLOAT;if(i===Jp)return n.ALPHA;if(i===Qp)return n.RGB;if(i===on)return n.RGBA;if(i===tm)return n.LUMINANCE;if(i===em)return n.LUMINANCE_ALPHA;if(i===Wi)return n.DEPTH_COMPONENT;if(i===Rr)return n.DEPTH_STENCIL;if(i===nm)return n.RED;if(i===eh)return n.RED_INTEGER;if(i===im)return n.RG;if(i===nh)return n.RG_INTEGER;if(i===ih)return n.RGBA_INTEGER;if(i===uo||i===ho||i===fo||i===po)if(a===te)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===uo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===po)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===uo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===po)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===yl||i===El||i===Tl||i===bl)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===yl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===El)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Tl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===bl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Al||i===wl||i===Rl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Al||i===wl)return a===te?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Rl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Cl||i===Pl||i===Ll||i===Dl||i===Il||i===Ul||i===Nl||i===Fl||i===Ol||i===Bl||i===zl||i===Hl||i===Vl||i===Gl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Cl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Pl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ll)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Dl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Il)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ul)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Nl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Fl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ol)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Bl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===zl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Gl)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===mo||i===kl||i===Wl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===mo)return a===te?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===rm||i===Xl||i===Yl||i===ql)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===mo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Xl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ql)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Cx extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class hs extends he{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Px={type:"move"};class Ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,i),d=this._getHandJoint(c,v);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,x=.005;c.inputState.pinching&&f>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Px)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new hs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Lx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ix{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Le,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const i=e.cameras[0].viewport,r=new jn({vertexShader:Lx,fragmentShader:Dx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ke(new Nr(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Ux extends vi{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,m=null,x=null;const v=new Ix,p=e.getContextAttributes();let d=null,b=null;const S=[],A=[],U=new Pt;let C=null;const R=new Ve;R.layers.enable(1),R.viewport=new ge;const I=new Ve;I.layers.enable(2),I.viewport=new ge;const T=[R,I],M=new Cx;M.layers.enable(1),M.layers.enable(2);let G=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ht=S[J];return ht===void 0&&(ht=new Ho,S[J]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(J){let ht=S[J];return ht===void 0&&(ht=new Ho,S[J]=ht),ht.getGripSpace()},this.getHand=function(J){let ht=S[J];return ht===void 0&&(ht=new Ho,S[J]=ht),ht.getHandSpace()};function N(J){const ht=A.indexOf(J.inputSource);if(ht===-1)return;const vt=S[ht];vt!==void 0&&(vt.update(J.inputSource,J.frame,c||a),vt.dispatchEvent({type:J.type,data:J.inputSource}))}function et(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",et),r.removeEventListener("inputsourceschange",tt);for(let J=0;J<S.length;J++){const ht=A[J];ht!==null&&(A[J]=null,S[J].disconnect(ht))}G=null,$=null,v.reset(),t.setRenderTarget(d),m=null,f=null,h=null,r=null,b=null,qt.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",et),r.addEventListener("inputsourceschange",tt),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(U),r.renderState.layers===void 0){const ht={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,ht),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new _i(m.framebufferWidth,m.framebufferHeight,{format:on,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let ht=null,vt=null,dt=null;p.depth&&(dt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=p.stencil?Rr:Wi,vt=p.stencil?Dr:Ki);const Ut={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(Ut),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new _i(f.textureWidth,f.textureHeight,{format:on,type:Yn,depthTexture:new xh(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),qt.setContext(r),qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function tt(J){for(let ht=0;ht<J.removed.length;ht++){const vt=J.removed[ht],dt=A.indexOf(vt);dt>=0&&(A[dt]=null,S[dt].disconnect(vt))}for(let ht=0;ht<J.added.length;ht++){const vt=J.added[ht];let dt=A.indexOf(vt);if(dt===-1){for(let Nt=0;Nt<S.length;Nt++)if(Nt>=A.length){A.push(vt),dt=Nt;break}else if(A[Nt]===null){A[Nt]=vt,dt=Nt;break}if(dt===-1)break}const Ut=S[dt];Ut&&Ut.connect(vt)}}const at=new F,nt=new F;function k(J,ht,vt){at.setFromMatrixPosition(ht.matrixWorld),nt.setFromMatrixPosition(vt.matrixWorld);const dt=at.distanceTo(nt),Ut=ht.projectionMatrix.elements,Nt=vt.projectionMatrix.elements,z=Ut[14]/(Ut[10]-1),Zt=Ut[14]/(Ut[10]+1),Tt=(Ut[9]+1)/Ut[5],w=(Ut[9]-1)/Ut[5],P=(Ut[8]-1)/Ut[0],V=(Nt[8]+1)/Nt[0],j=z*P,Z=z*V,rt=dt/(-P+V),y=rt*-P;ht.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(y),J.translateZ(rt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const g=z+rt,L=Zt+rt,D=j-y,H=Z+(dt-y),X=Tt*Zt/L*g,st=w*Zt/L*g;J.projectionMatrix.makePerspective(D,H,X,st,g,L),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function ct(J,ht){ht===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ht.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;v.texture!==null&&(J.near=v.depthNear,J.far=v.depthFar),M.near=I.near=R.near=J.near,M.far=I.far=R.far=J.far,(G!==M.near||$!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),G=M.near,$=M.far,R.near=G,R.far=$,I.near=G,I.far=$,R.updateProjectionMatrix(),I.updateProjectionMatrix(),J.updateProjectionMatrix());const ht=J.parent,vt=M.cameras;ct(M,ht);for(let dt=0;dt<vt.length;dt++)ct(vt[dt],ht);vt.length===2?k(M,R,I):M.projectionMatrix.copy(R.projectionMatrix),ut(J,M,ht)};function ut(J,ht,vt){vt===null?J.matrix.copy(ht.matrixWorld):(J.matrix.copy(vt.matrixWorld),J.matrix.invert(),J.matrix.multiply(ht.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ht.projectionMatrix),J.projectionMatrixInverse.copy(ht.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Cr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return v.texture!==null};let Mt=null;function At(J,ht){if(u=ht.getViewerPose(c||a),x=ht,u!==null){const vt=u.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let dt=!1;vt.length!==M.cameras.length&&(M.cameras.length=0,dt=!0);for(let Nt=0;Nt<vt.length;Nt++){const z=vt[Nt];let Zt=null;if(m!==null)Zt=m.getViewport(z);else{const w=h.getViewSubImage(f,z);Zt=w.viewport,Nt===0&&(t.setRenderTargetTextures(b,w.colorTexture,f.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(b))}let Tt=T[Nt];Tt===void 0&&(Tt=new Ve,Tt.layers.enable(Nt),Tt.viewport=new ge,T[Nt]=Tt),Tt.matrix.fromArray(z.transform.matrix),Tt.matrix.decompose(Tt.position,Tt.quaternion,Tt.scale),Tt.projectionMatrix.fromArray(z.projectionMatrix),Tt.projectionMatrixInverse.copy(Tt.projectionMatrix).invert(),Tt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Nt===0&&(M.matrix.copy(Tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),dt===!0&&M.cameras.push(Tt)}const Ut=r.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const Nt=h.getDepthInformation(vt[0]);Nt&&Nt.isValid&&Nt.texture&&v.init(t,Nt,r.renderState)}}for(let vt=0;vt<S.length;vt++){const dt=A[vt],Ut=S[vt];dt!==null&&Ut!==void 0&&Ut.update(dt,ht,c||a)}v.render(t,M),Mt&&Mt(J,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),x=null}const qt=new _h;qt.setAnimationLoop(At),this.setAnimationLoop=function(J){Mt=J},this.dispose=function(){}}}const oi=new ln,Nx=new se;function Fx(n,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,mh(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,b,S,A){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),h(p,d)):d.isMeshPhongMaterial?(s(p,d),u(p,d)):d.isMeshStandardMaterial?(s(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,A)):d.isMeshMatcapMaterial?(s(p,d),x(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),v(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,b,S):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Pe&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Pe&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=t.get(d),S=b.envMap,A=b.envMapRotation;if(S&&(p.envMap.value=S,oi.copy(A),oi.x*=-1,oi.y*=-1,oi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),p.envMapRotation.value.setFromMatrix4(Nx.makeRotationFromEuler(oi)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const U=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*U,e(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,b,S){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=S*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function h(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pe&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,d){d.matcap&&(p.matcap.value=d.matcap)}function v(p,d){const b=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ox(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const A=S.program;i.uniformBlockBinding(b,A)}function c(b,S){let A=r[b.id];A===void 0&&(x(b),A=u(b),r[b.id]=A,b.addEventListener("dispose",p));const U=S.program;i.updateUBOMapping(b,U);const C=t.render.frame;s[b.id]!==C&&(f(b),s[b.id]=C)}function u(b){const S=h();b.__bindingPointIndex=S;const A=n.createBuffer(),U=b.__size,C=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,U,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,A),A}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=r[b.id],A=b.uniforms,U=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let C=0,R=A.length;C<R;C++){const I=Array.isArray(A[C])?A[C]:[A[C]];for(let T=0,M=I.length;T<M;T++){const G=I[T];if(m(G,C,T,U)===!0){const $=G.__offset,N=Array.isArray(G.value)?G.value:[G.value];let et=0;for(let tt=0;tt<N.length;tt++){const at=N[tt],nt=v(at);typeof at=="number"||typeof at=="boolean"?(G.__data[0]=at,n.bufferSubData(n.UNIFORM_BUFFER,$+et,G.__data)):at.isMatrix3?(G.__data[0]=at.elements[0],G.__data[1]=at.elements[1],G.__data[2]=at.elements[2],G.__data[3]=0,G.__data[4]=at.elements[3],G.__data[5]=at.elements[4],G.__data[6]=at.elements[5],G.__data[7]=0,G.__data[8]=at.elements[6],G.__data[9]=at.elements[7],G.__data[10]=at.elements[8],G.__data[11]=0):(at.toArray(G.__data,et),et+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,$,G.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,S,A,U){const C=b.value,R=S+"_"+A;if(U[R]===void 0)return typeof C=="number"||typeof C=="boolean"?U[R]=C:U[R]=C.clone(),!0;{const I=U[R];if(typeof C=="number"||typeof C=="boolean"){if(I!==C)return U[R]=C,!0}else if(I.equals(C)===!1)return I.copy(C),!0}return!1}function x(b){const S=b.uniforms;let A=0;const U=16;for(let R=0,I=S.length;R<I;R++){const T=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,G=T.length;M<G;M++){const $=T[M],N=Array.isArray($.value)?$.value:[$.value];for(let et=0,tt=N.length;et<tt;et++){const at=N[et],nt=v(at),k=A%U;k!==0&&U-k<nt.boundary&&(A+=U-k),$.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=A,A+=nt.storage}}}const C=A%U;return C>0&&(A+=U-C),b.__size=A,b.__cache={},this}function v(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function p(b){const S=b.target;S.removeEventListener("dispose",p);const A=a.indexOf(S.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function d(){for(const b in r)n.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Bx{constructor(t={}){const{canvas:e=Lm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),x=new Int32Array(4);let v=null,p=null;const d=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this._useLegacyLights=!1,this.toneMapping=kn,this.toneMappingExposure=1;const S=this;let A=!1,U=0,C=0,R=null,I=-1,T=null;const M=new ge,G=new ge;let $=null;const N=new Xt(0);let et=0,tt=e.width,at=e.height,nt=1,k=null,ct=null;const ut=new ge(0,0,tt,at),Mt=new ge(0,0,tt,at);let At=!1;const qt=new Ia;let J=!1,ht=!1;const vt=new se,dt=new F,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Nt(){return R===null?nt:1}let z=i;function Zt(E,B){return e.getContext(E,B)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ra}`),e.addEventListener("webglcontextlost",_,!1),e.addEventListener("webglcontextrestored",O,!1),e.addEventListener("webglcontextcreationerror",W,!1),z===null){const B="webgl2";if(z=Zt(B,E),z===null)throw Zt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Tt,w,P,V,j,Z,rt,y,g,L,D,H,X,st,Q,it,gt,ot,mt,wt,yt,xt,Ct,Ft;function Lt(){Tt=new q0(z),Tt.init(),xt=new Rx(z,Tt),w=new V0(z,Tt,t,xt),P=new Ax(z),V=new K0(z),j=new dx,Z=new wx(z,Tt,P,j,w,xt,V),rt=new k0(S),y=new Y0(S),g=new ig(z),Ct=new z0(z,g),L=new j0(z,g,V,Ct),D=new J0(z,L,g,V),mt=new $0(z,w,Z),it=new G0(j),H=new fx(S,rt,y,Tt,w,Ct,it),X=new Fx(S,j),st=new mx,Q=new Sx(Tt),ot=new B0(S,rt,y,P,D,f,l),gt=new bx(S,D,w),Ft=new Ox(z,V,w,P),wt=new H0(z,Tt,V),yt=new Z0(z,Tt,V),V.programs=H.programs,S.capabilities=w,S.extensions=Tt,S.properties=j,S.renderLists=st,S.shadowMap=gt,S.state=P,S.info=V}Lt();const bt=new Ux(S,z);this.xr=bt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=Tt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Tt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(E){E!==void 0&&(nt=E,this.setSize(tt,at,!1))},this.getSize=function(E){return E.set(tt,at)},this.setSize=function(E,B,K=!0){if(bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}tt=E,at=B,e.width=Math.floor(E*nt),e.height=Math.floor(B*nt),K===!0&&(e.style.width=E+"px",e.style.height=B+"px"),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(tt*nt,at*nt).floor()},this.setDrawingBufferSize=function(E,B,K){tt=E,at=B,nt=K,e.width=Math.floor(E*K),e.height=Math.floor(B*K),this.setViewport(0,0,E,B)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(ut)},this.setViewport=function(E,B,K,Y){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,B,K,Y),P.viewport(M.copy(ut).multiplyScalar(nt).round())},this.getScissor=function(E){return E.copy(Mt)},this.setScissor=function(E,B,K,Y){E.isVector4?Mt.set(E.x,E.y,E.z,E.w):Mt.set(E,B,K,Y),P.scissor(G.copy(Mt).multiplyScalar(nt).round())},this.getScissorTest=function(){return At},this.setScissorTest=function(E){P.setScissorTest(At=E)},this.setOpaqueSort=function(E){k=E},this.setTransparentSort=function(E){ct=E},this.getClearColor=function(E){return E.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(E=!0,B=!0,K=!0){let Y=0;if(E){let q=!1;if(R!==null){const _t=R.texture.format;q=_t===ih||_t===nh||_t===eh}if(q){const _t=R.texture.type,St=_t===Yn||_t===Ki||_t===$u||_t===Dr||_t===Qu||_t===th,Et=ot.getClearColor(),Rt=ot.getClearAlpha(),Dt=Et.r,zt=Et.g,Wt=Et.b;St?(m[0]=Dt,m[1]=zt,m[2]=Wt,m[3]=Rt,z.clearBufferuiv(z.COLOR,0,m)):(x[0]=Dt,x[1]=zt,x[2]=Wt,x[3]=Rt,z.clearBufferiv(z.COLOR,0,x))}else Y|=z.COLOR_BUFFER_BIT}B&&(Y|=z.DEPTH_BUFFER_BIT),K&&(Y|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_,!1),e.removeEventListener("webglcontextrestored",O,!1),e.removeEventListener("webglcontextcreationerror",W,!1),st.dispose(),Q.dispose(),j.dispose(),rt.dispose(),y.dispose(),D.dispose(),Ct.dispose(),Ft.dispose(),H.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",jt),bt.removeEventListener("sessionend",ae),Qt.stop()};function _(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const E=V.autoReset,B=gt.enabled,K=gt.autoUpdate,Y=gt.needsUpdate,q=gt.type;Lt(),V.autoReset=E,gt.enabled=B,gt.autoUpdate=K,gt.needsUpdate=Y,gt.type=q}function W(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function lt(E){const B=E.target;B.removeEventListener("dispose",lt),ft(B)}function ft(E){Ot(E),j.remove(E)}function Ot(E){const B=j.get(E).programs;B!==void 0&&(B.forEach(function(K){H.releaseProgram(K)}),E.isShaderMaterial&&H.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,K,Y,q,_t){B===null&&(B=Ut);const St=q.isMesh&&q.matrixWorld.determinant()<0,Et=Ph(E,B,K,Y,q);P.setMaterial(Y,St);let Rt=K.index,Dt=1;if(Y.wireframe===!0){if(Rt=L.getWireframeAttribute(K),Rt===void 0)return;Dt=2}const zt=K.drawRange,Wt=K.attributes.position;let le=zt.start*Dt,xe=(zt.start+zt.count)*Dt;_t!==null&&(le=Math.max(le,_t.start*Dt),xe=Math.min(xe,(_t.start+_t.count)*Dt)),Rt!==null?(le=Math.max(le,0),xe=Math.min(xe,Rt.count)):Wt!=null&&(le=Math.max(le,0),xe=Math.min(xe,Wt.count));const Ne=xe-le;if(Ne<0||Ne===1/0)return;Ct.setup(q,Y,Et,K,Rt);let hn,Kt=wt;if(Rt!==null&&(hn=g.get(Rt),Kt=yt,Kt.setIndex(hn)),q.isMesh)Y.wireframe===!0?(P.setLineWidth(Y.wireframeLinewidth*Nt()),Kt.setMode(z.LINES)):Kt.setMode(z.TRIANGLES);else if(q.isLine){let It=Y.linewidth;It===void 0&&(It=1),P.setLineWidth(It*Nt()),q.isLineSegments?Kt.setMode(z.LINES):q.isLineLoop?Kt.setMode(z.LINE_LOOP):Kt.setMode(z.LINE_STRIP)}else q.isPoints?Kt.setMode(z.POINTS):q.isSprite&&Kt.setMode(z.TRIANGLES);if(q.isBatchedMesh)q._multiDrawInstances!==null?Kt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances):Kt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)Kt.renderInstances(le,Ne,q.count);else if(K.isInstancedBufferGeometry){const It=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ir=Math.min(K.instanceCount,It);Kt.renderInstances(le,Ne,ir)}else Kt.render(le,Ne)};function kt(E,B,K){E.transparent===!0&&E.side===xn&&E.forceSinglePass===!1?(E.side=Pe,E.needsUpdate=!0,Fr(E,B,K),E.side=Xn,E.needsUpdate=!0,Fr(E,B,K),E.side=xn):Fr(E,B,K)}this.compile=function(E,B,K=null){K===null&&(K=E),p=Q.get(K),p.init(B),b.push(p),K.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),E!==K&&E.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),p.setupLights(S._useLegacyLights);const Y=new Set;return E.traverse(function(q){const _t=q.material;if(_t)if(Array.isArray(_t))for(let St=0;St<_t.length;St++){const Et=_t[St];kt(Et,K,q),Y.add(Et)}else kt(_t,K,q),Y.add(_t)}),b.pop(),p=null,Y},this.compileAsync=function(E,B,K=null){const Y=this.compile(E,B,K);return new Promise(q=>{function _t(){if(Y.forEach(function(St){j.get(St).currentProgram.isReady()&&Y.delete(St)}),Y.size===0){q(E);return}setTimeout(_t,10)}Tt.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let ie=null;function pe(E){ie&&ie(E)}function jt(){Qt.stop()}function ae(){Qt.start()}const Qt=new _h;Qt.setAnimationLoop(pe),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(E){ie=E,bt.setAnimationLoop(E),E===null?Qt.stop():Qt.start()},bt.addEventListener("sessionstart",jt),bt.addEventListener("sessionend",ae),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(B),B=bt.getCamera()),E.isScene===!0&&E.onBeforeRender(S,E,B,R),p=Q.get(E,b.length),p.init(B),b.push(p),vt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),qt.setFromProjectionMatrix(vt),ht=this.localClippingEnabled,J=it.init(this.clippingPlanes,ht),v=st.get(E,d.length),v.init(),d.push(v),En(E,B,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(k,ct);const K=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1;K&&ot.addToRenderList(v,E),this.info.render.frame++,J===!0&&it.beginShadows();const Y=p.state.shadowsArray;gt.render(Y,E,B),J===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=v.opaque,_t=v.transmissive;if(p.setupLights(S._useLegacyLights),B.isArrayCamera){const St=B.cameras;if(_t.length>0)for(let Et=0,Rt=St.length;Et<Rt;Et++){const Dt=St[Et];Tn(q,_t,E,Dt)}K&&ot.render(E);for(let Et=0,Rt=St.length;Et<Rt;Et++){const Dt=St[Et];Be(v,E,Dt,Dt.viewport)}}else _t.length>0&&Tn(q,_t,E,B),K&&ot.render(E),Be(v,E,B);R!==null&&(Z.updateMultisampleRenderTarget(R),Z.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(S,E,B),Ct.resetDefaultState(),I=-1,T=null,b.pop(),b.length>0?(p=b[b.length-1],J===!0&&it.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function En(E,B,K,Y){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||qt.intersectsSprite(E)){Y&&dt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(vt);const St=D.update(E),Et=E.material;Et.visible&&v.push(E,St,Et,K,dt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||qt.intersectsObject(E))){const St=D.update(E),Et=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),dt.copy(E.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),dt.copy(St.boundingSphere.center)),dt.applyMatrix4(E.matrixWorld).applyMatrix4(vt)),Array.isArray(Et)){const Rt=St.groups;for(let Dt=0,zt=Rt.length;Dt<zt;Dt++){const Wt=Rt[Dt],le=Et[Wt.materialIndex];le&&le.visible&&v.push(E,St,le,K,dt.z,Wt)}}else Et.visible&&v.push(E,St,Et,K,dt.z,null)}}const _t=E.children;for(let St=0,Et=_t.length;St<Et;St++)En(_t[St],B,K,Y)}function Be(E,B,K,Y){const q=E.opaque,_t=E.transmissive,St=E.transparent;p.setupLightsView(K),J===!0&&it.setGlobalState(S.clippingPlanes,K),Y&&P.viewport(M.copy(Y)),q.length>0&&un(q,B,K),_t.length>0&&un(_t,B,K),St.length>0&&un(St,B,K),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function Tn(E,B,K,Y){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new _i(1,1,{generateMipmaps:!0,type:Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float")?Ys:Yn,minFilter:pi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const _t=p.state.transmissionRenderTarget[Y.id],St=Y.viewport||M;_t.setSize(St.z,St.w);const Et=S.getRenderTarget();S.setRenderTarget(_t),S.getClearColor(N),et=S.getClearAlpha(),et<1&&S.setClearColor(16777215,.5),S.clear();const Rt=S.toneMapping;S.toneMapping=kn;const Dt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),J===!0&&it.setGlobalState(S.clippingPlanes,Y),un(E,K,Y),Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Wt=0,le=B.length;Wt<le;Wt++){const xe=B[Wt],Ne=xe.object,hn=xe.geometry,Kt=xe.material,It=xe.group;if(Kt.side===xn&&Ne.layers.test(Y.layers)){const ir=Kt.side;Kt.side=Pe,Kt.needsUpdate=!0,nr(Ne,K,Y,hn,Kt,It),Kt.side=ir,Kt.needsUpdate=!0,zt=!0}}zt===!0&&(Z.updateMultisampleRenderTarget(_t),Z.updateRenderTargetMipmap(_t))}S.setRenderTarget(Et),S.setClearColor(N,et),Dt!==void 0&&(Y.viewport=Dt),S.toneMapping=Rt}function un(E,B,K){const Y=B.isScene===!0?B.overrideMaterial:null;for(let q=0,_t=E.length;q<_t;q++){const St=E[q],Et=St.object,Rt=St.geometry,Dt=Y===null?St.material:Y,zt=St.group;Et.layers.test(K.layers)&&nr(Et,B,K,Rt,Dt,zt)}}function nr(E,B,K,Y,q,_t){E.onBeforeRender(S,B,K,Y,q,_t),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),q.onBeforeRender(S,B,K,Y,E,_t),q.transparent===!0&&q.side===xn&&q.forceSinglePass===!1?(q.side=Pe,q.needsUpdate=!0,S.renderBufferDirect(K,B,Y,q,E,_t),q.side=Xn,q.needsUpdate=!0,S.renderBufferDirect(K,B,Y,q,E,_t),q.side=xn):S.renderBufferDirect(K,B,Y,q,E,_t),E.onAfterRender(S,B,K,Y,q,_t)}function Fr(E,B,K){B.isScene!==!0&&(B=Ut);const Y=j.get(E),q=p.state.lights,_t=p.state.shadowsArray,St=q.state.version,Et=H.getParameters(E,q.state,_t,B,K),Rt=H.getProgramCacheKey(Et);let Dt=Y.programs;Y.environment=E.isMeshStandardMaterial?B.environment:null,Y.fog=B.fog,Y.envMap=(E.isMeshStandardMaterial?y:rt).get(E.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Dt===void 0&&(E.addEventListener("dispose",lt),Dt=new Map,Y.programs=Dt);let zt=Dt.get(Rt);if(zt!==void 0){if(Y.currentProgram===zt&&Y.lightsStateVersion===St)return Ba(E,Et),zt}else Et.uniforms=H.getUniforms(E),E.onBuild(K,Et,S),E.onBeforeCompile(Et,S),zt=H.acquireProgram(Et,Rt),Dt.set(Rt,zt),Y.uniforms=Et.uniforms;const Wt=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Wt.clippingPlanes=it.uniform),Ba(E,Et),Y.needsLights=Dh(E),Y.lightsStateVersion=St,Y.needsLights&&(Wt.ambientLightColor.value=q.state.ambient,Wt.lightProbe.value=q.state.probe,Wt.directionalLights.value=q.state.directional,Wt.directionalLightShadows.value=q.state.directionalShadow,Wt.spotLights.value=q.state.spot,Wt.spotLightShadows.value=q.state.spotShadow,Wt.rectAreaLights.value=q.state.rectArea,Wt.ltc_1.value=q.state.rectAreaLTC1,Wt.ltc_2.value=q.state.rectAreaLTC2,Wt.pointLights.value=q.state.point,Wt.pointLightShadows.value=q.state.pointShadow,Wt.hemisphereLights.value=q.state.hemi,Wt.directionalShadowMap.value=q.state.directionalShadowMap,Wt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Wt.spotShadowMap.value=q.state.spotShadowMap,Wt.spotLightMatrix.value=q.state.spotLightMatrix,Wt.spotLightMap.value=q.state.spotLightMap,Wt.pointShadowMap.value=q.state.pointShadowMap,Wt.pointShadowMatrix.value=q.state.pointShadowMatrix),Y.currentProgram=zt,Y.uniformsList=null,zt}function Oa(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=ys.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function Ba(E,B){const K=j.get(E);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function Ph(E,B,K,Y,q){B.isScene!==!0&&(B=Ut),Z.resetTextureUnits();const _t=B.fog,St=Y.isMeshStandardMaterial?B.environment:null,Et=R===null?S.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:$n,Rt=(Y.isMeshStandardMaterial?y:rt).get(Y.envMap||St),Dt=Y.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,zt=!!K.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Wt=!!K.morphAttributes.position,le=!!K.morphAttributes.normal,xe=!!K.morphAttributes.color;let Ne=kn;Y.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ne=S.toneMapping);const hn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Kt=hn!==void 0?hn.length:0,It=j.get(Y),ir=p.state.lights;if(J===!0&&(ht===!0||E!==T)){const ze=E===T&&Y.id===I;it.setState(Y,E,ze)}let ee=!1;Y.version===It.__version?(It.needsLights&&It.lightsStateVersion!==ir.state.version||It.outputColorSpace!==Et||q.isBatchedMesh&&It.batching===!1||!q.isBatchedMesh&&It.batching===!0||q.isInstancedMesh&&It.instancing===!1||!q.isInstancedMesh&&It.instancing===!0||q.isSkinnedMesh&&It.skinning===!1||!q.isSkinnedMesh&&It.skinning===!0||q.isInstancedMesh&&It.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&It.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&It.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&It.instancingMorph===!1&&q.morphTexture!==null||It.envMap!==Rt||Y.fog===!0&&It.fog!==_t||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==it.numPlanes||It.numIntersection!==it.numIntersection)||It.vertexAlphas!==Dt||It.vertexTangents!==zt||It.morphTargets!==Wt||It.morphNormals!==le||It.morphColors!==xe||It.toneMapping!==Ne||It.morphTargetsCount!==Kt)&&(ee=!0):(ee=!0,It.__version=Y.version);let Jn=It.currentProgram;ee===!0&&(Jn=Fr(Y,B,q));let za=!1,rr=!1,Ks=!1;const Me=Jn.getUniforms(),bn=It.uniforms;if(P.useProgram(Jn.program)&&(za=!0,rr=!0,Ks=!0),Y.id!==I&&(I=Y.id,rr=!0),za||T!==E){Me.setValue(z,"projectionMatrix",E.projectionMatrix),Me.setValue(z,"viewMatrix",E.matrixWorldInverse);const ze=Me.map.cameraPosition;ze!==void 0&&ze.setValue(z,dt.setFromMatrixPosition(E.matrixWorld)),w.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Me.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),T!==E&&(T=E,rr=!0,Ks=!0)}if(q.isSkinnedMesh){Me.setOptional(z,q,"bindMatrix"),Me.setOptional(z,q,"bindMatrixInverse");const ze=q.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),Me.setValue(z,"boneTexture",ze.boneTexture,Z))}q.isBatchedMesh&&(Me.setOptional(z,q,"batchingTexture"),Me.setValue(z,"batchingTexture",q._matricesTexture,Z));const $s=K.morphAttributes;if(($s.position!==void 0||$s.normal!==void 0||$s.color!==void 0)&&mt.update(q,K,Jn),(rr||It.receiveShadow!==q.receiveShadow)&&(It.receiveShadow=q.receiveShadow,Me.setValue(z,"receiveShadow",q.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(bn.envMap.value=Rt,bn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&B.environment!==null&&(bn.envMapIntensity.value=B.environmentIntensity),rr&&(Me.setValue(z,"toneMappingExposure",S.toneMappingExposure),It.needsLights&&Lh(bn,Ks),_t&&Y.fog===!0&&X.refreshFogUniforms(bn,_t),X.refreshMaterialUniforms(bn,Y,nt,at,p.state.transmissionRenderTarget[E.id]),ys.upload(z,Oa(It),bn,Z)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ys.upload(z,Oa(It),bn,Z),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Me.setValue(z,"center",q.center),Me.setValue(z,"modelViewMatrix",q.modelViewMatrix),Me.setValue(z,"normalMatrix",q.normalMatrix),Me.setValue(z,"modelMatrix",q.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const ze=Y.uniformsGroups;for(let Js=0,Ih=ze.length;Js<Ih;Js++){const Ha=ze[Js];Ft.update(Ha,Jn),Ft.bind(Ha,Jn)}}return Jn}function Lh(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function Dh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,B,K){j.get(E.texture).__webglTexture=B,j.get(E.depthTexture).__webglTexture=K;const Y=j.get(E);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=K===void 0,Y.__autoAllocateDepthBuffer||Tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,B){const K=j.get(E);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,K=0){R=E,U=B,C=K;let Y=!0,q=null,_t=!1,St=!1;if(E){const Rt=j.get(E);Rt.__useDefaultFramebuffer!==void 0?(P.bindFramebuffer(z.FRAMEBUFFER,null),Y=!1):Rt.__webglFramebuffer===void 0?Z.setupRenderTarget(E):Rt.__hasExternalTextures&&Z.rebindTextures(E,j.get(E.texture).__webglTexture,j.get(E.depthTexture).__webglTexture);const Dt=E.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(St=!0);const zt=j.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[B])?q=zt[B][K]:q=zt[B],_t=!0):E.samples>0&&Z.useMultisampledRTT(E)===!1?q=j.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?q=zt[K]:q=zt,M.copy(E.viewport),G.copy(E.scissor),$=E.scissorTest}else M.copy(ut).multiplyScalar(nt).floor(),G.copy(Mt).multiplyScalar(nt).floor(),$=At;if(P.bindFramebuffer(z.FRAMEBUFFER,q)&&Y&&P.drawBuffers(E,q),P.viewport(M),P.scissor(G),P.setScissorTest($),_t){const Rt=j.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Rt.__webglTexture,K)}else if(St){const Rt=j.get(E.texture),Dt=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Rt.__webglTexture,K||0,Dt)}I=-1},this.readRenderTargetPixels=function(E,B,K,Y,q,_t,St){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=j.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et){P.bindFramebuffer(z.FRAMEBUFFER,Et);try{const Rt=E.texture,Dt=Rt.format,zt=Rt.type;if(!w.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-Y&&K>=0&&K<=E.height-q&&z.readPixels(B,K,Y,q,xt.convert(Dt),xt.convert(zt),_t)}finally{const Rt=R!==null?j.get(R).__webglFramebuffer:null;P.bindFramebuffer(z.FRAMEBUFFER,Rt)}}},this.copyFramebufferToTexture=function(E,B,K=0){const Y=Math.pow(2,-K),q=Math.floor(B.image.width*Y),_t=Math.floor(B.image.height*Y);Z.setTexture2D(B,0),z.copyTexSubImage2D(z.TEXTURE_2D,K,0,0,E.x,E.y,q,_t),P.unbindTexture()},this.copyTextureToTexture=function(E,B,K,Y=0){const q=B.image.width,_t=B.image.height,St=xt.convert(K.format),Et=xt.convert(K.type);Z.setTexture2D(K,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,K.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,K.unpackAlignment),B.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Y,E.x,E.y,q,_t,St,Et,B.image.data):B.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Y,E.x,E.y,B.mipmaps[0].width,B.mipmaps[0].height,St,B.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,Y,E.x,E.y,St,Et,B.image),Y===0&&K.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),P.unbindTexture()},this.copyTextureToTexture3D=function(E,B,K,Y,q=0){const _t=E.max.x-E.min.x,St=E.max.y-E.min.y,Et=E.max.z-E.min.z,Rt=xt.convert(Y.format),Dt=xt.convert(Y.type);let zt;if(Y.isData3DTexture)Z.setTexture3D(Y,0),zt=z.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)Z.setTexture2DArray(Y,0),zt=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,Y.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,Y.unpackAlignment);const Wt=z.getParameter(z.UNPACK_ROW_LENGTH),le=z.getParameter(z.UNPACK_IMAGE_HEIGHT),xe=z.getParameter(z.UNPACK_SKIP_PIXELS),Ne=z.getParameter(z.UNPACK_SKIP_ROWS),hn=z.getParameter(z.UNPACK_SKIP_IMAGES),Kt=K.isCompressedTexture?K.mipmaps[q]:K.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,Kt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Kt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,E.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,E.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,E.min.z),K.isDataTexture||K.isData3DTexture?z.texSubImage3D(zt,q,B.x,B.y,B.z,_t,St,Et,Rt,Dt,Kt.data):Y.isCompressedArrayTexture?z.compressedTexSubImage3D(zt,q,B.x,B.y,B.z,_t,St,Et,Rt,Kt.data):z.texSubImage3D(zt,q,B.x,B.y,B.z,_t,St,Et,Rt,Dt,Kt),z.pixelStorei(z.UNPACK_ROW_LENGTH,Wt),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,le),z.pixelStorei(z.UNPACK_SKIP_PIXELS,xe),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ne),z.pixelStorei(z.UNPACK_SKIP_IMAGES,hn),q===0&&Y.generateMipmaps&&z.generateMipmap(zt),P.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?Z.setTextureCube(E,0):E.isData3DTexture?Z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Z.setTexture2DArray(E,0):Z.setTexture2D(E,0),P.unbindTexture()},this.resetState=function(){U=0,C=0,R=null,P.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ca?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===qs?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class zx extends he{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ah extends tr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Is=new F,Us=new F,zc=new se,ur=new La,fs=new js,Vo=new F,Hc=new F;class Hx extends he{constructor(t=new cn,e=new Ah){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)Is.fromBufferAttribute(e,r-1),Us.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Is.distanceTo(Us);t.setAttribute("lineDistance",new De(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fs.copy(i.boundingSphere),fs.applyMatrix4(r),fs.radius+=s,t.ray.intersectsSphere(fs)===!1)return;zc.copy(r).invert(),ur.copy(t.ray).applyMatrix4(zc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=m,p=x-1;v<p;v+=c){const d=u.getX(v),b=u.getX(v+1),S=ds(this,t,ur,l,d,b);S&&e.push(S)}if(this.isLineLoop){const v=u.getX(x-1),p=u.getX(m),d=ds(this,t,ur,l,v,p);d&&e.push(d)}}else{const m=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let v=m,p=x-1;v<p;v+=c){const d=ds(this,t,ur,l,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=ds(this,t,ur,l,x-1,m);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ds(n,t,e,i,r,s){const a=n.geometry.attributes.position;if(Is.fromBufferAttribute(a,r),Us.fromBufferAttribute(a,s),e.distanceSqToSegment(Is,Us,Vo,Hc)>i)return;Vo.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Vo);if(!(l<t.near||l>t.far))return{distance:l,point:Hc.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,object:n}}const Vc=new F,Gc=new F;class Vx extends Hx{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)Vc.fromBufferAttribute(e,r),Gc.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Vc.distanceTo(Gc);t.setAttribute("lineDistance",new De(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Na extends cn{constructor(t=[],e=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:r};const s=[],a=[];o(r),c(i),u(),this.setAttribute("position",new De(s,3)),this.setAttribute("normal",new De(s.slice(),3)),this.setAttribute("uv",new De(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const S=new F,A=new F,U=new F;for(let C=0;C<e.length;C+=3)m(e[C+0],S),m(e[C+1],A),m(e[C+2],U),l(S,A,U,b)}function l(b,S,A,U){const C=U+1,R=[];for(let I=0;I<=C;I++){R[I]=[];const T=b.clone().lerp(A,I/C),M=S.clone().lerp(A,I/C),G=C-I;for(let $=0;$<=G;$++)$===0&&I===C?R[I][$]=T:R[I][$]=T.clone().lerp(M,$/G)}for(let I=0;I<C;I++)for(let T=0;T<2*(C-I)-1;T++){const M=Math.floor(T/2);T%2===0?(f(R[I][M+1]),f(R[I+1][M]),f(R[I][M])):(f(R[I][M+1]),f(R[I+1][M+1]),f(R[I+1][M]))}}function c(b){const S=new F;for(let A=0;A<s.length;A+=3)S.x=s[A+0],S.y=s[A+1],S.z=s[A+2],S.normalize().multiplyScalar(b),s[A+0]=S.x,s[A+1]=S.y,s[A+2]=S.z}function u(){const b=new F;for(let S=0;S<s.length;S+=3){b.x=s[S+0],b.y=s[S+1],b.z=s[S+2];const A=p(b)/2/Math.PI+.5,U=d(b)/Math.PI+.5;a.push(A,1-U)}x(),h()}function h(){for(let b=0;b<a.length;b+=6){const S=a[b+0],A=a[b+2],U=a[b+4],C=Math.max(S,A,U),R=Math.min(S,A,U);C>.9&&R<.1&&(S<.2&&(a[b+0]+=1),A<.2&&(a[b+2]+=1),U<.2&&(a[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function m(b,S){const A=b*3;S.x=t[A+0],S.y=t[A+1],S.z=t[A+2]}function x(){const b=new F,S=new F,A=new F,U=new F,C=new Pt,R=new Pt,I=new Pt;for(let T=0,M=0;T<s.length;T+=9,M+=6){b.set(s[T+0],s[T+1],s[T+2]),S.set(s[T+3],s[T+4],s[T+5]),A.set(s[T+6],s[T+7],s[T+8]),C.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),U.copy(b).add(S).add(A).divideScalar(3);const G=p(U);v(C,M+0,b,G),v(R,M+2,S,G),v(I,M+4,A,G)}}function v(b,S,A,U){U<0&&b.x===1&&(a[S]=b.x-1),A.x===0&&A.z===0&&(a[S]=U/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.vertices,t.indices,t.radius,t.details)}}class Fa extends Na{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Fa(t.radius,t.detail)}}class kc extends tr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sh,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wh extends he{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Go=new se,Wc=new F,Xc=new F;class Gx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Wc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wc),Xc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xc),e.updateMatrixWorld(),Go.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Go),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Go)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class kx extends Gx{constructor(){super(new vh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wx extends wh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(he.DEFAULT_UP),this.updateMatrix(),this.target=new he,this.shadow=new kx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Xx extends wh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}let ps;class Yx{static getContext(){return ps===void 0&&(ps=new(window.AudioContext||window.webkitAudioContext)),ps}static setContext(t){ps=t}}class Rh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Yc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Yc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Yc(){return(typeof performance>"u"?Date:performance).now()}const ai=new F,qc=new qn,qx=new F,li=new F;class jx extends he{constructor(){super(),this.type="AudioListener",this.context=Yx.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Rh}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,i=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(ai,qc,qx),li.set(0,0,-1).applyQuaternion(qc),e.positionX){const r=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(ai.x,r),e.positionY.linearRampToValueAtTime(ai.y,r),e.positionZ.linearRampToValueAtTime(ai.z,r),e.forwardX.linearRampToValueAtTime(li.x,r),e.forwardY.linearRampToValueAtTime(li.y,r),e.forwardZ.linearRampToValueAtTime(li.z,r),e.upX.linearRampToValueAtTime(i.x,r),e.upY.linearRampToValueAtTime(i.y,r),e.upZ.linearRampToValueAtTime(i.z,r)}else e.setPosition(ai.x,ai.y,ai.z),e.setOrientation(li.x,li.y,li.z,i.x,i.y,i.z)}}let Zx=class extends he{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}};class Kx{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let i=0;i<e.length;i++)t+=e[i];return t/e.length}}class jc{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ms=new F,re=new Da;class $x extends Vx{constructor(t){const e=new cn,i=new Ah({color:16777215,vertexColors:!0,toneMapped:!1}),r=[],s=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(x,v){l(x),l(v)}function l(x){r.push(0,0,0),s.push(0,0,0),a[x]===void 0&&(a[x]=[]),a[x].push(r.length/3-1)}e.setAttribute("position",new De(r,3)),e.setAttribute("color",new De(s,3)),super(e,i),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();const c=new Xt(16755200),u=new Xt(16711680),h=new Xt(43775),f=new Xt(16777215),m=new Xt(3355443);this.setColors(c,u,h,f,m)}setColors(t,e,i,r,s){const o=this.geometry.getAttribute("color");o.setXYZ(0,t.r,t.g,t.b),o.setXYZ(1,t.r,t.g,t.b),o.setXYZ(2,t.r,t.g,t.b),o.setXYZ(3,t.r,t.g,t.b),o.setXYZ(4,t.r,t.g,t.b),o.setXYZ(5,t.r,t.g,t.b),o.setXYZ(6,t.r,t.g,t.b),o.setXYZ(7,t.r,t.g,t.b),o.setXYZ(8,t.r,t.g,t.b),o.setXYZ(9,t.r,t.g,t.b),o.setXYZ(10,t.r,t.g,t.b),o.setXYZ(11,t.r,t.g,t.b),o.setXYZ(12,t.r,t.g,t.b),o.setXYZ(13,t.r,t.g,t.b),o.setXYZ(14,t.r,t.g,t.b),o.setXYZ(15,t.r,t.g,t.b),o.setXYZ(16,t.r,t.g,t.b),o.setXYZ(17,t.r,t.g,t.b),o.setXYZ(18,t.r,t.g,t.b),o.setXYZ(19,t.r,t.g,t.b),o.setXYZ(20,t.r,t.g,t.b),o.setXYZ(21,t.r,t.g,t.b),o.setXYZ(22,t.r,t.g,t.b),o.setXYZ(23,t.r,t.g,t.b),o.setXYZ(24,e.r,e.g,e.b),o.setXYZ(25,e.r,e.g,e.b),o.setXYZ(26,e.r,e.g,e.b),o.setXYZ(27,e.r,e.g,e.b),o.setXYZ(28,e.r,e.g,e.b),o.setXYZ(29,e.r,e.g,e.b),o.setXYZ(30,e.r,e.g,e.b),o.setXYZ(31,e.r,e.g,e.b),o.setXYZ(32,i.r,i.g,i.b),o.setXYZ(33,i.r,i.g,i.b),o.setXYZ(34,i.r,i.g,i.b),o.setXYZ(35,i.r,i.g,i.b),o.setXYZ(36,i.r,i.g,i.b),o.setXYZ(37,i.r,i.g,i.b),o.setXYZ(38,r.r,r.g,r.b),o.setXYZ(39,r.r,r.g,r.b),o.setXYZ(40,s.r,s.g,s.b),o.setXYZ(41,s.r,s.g,s.b),o.setXYZ(42,s.r,s.g,s.b),o.setXYZ(43,s.r,s.g,s.b),o.setXYZ(44,s.r,s.g,s.b),o.setXYZ(45,s.r,s.g,s.b),o.setXYZ(46,s.r,s.g,s.b),o.setXYZ(47,s.r,s.g,s.b),o.setXYZ(48,s.r,s.g,s.b),o.setXYZ(49,s.r,s.g,s.b),o.needsUpdate=!0}update(){const t=this.geometry,e=this.pointMap,i=1,r=1;re.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),oe("c",e,t,re,0,0,-1),oe("t",e,t,re,0,0,1),oe("n1",e,t,re,-i,-r,-1),oe("n2",e,t,re,i,-r,-1),oe("n3",e,t,re,-i,r,-1),oe("n4",e,t,re,i,r,-1),oe("f1",e,t,re,-i,-r,1),oe("f2",e,t,re,i,-r,1),oe("f3",e,t,re,-i,r,1),oe("f4",e,t,re,i,r,1),oe("u1",e,t,re,i*.7,r*1.1,-1),oe("u2",e,t,re,-i*.7,r*1.1,-1),oe("u3",e,t,re,0,r*2,-1),oe("cf1",e,t,re,-i,0,1),oe("cf2",e,t,re,i,0,1),oe("cf3",e,t,re,0,-r,1),oe("cf4",e,t,re,0,r,1),oe("cn1",e,t,re,-i,0,-1),oe("cn2",e,t,re,i,0,-1),oe("cn3",e,t,re,0,-r,-1),oe("cn4",e,t,re,0,r,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function oe(n,t,e,i,r,s,a){ms.set(r,s,a).unproject(i);const o=t[n];if(o!==void 0){const l=e.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],ms.x,ms.y,ms.z)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ra}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ra);const Zc={type:"change"},ko={type:"start"},Kc={type:"end"},gs=new La,$c=new Fn,Jx=Math.cos(70*Pm.DEG2RAD);class Qx extends vi{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xi.ROTATE,MIDDLE:xi.DOLLY,RIGHT:xi.PAN},this.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(_){_.addEventListener("keydown",gt),this._domElementKeyEvents=_},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",gt),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Zc),i.update(),s=r.NONE},this.update=function(){const _=new F,O=new qn().setFromUnitVectors(t.up,new F(0,1,0)),W=O.clone().invert(),lt=new F,ft=new qn,Ot=new F,kt=2*Math.PI;return function(pe=null){const jt=i.object.position;_.copy(jt).sub(i.target),_.applyQuaternion(O),o.setFromVector3(_),i.autoRotate&&s===r.NONE&&$(M(pe)),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let ae=i.minAzimuthAngle,Qt=i.maxAzimuthAngle;isFinite(ae)&&isFinite(Qt)&&(ae<-Math.PI?ae+=kt:ae>Math.PI&&(ae-=kt),Qt<-Math.PI?Qt+=kt:Qt>Math.PI&&(Qt-=kt),ae<=Qt?o.theta=Math.max(ae,Math.min(Qt,o.theta)):o.theta=o.theta>(ae+Qt)/2?Math.max(ae,o.theta):Math.min(Qt,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let En=!1;if(i.zoomToCursor&&C||i.object.isOrthographicCamera)o.radius=ut(o.radius);else{const Be=o.radius;o.radius=ut(o.radius*c),En=Be!=o.radius}if(_.setFromSpherical(o),_.applyQuaternion(W),jt.copy(i.target).add(_),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),i.zoomToCursor&&C){let Be=null;if(i.object.isPerspectiveCamera){const Tn=_.length();Be=ut(Tn*c);const un=Tn-Be;i.object.position.addScaledVector(A,un),i.object.updateMatrixWorld(),En=!!un}else if(i.object.isOrthographicCamera){const Tn=new F(U.x,U.y,0);Tn.unproject(i.object);const un=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),En=un!==i.object.zoom;const nr=new F(U.x,U.y,0);nr.unproject(i.object),i.object.position.sub(nr).add(Tn),i.object.updateMatrixWorld(),Be=_.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Be!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Be).add(i.object.position):(gs.origin.copy(i.object.position),gs.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(gs.direction))<Jx?t.lookAt(i.target):($c.setFromNormalAndCoplanarPoint(i.object.up,i.target),gs.intersectPlane($c,i.target))))}else if(i.object.isOrthographicCamera){const Be=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),Be!==i.object.zoom&&(i.object.updateProjectionMatrix(),En=!0)}return c=1,C=!1,En||lt.distanceToSquared(i.object.position)>a||8*(1-ft.dot(i.object.quaternion))>a||Ot.distanceToSquared(i.target)>a?(i.dispatchEvent(Zc),lt.copy(i.object.position),ft.copy(i.object.quaternion),Ot.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",wt),i.domElement.removeEventListener("pointerdown",y),i.domElement.removeEventListener("pointercancel",L),i.domElement.removeEventListener("wheel",X),i.domElement.removeEventListener("pointermove",g),i.domElement.removeEventListener("pointerup",L),i.domElement.getRootNode().removeEventListener("keydown",Q,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",gt),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new jc,l=new jc;let c=1;const u=new F,h=new Pt,f=new Pt,m=new Pt,x=new Pt,v=new Pt,p=new Pt,d=new Pt,b=new Pt,S=new Pt,A=new F,U=new Pt;let C=!1;const R=[],I={};let T=!1;function M(_){return _!==null?2*Math.PI/60*i.autoRotateSpeed*_:2*Math.PI/60/60*i.autoRotateSpeed}function G(_){const O=Math.abs(_*.01);return Math.pow(.95,i.zoomSpeed*O)}function $(_){l.theta-=_}function N(_){l.phi-=_}const et=function(){const _=new F;return function(W,lt){_.setFromMatrixColumn(lt,0),_.multiplyScalar(-W),u.add(_)}}(),tt=function(){const _=new F;return function(W,lt){i.screenSpacePanning===!0?_.setFromMatrixColumn(lt,1):(_.setFromMatrixColumn(lt,0),_.crossVectors(i.object.up,_)),_.multiplyScalar(W),u.add(_)}}(),at=function(){const _=new F;return function(W,lt){const ft=i.domElement;if(i.object.isPerspectiveCamera){const Ot=i.object.position;_.copy(Ot).sub(i.target);let kt=_.length();kt*=Math.tan(i.object.fov/2*Math.PI/180),et(2*W*kt/ft.clientHeight,i.object.matrix),tt(2*lt*kt/ft.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(et(W*(i.object.right-i.object.left)/i.object.zoom/ft.clientWidth,i.object.matrix),tt(lt*(i.object.top-i.object.bottom)/i.object.zoom/ft.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function nt(_){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=_:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function k(_){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=_:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ct(_,O){if(!i.zoomToCursor)return;C=!0;const W=i.domElement.getBoundingClientRect(),lt=_-W.left,ft=O-W.top,Ot=W.width,kt=W.height;U.x=lt/Ot*2-1,U.y=-(ft/kt)*2+1,A.set(U.x,U.y,1).unproject(i.object).sub(i.object.position).normalize()}function ut(_){return Math.max(i.minDistance,Math.min(i.maxDistance,_))}function Mt(_){h.set(_.clientX,_.clientY)}function At(_){ct(_.clientX,_.clientX),d.set(_.clientX,_.clientY)}function qt(_){x.set(_.clientX,_.clientY)}function J(_){f.set(_.clientX,_.clientY),m.subVectors(f,h).multiplyScalar(i.rotateSpeed);const O=i.domElement;$(2*Math.PI*m.x/O.clientHeight),N(2*Math.PI*m.y/O.clientHeight),h.copy(f),i.update()}function ht(_){b.set(_.clientX,_.clientY),S.subVectors(b,d),S.y>0?nt(G(S.y)):S.y<0&&k(G(S.y)),d.copy(b),i.update()}function vt(_){v.set(_.clientX,_.clientY),p.subVectors(v,x).multiplyScalar(i.panSpeed),at(p.x,p.y),x.copy(v),i.update()}function dt(_){ct(_.clientX,_.clientY),_.deltaY<0?k(G(_.deltaY)):_.deltaY>0&&nt(G(_.deltaY)),i.update()}function Ut(_){let O=!1;switch(_.code){case i.keys.UP:_.ctrlKey||_.metaKey||_.shiftKey?N(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):at(0,i.keyPanSpeed),O=!0;break;case i.keys.BOTTOM:_.ctrlKey||_.metaKey||_.shiftKey?N(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):at(0,-i.keyPanSpeed),O=!0;break;case i.keys.LEFT:_.ctrlKey||_.metaKey||_.shiftKey?$(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):at(i.keyPanSpeed,0),O=!0;break;case i.keys.RIGHT:_.ctrlKey||_.metaKey||_.shiftKey?$(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):at(-i.keyPanSpeed,0),O=!0;break}O&&(_.preventDefault(),i.update())}function Nt(_){if(R.length===1)h.set(_.pageX,_.pageY);else{const O=Lt(_),W=.5*(_.pageX+O.x),lt=.5*(_.pageY+O.y);h.set(W,lt)}}function z(_){if(R.length===1)x.set(_.pageX,_.pageY);else{const O=Lt(_),W=.5*(_.pageX+O.x),lt=.5*(_.pageY+O.y);x.set(W,lt)}}function Zt(_){const O=Lt(_),W=_.pageX-O.x,lt=_.pageY-O.y,ft=Math.sqrt(W*W+lt*lt);d.set(0,ft)}function Tt(_){i.enableZoom&&Zt(_),i.enablePan&&z(_)}function w(_){i.enableZoom&&Zt(_),i.enableRotate&&Nt(_)}function P(_){if(R.length==1)f.set(_.pageX,_.pageY);else{const W=Lt(_),lt=.5*(_.pageX+W.x),ft=.5*(_.pageY+W.y);f.set(lt,ft)}m.subVectors(f,h).multiplyScalar(i.rotateSpeed);const O=i.domElement;$(2*Math.PI*m.x/O.clientHeight),N(2*Math.PI*m.y/O.clientHeight),h.copy(f)}function V(_){if(R.length===1)v.set(_.pageX,_.pageY);else{const O=Lt(_),W=.5*(_.pageX+O.x),lt=.5*(_.pageY+O.y);v.set(W,lt)}p.subVectors(v,x).multiplyScalar(i.panSpeed),at(p.x,p.y),x.copy(v)}function j(_){const O=Lt(_),W=_.pageX-O.x,lt=_.pageY-O.y,ft=Math.sqrt(W*W+lt*lt);b.set(0,ft),S.set(0,Math.pow(b.y/d.y,i.zoomSpeed)),nt(S.y),d.copy(b);const Ot=(_.pageX+O.x)*.5,kt=(_.pageY+O.y)*.5;ct(Ot,kt)}function Z(_){i.enableZoom&&j(_),i.enablePan&&V(_)}function rt(_){i.enableZoom&&j(_),i.enableRotate&&P(_)}function y(_){i.enabled!==!1&&(R.length===0&&(i.domElement.setPointerCapture(_.pointerId),i.domElement.addEventListener("pointermove",g),i.domElement.addEventListener("pointerup",L)),!Ct(_)&&(yt(_),_.pointerType==="touch"?ot(_):D(_)))}function g(_){i.enabled!==!1&&(_.pointerType==="touch"?mt(_):H(_))}function L(_){switch(xt(_),R.length){case 0:i.domElement.releasePointerCapture(_.pointerId),i.domElement.removeEventListener("pointermove",g),i.domElement.removeEventListener("pointerup",L),i.dispatchEvent(Kc),s=r.NONE;break;case 1:const O=R[0],W=I[O];ot({pointerId:O,pageX:W.x,pageY:W.y});break}}function D(_){let O;switch(_.button){case 0:O=i.mouseButtons.LEFT;break;case 1:O=i.mouseButtons.MIDDLE;break;case 2:O=i.mouseButtons.RIGHT;break;default:O=-1}switch(O){case xi.DOLLY:if(i.enableZoom===!1)return;At(_),s=r.DOLLY;break;case xi.ROTATE:if(_.ctrlKey||_.metaKey||_.shiftKey){if(i.enablePan===!1)return;qt(_),s=r.PAN}else{if(i.enableRotate===!1)return;Mt(_),s=r.ROTATE}break;case xi.PAN:if(_.ctrlKey||_.metaKey||_.shiftKey){if(i.enableRotate===!1)return;Mt(_),s=r.ROTATE}else{if(i.enablePan===!1)return;qt(_),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ko)}function H(_){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;J(_);break;case r.DOLLY:if(i.enableZoom===!1)return;ht(_);break;case r.PAN:if(i.enablePan===!1)return;vt(_);break}}function X(_){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(_.preventDefault(),i.dispatchEvent(ko),dt(st(_)),i.dispatchEvent(Kc))}function st(_){const O=_.deltaMode,W={clientX:_.clientX,clientY:_.clientY,deltaY:_.deltaY};switch(O){case 1:W.deltaY*=16;break;case 2:W.deltaY*=100;break}return _.ctrlKey&&!T&&(W.deltaY*=10),W}function Q(_){_.key==="Control"&&(T=!0,i.domElement.getRootNode().addEventListener("keyup",it,{passive:!0,capture:!0}))}function it(_){_.key==="Control"&&(T=!1,i.domElement.getRootNode().removeEventListener("keyup",it,{passive:!0,capture:!0}))}function gt(_){i.enabled===!1||i.enablePan===!1||Ut(_)}function ot(_){switch(Ft(_),R.length){case 1:switch(i.touches.ONE){case Mi.ROTATE:if(i.enableRotate===!1)return;Nt(_),s=r.TOUCH_ROTATE;break;case Mi.PAN:if(i.enablePan===!1)return;z(_),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Mi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Tt(_),s=r.TOUCH_DOLLY_PAN;break;case Mi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;w(_),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ko)}function mt(_){switch(Ft(_),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;P(_),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;V(_),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Z(_),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;rt(_),i.update();break;default:s=r.NONE}}function wt(_){i.enabled!==!1&&_.preventDefault()}function yt(_){R.push(_.pointerId)}function xt(_){delete I[_.pointerId];for(let O=0;O<R.length;O++)if(R[O]==_.pointerId){R.splice(O,1);return}}function Ct(_){for(let O=0;O<R.length;O++)if(R[O]==_.pointerId)return!0;return!1}function Ft(_){let O=I[_.pointerId];O===void 0&&(O=new Pt,I[_.pointerId]=O),O.set(_.pageX,_.pageY)}function Lt(_){const O=_.pointerId===R[0]?R[1]:R[0];return I[O]}i.domElement.addEventListener("contextmenu",wt),i.domElement.addEventListener("pointerdown",y),i.domElement.addEventListener("pointercancel",L),i.domElement.addEventListener("wheel",X,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",Q,{passive:!0,capture:!0}),this.update()}}const tM="/assets/Avicii-WeBurn-DBRLe77l.mp3",eM=n=>(Df("data-v-72dd9096"),n=n(),If(),n),nM=eM(()=>wr("canvas",{class:"webgl"},null,-1)),iM=4096,rM=Au({__name:"index",setup(n){const t=eo(),e=eo(),i=eo();let r,s,a,o;const l=new Rh;let c;const u=()=>{const v=document.querySelector("canvas.webgl");r=new zx,i.value={uTime:{value:0},tAudioData:{value:0},uStrength:{value:0}};const p=new kc;p.roughness=.7;const d=new bh({depthPacking:rh});p.onBeforeCompile=I=>{I.uniforms.uTime=i.value.uTime,I.uniforms.uStrength=i.value.uStrength,I.vertexShader=I.vertexShader.replace("#include <common>",`
            #include <common>
            attribute float aOffset;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uStrength;

            //	Simplex 4D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip)
{
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

  return p;
}

float simplexNoise4d(vec4 v)
{
  const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                        0.309016994374947451); // (sqrt(5) - 1)/4   F4
  // First corner
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;

  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;

  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;

  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

  // Permutations
  i = mod(i, 289.0); 
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
  // Gradients
  // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

}
            
        `),I.vertexShader=I.vertexShader.replace("#include <fog_vertex>",`#include <fog_vertex>
          vec3 newPos = position;
          float strength = uStrength;
          newPos += normal * simplexNoise4d(vec4(position, uTime)) * strength;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);

        `),I.fragmentShader=I.fragmentShader.replace("#include <common>",`#include <common>
        uniform float uTime;
        uniform float uStrength;
      `),I.fragmentShader=I.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
        gl_FragColor = vec4(vNormal, 1.);
      `)},d.onBeforeCompile=I=>{I.uniforms.uTime=i.value.uTime,I.uniforms.uStrength=i.value.uStrength,I.vertexShader=I.vertexShader.replace("#include <common>",`
            #include <common>
            attribute float aOffset;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uStrength;

            //	Simplex 4D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip)
{
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

  return p;
}

float simplexNoise4d(vec4 v)
{
  const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                        0.309016994374947451); // (sqrt(5) - 1)/4   F4
  // First corner
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;

  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;

  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;

  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

  // Permutations
  i = mod(i, 289.0); 
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
  // Gradients
  // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

}
            
        `),I.vertexShader=I.vertexShader.replace("#include <clipping_planes_vertex>",`#include <clipping_planes_vertex>
          vec3 newPos = position;
          float strength = uStrength;
          newPos += normal * simplexNoise4d(vec4(position, uTime)) * strength;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        `),console.log(I.vertexShader)};const b=new Fa(2.5,50);c=new Ke(b,p),c.customDepthMaterial=d,c.castShadow=!0,r.add(c);const S=new Ke(new Nr(25,25),new kc);S.rotation.x=-Math.PI*.5,S.position.y=-5,S.receiveShadow=!0,r.add(S);const A=new Xx(16777215,.3);r.add(A);const U=new Wx("#ffffff",.3);U.castShadow=!0,U.shadow.mapSize.set(1024,1024),U.shadow.camera.far=40,U.castShadow=!0,U.position.set(2,2,-2),r.add(U);const C=new $x(U.shadow.camera);r.add(C);const R={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{R.width=window.innerWidth,R.height=window.innerHeight,s.aspect=R.width/R.height,s.updateProjectionMatrix(),a.setSize(R.width,R.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2))}),s=new Ve(75,R.width/R.height,.1,100),s.position.set(4,4,6),r.add(s),a=new Bx({canvas:v}),a.setSize(R.width,R.height),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setClearColor("#111"),a.shadowMap.enabled=!0,o=new Qx(s,v)},h=()=>{var p;const v=l.getElapsedTime();o==null||o.update(),f(),(p=i.value)!=null&&p.uTime&&(i.value.uTime.value=v),a.render(r,s),window.requestAnimationFrame(h)},f=()=>{var v,p;if((v=e.value)!=null&&v.getFrequencyData){e.value.getFrequencyData();const d=(p=e.value)==null?void 0:p.data;let b=0;for(let S=0;S<d.length;S++)b+=d[S];b/=d.length*25.5,i.value.uStrength.value=b}},m=()=>{const v=new jx,p=new Zx(v);t.value=new Audio(tM),t.value.play(),p.setMediaElementSource(t.value),e.value=new Kx(p,iM)},x=()=>{t.value.pause()};return Cu(async()=>{u(),h()}),(v,p)=>(ku(),Wu("div",null,[nM,wr("button",{style:{"z-index":"100",position:"absolute"},onClick:m},"Play"),wr("button",{style:{"z-index":"100",position:"absolute",left:"60px"},onClick:x}," Pause ")]))}}),Ch=(n,t)=>{const e=n.__vccOpts||n;for(const[i,r]of t)e[i]=r;return e},sM=Ch(rM,[["__scopeId","data-v-72dd9096"]]),oM=Au({__name:"App",setup(n){return(t,e)=>(ku(),Wu("div",null,[Vn(sM)]))}}),aM=Ch(oM,[["__scopeId","data-v-7b0489e3"]]);lp(aM).mount("#app");
