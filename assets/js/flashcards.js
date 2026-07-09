const decks = {
  "couleurs": {
    title: "Flashcards — Couleurs",
    subtitle: "Première spécialité Physique-Chimie",
    cards: [
      {
        front: "<p>Synthèse additive</p>",
        back: "<p>Superposition de lumières colorées.</p><p>Exemple : rouge + vert + bleu donnent du blanc.</p>"
      },
      {
        front: "<p>Formule d’une vitesse moyenne</p>",
        back: "<p>La vitesse moyenne s’écrit :</p>$$v = \\frac{d}{\\Delta t}$$"
      },
      {
        front: "<p>Couleur complémentaire du rouge</p>",
        back: "<p>La couleur complémentaire du rouge est le cyan.</p>"
      }
    ]
  },
  "mecanique": {
    title: "Flashcards — Mécanique",
    subtitle: "Collège / lycée",
    cards: [
      {
        front: "<p>Référentiel</p>",
        back: "<p>Solide de référence associé à une horloge pour décrire un mouvement.</p>"
      },
      {
        front: "<p>Vitesse moyenne</p>",
        back: "<p>$v = \\dfrac{d}{\\Delta t}$</p>"
      },
      {
        front: "<p>Exemple Python : calculer une vitesse</p>",
        back: "<pre class='mini-code'><code>def vitesse(distance, duree):\n    return distance / duree</code></pre>"
      }
    ]
  }
};

const app = document.querySelector("#flashcardApp");
const params = new URLSearchParams(location.search);
const id = params.get("deck") || "couleurs";
const deck = decks[id];

let i = 0;
let flipped = false;

function renderDynamicMath() {
  if (window.renderMath && app) window.renderMath(app);
}

function renderCard() {
  if (!deck) {
    app.innerHTML = `<div class="glass-panel p-8"><h1 class="section-title">Paquet introuvable</h1></div>`;
    return;
  }

  const card = deck.cards[i];

  app.innerHTML = `
    <section class="glass-panel p-6 sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="badge">${deck.subtitle}</span>
        <span class="text-sm font-black muted">Carte ${i + 1}/${deck.cards.length}</span>
      </div>
      <h1 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight">${deck.title}</h1>
      <button onclick="flipCard()" class="flash-card-btn mt-7">
        <div class="flash-content">
          <p class="badge">${flipped ? "Réponse" : "Question"}</p>
          <div class="flash-question mt-5">${flipped ? card.back : card.front}</div>
          <p class="mt-7 text-sm font-bold muted">Clique pour retourner la carte</p>
        </div>
      </button>
      <div class="mt-6 flex flex-wrap justify-between gap-3">
        <button class="btn-secondary" onclick="previousCard()">← Précédente</button>
        <button class="btn-primary" onclick="nextCard()">Suivante →</button>
      </div>
    </section>`;

  renderDynamicMath();
}

function flipCard() {
  flipped = !flipped;
  renderCard();
}

function nextCard() {
  i = (i + 1) % deck.cards.length;
  flipped = false;
  renderCard();
}

function previousCard() {
  i = (i - 1 + deck.cards.length) % deck.cards.length;
  flipped = false;
  renderCard();
}

renderCard();
