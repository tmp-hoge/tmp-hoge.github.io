(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{532:function(t,n,e){"use strict";var i=Array.prototype.slice,r=function(t){return t},o=1,s=2,a=3,u=4,c=1e-6;function h(t){return"translate("+(t+.5)+",0)"}function l(t){return"translate(0,"+(t+.5)+")"}function f(t){return function(n){return+t(n)}}function m(t){var n=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(n=Math.round(n)),function(e){return+t(e)+n}}function p(){return!this.__axis}function d(t,n){var e=[],d=null,b=null,y=6,v=6,g=3,w=t===o||t===u?-1:1,_=t===u||t===s?"x":"y",k=t===o||t===a?h:l;function x(i){var h=null==d?n.ticks?n.ticks.apply(n,e):n.domain():d,l=null==b?n.tickFormat?n.tickFormat.apply(n,e):r:b,x=Math.max(y,0)+g,z=n.range(),M=+z[0]+.5,j=+z[z.length-1]+.5,O=(n.bandwidth?m:f)(n.copy()),T=i.selection?i.selection():i,A=T.selectAll(".domain").data([null]),V=T.selectAll(".tick").data(h,n).order(),S=V.exit(),Y=V.enter().append("g").attr("class","tick"),E=V.select("line"),X=V.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),V=V.merge(Y),E=E.merge(Y.append("line").attr("stroke","currentColor").attr(_+"2",w*y)),X=X.merge(Y.append("text").attr("fill","currentColor").attr(_,w*x).attr("dy",t===o?"0em":t===a?"0.71em":"0.32em")),i!==T&&(A=A.transition(i),V=V.transition(i),E=E.transition(i),X=X.transition(i),S=S.transition(i).attr("opacity",c).attr("transform",(function(t){return isFinite(t=O(t))?k(t):this.getAttribute("transform")})),Y.attr("opacity",c).attr("transform",(function(t){var n=this.parentNode.__axis;return k(n&&isFinite(n=n(t))?n:O(t))}))),S.remove(),A.attr("d",t===u||t==s?v?"M"+w*v+","+M+"H0.5V"+j+"H"+w*v:"M0.5,"+M+"V"+j:v?"M"+M+","+w*v+"V0.5H"+j+"V"+w*v:"M"+M+",0.5H"+j),V.attr("opacity",1).attr("transform",(function(t){return k(O(t))})),E.attr(_+"2",w*y),X.attr(_,w*x).text(l),T.filter(p).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===s?"start":t===u?"end":"middle"),T.each((function(){this.__axis=O}))}return x.scale=function(t){return arguments.length?(n=t,x):n},x.ticks=function(){return e=i.call(arguments),x},x.tickArguments=function(t){return arguments.length?(e=null==t?[]:i.call(t),x):e.slice()},x.tickValues=function(t){return arguments.length?(d=null==t?null:i.call(t),x):d&&d.slice()},x.tickFormat=function(t){return arguments.length?(b=t,x):b},x.tickSize=function(t){return arguments.length?(y=v=+t,x):y},x.tickSizeInner=function(t){return arguments.length?(y=+t,x):y},x.tickSizeOuter=function(t){return arguments.length?(v=+t,x):v},x.tickPadding=function(t){return arguments.length?(g=+t,x):g},x}function b(t){return d(a,t)}function y(t){return d(u,t)}e.d(n,"a",(function(){return b})),e.d(n,"b",(function(){return y}))},563:function(t,n,e){"use strict";e(520);var i=e(499);var r=function(){i.b.preventDefault(),i.b.stopImmediatePropagation()},o=function(t){var n=t.document.documentElement,e=Object(i.f)(t).on("dragstart.drag",r,!0);"onselectstart"in n?e.on("selectstart.drag",r,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")};function s(t,n){var e=t.document.documentElement,o=Object(i.f)(t).on("dragstart.drag",null);n&&(o.on("click.drag",r,!0),setTimeout((function(){o.on("click.drag",null)}),0)),"onselectstart"in e?o.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function a(t,n,e,i,r,o,s,a,u,c){this.target=t,this.type=n,this.subject=e,this.identifier=i,this.active=r,this.x=o,this.y=s,this.dx=a,this.dy=u,this._=c}a.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return s}))},705:function(t,n,e){"use strict";var i=e(520),r=e(563),o=e(19),s=e(499),a=e(503),u=function(t){return function(){return t}};function c(t,n,e){this.target=t,this.type=n,this.transform=e}function h(t,n,e){this.k=t,this.x=n,this.y=e}h.prototype={constructor:h,scale:function(t){return 1===t?this:new h(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new h(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var l=new h(1,0,0);function f(){s.b.stopImmediatePropagation()}h.prototype;var m=function(){s.b.preventDefault(),s.b.stopImmediatePropagation()};function p(){return!s.b.button}function d(){var t,n,e=this;return e instanceof SVGElement?(t=(e=e.ownerSVGElement||e).width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function b(){return this.__zoom||l}function y(){return-s.b.deltaY*(s.b.deltaMode?120:1)/500}function v(){return"ontouchstart"in this}function g(t,n,e){var i=t.invertX(n[0][0])-e[0][0],r=t.invertX(n[1][0])-e[1][0],o=t.invertY(n[0][1])-e[0][1],s=t.invertY(n[1][1])-e[1][1];return t.translate(r>i?(i+r)/2:Math.min(0,i)||Math.max(0,r),s>o?(o+s)/2:Math.min(0,o)||Math.max(0,s))}var w=function(){var t,n,e=p,w=d,_=g,k=y,x=v,z=[0,1/0],M=[[-1/0,-1/0],[1/0,1/0]],j=250,O=o.j,T=[],A=Object(i.a)("start","zoom","end"),V=500,S=150,Y=0;function E(t){t.property("__zoom",b).on("wheel.zoom",H).on("mousedown.zoom",K).on("dblclick.zoom",G).filter(x).on("touchstart.zoom",U).on("touchmove.zoom",q).on("touchend.zoom touchcancel.zoom",B).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function X(t,n){return(n=Math.max(z[0],Math.min(z[1],n)))===t.k?t:new h(n,t.x,t.y)}function I(t,n,e){var i=n[0]-e[0]*t.k,r=n[1]-e[1]*t.k;return i===t.x&&r===t.y?t:new h(t.k,i,r)}function P(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function C(t,n,e){t.on("start.zoom",(function(){D(this,arguments).start()})).on("interrupt.zoom end.zoom",(function(){D(this,arguments).end()})).tween("zoom",(function(){var t=this,i=arguments,r=D(t,i),o=w.apply(t,i),s=e||P(o),a=Math.max(o[1][0]-o[0][0],o[1][1]-o[0][1]),u=t.__zoom,c="function"==typeof n?n.apply(t,i):n,l=O(u.invert(s).concat(a/u.k),c.invert(s).concat(a/c.k));return function(t){if(1===t)t=c;else{var n=l(t),e=a/n[2];t=new h(e,s[0]-n[0]*e,s[1]-n[1]*e)}r.zoom(null,t)}}))}function D(t,n){for(var e,i=0,r=T.length;i<r;++i)if((e=T[i]).that===t)return e;return new F(t,n)}function F(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=w.apply(t,n)}function H(){if(e.apply(this,arguments)){var t=D(this,arguments),n=this.__zoom,i=Math.max(z[0],Math.min(z[1],n.k*Math.pow(2,k.apply(this,arguments)))),r=Object(s.d)(this);if(t.wheel)t.mouse[0][0]===r[0]&&t.mouse[0][1]===r[1]||(t.mouse[1]=n.invert(t.mouse[0]=r)),clearTimeout(t.wheel);else{if(n.k===i)return;t.mouse=[r,n.invert(r)],Object(a.a)(this),t.start()}m(),t.wheel=setTimeout((function(){t.wheel=null,t.end()}),S),t.zoom("mouse",_(I(X(n,i),t.mouse[0],t.mouse[1]),t.extent,M))}}function K(){if(!n&&e.apply(this,arguments)){var t=D(this,arguments),i=Object(s.f)(s.b.view).on("mousemove.zoom",(function(){if(m(),!t.moved){var n=s.b.clientX-u,e=s.b.clientY-c;t.moved=n*n+e*e>Y}t.zoom("mouse",_(I(t.that.__zoom,t.mouse[0]=Object(s.d)(t.that),t.mouse[1]),t.extent,M))}),!0).on("mouseup.zoom",(function(){i.on("mousemove.zoom mouseup.zoom",null),Object(r.b)(s.b.view,t.moved),m(),t.end()}),!0),o=Object(s.d)(this),u=s.b.clientX,c=s.b.clientY;Object(r.a)(s.b.view),f(),t.mouse=[o,this.__zoom.invert(o)],Object(a.a)(this),t.start()}}function G(){if(e.apply(this,arguments)){var t=this.__zoom,n=Object(s.d)(this),i=t.invert(n),r=t.k*(s.b.shiftKey?.5:2),o=_(I(X(t,r),n,i),w.apply(this,arguments),M);m(),j>0?Object(s.f)(this).transition().duration(j).call(C,o,n):Object(s.f)(this).call(E.transform,o)}}function U(){if(e.apply(this,arguments)){var n,i,r,o,u=D(this,arguments),c=s.b.changedTouches,h=c.length;for(f(),i=0;i<h;++i)r=c[i],o=[o=Object(s.k)(this,c,r.identifier),this.__zoom.invert(o),r.identifier],u.touch0?u.touch1||(u.touch1=o):(u.touch0=o,n=!0);if(t&&(t=clearTimeout(t),!u.touch1))return u.end(),void((o=Object(s.f)(this).on("dblclick.zoom"))&&o.apply(this,arguments));n&&(t=setTimeout((function(){t=null}),V),Object(a.a)(this),u.start())}}function q(){var n,e,i,r,o=D(this,arguments),a=s.b.changedTouches,u=a.length;for(m(),t&&(t=clearTimeout(t)),n=0;n<u;++n)e=a[n],i=Object(s.k)(this,a,e.identifier),o.touch0&&o.touch0[2]===e.identifier?o.touch0[0]=i:o.touch1&&o.touch1[2]===e.identifier&&(o.touch1[0]=i);if(e=o.that.__zoom,o.touch1){var c=o.touch0[0],h=o.touch0[1],l=o.touch1[0],f=o.touch1[1],p=(p=l[0]-c[0])*p+(p=l[1]-c[1])*p,d=(d=f[0]-h[0])*d+(d=f[1]-h[1])*d;e=X(e,Math.sqrt(p/d)),i=[(c[0]+l[0])/2,(c[1]+l[1])/2],r=[(h[0]+f[0])/2,(h[1]+f[1])/2]}else{if(!o.touch0)return;i=o.touch0[0],r=o.touch0[1]}o.zoom("touch",_(I(e,i,r),o.extent,M))}function B(){var t,e,i=D(this,arguments),r=s.b.changedTouches,o=r.length;for(f(),n&&clearTimeout(n),n=setTimeout((function(){n=null}),V),t=0;t<o;++t)e=r[t],i.touch0&&i.touch0[2]===e.identifier?delete i.touch0:i.touch1&&i.touch1[2]===e.identifier&&delete i.touch1;i.touch1&&!i.touch0&&(i.touch0=i.touch1,delete i.touch1),i.touch0?i.touch0[1]=this.__zoom.invert(i.touch0[0]):i.end()}return E.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",b),t!==e?C(t,n):e.interrupt().each((function(){D(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()}))},E.scaleBy=function(t,n){E.scaleTo(t,(function(){var t=this.__zoom.k,e="function"==typeof n?n.apply(this,arguments):n;return t*e}))},E.scaleTo=function(t,n){E.transform(t,(function(){var t=w.apply(this,arguments),e=this.__zoom,i=P(t),r=e.invert(i),o="function"==typeof n?n.apply(this,arguments):n;return _(I(X(e,o),i,r),t,M)}))},E.translateBy=function(t,n,e){E.transform(t,(function(){return _(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof e?e.apply(this,arguments):e),w.apply(this,arguments),M)}))},E.translateTo=function(t,n,e){E.transform(t,(function(){var t=w.apply(this,arguments),i=this.__zoom,r=P(t);return _(l.translate(r[0],r[1]).scale(i.k).translate("function"==typeof n?-n.apply(this,arguments):-n,"function"==typeof e?-e.apply(this,arguments):-e),t,M)}))},F.prototype={start:function(){return 1==++this.active&&(this.index=T.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0==--this.active&&(T.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){Object(s.a)(new c(E,t,this.that.__zoom),A.apply,A,[t,this.that,this.args])}},E.wheelDelta=function(t){return arguments.length?(k="function"==typeof t?t:u(+t),E):k},E.filter=function(t){return arguments.length?(e="function"==typeof t?t:u(!!t),E):e},E.touchable=function(t){return arguments.length?(x="function"==typeof t?t:u(!!t),E):x},E.extent=function(t){return arguments.length?(w="function"==typeof t?t:u([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),E):w},E.scaleExtent=function(t){return arguments.length?(z[0]=+t[0],z[1]=+t[1],E):[z[0],z[1]]},E.translateExtent=function(t){return arguments.length?(M[0][0]=+t[0][0],M[1][0]=+t[1][0],M[0][1]=+t[0][1],M[1][1]=+t[1][1],E):[[M[0][0],M[0][1]],[M[1][0],M[1][1]]]},E.constrain=function(t){return arguments.length?(_=t,E):_},E.duration=function(t){return arguments.length?(j=+t,E):j},E.interpolate=function(t){return arguments.length?(O=t,E):O},E.on=function(){var t=A.on.apply(A,arguments);return t===A?E:t},E.clickDistance=function(t){return arguments.length?(Y=(t=+t)*t,E):Math.sqrt(Y)},E};e.d(n,"a",(function(){return w}))},706:function(t,n,e){"use strict";var i=e(520),r=e(563),o=e(19),s=e(499),a=e(503),u=function(t){return function(){return t}},c=function(t,n,e){this.target=t,this.type=n,this.selection=e};function h(){s.b.stopImmediatePropagation()}var l=function(){s.b.preventDefault(),s.b.stopImmediatePropagation()},f={name:"drag"},m={name:"space"},p={name:"handle"},d={name:"center"},b={name:"x",handles:["e","w"].map(x),input:function(t,n){return t&&[[t[0],n[0][1]],[t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},y={name:"y",handles:["n","s"].map(x),input:function(t,n){return t&&[[n[0][0],t[0]],[n[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},v=(["n","e","s","w","nw","ne","se","sw"].map(x),{overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"}),g={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},w={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},_={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},k={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function x(t){return{type:t}}function z(){return!s.b.button}function M(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function j(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function O(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function T(){return A(b)}function A(t){var n,e=M,T=z,A=Object(i.a)(S,"start","brush","end"),V=6;function S(n){var e=n.property("__brush",P).selectAll(".overlay").data([x("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",v.overlay).merge(e).each((function(){var t=j(this).extent;Object(s.f)(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])})),n.selectAll(".selection").data([x("selection")]).enter().append("rect").attr("class","selection").attr("cursor",v.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var i=n.selectAll(".handle").data(t.handles,(function(t){return t.type}));i.exit().remove(),i.enter().append("rect").attr("class",(function(t){return"handle handle--"+t.type})).attr("cursor",(function(t){return v[t.type]})),n.each(Y).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",I)}function Y(){var t=Object(s.f)(this),n=j(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",(function(t){return"e"===t.type[t.type.length-1]?n[1][0]-V/2:n[0][0]-V/2})).attr("y",(function(t){return"s"===t.type[0]?n[1][1]-V/2:n[0][1]-V/2})).attr("width",(function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+V:V})).attr("height",(function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+V:V}))):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function E(t,n){return t.__brush.emitter||new X(t,n)}function X(t,n){this.that=t,this.args=n,this.state=t.__brush,this.active=0}function I(){if(s.b.touches){if(s.b.changedTouches.length<s.b.touches.length)return l()}else if(n)return;if(T.apply(this,arguments)){var e,i,o,u,c,x,z,M,A,V,S,X,I,P=this,C=s.b.target.__data__.type,D="selection"===(s.b.metaKey?C="overlay":C)?f:s.b.altKey?d:p,F=t===y?null:_[C],H=t===b?null:k[C],K=j(P),G=K.extent,U=K.selection,q=G[0][0],B=G[0][1],J=G[1][0],N=G[1][1],W=F&&H&&s.b.shiftKey,L=Object(s.d)(P),Q=L,R=E(P,arguments).beforestart();"overlay"===C?K.selection=U=[[e=t===y?q:L[0],o=t===b?B:L[1]],[c=t===y?J:e,z=t===b?N:o]]:(e=U[0][0],o=U[0][1],c=U[1][0],z=U[1][1]),i=e,u=o,x=c,M=z;var Z=Object(s.f)(P).attr("pointer-events","none"),$=Z.selectAll(".overlay").attr("cursor",v[C]);if(s.b.touches)Z.on("touchmove.brush",nt,!0).on("touchend.brush touchcancel.brush",it,!0);else{var tt=Object(s.f)(s.b.view).on("keydown.brush",(function(){switch(s.b.keyCode){case 16:W=F&&H;break;case 18:D===p&&(F&&(c=x-A*F,e=i+A*F),H&&(z=M-V*H,o=u+V*H),D=d,et());break;case 32:D!==p&&D!==d||(F<0?c=x-A:F>0&&(e=i-A),H<0?z=M-V:H>0&&(o=u-V),D=m,$.attr("cursor",v.selection),et());break;default:return}l()}),!0).on("keyup.brush",(function(){switch(s.b.keyCode){case 16:W&&(X=I=W=!1,et());break;case 18:D===d&&(F<0?c=x:F>0&&(e=i),H<0?z=M:H>0&&(o=u),D=p,et());break;case 32:D===m&&(s.b.altKey?(F&&(c=x-A*F,e=i+A*F),H&&(z=M-V*H,o=u+V*H),D=d):(F<0?c=x:F>0&&(e=i),H<0?z=M:H>0&&(o=u),D=p),$.attr("cursor",v[C]),et());break;default:return}l()}),!0).on("mousemove.brush",nt,!0).on("mouseup.brush",it,!0);Object(r.a)(s.b.view)}h(),Object(a.a)(P),Y.call(P),R.start()}function nt(){var t=Object(s.d)(P);!W||X||I||(Math.abs(t[0]-Q[0])>Math.abs(t[1]-Q[1])?I=!0:X=!0),Q=t,S=!0,l(),et()}function et(){var t;switch(A=Q[0]-L[0],V=Q[1]-L[1],D){case m:case f:F&&(A=Math.max(q-e,Math.min(J-c,A)),i=e+A,x=c+A),H&&(V=Math.max(B-o,Math.min(N-z,V)),u=o+V,M=z+V);break;case p:F<0?(A=Math.max(q-e,Math.min(J-e,A)),i=e+A,x=c):F>0&&(A=Math.max(q-c,Math.min(J-c,A)),i=e,x=c+A),H<0?(V=Math.max(B-o,Math.min(N-o,V)),u=o+V,M=z):H>0&&(V=Math.max(B-z,Math.min(N-z,V)),u=o,M=z+V);break;case d:F&&(i=Math.max(q,Math.min(J,e-A*F)),x=Math.max(q,Math.min(J,c+A*F))),H&&(u=Math.max(B,Math.min(N,o-V*H)),M=Math.max(B,Math.min(N,z+V*H)))}x<i&&(F*=-1,t=e,e=c,c=t,t=i,i=x,x=t,C in g&&$.attr("cursor",v[C=g[C]])),M<u&&(H*=-1,t=o,o=z,z=t,t=u,u=M,M=t,C in w&&$.attr("cursor",v[C=w[C]])),K.selection&&(U=K.selection),X&&(i=U[0][0],x=U[1][0]),I&&(u=U[0][1],M=U[1][1]),U[0][0]===i&&U[0][1]===u&&U[1][0]===x&&U[1][1]===M||(K.selection=[[i,u],[x,M]],Y.call(P),R.brush())}function it(){if(h(),s.b.touches){if(s.b.touches.length)return;n&&clearTimeout(n),n=setTimeout((function(){n=null}),500),Z.on("touchmove.brush touchend.brush touchcancel.brush",null)}else Object(r.b)(s.b.view,S),tt.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);Z.attr("pointer-events","all"),$.attr("cursor",v.overlay),K.selection&&(U=K.selection),O(U)&&(K.selection=null,Y.call(P)),R.end()}}function P(){var n=this.__brush||{selection:null};return n.extent=e.apply(this,arguments),n.dim=t,n}return S.move=function(n,e){n.selection?n.on("start.brush",(function(){E(this,arguments).beforestart().start()})).on("interrupt.brush end.brush",(function(){E(this,arguments).end()})).tween("brush",(function(){var n=this,i=n.__brush,r=E(n,arguments),s=i.selection,a=t.input("function"==typeof e?e.apply(this,arguments):e,i.extent),u=Object(o.a)(s,a);function c(t){i.selection=1===t&&O(a)?null:u(t),Y.call(n),r.brush()}return s&&a?c:c(1)})):n.each((function(){var n=this,i=arguments,r=n.__brush,o=t.input("function"==typeof e?e.apply(n,i):e,r.extent),s=E(n,i).beforestart();Object(a.a)(n),r.selection=null==o||O(o)?null:o,Y.call(n),s.start().brush().end()}))},X.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0==--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(n){Object(s.a)(new c(S,n,t.output(this.state.selection)),A.apply,A,[n,this.that,this.args])}},S.extent=function(t){return arguments.length?(e="function"==typeof t?t:u([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),S):e},S.filter=function(t){return arguments.length?(T="function"==typeof t?t:u(!!t),S):T},S.handleSize=function(t){return arguments.length?(V=+t,S):V},S.on=function(){var t=A.on.apply(A,arguments);return t===A?S:t},S}e.d(n,"a",(function(){return T}))}}]);
//# sourceMappingURL=auspice.chunk.7.bundle.js.map