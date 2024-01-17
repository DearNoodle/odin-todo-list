(()=>{"use strict";var e={};function t(e,t,n){"require-event"===n?t.addEventListener("click",(n=>e(n,t))):t.addEventListener("click",(()=>e(t,n)))}function n(e,t,n){t.addEventListener("input",(()=>e(t,n)))}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var i=n.getElementsByTagName("script");if(i.length)for(var o=i.length-1;o>-1&&!t;)t=i[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();let i=[{type:"Exercise",tasks:[{title:"Push Up",description:"50 times",dueDate:"2024-01-09",priority:"medium",isFinished:!1},{title:"Sidestep",description:"100 times",dueDate:"2024-01-10",priority:"low",isFinished:!0}]},{type:"Reading",tasks:[{title:"Harry Potter",description:"Good story",dueDate:"2024-03-10",priority:"low",isFinished:!0},{title:"Thermodynamic",description:"Must finish before exam!",dueDate:"2024-01-20",priority:"high",isFinished:!1}]}],o={currentProjectType:void 0};function c(){localStorage.projects=JSON.stringify(i)}const r=e.p+"32d0f4e18b5677c61adf.jpg",s=e.p+"8b6e582c35ae5f48328e.jpg",a=document.querySelector("ul.tasks");function l(e){if("string"==typeof e)var c=e;else c=e.textContent;i.forEach((e=>{if(e.type===c){for(o.currentProjectType=c;a.firstChild;)a.removeChild(a.firstChild);e.tasks.forEach(((i,o)=>{const c=document.createElement("li");c.classList.add(e.type,"task"),c.id=`task${o}`,a.appendChild(c);const l=document.createElement("label"),h=document.createElement("input");l.className="is-finished",h.type="checkbox",h.className="hidden",n(u,h,i),function(e,t){e.checked=t}(h,i.isFinished),l.appendChild(h),c.appendChild(l);const v=document.createElement("p");v.className="task-title",n(d,v,i),function(e,t){e.textContent=t}(v,i.title),c.appendChild(v);const E=document.createElement("img");E.src=s,E.className="icon-show-description",c.appendChild(E),t(f,E,c);const g=function(){const e=document.createElement("select");e.className="priority";const t=document.createElement("option");t.value="low",t.innerText="Low",e.appendChild(t);const n=document.createElement("option");n.value="medium",n.innerText="Medium",e.appendChild(n);const i=document.createElement("option");return i.value="high",i.innerText="High",e.appendChild(i),e}();n(p,g,i),function(e,t){e.value=t}(g,i.priority),c.appendChild(g);const S=document.createElement("input");S.setAttribute("type","date"),S.className="due-date",n(m,S,i),function(e,t){e.value=t}(S,i.dueDate),c.appendChild(S);const j=document.createElement("img");j.src=r,j.className="icon-remove",c.appendChild(j),t(N,j,{taskLi:c,index:o});const b=document.createElement("input");b.setAttribute("type","text"),b.className="description",b.style.display="none",n(y,b,i),function(e,t,n){n.tasks.forEach(((n,i)=>{t.id===`task${i}`&&(e.value=n.description)}))}(b,c,e),c.insertAdjacentElement("afterend",b)}))}}))}function u(e,t){t.isFinished=e.checked,c()}function d(e,t){t.name=e.value,c()}function p(e,t){t.priority=e.value,c()}function m(e,t){t.dueDate=e.value,c()}function y(e,t){t.description=e.value,c()}function f(e,t){const n=t.nextSibling;"none"===n.style.display?n.style.display="":n.style.display="none"}const h=document.querySelector("ul.project-list"),v=document.querySelector("button.show-project-form"),E=document.querySelector(".add-project"),g=document.querySelector("button.show-task-form"),S=document.querySelector(".add-task");function j(e){S!==e.target&&E!==e.target||(E.style.display="none",S.style.display="none"),"submit"===e&&(E.style.display="none",S.style.display="none")}function b(){E.style.display="flex"}function C(e){var t;(t=E.querySelector("#type").value).trim()||(t="Project"),i.push({type:t,tasks:[]}),k(t),c(),j("submit")}function k(e){const n=document.createElement("li");n.className="project",h.appendChild(n);const i=document.createElement("p");i.className="project-subtitle",i.textContent=e,n.appendChild(i),t(l,i);const o=document.createElement("span");o.className="remove-project",o.textContent="×",n.appendChild(o),t(x,o,{projectLi:n,projectSubtitle:i})}function x(e,t){t.projectLi.remove(),i.forEach((e=>{e.type===t.projectSubtitle.textContent&&(i=i.filter((t=>t!==e)))})),c()}function q(e,t){S.style.display="flex",t.classList.remove(t.classList.item(1)),t.classList.add(o.currentProjectType)}function w(e){const t=S.querySelector("#is-finished").value,n=S.querySelector("#title").value,r=S.querySelector("#description").value,s=S.querySelector("#priority").value;!function(e){const t=o.currentProjectType;i.forEach((n=>{n.type===t&&(n.tasks.push(e),l(t))})),c()}({title:n,description:r,dueDate:S.querySelector("#due-date").value,priority:s,isFinished:t}),j("submit")}function N(e,t){t.taskLi.remove(),i.forEach((e=>{e.type===o.currentProjectType&&e.tasks.splice(t.index,1)})),c()}localStorage.projects&&(console.log(i),i=JSON.parse(localStorage.projects),console.log(i)),function(){const e=document.querySelectorAll("li.project"),n=E.querySelector(".submit"),o=S.querySelector(".submit");e.forEach((e=>{t(l,e)})),i.forEach((e=>{k(e.type)})),l("Exercise"),t(b,v,void 0),t(C,n),t(q,g,o),t(w,o),t(j,document,"require-event")}()})();