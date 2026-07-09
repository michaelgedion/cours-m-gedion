const quizzes = {
  "premiere-pc-couleurs": {
    title: "QCM — Couleurs des objets",
    level: "Première spécialité Physique-Chimie",
    questions: [
      {
        question: "<p>Quelle synthèse correspond à la superposition de lumières colorées ?</p>",
        choices: [
          "<p>Synthèse additive</p>",
          "<p>Synthèse soustractive</p>",
          "<p>Absorption</p>",
          "<p>Diffusion</p>"
        ],
        answer: 0,
        explanation: "La synthèse additive correspond à la superposition de lumières colorées."
      },
      {
        question: "<p>Un objet rouge éclairé en lumière blanche paraît rouge car il...</p>",
        choices: [
          "<p>absorbe le rouge</p>",
          "<p>diffuse principalement le rouge</p>",
          "<p>transmet le bleu</p>",
          "<p>transforme le vert en rouge</p>"
        ],
        answer: 1,
        explanation: "Un objet opaque rouge diffuse principalement la lumière rouge et absorbe une partie des autres lumières."
      },
      {
        question: "<p>La relation correcte pour une vitesse moyenne est :</p>",
        choices: [
          "<p>$v = d \\times \\Delta t$</p>",
          "<p>$v = \\dfrac{d}{\\Delta t}$</p>",
          "<p>$v = \\dfrac{\\Delta t}{d}$</p>",
          "<p>$v = d + \\Delta t$</p>"
        ],
        answer: 1,
        explanation: "La vitesse moyenne est le quotient de la distance parcourue par la durée : $v = \\dfrac{d}{\\Delta t}$."
      }
    ]
  },
  "nsi-python-bases": {
    title: "QCM — Python bases",
    level: "Première NSI",
    questions: [
      {
        question: "<p>Quel type obtient-on avec la valeur <span class='inline-code'>3.14</span> en Python ?</p>",
        choices: ["<p>int</p>", "<p>float</p>", "<p>str</p>", "<p>bool</p>"],
        answer: 1,
        explanation: "<span class='inline-code'>3.14</span> est un nombre à virgule flottante : son type est <span class='inline-code'>float</span>."
      },
      {
        question: "<p>Que renvoie le code suivant ?</p><pre class='mini-code'><code>x = 2\nprint(x ** 3)</code></pre>",
        choices: [
          "<p><span class='inline-code'>5</span></p>",
          "<p><span class='inline-code'>6</span></p>",
          "<p><span class='inline-code'>8</span></p>",
          "<p>Une erreur</p>"
        ],
        answer: 2,
        explanation: "<span class='inline-code'>x ** 3</span> calcule $2^3$, donc le résultat affiché est <span class='inline-code'>8</span>."
      },
      {
        question: "<p>Quelle fonction Python renvoie correctement le carré de $x$ ?</p>",
        choices: [
          "<pre class='mini-code'><code>def carre(x):\n    return x * x</code></pre>",
          "<pre class='mini-code'><code>def carre(x):\nreturn x * x</code></pre>",
          "<pre class='mini-code'><code>carre(x):\n    return x * x</code></pre>",
          "<pre class='mini-code'><code>def carre(x)\n    return x * x</code></pre>"
        ],
        answer: 0,
        explanation: "La bonne réponse respecte la syntaxe <span class='inline-code'>def nom(parametre):</span> et l’indentation du bloc."
      }
    ]
  }
};

const app = document.querySelector("#quizApp");
const params = new URLSearchParams(location.search);
const id = params.get("id") || "premiere-pc-couleurs";
const quiz = quizzes[id];

let current = 0;
let score = 0;
let answered = false;
const letters = ["A", "B", "C", "D", "E", "F"];

function renderDynamicMath() {
  if (window.renderMath && app) window.renderMath(app);
}

function renderTopScore() {
  if (!quiz) return "";
  const percent = Math.round((score / quiz.questions.length) * 100);
  return `
    <div class="grid gap-3 sm:grid-cols-3">
      <div class="stat-pill"><p class="text-xs font-black uppercase text-slate-500">Score</p><p class="mt-1 text-2xl font-black">${score}/${quiz.questions.length}</p></div>
      <div class="stat-pill"><p class="text-xs font-black uppercase text-slate-500">Progression</p><p class="mt-1 text-2xl font-black">${Math.min(current + 1, quiz.questions.length)}/${quiz.questions.length}</p></div>
      <div class="stat-pill"><p class="text-xs font-black uppercase text-slate-500">Pourcentage</p><p class="mt-1 text-2xl font-black">${percent}%</p></div>
    </div>`;
}

function renderQuiz() {
  if (!quiz) {
    app.innerHTML = `<div class="glass-panel p-8"><h1 class="section-title">QCM introuvable</h1></div>`;
    return;
  }

  if (current >= quiz.questions.length) {
    const percent = Math.round((score / quiz.questions.length) * 100);
    const message = percent >= 80 ? "Excellent travail." : percent >= 50 ? "Bon début, à consolider." : "À retravailler avec le cours.";
    app.innerHTML = `
      <section class="glass-panel p-6 sm:p-8">
        <span class="badge">Résultat final</span>
        <h1 class="mt-4 page-title">${quiz.title}</h1>
        <p class="mt-4 text-xl muted">Score : <strong>${score}/${quiz.questions.length}</strong> — ${percent}%</p>
        <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div class="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" style="width:${percent}%"></div>
        </div>
        <p class="mt-5 font-black">${message}</p>
        <div class="mt-7 flex flex-wrap gap-3">
          <button class="btn-primary" onclick="restartQuiz()">Recommencer</button>
          <a href="index.html" class="btn-secondary">Retour aux QCM</a>
        </div>
      </section>`;
    renderDynamicMath();
    return;
  }

  answered = false;
  const q = quiz.questions[current];
  const progress = Math.round((current / quiz.questions.length) * 100);

  app.innerHTML = `
    <section class="glass-panel p-6 sm:p-8">
      ${renderTopScore()}
      <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span class="badge">${quiz.level}</span>
        <span class="text-sm font-black muted">Question ${current + 1} / ${quiz.questions.length}</span>
      </div>
      <h1 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight">${quiz.title}</h1>
      <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div class="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all" style="width:${progress}%"></div>
      </div>
      <div class="quiz-content mt-7 text-lg sm:text-xl font-black leading-snug">${q.question}</div>
      <div class="mt-5 grid gap-3">
        ${q.choices.map((choice, index) => `
          <button class="choice" onclick="chooseAnswer(${index})">
            <span class="choice-letter">${letters[index]}</span>
            <span class="answer-rich">${choice}</span>
          </button>`).join("")}
      </div>
      <div id="feedback" class="mt-5 hidden rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80"></div>
      <button id="nextBtn" class="btn-primary mt-5 hidden" onclick="nextQuestion()">Question suivante</button>
    </section>`;

  renderDynamicMath();
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quiz.questions[current];
  const buttons = document.querySelectorAll(".choice");

  buttons.forEach((btn, i) => {
    if (i === q.answer) btn.classList.add("correct");
    if (i === index && i !== q.answer) btn.classList.add("wrong");
  });

  if (index === q.answer) score++;

  const feedback = document.querySelector("#feedback");
  feedback.classList.remove("hidden");
  feedback.innerHTML = index === q.answer
    ? `<p class="font-black text-emerald-700 dark:text-emerald-300">Bonne réponse.</p><div class="quiz-content mt-2">${q.explanation}</div>`
    : `<p class="font-black text-rose-700 dark:text-rose-300">Réponse incorrecte.</p><div class="quiz-content mt-2">${q.explanation}</div>`;

  document.querySelector("#nextBtn").classList.remove("hidden");
  renderDynamicMath();
}

function nextQuestion() {
  current++;
  renderQuiz();
}

function restartQuiz() {
  current = 0;
  score = 0;
  renderQuiz();
}

renderQuiz();
