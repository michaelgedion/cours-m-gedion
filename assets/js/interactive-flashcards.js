
(function () {
  function decodeEntities(text) {
    const area = document.createElement("textarea");
    area.innerHTML = text;
    return area.value;
  }

  function readCards(root) {
    if (Array.isArray(window.__FLASH_DATA__)) return window.__FLASH_DATA__;
    const dataNode = root.querySelector(".flash-data");
    if (!dataNode) throw new Error("flash-data missing");
    const raw = dataNode.textContent.trim();
    try {
      return JSON.parse(raw);
    } catch (e) {
      return JSON.parse(decodeEntities(raw));
    }
  }

  function renderFlash(root) {
    let cards;
    try {
      cards = readCards(root);
    } catch (e) {
      console.error("Erreur flashcards:", e);
      root.innerHTML = '<div class="quiz-feedback bad" style="display:block"><p class="font-black">Erreur de chargement des flashcards.</p><p class="mt-1 text-sm">Les données des cartes sont introuvables ou mal formées.</p></div>';
      return;
    }

    let index = 0;
    let flipped = false;
    let known = new Array(cards.length).fill(null);

    root.innerHTML = `
      <div class="interactive-flash">
        <div class="flash-progress">
          <span class="quiz-score-pill flash-count"></span>
          <span class="quiz-score-pill flash-score"></span>
        </div>
        <div class="flash-stage">
          <button type="button" class="flash-card-clickable" aria-label="Retourner la carte">
            <div class="flash-card-inner">
              <div class="flash-side front">
                <span class="flash-label">Recto</span>
                <h2 class="text-2xl font-black flash-front-title"></h2>
                <div class="mt-3 text-base flash-front"></div>
                <p class="mt-5 text-sm opacity-75">Clique sur la carte pour voir la réponse.</p>
              </div>
              <div class="flash-side back">
                <span class="flash-label">Verso</span>
                <h2 class="text-2xl font-black">Réponse</h2>
                <div class="mt-3 text-base flash-back"></div>
              </div>
            </div>
          </button>
        </div>
        <div class="flash-nav">
          <button type="button" class="secondary prev">← Précédente</button>
          <button type="button" class="flip">Retourner</button>
          <button type="button" class="next">Suivante →</button>
        </div>
        <div class="flash-known-buttons">
          <button type="button" class="unknown">À revoir</button>
          <button type="button" class="known">Je sais</button>
        </div>
      </div>
    `;

    const cardBtn = root.querySelector(".flash-card-clickable");
    const countEl = root.querySelector(".flash-count");
    const scoreEl = root.querySelector(".flash-score");
    const titleEl = root.querySelector(".flash-front-title");
    const frontEl = root.querySelector(".flash-front");
    const backEl = root.querySelector(".flash-back");
    const prevBtn = root.querySelector(".prev");
    const nextBtn = root.querySelector(".next");
    const flipBtn = root.querySelector(".flip");
    const knownBtn = root.querySelector(".known");
    const unknownBtn = root.querySelector(".unknown");

    function save() {
      try {
        localStorage.setItem("flash:" + location.pathname, JSON.stringify({
          known: known.filter(Boolean).length,
          total: cards.length,
          date: new Date().toISOString()
        }));
      } catch (e) {}
    }

    function renderMathSafe() {
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(root, {
            delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "$", right: "$", display: false}
            ],
            ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
            throwOnError: false
          });
        } catch (e) {}
      }
    }

    function render() {
      const c = cards[index];
      cardBtn.classList.toggle("is-flipped", flipped);
      countEl.textContent = `Carte ${index + 1} / ${cards.length}`;
      scoreEl.textContent = `Connues : ${known.filter(Boolean).length} / ${cards.length}`;
      titleEl.textContent = c.type || "Carte";
      frontEl.innerHTML = c.front;
      backEl.innerHTML = c.back;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === cards.length - 1;
      setTimeout(renderMathSafe, 30);
    }

    function go(delta) {
      index = Math.min(cards.length - 1, Math.max(0, index + delta));
      flipped = false;
      render();
    }

    cardBtn.addEventListener("click", () => { flipped = !flipped; render(); });
    flipBtn.addEventListener("click", () => { flipped = !flipped; render(); });
    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));
    knownBtn.addEventListener("click", () => { known[index] = true; save(); if (index < cards.length - 1) go(1); else render(); });
    unknownBtn.addEventListener("click", () => { known[index] = false; save(); if (index < cards.length - 1) go(1); else render(); });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-interactive-flashcards]").forEach(renderFlash);
  });
})();
