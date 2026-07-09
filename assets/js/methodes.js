
(function(){
  function init(root){
    const search=root.querySelector("[data-method-search]");
    const domain=root.querySelector("[data-method-domain]");
    const level=root.querySelector("[data-method-level]");
    const cards=[...root.querySelectorAll("[data-method-card]")];
    const empty=root.querySelector("[data-method-empty]");
    function filter(){
      const q=(search?.value||"").toLowerCase().trim();
      const d=domain?.value||"";
      const l=level?.value||"";
      let count=0;
      cards.forEach(card=>{
        const okQ=!q||card.textContent.toLowerCase().includes(q);
        const okD=!d||card.dataset.domain===d;
        const okL=!l||card.dataset.level.includes(l);
        const show=okQ&&okD&&okL;
        card.style.display=show?"":"none";
        if(show) count++;
      });
      if(empty) empty.hidden=count!==0;
    }
    [search,domain,level].forEach(el=>{ if(el){el.addEventListener("input",filter);el.addEventListener("change",filter);} });
    filter();
  }
  document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("[data-methods]").forEach(init));
})();
