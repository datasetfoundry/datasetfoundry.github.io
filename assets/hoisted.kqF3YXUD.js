import{A as f,i as L,g as E}from"./hoisted.D-sTwJnO.js";import{a as B,l as c,g as h,r as _,b as C,c as x}from"./institution.Bm0J0IiV.js";const o=document.getElementById("loading-note"),S=document.getElementById("institution-content"),g=document.getElementById("not-admin-content"),b=document.getElementById("anon-content"),v=document.getElementById("institution-heading"),M=document.getElementById("institution-subline"),A=document.getElementById("seats-used-value"),D=document.getElementById("seats-remaining-value"),P=document.getElementById("seats-limit-value"),R=document.getElementById("pooled-balance"),j=document.getElementById("invoices-list"),N=document.getElementById("invoices-empty"),U=document.getElementById("audit-log-list"),q=document.getElementById("audit-log-empty"),H=document.getElementById("members-seat-count"),l=document.getElementById("members-list"),y=document.getElementById("add-member-form"),m=document.getElementById("add-member-status"),d=document.getElementById("add-member-btn");function r(e){return new Date(e).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function O(e){q.hidden=e.length>0,U.innerHTML=e.map(t=>`
      <div class="list-row">
        <div class="list-row-main">
          <span class="list-row-title">${t.email}</span>
          <span class="list-row-meta">
            ${t.action==="regenerate"?"Regenerated":"Generated"} ${t.rows.toLocaleString()} rows · ${r(t.created_at)}
          </span>
        </div>
      </div>`).join("")}function T(e){N.hidden=e.length>0,j.innerHTML=e.map(t=>{const s=t.status==="paid"?`Paid ${t.paid_at?r(t.paid_at):""}`:"Pending",a=t.status==="paid"?"stat-ok":"";return`
      <div class="list-row">
        <div class="list-row-main">
          <span class="list-row-title">${t.po_reference} — &#8373;${t.amount_ghs.toLocaleString()}</span>
          <span class="list-row-meta">
            ${t.rows_granted.toLocaleString()} rows · raised ${r(t.created_at)}
          </span>
        </div>
        <span class="${a}">${s}</span>
      </div>`}).join("")}function I(e){v.textContent=e.name||"Institution dashboard",M.textContent=e.is_active?e.billing_email:`${e.billing_email} — inactive`,A.textContent=`${e.seats_used.toLocaleString()} / ${e.seat_limit.toLocaleString()}`,D.textContent=e.seats_available.toLocaleString(),P.textContent=e.seat_limit.toLocaleString(),R.textContent=`${e.row_balance.toLocaleString()} rows remaining in the pooled wallet`,H.textContent=`${e.seats_used.toLocaleString()} of ${e.seat_limit.toLocaleString()} seats used · ${e.seats_available.toLocaleString()} remaining`}async function $(){I(await h())}function u(e){l.innerHTML=e.map(t=>`
      <div class="list-row" data-membership-id="${t.id}">
        <div class="list-row-main">
          <span class="list-row-title">${t.full_name||t.email}</span>
          <span class="list-row-meta">
            ${t.email} · ${t.role==="admin"?"Admin":"Member"} · joined ${r(t.created_at)}
          </span>
        </div>
        <button type="button" class="btn-text remove-member-btn" data-id="${t.id}"
          >Remove</button
        >
      </div>`).join(""),l.querySelectorAll(".remove-member-btn").forEach(t=>{t.addEventListener("click",async()=>{const s=Number(t.dataset.id),n=l.querySelector(`[data-membership-id="${s}"]`)?.querySelector(".list-row-meta")?.textContent?.trim()??"this member";if(!window.confirm(`Remove ${n} from your institution?`))return;const w=t.textContent;t.disabled=!0,t.textContent="Removing…";try{await _(s);const[i]=await Promise.all([c(),$()]);u(i)}catch(i){window.alert(i instanceof f?i.message:`Unexpected error: ${i}`),t.disabled=!1,t.textContent=w}})})}function p(e,t){m.textContent=e,m.className=`form-status is-visible form-status-${t}`}y.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("member-email").value.trim(),s=document.getElementById("member-role").value;m.className="form-status",d.disabled=!0;const a=d.textContent;d.textContent="Adding…";try{await B(t,s),y.reset(),p(`Added ${t}.`,"success");const[n]=await Promise.all([c(),$()]);u(n)}catch(n){p(n instanceof f?n.message:`Unexpected error: ${n}`,"error")}finally{d.disabled=!1,d.textContent=a}});async function V(){if(!L()){o.hidden=!0,b.hidden=!1;return}let e;try{e=await E()}catch{o.hidden=!0,b.hidden=!1;return}if(!e.is_institution_admin){o.hidden=!0,g.hidden=!1;return}try{const[t,s,a,n]=await Promise.all([h(),C(),c(),x()]);I(t),T(s),u(a),O(n),o.hidden=!0,S.hidden=!1}catch{o.hidden=!0,g.hidden=!1}}V();
