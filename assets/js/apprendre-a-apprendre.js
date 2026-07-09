
(function(){
  function init(root){
    const tabs=[...root.querySelectorAll("[role='tab']")];
    const panels=[...root.querySelectorAll("[role='tabpanel']")];
    function activate(id){
      tabs.forEach(t=>{
        const active=t.dataset.tabTarget===id;
        t.setAttribute("aria-selected", active ? "true" : "false");
        t.tabIndex = active ? 0 : -1;
      });
      panels.forEach(p=>p.classList.toggle("is-active", p.id===id));
    }
    tabs.forEach(t=>{
      t.addEventListener("click",()=>activate(t.dataset.tabTarget));
      t.addEventListener("keydown",e=>{
        const i=tabs.indexOf(t);
        if(e.key==="ArrowDown"||e.key==="ArrowRight"){e.preventDefault();tabs[(i+1)%tabs.length].focus();}
        if(e.key==="ArrowUp"||e.key==="ArrowLeft"){e.preventDefault();tabs[(i-1+tabs.length)%tabs.length].focus();}
        if(e.key==="Enter"||e.key===" "){e.preventDefault();activate(t.dataset.tabTarget);}
      });
    });
    const first=tabs.find(t=>t.getAttribute("aria-selected")==="true") || tabs[0];
    if(first) activate(first.dataset.tabTarget);
  }
  document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("[data-learn-tabs]").forEach(init));
})();
