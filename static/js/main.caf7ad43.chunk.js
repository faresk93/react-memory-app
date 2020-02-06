(this["webpackJsonpmemory-app"]=this["webpackJsonpmemory-app"]||[]).push([[0],{16:function(e,t,a){e.exports=a(28)},22:function(e,t,a){},23:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(12),c=a.n(s),i=a(15),l=a(10),o=a(2),m=a(3),u=a(6),d=a(4),f=a(7),h=a(8),g=a.n(h),p=(a(22),a(23),function(e){var t=e.card,a=e.index,n=e.feedback,s=e.difficulty,c=e.onClick,i=function(e){switch(e){case 2:return"easy";case 4:return"medium";case 6:return"hard";default:return"medium"}}(s);return r.a.createElement("div",{className:"flip-card ".concat(n," ").concat(i),onClick:function(e){return c(a,e)}},r.a.createElement("div",{className:"flip-card-inner ".concat("hidden"!==n&&"flipped")},r.a.createElement("div",{className:"flip-card-front"},r.a.createElement("span",{className:"symbol"},"\u2753")),r.a.createElement("div",{className:"flip-card-back"},r.a.createElement("span",{className:"symbol"},t))))}),v=(a(24),function(e){var t=e.guesses;return r.a.createElement("div",{className:"guesses ml-2"},"N\xb0 of Guesses: ",r.a.createElement("strong",{className:"text-white bg-dark p-2"},t))}),E=(a(25),function(e){var t=e.entries;return r.a.createElement("div",{className:"w-100"},r.a.createElement("div",{className:"alert alert-success w-100 text-center"},"Won !"),r.a.createElement("table",{className:"hallOfFame"},r.a.createElement("thead",null,r.a.createElement("th",null,"Date"),r.a.createElement("th",null,"Guesses"),r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Time")),r.a.createElement("tbody",null,t.map((function(e){var t=e.id,a=e.date,n=e.guesses,s=e.player,c=e.time;return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"date"},a),r.a.createElement("td",{className:"guesses"},n),r.a.createElement("td",{className:"player"},s),r.a.createElement("td",{className:"time"},c))})))))});function y(e,t){e.date=(new Date).toLocaleDateString(),e.id=Date.now();var a=JSON.parse(localStorage.getItem("::Memory::HallofFame")||"[]"),n=a.findIndex((function(t){return t.guesses>=e.guesses}));-1===n?a.push(e):a.splice(n,0,e),a.length>10&&a.splice(10,a.length),localStorage.setItem("::Memory::HallofFame",JSON.stringify(a)),t(a)}var w=a(30),b=(a(26),function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={winner:""},a.handleWinnerUpdate=function(e){a.setState({winner:e.target.value.toUpperCase()})},a.persistWinner=function(e){e.preventDefault();var t=a.props.time,n=Math.floor(t/1e3)%60+"s",r={guesses:a.props.guesses,player:a.state.winner,time:n};console.log(a.props.time),y(r,a.props.onStored)},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("form",{className:"highScoreInput",onSubmit:this.persistWinner},r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("span",{className:"badge badge-success"},"Good Work")," ! Enter your name :",r.a.createElement("input",{className:"form-control",type:"text",autoComplete:"given-name",value:this.state.winner,onChange:this.handleWinnerUpdate})),r.a.createElement(w.a,{variant:"success",type:"submit"},"I won")))}}]),t}(n.Component)),N=function(e){var t=e.timerTime,a=Math.floor(t/1e3)%60,n=Math.floor(t/6e4)%60,s=Math.floor(t/36e5);return r.a.createElement("div",{className:"timer-time"},s>=1&&s+"h : ",n>=1&&n+"m : ",a>=0&&a+"s")},S={cards:[],currentPair:[],matchedCardsIndexes:[],guesses:0,difficulty:4,hallOfFame:null,gameStart:!1,gameStarted:!1,timer:null,timerOn:!1,timerStart:0,timerTime:0,countDown:3},k=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).refTest=r.a.createRef(),a.startGame=function(){a.setState({gameStart:!0,gameStarted:!1,countDown:3}),a.countDown=setInterval((function(){a.setState({countDown:a.state.countDown-1})}),1e3),setTimeout((function(){a.setState({gameStarted:!0}),a.startTimer(),clearInterval(a.countDown)}),3e3)},a.startTimer=function(){clearInterval(a.timer),a.setState({timerOn:!0,timerTime:a.state.timerTime,timerStart:Date.now()-a.state.timerTime}),a.timer=setInterval((function(){a.setState({timerTime:Date.now()-a.state.timerStart})}),10),console.log("timer",a.timer)},a.displayHOF=function(e){a.setState({hallOfFame:e})},a.onHandleDifficulty=function(e){var t=+e.target.value;a.setState(Object(l.a)({},S,{difficulty:t,cards:a.generateCards(t),gameStart:!0})),a.startGame()},a.handleCardClick=function(e,t){var n=a.state.currentPair;0!==n.length?2!==n.length&&a.handleNewPairClosedBy(e,t):a.setState({currentPair:[e]})},a.state=Object(l.a)({},S,{cards:a.generateCards(4)}),a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){}},{key:"generateCards",value:function(e){for(var t=Math.pow(e,2),a=[],n=g()("\ud83d\ude00\ud83c\udf89\ud83d\udc96\ud83c\udfa9\ud83d\udc36\ud83d\udc31\ud83e\udd84\ud83d\udc2c\ud83c\udf0d\ud83c\udf1b\ud83c\udf1e\ud83d\udcab\ud83c\udf4e\ud83c\udf4c\ud83c\udf53\ud83c\udf50\ud83c\udf5f\ud83c\udf7f");a.length<t;){var r=n.pop();a.push(r,r)}return g()(a)}},{key:"getFeedbackForCard",value:function(e){if(this.state.gameStarted){var t=this.state,a=t.currentPair,n=t.matchedCardsIndexes.includes(e);return a.length<2?n||e===a[0]?"visible":"hidden":a.includes(e)?n?"justMatched":"justMismatched":n?"visible":"hidden"}return"visible"}},{key:"handleNewPairClosedBy",value:function(e,t){var a=this,n=this.state,r=n.cards,s=n.currentPair,c=n.guesses;n.matchedCardsIndexes;if(s[0]!==e){var l=[s[0],e],o=c+1,m=r[l[0]]===r[l[1]];this.setState({currentPair:l,guesses:o}),m&&this.setState((function(e,t){return{matchedCardsIndexes:[].concat(Object(i.a)(e.matchedCardsIndexes),l)}}),(function(){a.state.matchedCardsIndexes.length===r.length&&(console.log("won",a.timer),clearInterval(a.timer))})),setTimeout((function(){return a.setState({currentPair:[]})}),750)}}},{key:"render",value:function(){var e=this,t=this.state,a=t.cards,n=t.guesses,s=t.matchedCardsIndexes,c=t.hallOfFame,i=s.length===a.length;return r.a.createElement("div",{ref:this.refTest},this.state.gameStart?r.a.createElement("div",{className:"game-board"},r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"title"},r.a.createElement("h1",null,"Tic-Tac-Toe"),r.a.createElement("span",null,"Game")),r.a.createElement("div",{className:"logo"},r.a.createElement("img",{src:"https://talan.com/typo3conf/ext/subtheme_t3kit_talan/Resources/Public/Images/logo-talan.png",alt:"logo-Talan"}))),r.a.createElement("div",{className:"memory mt-5"},r.a.createElement("div",{className:"fares"},r.a.createElement("h1",null,"By Fares")),r.a.createElement("div",{className:"w-100 mb-3"},r.a.createElement("div",{className:"d-flex"},r.a.createElement("label",{className:"w-50 my-auto"},r.a.createElement("span",{className:"badge badge-light difficulty"},"Memory Level: ")),r.a.createElement("select",{className:"form-control",style:{cursor:"pointer"},onChange:this.onHandleDifficulty,value:this.state.difficulty},r.a.createElement("option",{value:"2"},"Turtle"),r.a.createElement("option",{value:"4"},"Elephant"),r.a.createElement("option",{value:"6"},"Dolphin")))),r.a.createElement(v,{guesses:n}),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"timer"},this.state.timerOn?r.a.createElement(N,{timerTime:this.state.timerTime}):r.a.createElement("span",null,this.state.countDown)),a.map((function(t,a){return r.a.createElement(p,{key:a,card:t,index:a,difficulty:e.state.difficulty,feedback:e.getFeedbackForCard(a),onClick:e.handleCardClick})}))),i&&(c?r.a.createElement(E,{entries:c}):r.a.createElement(b,{time:this.state.timerTime,guesses:n,onStored:this.displayHOF})))):r.a.createElement("div",{className:"game-start"},r.a.createElement("div",{className:"start-button",onClick:this.startGame},"Start Game")))}}]),t}(n.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}a(27);c.a.render(r.a.createElement(k,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-memory-app",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/react-memory-app","/service-worker.js");C?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):O(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):O(e)}))}}()}},[[16,1,2]]]);
//# sourceMappingURL=main.caf7ad43.chunk.js.map