(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(40)},19:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(12),u=n.n(r),i=(n(19),n(2)),c=n(3),l=function(e){var t=e.submit,n=e.name,a=e.phone,r=e.nameChange,u=e.phoneChange;return o.a.createElement("form",{onSubmit:t},o.a.createElement("div",null,"nimi:",o.a.createElement("input",{value:n,onChange:r})),o.a.createElement("div",null,"puh:",o.a.createElement("input",{value:a,onChange:u})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"}," Lis\xe4\xe4 ")))},s=function(e){var t=e.submit,n=e.filter,a=e.filterChange;return o.a.createElement("form",{onSubmit:t},o.a.createElement("div",null,"search:",o.a.createElement("input",{value:n,onChange:a})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"rajaa")))},m=function(e){var t=e.persons,n=e.buttonHandler;return t.map(function(e){return o.a.createElement("li",{key:e.id},e.name," ",e.number," ",o.a.createElement("button",{onClick:n,value:e.id},"Poista")," ")})},f=function(e){var t=e.persons,n=e.filter,a=e.buttonHandler,r=t;return n&&(r=t.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())}),console.log(r,n)),o.a.createElement(m,{persons:r,buttonHandler:a})},p=n(4),d=n.n(p),b="/api/persons",g=function(){return d.a.get(b).then(function(e){return e.data})},h=function(e){return d.a.post(b,e).then(function(e){return e.data})},v=function(e,t){return d.a.put("".concat(b,"/").concat(e),t).then(function(e){return e.data})},E=function(e){return d.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},j=(n(39),function(e){var t=e.notif,n=t.message,a=t.type;if(null===n)return null;var r={background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"},u=null;return u="note"===a?Object(i.a)({},r,{color:"green"}):Object(i.a)({},r,{color:"red"}),o.a.createElement("div",{style:u},n)}),y=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],r=t[1],u=Object(a.useState)(""),m=Object(c.a)(u,2),p=m[0],d=m[1],b=Object(a.useState)(""),y=Object(c.a)(b,2),O=y[0],w=y[1],C=Object(a.useState)(""),k=Object(c.a)(C,2),S=k[0],x=k[1],L=Object(a.useState)(""),T=Object(c.a)(L,2),H=T[0],B=T[1],D=Object(a.useState)({message:null,type:null}),I=Object(c.a)(D,2),J=I[0],P=I[1];Object(a.useEffect)(function(){g().then(function(e){r(e)})},[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),o.a.createElement(j,{notif:J}),o.a.createElement(s,{submit:function(e){e.preventDefault(),x(H),B("")},filter:H,filterChange:function(e){B(e.target.value)}}),o.a.createElement("p",null,"----------------------------"),o.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),o.a.createElement(l,{submit:function(e){if(e.preventDefault(),n.findIndex(function(e){return e.name.toLowerCase()===p.toLowerCase()})>-1){if(window.confirm("nimell\xe4  ".concat(p," jo k\xe4yt\xf6ss\xe4 numero, haluatko korvata sen?"))){var t=n.find(function(e){return e.name===p}).id,a={name:p,number:O};v(t,a).catch(function(e){P({message:"p\xe4ivitys ep\xe4onnistui, p\xe4ivit\xe4 sivu uudelleen",type:"error"}),setTimeout(function(){return P(Object(i.a)({},J,{message:null}))},5e3)}),r(n.concat(a)),g().then(function(e){r(e)}),P({message:"p\xe4ivitys onnistui",type:"note"}),setTimeout(function(){P(Object(i.a)({},J,{message:null}))},5e3)}}else{var o={name:p,number:O},u={message:"Henkil\xf6 ".concat(o.name," lis\xe4tty"),type:"note"};P(u),setTimeout(function(){return P(Object(i.a)({},J,{message:null}))},5e3),h(o).then(g().then(function(e){r(e)})).catch(function(e){P({message:"lis\xe4\xe4minen ep\xe4onnistui",type:"error"}),setTimeout(function(){P(Object(i.a)({},J,{message:null}))},5e3)}),d(""),w("")}},name:p,nameChange:function(e){d(e.target.value)},phone:O,phoneChange:function(e){w(e.target.value)}}),o.a.createElement("h2",null,"Numerot"),o.a.createElement(f,{persons:n,filter:S,buttonHandler:function(e){var t=e.target.value,a=n.find(function(e){return e.id==t});if(console.log(a),window.confirm("poistetaanko")){E(t).catch(function(e){P({message:"poistaminen ep\xe4onnistui, p\xe4ivit\xe4 sivu tai yrit\xe4 uudestaan",type:"error"}),setTimeout(function(){P(Object(i.a)({},J,{message:null}))},5e3)});var o=n.filter(function(e){return e.id!=t});r(o),P({message:"henkil\xf6  poistettu",type:"note"}),setTimeout(function(){P(Object(i.a)({},J,{message:null}))},5e3)}}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.f97f6e26.chunk.js.map