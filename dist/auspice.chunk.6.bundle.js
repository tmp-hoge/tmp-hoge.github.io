(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{530:function(t,e,n){var r=n(531);"string"==typeof r&&(r=[[t.i,r,""]]);n(45)(r,{});r.locals&&(t.exports=r.locals)},531:function(t,e,n){(t.exports=n(44)(!1)).push([t.i,'\n/* Variables - keep in sync with globalStyles.js*/\n:root {\n  --darkGrey: #333;\n  --medGrey: #888;\n}\n\n#d3entropy .overlay {\n  fill: none;\n  pointer-events: all;\n}\n\n#d3entropy .brush {\n  stroke: none;\n}\n\n#d3entropy .niceText {\n  font-family: "Lato", "Helvetica Neue", "Helvetica", "sans-serif";\n  font-size: 14px;\n  font-style: italic;\n  color: var(--medGrey);\n}\n\n.brush .selection {\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n',""])},532:function(t,e,n){"use strict";var r=Array.prototype.slice,i=function(t){return t},o=1,a=2,s=3,c=4,l=1e-6;function u(t){return"translate("+(t+.5)+",0)"}function p(t){return"translate(0,"+(t+.5)+")"}function f(t){return function(e){return+t(e)}}function d(t){var e=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(e=Math.round(e)),function(n){return+t(n)+e}}function y(){return!this.__axis}function h(t,e){var n=[],h=null,v=null,m=6,g=6,b=3,x=t===o||t===c?-1:1,k=t===c||t===a?"x":"y",j=t===o||t===s?u:p;function O(r){var u=null==h?e.ticks?e.ticks.apply(e,n):e.domain():h,p=null==v?e.tickFormat?e.tickFormat.apply(e,n):i:v,O=Math.max(m,0)+b,w=e.range(),S=+w[0]+.5,A=+w[w.length-1]+.5,q=(e.bandwidth?d:f)(e.copy()),G=r.selection?r.selection():r,P=G.selectAll(".domain").data([null]),_=G.selectAll(".tick").data(u,e).order(),z=_.exit(),F=_.enter().append("g").attr("class","tick"),M=_.select("line"),R=_.select("text");P=P.merge(P.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),_=_.merge(F),M=M.merge(F.append("line").attr("stroke","currentColor").attr(k+"2",x*m)),R=R.merge(F.append("text").attr("fill","currentColor").attr(k,x*O).attr("dy",t===o?"0em":t===s?"0.71em":"0.32em")),r!==G&&(P=P.transition(r),_=_.transition(r),M=M.transition(r),R=R.transition(r),z=z.transition(r).attr("opacity",l).attr("transform",(function(t){return isFinite(t=q(t))?j(t):this.getAttribute("transform")})),F.attr("opacity",l).attr("transform",(function(t){var e=this.parentNode.__axis;return j(e&&isFinite(e=e(t))?e:q(t))}))),z.remove(),P.attr("d",t===c||t==a?g?"M"+x*g+","+S+"H0.5V"+A+"H"+x*g:"M0.5,"+S+"V"+A:g?"M"+S+","+x*g+"V0.5H"+A+"V"+x*g:"M"+S+",0.5H"+A),_.attr("opacity",1).attr("transform",(function(t){return j(q(t))})),M.attr(k+"2",x*m),R.attr(k,x*O).text(p),G.filter(y).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===a?"start":t===c?"end":"middle"),G.each((function(){this.__axis=q}))}return O.scale=function(t){return arguments.length?(e=t,O):e},O.ticks=function(){return n=r.call(arguments),O},O.tickArguments=function(t){return arguments.length?(n=null==t?[]:r.call(t),O):n.slice()},O.tickValues=function(t){return arguments.length?(h=null==t?null:r.call(t),O):h&&h.slice()},O.tickFormat=function(t){return arguments.length?(v=t,O):v},O.tickSize=function(t){return arguments.length?(m=g=+t,O):m},O.tickSizeInner=function(t){return arguments.length?(m=+t,O):m},O.tickSizeOuter=function(t){return arguments.length?(g=+t,O):g},O.tickPadding=function(t){return arguments.length?(b=+t,O):b},O}function v(t){return h(s,t)}function m(t){return h(c,t)}n.d(e,"a",(function(){return v})),n.d(e,"b",(function(){return m}))},714:function(t,e,n){"use strict";n.r(e);var r=n(36),i=n.n(r),o=n(55),a=n.n(o),s=n(56),c=n.n(s),l=n(57),u=n.n(l),p=n(58),f=n.n(p),d=n(59),y=n.n(d),h=n(3),v=n.n(h),m=n(499),g=(n(503),n(43)),b=n(505),x=n(18),k=n.n(x),j=n(29),O=n(532),w=n(5),S=n(561),A=n(54),q=n(500),G=n(79),P=n(24),_=.85,z=function(t,e){if(e&&e[t])return e[t].title;if(Object(P.isColorByGenotype)(t)){var n=Object(P.decodeColorByGenotype)(t);return n.aa?"Genotype at ".concat(n.gene," pos ").concat(n.positions.join(", ")):"Genotype at Nuc. ".concat(n.positions.join(", "))}return t},F=function(t,e){return{y:Object(j.a)().domain([0,e]).range([t.height-t.spaceBottom,t.spaceTop]),numTicksY:5}},M=function(t,e,n){!function(t){t.selectAll(".y.axis").remove()}(t);var r=Object(A.a)(".0%");t.append("g").attr("class","y axis").attr("transform","translate(".concat(e.spaceLeft,",0)")).style("font-family",q.b).style("font-size","12px").call(Object(O.b)(n.y).ticks(n.numTicksY).tickFormat(r))},R=function(t,e,n){if(n){!function(t){t.selectAll(".projection-pivot").remove(),t.selectAll(".projection-text").remove()}(t),t.append("g").attr("class","projection-pivot").append("line").attr("x1",e.x(parseFloat(n))).attr("x2",e.x(parseFloat(n))).attr("y1",e.y(1)).attr("y2",e.y(0)).style("visibility","visible").style("stroke","rgba(55,55,55,0.9)").style("stroke-width","2").style("stroke-dasharray","4 4");var r=.5*(e.x(parseFloat(n))+e.x.range()[1]);t.append("g").attr("class","projection-text").append("text").attr("x",r).attr("y",e.y(1)-3).style("pointer-events","none").style("fill","#555").style("font-family",q.b).style("font-size",12).style("alignment-baseline","bottom").style("text-anchor","middle").text("Projection")}};function Y(){Object(m.f)(this).attr("opacity",1)}function B(){Object(m.f)(this).attr("opacity",_),Object(m.f)("#freqinfo").style("visibility","hidden"),Object(m.f)("#vline").style("visibility","hidden")}var C,D=function(t){var e=t.matrix,n=t.pivots,r=t.colorScale,i=function(t,e){for(var n=e.legendValues.filter((function(t){return void 0!==t})).reverse().map((function(t){return t.toString()})),r=n.length-1;r>=0;--r)-1===t.indexOf(n[r])&&n.splice(r,1);return t.length>n.length&&t.forEach((function(t){-1===n.indexOf(t)&&n.push(t)})),n}(Object.keys(e),r),o=function(t,e,n){for(var r=[],i=0;i<t.length;i++){for(var o=[],a=0;a<e;a++)if(0===i)o.push([0,n[t[i]][a]]);else{var s=r[i-1][a][1];o.push([s,n[t[i]][a]+s])}r.push(o)}return r}(i,n.length,e),a=function(t){return t[t.length-1].reduce((function(t,e){return Math.max(t,e[1])}),0)}(o);return{categories:i,series:o,maxY:a}},E=function(t,e,n,r){var i,o=n.categories,a=n.series,s=r.colorBy,c=r.colorScale,l=r.colorOptions,u=r.pivots,p=r.projection_pivot;(i=t).selectAll("path").remove(),i.selectAll("line").remove(),i.selectAll("text").remove();var f=function(t,e){return function(n,r){return t[r]===G.unassigned_label?"rgb(190, 190, 190)":Object(w.f)(e.scale(t[r])).toString()}}(o,c),d=function(t,e){return e.continuous?t.map((function(t){return t===G.unassigned_label?G.unassigned_label:"".concat(e.legendBounds[t][0].toFixed(2)," - ").concat(e.legendBounds[t][1].toFixed(2))})):t.slice()}(o,c),y=Object(S.b)().x((function(t,n){return e.x(u[n])})).y0((function(t){return e.y(t[0])})).y1((function(t){return e.y(t[1])}));t.selectAll(".stream").data(a).enter().append("path").attr("d",y).attr("fill",f).attr("opacity",_).on("mouseover",Y).on("mouseout",B).on("mousemove",(function(t,n){var r=Object(m.d)(this),i=k()(r,1)[0],o=e.x.invert(i),a=u.reduce((function(t,e,n,r){return Math.abs(e-o)<Math.abs(r[t]-o)?n:t}),0),c=Math.round(100*(t[a][1]-t[a][0]))+"%",f=e.x(u[a]),y=e.y(t[a][1]),h=e.y(t[a][0]);Object(m.f)("#vline").style("visibility","visible").attr("x1",f).attr("x2",f).attr("y1",y).attr("y2",h);var v=f>.5*e.x.range()[1]?"":"".concat(f+25,"px"),g=f>.5*e.x.range()[1]?"".concat(e.x.range()[1]-f+25,"px"):"",b=y>.5*e.y(0)?"".concat(e.y(0)-50,"px"):"".concat(y+25,"px"),x="Frequency";p&&u[a]>p&&(x="Projected frequency"),Object(m.f)("#freqinfo").style("left",v).style("right",g).style("top",b).style("padding-left","10px").style("padding-right","10px").style("padding-top","0px").style("padding-bottom","0px").style("visibility","visible").style("background-color","rgba(55,55,55,0.9)").style("color","white").style("font-family",q.b).style("font-size",18).style("line-height",1).style("font-weight",300).html("<p>".concat(z(s,l),": ").concat(d[n],"</p>\n        <p>Time point: ").concat(u[a],"</p>\n        <p>").concat(x,": ").concat(c,"</p>"))})),t.append("line").attr("id","vline").style("visibility","hidden").style("pointer-events","none").style("stroke","rgba(55,55,55,0.9)").style("stroke-width",4),function(t,e,n,r,i){var o=function(t,e,n,r){return t.map((function(t){for(var i=.15*n.y.domain()[1],o=0;o<t.length-r;o++){var a=o+r;if(t[o][1]-t[o][0]>i&&t[a][1]-t[a][0]>i)return[n.x(e[o+1]),(n.y((t[o][1]+t[o][0])/2)+n.y((t[a][1]+t[a][0])/2))/2]}return[void 0,void 0]}))}(e,n,i,3);t.selectAll(".streamLabels").data(r).enter().append("text").attr("x",(function(t,e){return o[e][0]})).attr("y",(function(t,e){return o[e][1]})).style("pointer-events","none").style("fill","white").style("font-family",q.b).style("font-size",14).style("alignment-baseline","middle").text((function(t,e){return o[e][0]?t:""}))}(t,a,u,d,e)};n(530);function T(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function V(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?T(n,!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):T(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var H=Object(g.b)((function(t){return{data:t.frequencies.data,pivots:t.frequencies.pivots,ticks:t.frequencies.ticks,matrix:t.frequencies.matrix,projection_pivot:t.frequencies.projection_pivot,version:t.frequencies.version,browserDimensions:t.browserDimensions.browserDimensions,colorBy:t.controls.colorBy,colorScale:t.controls.colorScale,colorOptions:t.metadata.colorings}}))(C=function(t){function e(t){var n;return a()(this,e),(n=u()(this,f()(e).call(this,t))).state={maxY:0},n}return y()(e,t),c()(e,[{key:"calcChartGeom",value:function(t,e){return{width:t,height:e,spaceLeft:40,spaceRight:10,spaceBottom:20,spaceTop:10}}},{key:"recomputeRedrawAll",value:function(t,e){var n=this.calcChartGeom(e.width,e.height),r=D(V({},e));t.maxY=r.maxY,t.categories=r.categories;var i=function(t,e,n){return{x:Object(j.a)().domain([e[0],e[e.length-1]]).range([t.spaceLeft,t.width-t.spaceRight]),numTicksX:n.length}}(n,e.pivots,e.ticks),o=F(n,r.maxY);t.scales=V({},i,{},o),function(t,e,n){!function(t){t.selectAll(".x.axis").remove()}(t),t.append("g").attr("class","x axis").attr("transform","translate(0,".concat(e.height-e.spaceBottom,")")).style("font-family",q.b).style("font-size","12px").call(Object(O.a)(n.x).ticks(n.numTicksX,".1f"))}(t.svg,n,i),M(t.svg,n,o),E(t.svgStreamGroup,t.scales,r,V({},e)),R(t.svg,t.scales,e.projection_pivot)}},{key:"recomputeRedrawPartial",value:function(t,e,n){var r,i,o=D(V({},n)),a=t.maxY!==o.maxY,s=(r=t.categories,i=o.categories,!(r.length===i.length&&!r.filter((function(t,e){return t!==i[e]})).length));if(!a&&!s)return!1;var c,l=this.calcChartGeom(n.width,n.height);if(a){var u=F(l,o.maxY);M(t.svg,l,u),c=V({},t.scales,{},u)}else c=V({},t.scales);return E(t.svgStreamGroup,c,o,V({},n)),a&&R(t.svg,c,n.projection_pivot),V({},t,{scales:c,maxY:o.maxY,categories:o.categories})}},{key:"componentDidMount",value:function(){var t=Object(m.f)(this.domRef),e=t.append("g"),n={svg:t,svgStreamGroup:e};this.props.matrix&&this.recomputeRedrawAll(n,this.props),this.setState(n)}},{key:"componentWillReceiveProps",value:function(t){if(this.props.version===t.version);else if(!this.props.loaded&&t.loaded){var e=V({},this.state);this.recomputeRedrawAll(e,t),this.setState(e)}else{var n=this.recomputeRedrawPartial(this.state,this.props,t);n&&this.setState(n)}}},{key:"componentDidUpdate",value:function(t){if(t.width!==this.props.width||t.height!==this.props.height){var e=V({},this.state);this.recomputeRedrawAll(e,this.props),this.setState(e)}}},{key:"render",value:function(){var t=this;return v.a.createElement(b.a,{title:"Frequencies (coloured by ".concat(z(this.props.colorBy,this.props.colorOptions),")")},v.a.createElement("div",{id:"freqinfo",style:{zIndex:20,position:"absolute",borderRadius:"5px",padding:"10px",backgroundColor:"hsla(0,0%,100%,.9)",pointerEvents:"none",visibility:"hidden",fontSize:"14px"}}),v.a.createElement("svg",{id:"d3frequenciesSVG",width:this.props.width,height:this.props.height,style:{pointerEvents:"auto",overflow:"visible"}},v.a.createElement("g",{ref:function(e){t.domRef=e},id:"d3frequencies"})))}}]),e}(v.a.Component))||C;e.default=H}}]);
//# sourceMappingURL=auspice.chunk.6.bundle.js.map