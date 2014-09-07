function evalChartistCode(a,b){var c=a.replace(/Chartist\s*\.\s*(.+)\(\s*['"](.+)['"]/,function(a,b){return["return"," ","Chartist",".",b,"(","arguments[0]"].join("")});try{return new Function(c)(b)}catch(d){}}var Chartist={};Chartist.version="0.1.11",function(a,b,c){"use strict";c.noop=function(a){return a},c.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},c.extend=function(a,b){a=a||{};for(var d in b)a[d]="object"==typeof b[d]?c.extend(a[d],b[d]):b[d];return a},c.getHeight=function(a){return a.clientHeight||Math.round(a.getBBox().height)||a.parentNode.clientHeight},c.getWidth=function(a){return a.clientWidth||Math.round(a.getBBox().width)||a.parentNode.clientWidth},c.createSvg=function(a,d,e,f){var g,h=a.nodeType?a:b.querySelector(a);if(!h)throw'Container node with selector "'+a+'" not found';return void 0!==h._ctChart?(g=h._ctChart.attr({width:d||"100%",height:e||"100%"}).removeAllClasses().addClass(f),g.empty()):(g=c.svg("svg").attr({width:d||"100%",height:e||"100%"}).addClass(f),h.appendChild(g._node),h._ctChart=g),g},c.getDataArray=function(a){for(var b=[],c=0;c<a.series.length;c++)b[c]="object"==typeof a.series[c]&&void 0!==a.series[c].data?a.series[c].data:a.series[c];return b},c.normalizeDataArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c].length!==b)for(var d=a[c].length;b>d;d++)a[c][d]=0;return a},c.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},c.projectLength=function(a,b,d,e){var f=c.getAvailableHeight(a,e);return b/d.range*f},c.getAvailableHeight=function(a,b){return c.getHeight(a._node)-2*b.chartPadding-b.axisX.offset},c.getHighLow=function(a){var b,c,d={high:-Number.MAX_VALUE,low:Number.MAX_VALUE};for(b=0;b<a.length;b++)for(c=0;c<a[b].length;c++)a[b][c]>d.high&&(d.high=a[b][c]),a[b][c]<d.low&&(d.low=a[b][c]);return d},c.getBounds=function(a,b,d,e){var f,g,h,i=c.getHighLow(b);for(i.high=d.high||(0===d.high?0:i.high),i.low=d.low||(0===d.low?0:i.low),(e||0===e)&&(i.high=Math.max(e,i.high),i.low=Math.min(e,i.low)),i.valueRange=i.high-i.low,i.oom=c.orderOfMagnitude(i.valueRange),i.min=Math.floor(i.low/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.max=Math.ceil(i.high/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.range=i.max-i.min,i.step=Math.pow(10,i.oom),i.numberOfSteps=Math.round(i.range/i.step);;){var j=c.projectLength(a,i.step/2,i,d);if(!(j>=d.axisY.scaleMinSpace))break;i.step/=2}for(g=i.min,h=i.max,f=i.min;f<=i.max;f+=i.step)f+i.step<i.low&&(g+=i.step),f-i.step>i.high&&(h-=i.step);for(i.min=g,i.max=h,i.range=i.max-i.min,i.values=[],f=i.min;f<=i.max;f+=i.step)i.values.push(f);return i},c.calculateLabelOffset=function(a,b,c,d,e){for(var f=0,g=0;g<b.length;g++){var h=d(b[g],g);if(h||0===h){var i=a.elem("text",{dx:0,dy:0},c).text(""+h);f=Math.max(f,e(i._node)),i.remove()}}return f},c.interpolateData=function(a,b,c){for(var d=0;d<a.length;d++){var e=b(a[d],d);(e||0===e)&&c(a,d,e)}},c.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},c.createChartRect=function(a,b,d,e){return{x1:b.chartPadding+e,y1:(b.height||c.getHeight(a._node))-b.chartPadding-d,x2:(b.width||c.getWidth(a._node))-b.chartPadding,y2:b.chartPadding,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}}},c.createXAxis=function(a,b,d,e,f){b.labels.forEach(function(g,h){var i=f.axisX.labelInterpolationFnc(g,h),j=a.x1+a.width()/b.labels.length*h;if((i||0===i)&&(f.axisX.showGrid&&d.elem("line",{x1:j,y1:a.y1,x2:j,y2:a.y2},[f.classNames.grid,f.classNames.horizontal].join(" ")),f.axisX.showLabel)){var k=e.elem("text",{dx:j+2},[f.classNames.label,f.classNames.horizontal].join(" ")).text(""+i);k.attr({dy:a.y1+c.getHeight(k._node)+f.axisX.offset})}})},c.createYAxis=function(a,b,c,d,e,f){b.values.forEach(function(g,h){var i=f.axisY.labelInterpolationFnc(g,h),j=a.y1-a.height()/b.values.length*h;(i||0===i)&&(f.axisY.showGrid&&c.elem("line",{x1:a.x1,y1:j,x2:a.x2,y2:j},[f.classNames.grid,f.classNames.vertical].join(" ")),f.axisY.showLabel&&d.elem("text",{dx:"right"===f.axisY.labelAlign?e-f.axisY.offset+f.chartPadding:f.chartPadding,dy:j-2,"text-anchor":"right"===f.axisY.labelAlign?"end":"start"},[f.classNames.label,f.classNames.vertical].join(" ")).text(""+i))})},c.projectPoint=function(a,b,c,d){return{x:a.x1+a.width()/c.length*d,y:a.y1-a.height()*(c[d]-b.min)/(b.range+b.step)}},c.optionsProvider=function(b,d,e,f){function g(){if(h=c.extend({},j),e)for(i=0;i<e.length;i++){var b=a.matchMedia(e[i][0]);b.matches&&(h=c.extend(h,e[i][1]))}return f(h),h}var h,i,j=c.extend(c.extend({},b),d),k=[];if(!a.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(e)for(i=0;i<e.length;i++){var l=a.matchMedia(e[i][0]);l.addListener(g),k.push(l)}return g()},c.catmullRom2bezier=function(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4===d?f[3]={x:+a[0],y:+a[1]}:e-2===d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4===d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push([(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}}(window,document,Chartist),function(a,b,c){"use strict";c.svg=function(a,d,e,f){function g(a,b){return Object.keys(b).forEach(function(c){a.setAttribute(c,b[c])}),a}function h(a,c,d,e,f){var h=b.createElementNS(p,c);return h._ctSvgElement=a,f&&f.appendChild(h),d&&g(h,d),e&&m(h,e),h}function i(a,c){a.appendChild(b.createTextNode(c))}function j(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function k(a){a.parentNode.removeChild(a)}function l(a){return a.getAttribute("class")?a.getAttribute("class").trim().split(/\s+/):[]}function m(a,b){a.setAttribute("class",l(a).concat(b.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" "))}function n(a,b){var c=b.trim().split(/\s+/);a.setAttribute("class",l(a).filter(function(a){return-1===c.indexOf(a)}).join(" "))}function o(a){a.className=""}var p="http://www.w3.org/2000/svg";return{_node:h(this,a,d,e,f?f._node:void 0),_parent:f,parent:function(){return this._parent},attr:function(a){return g(this._node,a),this},empty:function(){return j(this._node),this},remove:function(){return k(this._node),this},elem:function(a,b,d){return c.svg(a,b,d,this)},text:function(a){return i(this._node,a),this},addClass:function(a){return m(this._node,a),this},removeClass:function(a){return n(this._node,a),this},removeAllClasses:function(){return o(this._node),this},classes:function(){return l(this._node)}}}}(window,document,Chartist),function(a,b,c){"use strict";c.Line=function(b,d,e,f){function g(a){var e,f,g,h=[],j=c.normalizeDataArray(c.getDataArray(d),d.labels.length);i=c.createSvg(b,a.width,a.height,a.classNames.chart),g=c.getBounds(i,j,a),e=a.axisX.offset,a.axisX.showLabel&&(e+=c.calculateLabelOffset(i,d.labels,[a.classNames.label,a.classNames.horizontal].join(" "),a.axisX.labelInterpolationFnc,c.getHeight)),f=a.axisY.offset,a.axisY.showLabel&&(f+=c.calculateLabelOffset(i,g.values,[a.classNames.label,a.classNames.horizontal].join(" "),a.axisY.labelInterpolationFnc,c.getWidth));var k=c.createChartRect(i,a,e,f),l=i.elem("g"),m=i.elem("g");c.createXAxis(k,d,m,l,a),c.createYAxis(k,g,m,l,f,a);for(var n=0;n<d.series.length;n++){h[n]=i.elem("g"),h[n].addClass([a.classNames.series,d.series[n].className||a.classNames.series+"-"+c.alphaNumerate(n)].join(" "));var o,p=c.projectPoint(k,g,j[n],0),q=[p.x,p.y];a.showPoint&&(o=h[n].elem("line",{x1:p.x,y1:p.y,x2:p.x+.01,y2:p.y},a.classNames.point));for(var r=1;r<j[n].length;r++)p=c.projectPoint(k,g,j[n],r),q.push(p.x,p.y),a.showPoint&&(o=h[n].elem("line",{x1:p.x,y1:p.y,x2:p.x+.01,y2:p.y},a.classNames.point));if(a.showLine){var s="M"+q[0]+","+q[1]+" ";if(a.lineSmooth&&q.length>4)for(var t=c.catmullRom2bezier(q),u=0;u<t.length;u++)s+="C"+t[u].join();else for(var v=3;v<q.length;v+=2)s+="L "+q[v-1]+","+q[v];h[n].elem("path",{d:s},a.classNames.line)}}}var h,i,j={axisX:{offset:10,showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop},axisY:{offset:15,showLabel:!0,showGrid:!0,labelAlign:"right",labelInterpolationFnc:c.noop,scaleMinSpace:30},width:void 0,height:void 0,showLine:!0,showPoint:!0,lineSmooth:!0,low:void 0,high:void 0,chartPadding:5,classNames:{chart:"ct-chart-line",label:"ct-label",series:"ct-series",line:"ct-line",point:"ct-point",grid:"ct-grid",vertical:"ct-vertical",horizontal:"ct-horizontal"}};return h=c.optionsProvider(j,e,f,function(a){h=a,g(h)}),a.addEventListener("resize",function(){g(h)}),{version:c.version,update:function(){g(h)}}}}(window,document,Chartist),function(a,b,c){"use strict";c.Bar=function(b,d,e,f){function g(a){var e,f,g,h=[],j=c.normalizeDataArray(c.getDataArray(d),d.labels.length);i=c.createSvg(b,a.width,a.height,a.classNames.chart),g=c.getBounds(i,j,a,0),e=a.axisX.offset,a.axisX.showLabel&&(e+=c.calculateLabelOffset(i,d.labels,[a.classNames.label,a.classNames.horizontal].join(" "),a.axisX.labelInterpolationFnc,c.getHeight)),f=a.axisY.offset,a.axisY.showLabel&&(f+=c.calculateLabelOffset(i,g.values,[a.classNames.label,a.classNames.horizontal].join(" "),a.axisY.labelInterpolationFnc,c.getWidth));var k=c.createChartRect(i,a,e,f),l=i.elem("g"),m=i.elem("g"),n=c.projectPoint(k,g,[0],0);c.createXAxis(k,d,m,l,a),c.createYAxis(k,g,m,l,f,a);for(var o=0;o<d.series.length;o++){var p=o-(d.series.length-1)/2,q=k.width()/j[o].length/2;h[o]=i.elem("g"),h[o].addClass([a.classNames.series,d.series[o].className||a.classNames.series+"-"+c.alphaNumerate(o)].join(" "));for(var r=0;r<j[o].length;r++){var s,t=c.projectPoint(k,g,j[o],r);t.x+=q+p*a.seriesBarDistance,s=h[o].elem("line",{x1:t.x,y1:n.y,x2:t.x,y2:t.y},a.classNames.bar+(d.series[o].barClasses?" "+d.series[o].barClasses:""))}}}var h,i,j={axisX:{offset:10,showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop},axisY:{offset:15,showLabel:!0,showGrid:!0,labelAlign:"right",labelInterpolationFnc:c.noop,scaleMinSpace:40},width:void 0,height:void 0,high:void 0,low:void 0,chartPadding:5,seriesBarDistance:15,classNames:{chart:"ct-chart-bar",label:"ct-label",series:"ct-series",bar:"ct-bar",thin:"ct-thin",thick:"ct-thick",grid:"ct-grid",vertical:"ct-vertical",horizontal:"ct-horizontal"}};return h=c.optionsProvider(j,e,f,function(a){h=a,g(h)}),a.addEventListener("resize",function(){g(h)}),{version:c.version,update:function(){g(h)}}}}(window,document,Chartist),function(a,b,c){"use strict";c.Pie=function(b,d,e,f){function g(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function h(a){var e,f,h,i,k=[],l=a.startAngle,m=c.getDataArray(d);j=c.createSvg(b,a.width,a.height,a.classNames.chart),e=c.createChartRect(j,a,0,0),f=Math.min(e.width()/2,e.height()/2),i=a.total||m.reduce(function(a,b){return a+b},0),f-=a.donut?a.donutWidth/2:0,h=a.donut?f:f/2,h+=a.labelOffset;for(var n={x:e.x1+e.width()/2,y:e.y2+e.height()/2},o=0;o<d.series.length;o++){k[o]=j.elem("g"),k[o].addClass([a.classNames.series,d.series[o].className||a.classNames.series+"-"+c.alphaNumerate(o)].join(" "));var p=l+m[o]/i*360;p-l===360&&(p-=.01);var q=c.polarToCartesian(n.x,n.y,f,l-(0===o?0:.2)),r=c.polarToCartesian(n.x,n.y,f,p),s=180>=p-l?"0":"1",t=["M",r.x,r.y,"A",f,f,0,s,0,q.x,q.y];a.donut===!1&&t.push("L",n.x,n.y);var u=k[o].elem("path",{d:t.join(" ")},a.classNames.slice+(a.donut?" "+a.classNames.donut:""));if(a.donut===!0&&u.attr({style:"stroke-width: "+ +a.donutWidth+"px"}),a.showLabel){var v=c.polarToCartesian(n.x,n.y,h,l+(p-l)/2),w=a.labelInterpolationFnc(d.labels?d.labels[o]:m[o],o);k[o].elem("text",{dx:v.x,dy:v.y,"text-anchor":g(n,v,a.labelDirection),text:""+w},a.classNames.label).text(""+w)}l=p}}var i,j,k={width:void 0,height:void 0,chartPadding:5,classNames:{chart:"ct-chart-pie",series:"ct-series",slice:"ct-slice",donut:"ct-donut",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelInterpolationFnc:c.noop,labelOverflow:!1,labelDirection:"neutral"};return i=c.optionsProvider(k,e,f,function(a){i=a,h(i)}),a.addEventListener("resize",function(){h(i)}),{version:c.version,update:function(){h(i)}}}}(window,document,Chartist),window.hljs.initHighlightingOnLoad(),$(function(){$("[data-toggle-visible]").each(function(){var a=$(this),b=$(a.data("toggleVisible"));b.addClass("invisible"),a.on("click",function(a){b.toggleClass("invisible"),a.preventDefault()})}),$("[data-sticky]").each(function(){var a=$(this),b=a.offset().top,c=a.data("sticky")||0;$(window).on("scroll",function(){var d=$(window).scrollTop();a.css(d>b-c?{position:"relative",top:d+c-b}:{position:"",top:""})})}),$("[data-example]").each(function(){var a=$(this),b=window.atob(a.data("example"));evalChartistCode(b,a.get(0))}),$("[data-live-example]").each(function(){function a(){c&&c.update()}function b(){d||(d=window.CodeMirror.fromTextArea(f.get(0),{mode:"javascript",theme:"chartist",lineWrapping:!0,indentUnit:2,tabSize:2}),d.on("change",function(a){c=evalChartistCode(a.doc.getValue(),e.find(".ct-chart").get(0))}))}var c,d,e=$(this),f=e.find(".code-editor"),g=window.atob(e.data("liveExample"));e.find(".edit-button").on("click",function(){e.addClass("edit-mode"),a(),b()}),e.find(".close-edit-button").on("click",function(){e.removeClass("edit-mode"),a()}),f.val(g),c=evalChartistCode(g,e.find(".ct-chart").get(0))})}),$(document).foundation({topbar:{scrolltop:!1}}),function(){"use strict";var a={width:195,height:137,chartPadding:10,axisX:{offset:0,showLabel:!0,showGrid:!0,labelInterpolationFnc:function(a){return a}},axisY:{offset:5,showLabel:!0,showGrid:!0,labelInterpolationFnc:function(a){return Math.round(a/1e5)/10+"m."}}},b={labels:["1st","2nd","3rd"],series:[{data:[1283e3,15e5,5706e3]},{data:[1883e3,205e4,3706e3]}]},c=$("#chartist-guy");if(c.length>0){var d=Snap(c.get(0));Snap.load(c.data("svgSrc"),function(e){d.append(e),window.Chartist.Line(c.find("#chart-canvas").get(0),b,a)})}}();