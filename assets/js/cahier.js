
(function(){
const fmt=new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'2-digit',month:'long'});
function f(iso){const p=iso.split('-').map(Number);return fmt.format(new Date(p[0],p[1]-1,p[2]));}
function init(root){
 root.querySelectorAll('[data-date-label]').forEach(e=>e.textContent=f(e.closest('[data-date]')?.dataset.date||e.dataset.dateFormat));
 root.querySelectorAll('[data-date-format]').forEach(e=>e.textContent=f(e.dataset.dateFormat));
 const search=root.querySelector('[data-homework-search]'), date=root.querySelector('[data-homework-date]'), rows=[...root.querySelectorAll('[data-homework-row]')], empty=root.querySelector('[data-homework-empty]');
 rows.forEach(r=>{const c=r.querySelector('input[type=checkbox]'),k='hw:'+location.pathname+':'+r.dataset.date+':'+r.dataset.title; if(c){try{c.checked=localStorage.getItem(k)==='done'}catch(e){} c.onchange=()=>{try{c.checked?localStorage.setItem(k,'done'):localStorage.removeItem(k)}catch(e){}}}});
 function filt(){const q=(search?.value||'').toLowerCase(),d=date?.value||'';let n=0;rows.forEach(r=>{const ok=(!q||r.textContent.toLowerCase().includes(q))&&(!d||r.dataset.date===d);r.style.display=ok?'':'none';if(ok)n++}); if(empty) empty.hidden=n!==0}
 search&&search.addEventListener('input',filt); date&&date.addEventListener('input',filt); filt();
}
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-cahier]').forEach(init));
})();
