import{g as w,A as c,d as h,l as $,i as E,a as v}from"./auth.BlHDUOiF.js";import{g as b,d as C,t as _,a as L}from"./manifest.DNU-yaKG.js";const u="https://claimsforge.onrender.com".replace(/\/+$/,"");async function l(t,e={}){const{method:a="GET",body:n}=e;let s;try{s=await fetch(`${u}${t}`,{method:a,headers:{"Content-Type":"application/json",...w()},...n!==void 0?{body:JSON.stringify(n)}:{}})}catch(i){throw new c(`Could not reach the ClaimsForge API at ${u}. (${i.message})`)}if(s.status===204)return;let o=null;try{o=await s.json()}catch{}if(!s.ok){const i=h(o)??s.statusText??`HTTP ${s.status}`;throw new c(i,s.status)}return o}async function x(t){return l("/api/presets/")}async function I(t){await l(`/api/presets/${t}/`,{method:"DELETE"})}async function S(t){return l("/api/datasets/")}const p="/",r=document.getElementById("loading-note"),B=document.getElementById("account-content"),m=document.getElementById("anon-content"),q=document.getElementById("welcome-heading"),A=document.getElementById("profile-line"),P=document.getElementById("logout-btn"),d=document.getElementById("presets-list"),T=document.getElementById("presets-empty"),y=document.getElementById("history-list"),H=document.getElementById("history-empty");function g(t){return new Date(t).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}async function f(){const t=await x();T.hidden=t.length>0,d.innerHTML=t.map(e=>`
      <div class="list-row" data-preset-id="${e.id}">
        <div class="list-row-main">
          <span class="list-row-title">${e.name}</span>
          <span class="list-row-meta">${e.line} · updated ${g(e.updated_at)}</span>
        </div>
        <div style="display:flex; gap:14px; align-items:center;">
          <a class="btn-text" href="${p}generate/${e.line}?preset=${e.id}">Use in generator</a>
          <button type="button" class="btn-text delete-preset-btn" data-id="${e.id}">Delete</button>
        </div>
      </div>`).join(""),d.querySelectorAll(".delete-preset-btn").forEach(e=>{e.addEventListener("click",async()=>{const a=Number(e.dataset.id),s=d.querySelector(`[data-preset-id="${a}"]`)?.querySelector(".list-row-title")?.textContent??"this preset";window.confirm(`Delete preset "${s}"?`)&&(await I(a),await f())})})}async function D(){const t=await S();H.hidden=t.length>0,y.innerHTML=t.map(e=>`
      <div class="list-row" data-dataset-id="${e.id}">
        <div class="list-row-main">
          <span class="list-row-title">${e.line} · seed ${e.seed} · n=${e.n.toLocaleString()}</span>
          <span class="list-row-meta">
            ${g(e.created_at)} · generator v${e.generator_version} · ${e.row_count.toLocaleString()} rows
          </span>
        </div>
        <button type="button" class="btn-text redownload-btn" data-id="${e.id}">Re-download CSV</button>
      </div>`).join(""),y.querySelectorAll(".redownload-btn").forEach(e=>{e.addEventListener("click",async()=>{const a=Number(e.dataset.id),n=t.find(o=>o.id===a);if(!n)return;const s=e.textContent;e.textContent="Regenerating…";try{const{records:o,manifest:i}=await b(n.line,{n:n.n,seed:n.seed,policyYearStart:n.policy_year_start,policyYearEnd:n.policy_year_end??void 0,severityCoefs:n.severity_coefs,frequencyCoefs:n.frequency_coefs});C(`claimsforge_${n.line}_seed${n.seed}_n${n.n}.csv`,_(o)),L(i)}catch(o){window.alert(o instanceof c?o.message:`Unexpected error: ${o}`)}finally{e.textContent=s}})})}async function k(){if(!E()){r.hidden=!0,m.hidden=!1;return}try{const t=await v();q.textContent=t.full_name?`Welcome back, ${t.full_name}`:"Your account",A.textContent=t.institution?`${t.email} · ${t.institution}`:t.email,await Promise.all([f(),D()]),r.hidden=!0,B.hidden=!1}catch{r.hidden=!0,m.hidden=!1}}P.addEventListener("click",async()=>{await $(),window.location.href=`${p}login`});k();
