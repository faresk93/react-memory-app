(this["webpackJsonpmemory-app"]=this["webpackJsonpmemory-app"]||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(20)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(3),c=n.n(s),i=n(7),o=n(4),l=n(5),d=n(8),u=n(6),h=n(9),m=n(1),f=n.n(m),g=(n(16),n(17),function(e){var t=e.card,n=e.index,a=e.feedback,s=e.onClick;return r.a.createElement("div",{className:"card ".concat(a),onClick:function(e){return s(n)}},r.a.createElement("span",{className:"symbol"},"hidden"===a?"\u2753":t))}),v=(n(18),function(e){var t=e.guesses;return r.a.createElement("div",{className:"guesses"},"N\xb0 of Guesses: ",r.a.createElement("strong",null,t))}),p=(n(19),function(e){var t=e.entries;return r.a.createElement("table",{className:"hallOfFame"},r.a.createElement("tbody",null,t.map((function(e){var t=e.id,n=e.date,a=e.guesses,s=e.player;return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"date"},n),r.a.createElement("td",{className:"guesses"},a),r.a.createElement("td",{className:"player"},s))}))))}),y=[{id:3,guesses:18,date:"10/10/2017",player:"Jane"},{id:2,guesses:23,date:"11/10/2017",player:"Kevin"},{id:1,guesses:31,date:"06/10/2017",player:"Louisa"},{id:0,guesses:48,date:"14/10/2017",player:"Marc"}],k=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={cards:n.generateCards(),currentPair:[],matchedCardsIndexes:[],guesses:0},n.handleCardClick=function(e){var t=n.state.currentPair;0!==t.length?2!==t.length&&n.handleNewPairClosedBy(e):n.setState({currentPair:[e]})},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"generateCards",value:function(){for(var e=[],t=f()("\ud83d\ude00\ud83c\udf89\ud83d\udc96\ud83c\udfa9\ud83d\udc36\ud83d\udc31\ud83e\udd84\ud83d\udc2c\ud83c\udf0d\ud83c\udf1b\ud83c\udf1e\ud83d\udcab\ud83c\udf4e\ud83c\udf4c\ud83c\udf53\ud83c\udf50\ud83c\udf5f\ud83c\udf7f");e.length<36;){var n=t.pop();e.push(n,n)}return f()(e)}},{key:"getFeedbackForCard",value:function(e){var t=this.state,n=t.currentPair,a=t.matchedCardsIndexes.includes(e);return n.length<2?a||e===n[0]?"visible":"hidden":n.includes(e)?a?"justMatched":"justMismatched":a?"visible":"hidden"}},{key:"handleNewPairClosedBy",value:function(e){var t=this,n=this.state,a=n.cards,r=n.currentPair,s=n.guesses,c=n.matchedCardsIndexes,o=[r[0],e],l=s+1,d=a[o[0]]===a[o[1]];this.setState({currentPair:o,guesses:l}),d&&this.setState({matchedCardsIndexes:[].concat(Object(i.a)(c),o)}),setTimeout((function(){return t.setState({currentPair:[]})}),750)}},{key:"render",value:function(){var e=this,t=this.state,n=t.cards,a=t.guesses,s=t.matchedCardsIndexes.length===n.length;return r.a.createElement("div",{className:"memory"},r.a.createElement(v,{guesses:a}),n.map((function(t,n){return r.a.createElement(g,{key:n,card:t,index:n,feedback:e.getFeedbackForCard(n),onClick:e.handleCardClick})})),s&&r.a.createElement(p,{entries:y}))}}]),t}(a.Component),w=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function C(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(k,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-memory-app",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/react-memory-app","/service-worker.js");w?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):C(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):C(e)}))}}()}],[[10,1,2]]]);
//# sourceMappingURL=main.7e19e420.chunk.js.map