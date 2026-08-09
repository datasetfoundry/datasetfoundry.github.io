import{A as f,i as B,g as L}from"./hoisted.D-sTwJnO.js";import{a as E,l as u,g as w,r as _,b as C,c as x}from"./institution.Bm0J0IiV.js";const r=document.getElementById("loading-note"),S=document.getElementById("institution-content"),h=document.getElementById("not-admin-content"),y=document.getElementById("anon-content"),v=document.getElementById("institution-heading"),M=document.getElementById("institution-subline"),A=document.getElementById("seats-used-value"),D=document.getElementById("seats-remaining-value"),R=document.getElementById("seats-limit-value"),T=document.getElementById("pooled-balance"),N=document.getElementById("renewal-line"),O=document.getElementById("threshold-banner"),P=document.getElementById("threshold-banner-heading"),U=document.getElementById("threshold-banner-message"),j=document.getElementById("invoices-list"),k=document.getElementById("invoices-empty"),H=document.getElementById("audit-log-list"),q=document.getElementById("audit-log-empty"),V=document.getElementById("members-seat-count"),m=document.getElementById("members-list"),b=document.getElementById("add-member-form"),c=document.getElementById("add-member-status"),d=document.getElementById("add-member-btn");function l(e){return new Date(e).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Y(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function F(e){const[t,n,s]=e.split("-").map(Number),a=new Date(t,n-1,s).getTime(),i=new Date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime();return Math.round((a-o)/(1e3*60*60*24))}function G(e){const t=F(e),n=Y(e);return t>1?`Renews in ${t} days (${n})`:t===1?`Renews tomorrow (${n})`:t===0?`Renews today (${n})`:`Renewal processing — was due ${n}`}function z(e){O.hidden=e===null,e!==null&&(P.textContent=e>=95?"Your pooled wallet is almost out of rows.":"Your pooled wallet is running low.",U.textContent=`This institution has used over ${e}% of its annual allotment for this period. An admin should arrange a top-up or the next invoice before the pool runs out.`)}function J(e){q.hidden=e.length>0,H.innerHTML=e.map(t=>`
      <div class="list-row">
        <div class="list-row-main">
          <span class="list-row-title">${t.email}</span>
          <span class="list-row-meta">
            ${t.action==="regenerate"?"Regenerated":"Generated"} ${t.rows.toLocaleString()} rows · ${l(t.created_at)}
          </span>
        </div>
      </div>`).join("")}function K(e){k.hidden=e.length>0,j.innerHTML=e.map(t=>{const n=t.status==="paid"?`Paid ${t.paid_at?l(t.paid_at):""}`:"Pending",s=t.status==="paid"?"stat-ok":"",a=t.kind==="base_license"?"Base license":"Overage";return`
      <div class="list-row">
        <div class="list-row-main">
          <span class="list-row-title">${t.po_reference} — &#8373;${t.amount_ghs.toLocaleString()}</span>
          <span class="list-row-meta">
            ${a} · ${t.rows_granted.toLocaleString()} rows · raised ${l(t.created_at)}
          </span>
        </div>
        <span class="${s}">${n}</span>
      </div>`}).join("")}function $(e){v.textContent=e.name||"Institution dashboard",M.textContent=e.is_active?e.billing_email:`${e.billing_email} — inactive`,A.textContent=`${e.seats_used.toLocaleString()} / ${e.seat_limit.toLocaleString()}`,D.textContent=e.seats_available.toLocaleString(),R.textContent=e.seat_limit.toLocaleString(),T.textContent=`${e.row_balance.toLocaleString()} rows remaining in the pooled wallet`,N.textContent=G(e.renewal_date),z(e.last_threshold_alert_pct),V.textContent=`${e.seats_used.toLocaleString()} of ${e.seat_limit.toLocaleString()} seats used · ${e.seats_available.toLocaleString()} remaining`}async function I(){$(await w())}function g(e){m.innerHTML=e.map(t=>`
      <div class="list-row" data-membership-id="${t.id}">
        <div class="list-row-main">
          <span class="list-row-title">${t.full_name||t.email}</span>
          <span class="list-row-meta">
            ${t.email} · ${t.role==="admin"?"Admin":"Member"} · joined ${l(t.created_at)}
          </span>
        </div>
        <button type="button" class="btn-text remove-member-btn" data-id="${t.id}"
          >Remove</button
        >
      </div>`).join(""),m.querySelectorAll(".remove-member-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=Number(t.dataset.id),a=m.querySelector(`[data-membership-id="${n}"]`)?.querySelector(".list-row-meta")?.textContent?.trim()??"this member";if(!window.confirm(`Remove ${a} from your institution?`))return;const i=t.textContent;t.disabled=!0,t.textContent="Removing…";try{await _(n);const[o]=await Promise.all([u(),I()]);g(o)}catch(o){window.alert(o instanceof f?o.message:`Unexpected error: ${o}`),t.disabled=!1,t.textContent=i}})})}function p(e,t){c.textContent=e,c.className=`form-status is-visible form-status-${t}`}b.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("member-email").value.trim(),n=document.getElementById("member-role").value;c.className="form-status",d.disabled=!0;const s=d.textContent;d.textContent="Adding…";try{await E(t,n),b.reset(),p(`Added ${t}.`,"success");const[a]=await Promise.all([u(),I()]);g(a)}catch(a){p(a instanceof f?a.message:`Unexpected error: ${a}`,"error")}finally{d.disabled=!1,d.textContent=s}});async function Q(){if(!B()){r.hidden=!0,y.hidden=!1;return}let e;try{e=await L()}catch{r.hidden=!0,y.hidden=!1;return}if(!e.is_institution_admin){r.hidden=!0,h.hidden=!1;return}try{const[t,n,s,a]=await Promise.all([w(),C(),u(),x()]);$(t),K(n),g(s),J(a),r.hidden=!0,S.hidden=!1}catch{r.hidden=!0,h.hidden=!1}}Q();
