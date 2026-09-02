import{A as u,i as z,g as V}from"./hoisted.D7OLYgLY.js";import{r as R,a as B,g as O,b as W,c as $,i as G,u as Y,d as K,e as J,l as Q,f as X,h as Z}from"./institution.6pF6DGfd.js";import{l as ee}from"./payments.CVNhoiV5.js";import{S as j,h as te,c as ne}from"./support.CJ5txx9f.js";const g=document.getElementById("loading-note"),ae=document.getElementById("institution-content"),N=document.getElementById("not-admin-content"),T=document.getElementById("anon-content"),oe=document.getElementById("institution-heading"),se=document.getElementById("institution-subline"),ie=document.getElementById("seats-used-value"),re=document.getElementById("seats-remaining-value"),ce=document.getElementById("seats-limit-value"),le=document.getElementById("pooled-balance"),de=document.getElementById("renewal-line"),ue=document.getElementById("threshold-banner"),me=document.getElementById("threshold-banner-heading"),pe=document.getElementById("threshold-banner-message"),c=document.getElementById("invoices-list"),ge=document.getElementById("invoices-empty"),h=document.getElementById("invoices-status"),fe=document.getElementById("audit-log-list"),be=document.getElementById("audit-log-empty"),ye=document.getElementById("members-seat-count"),y=document.getElementById("members-list"),A=document.getElementById("add-member-form"),S=document.getElementById("add-member-status"),f=document.getElementById("add-member-btn"),he=document.getElementById("threshold-banner-cta"),m=document.getElementById("request-topup-form"),we=document.getElementById("request-topup-pending-note"),v=document.getElementById("topup-rows"),M=document.getElementById("topup-price-preview"),_=document.getElementById("request-topup-status"),b=document.getElementById("request-topup-btn");let L=null;function w(t){return new Date(t).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function $e(t){const[e,n,s]=t.split("-").map(Number);return new Date(e,n-1,s).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function ve(t){const[e,n,s]=t.split("-").map(Number),a=new Date(e,n-1,s).getTime(),i=new Date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime();return Math.round((a-o)/(1e3*60*60*24))}function xe(t){const e=ve(t),n=$e(t);return e>1?`Renews in ${e} days (${n})`:e===1?`Renews tomorrow (${n})`:e===0?`Renews today (${n})`:`Renewal processing — was due ${n}`}function Ce(t){ue.hidden=t===null,t!==null&&(me.textContent=t>=95?"Your pooled wallet is almost out of rows.":"Your pooled wallet is running low.",pe.textContent=`This institution has used over ${t}% of its annual allotment for this period.`)}he.addEventListener("click",()=>{document.getElementById("request-topup-section")?.scrollIntoView({behavior:"smooth",block:"start"}),m.hidden||v.focus()});function Ee(t){be.hidden=t.length>0,fe.innerHTML=t.map(e=>`
      <div class="list-row">
        <div class="list-row-main">
          <span class="list-row-title">${e.email}</span>
          <span class="list-row-meta">
            ${e.action==="regenerate"?"Regenerated":"Generated"} ${e.rows.toLocaleString()} rows · ${w(e.created_at)}
          </span>
        </div>
      </div>`).join("")}function U(t,e){h.textContent=t,h.className=`form-status is-visible form-status-${e}`}function Ie(t){const e=`PO ${t.po_reference} settlement`,n=`Hi, I'd like to arrange bank transfer/PO settlement for invoice ${t.po_reference} (₵${t.amount_ghs.toLocaleString()}).`;return`mailto:${j}?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(n)}`}function Se(t){if(!te())return null;const e=`Hi, I'd like to arrange bank transfer/PO settlement for invoice ${t.po_reference} (₵${t.amount_ghs.toLocaleString()}).`;return`https://wa.me/${ne}?text=${encodeURIComponent(e)}`}function q(t){ge.hidden=t.length>0,c.innerHTML=t.map(e=>{const n=e.status==="paid"?`Paid ${e.paid_at?w(e.paid_at):""}`:e.status==="cancelled"?"Cancelled":"Pending",s=e.status==="paid"?"stat-ok":"",a=e.kind==="base_license"?"Base license":"Overage",i=e.status==="pending"?`<button type="button" class="btn-text pay-invoice-btn" data-id="${e.id}"
                >Pay now</button
              >`:"",o=e.status==="pending"?`<button type="button" class="btn-text toggle-receipt-btn" data-id="${e.id}"
                >Bank transfer / receipt</button
              >`:"",l=e.status==="pending"?`<button type="button" class="btn-text cancel-invoice-btn" data-id="${e.id}"
                >Cancel</button
              >`:"",d=Se(e),r=e.receipts&&e.receipts.length>0?e.receipts[0]:null,p=r?r.status==="accepted"?"Receipt accepted.":r.status==="rejected"?`Receipt rejected: ${r.rejection_reason}`:"Receipt uploaded — awaiting review.":"",P=r?.status==="pending",F=e.status==="pending"?`
      <div
        class="muted"
        data-receipt-panel="${e.id}"
        hidden
        style="padding: 4px 0 16px; font-size: 0.85rem;"
      >
        <p style="margin: 0 0 8px;">
          Settling by bank transfer or PO? Email
          <a href="${Ie(e)}">${j}</a>${d?` or <a href="${d}">message us on WhatsApp</a>`:""}
          quoting reference <strong>${e.po_reference}</strong> for
          &#8373;${e.amount_ghs.toLocaleString()}. Once it's paid on
          your end, attach a receipt below as evidence for our team to
          confirm against.
        </p>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <input
            type="file"
            class="receipt-file-input"
            data-id="${e.id}"
            accept="image/*,application/pdf"
            ${P?"disabled":""}
          />
          <button
            type="button"
            class="btn-text upload-receipt-btn"
            data-id="${e.id}"
            ${P?"disabled":""}
            >Upload receipt</button
          >
          <span
            class="receipt-upload-status muted"
            data-id="${e.id}"
            style="font-size: 0.78rem;"
            >${p}</span
          >
        </div>
      </div>`:"";return`
      <div class="list-row" data-invoice-id="${e.id}">
        <div class="list-row-main">
          <span class="list-row-title">${e.po_reference} — &#8373;${e.amount_ghs.toLocaleString()}</span>
          <span class="list-row-meta">
            ${a} · ${e.rows_granted.toLocaleString()} rows · raised ${w(e.created_at)}
          </span>
        </div>
        <div class="invoice-status-group">
          <span class="${s}">${n}</span>
          ${i}
          ${o}
          ${l}
        </div>
      </div>${F}`}).join(""),c.querySelectorAll(".pay-invoice-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=Number(e.dataset.id);h.className="form-status";const s=e.textContent;e.disabled=!0,e.textContent="Redirecting to Paystack…";try{const a=await G(n);window.location.href=a.authorization_url}catch(a){U(a instanceof u?a.message:`Unexpected error: ${a}`,"error"),e.disabled=!1,e.textContent=s}})}),c.querySelectorAll(".toggle-receipt-btn").forEach(e=>{e.addEventListener("click",()=>{const n=c.querySelector(`[data-receipt-panel="${e.dataset.id}"]`);n&&(n.hidden=!n.hidden)})}),c.querySelectorAll(".upload-receipt-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=Number(e.dataset.id),s=c.querySelector(`.receipt-file-input[data-id="${n}"]`),a=c.querySelector(`.receipt-upload-status[data-id="${n}"]`),i=s?.files?.[0];if(!i){a&&(a.textContent="Choose a file first.");return}const o=e.textContent;e.disabled=!0,e.textContent="Uploading…",a&&(a.textContent="");try{await Y(n,i),a&&(a.textContent="Receipt uploaded — awaiting review."),s&&(s.value=""),s&&(s.disabled=!0),e.textContent=o;return}catch(l){a&&(a.textContent=l instanceof u?l.message:`Unexpected error: ${l}`)}e.disabled=!1,e.textContent=o})}),c.querySelectorAll(".cancel-invoice-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=Number(e.dataset.id),a=c.querySelector(`[data-invoice-id="${n}"]`)?.querySelector(".list-row-title")?.textContent??"this invoice";if(!window.confirm(`Cancel ${a}? This can't be undone, but you'll be able to request a new top-up right away.`))return;h.className="form-status";const i=e.textContent;e.disabled=!0,e.textContent="Cancelling…";try{await K(n);const[o]=await Promise.all([B(),C()]);q(o),k(o)}catch(o){U(o instanceof u?o.message:`Unexpected error: ${o}`,"error"),e.disabled=!1,e.textContent=i}})})}function k(t){const e=t.some(n=>n.status==="pending");m.hidden=e,we.hidden=!e}function I(t,e){_.textContent=t,_.className=`form-status is-visible form-status-${e}`}function x(){const t=Math.floor(Number(v.value)),e=new FormData(m).get("settlement_intent");if(!L||!Number.isInteger(t)||t<1){M.textContent="";return}const n=Z(t,L).toFixed(2);M.textContent=e==="invoice_po"?`An invoice for ₵${n} will be created — settle it via bank transfer/PO below.`:`₵${n} — you'll be redirected to Paystack to pay now.`}v.addEventListener("input",x);m.querySelectorAll('input[name="settlement_intent"]').forEach(t=>t.addEventListener("change",x));m.addEventListener("submit",async t=>{t.preventDefault();const e=Math.floor(Number(v.value)),n=new FormData(m).get("settlement_intent");if(!Number.isInteger(e)||e<1){I("Enter a whole number of at least 1 row.","error");return}_.className="form-status",b.disabled=!0;const s=b.textContent;b.textContent=n==="self_serve"?"Redirecting to Paystack…":"Requesting…";try{if(n==="self_serve"){const i=await R(e,"self_serve");window.location.href=i.authorization_url;return}await R(e,"invoice_po"),m.reset(),x(),I("Top-up requested — settle it via bank transfer/PO from the invoice below.","success");const[a]=await Promise.all([B(),C()]);q(a),k(a)}catch(a){I(a instanceof u?a.message:`Unexpected error: ${a}`,"error")}finally{b.disabled=!1,b.textContent=s}});function H(t){oe.textContent=t.name||"Institution dashboard",se.textContent=t.is_active?t.billing_email:`${t.billing_email} — inactive`,ie.textContent=`${t.seats_used.toLocaleString()} / ${t.seat_limit.toLocaleString()}`,re.textContent=t.seats_available.toLocaleString(),ce.textContent=t.seat_limit.toLocaleString(),le.textContent=`${t.row_balance.toLocaleString()} rows remaining in the pooled wallet`,de.textContent=xe(t.renewal_date),Ce(t.last_threshold_alert_pct),ye.textContent=`${t.seats_used.toLocaleString()} of ${t.seat_limit.toLocaleString()} seats used · ${t.seats_available.toLocaleString()} remaining`}async function C(){H(await O())}function _e(t){return t===null?"Uncapped":`Cap: ${t.toLocaleString()} rows`}function E(t){y.innerHTML=t.map(e=>`
      <div class="list-row" data-membership-id="${e.id}">
        <div class="list-row-main">
          <span class="list-row-title">${e.full_name||e.email}</span>
          <span class="list-row-meta">
            ${e.email} · ${e.role==="admin"?"Admin":"Member"} · joined ${w(e.created_at)}
          </span>
        </div>
        <div class="member-actions-group">
          <span class="list-row-meta member-cap-label">${_e(e.row_cap)}</span>
          <button type="button" class="btn-text edit-cap-btn" data-id="${e.id}" data-cap="${e.row_cap??""}"
            >Edit cap</button
          >
          <button type="button" class="btn-text remove-member-btn" data-id="${e.id}"
            >Remove</button
          >
        </div>
      </div>`).join(""),y.querySelectorAll(".remove-member-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=Number(e.dataset.id),a=y.querySelector(`[data-membership-id="${n}"]`)?.querySelector(".list-row-meta")?.textContent?.trim()??"this member";if(!window.confirm(`Remove ${a} from your institution?`))return;const i=e.textContent;e.disabled=!0,e.textContent="Removing…";try{await J(n);const[o]=await Promise.all([$(),C()]);E(o)}catch(o){window.alert(o instanceof u?o.message:`Unexpected error: ${o}`),e.disabled=!1,e.textContent=i}})}),y.querySelectorAll(".edit-cap-btn").forEach(e=>{e.addEventListener("click",()=>Le(e))})}function Le(t){const e=Number(t.dataset.id),n=t.dataset.cap?Number(t.dataset.cap):null,a=y.querySelector(`[data-membership-id="${e}"]`)?.querySelector(".member-actions-group");if(!a)return;async function i(){E(await $())}a.innerHTML=`
      <input
        type="number"
        class="cap-edit-input"
        min="1"
        step="1"
        placeholder="Uncapped"
        value="${n??""}"
        style="width: 90px;"
      />
      <button type="button" class="btn-text cap-save-btn">Save</button>
      <button type="button" class="btn-text cap-cancel-btn">Cancel</button>
    `;const o=a.querySelector(".cap-edit-input");o.focus(),a.querySelector(".cap-cancel-btn")?.addEventListener("click",i),a.querySelector(".cap-save-btn")?.addEventListener("click",async()=>{const l=o.value.trim(),d=l===""?null:Number(l);if(d!==null&&(!Number.isInteger(d)||d<1)){window.alert("Row cap must be a whole number of at least 1, or blank for uncapped.");return}const r=a.querySelector(".cap-save-btn");r.disabled=!0,r.textContent="Saving…";try{await X(e,d),await i()}catch(p){window.alert(p instanceof u?p.message:`Unexpected error: ${p}`),r.disabled=!1,r.textContent="Save"}})}function D(t,e){S.textContent=t,S.className=`form-status is-visible form-status-${e}`}A.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("member-email").value.trim(),n=document.getElementById("member-role").value,s=document.getElementById("member-row-cap").value.trim(),a=s===""?void 0:Number(s);S.className="form-status",f.disabled=!0;const i=f.textContent;f.textContent="Adding…";try{await W(e,n,a),A.reset(),D(`Added ${e}.`,"success");const[o]=await Promise.all([$(),C()]);E(o)}catch(o){D(o instanceof u?o.message:`Unexpected error: ${o}`,"error")}finally{f.disabled=!1,f.textContent=i}});async function Be(){if(!z()){g.hidden=!0,T.hidden=!1;return}let t;try{t=await V()}catch{g.hidden=!0,T.hidden=!1;return}if(!t.is_institution_admin){g.hidden=!0,N.hidden=!1;return}const e=ee().then(n=>n.packs.find(s=>s.key==="bulk")).catch(()=>{});try{const[n,s,a,i,o]=await Promise.all([O(),B(),$(),Q(),e]);o&&(L={rows:o.rows,amount_ghs:o.amount_ghs}),H(n),q(s),E(a),Ee(i),k(s),x(),g.hidden=!0,ae.hidden=!1}catch{g.hidden=!0,N.hidden=!1}}Be();
