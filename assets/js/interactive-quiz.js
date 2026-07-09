
(function () {
  const letters = ["A", "B", "C", "D"];

  function decodeEntities(text) {
    const area = document.createElement("textarea");
    area.innerHTML = text;
    return area.value;
  }

  function readQuestions(root) {
    if (Array.isArray(window.__QUIZ_DATA__)) return window.__QUIZ_DATA__;
    const dataNode = root.querySelector(".quiz-data");
    if (!dataNode) throw new Error("quiz-data missing");
    const raw = dataNode.textContent.trim();
    try {
      return JSON.parse(raw);
    } catch (e) {
      return JSON.parse(decodeEntities(raw));
    }
  }

  function renderQuiz(root) {
    let questions;
    try {
      questions = readQuestions(root);
    } catch (e) {
      console.error("Erreur QCM:", e);
      root.innerHTML = '<div class="quiz-feedback bad" style="display:block"><p class="font-black">Erreur de chargement du QCM.</p><p class="mt-1 text-sm">Les données du QCM sont introuvables ou mal formées.</p></div>';
      return;
    }

    let index = 0;
    let answers = new Array(questions.length).fill(null);
    let scoreSaved = false;

    const title = root.dataset.title || "QCM";
    root.innerHTML = `
      <div class="interactive-qcm">
        <div>
          <div class="quiz-progress"><div class="quiz-progress-bar"></div></div>
          <div class="quiz-status">
            <span class="quiz-score-pill quiz-count"></span>
            <span class="quiz-score-pill quiz-score"></span>
          </div>
        </div>
        <div class="quiz-card-active">
          <p class="font-black text-slate-950 dark:text-white quiz-question-title"></p>
          <div class="formula-box mt-3 quiz-formula" hidden></div>
          <div class="image-placeholder mt-3 quiz-image" hidden></div>
          <div class="qcm-options quiz-options"></div>
          <div class="quiz-feedback"></div>
          <div class="quiz-nav">
            <button type="button" class="secondary prev">← Question précédente</button>
            <button type="button" class="next">Question suivante →</button>
            <button type="button" class="finish">Terminer et enregistrer</button>
          </div>
        </div>
      </div>
    `;

    const progressBar = root.querySelector(".quiz-progress-bar");
    const countEl = root.querySelector(".quiz-count");
    const scoreEl = root.querySelector(".quiz-score");
    const questionTitle = root.querySelector(".quiz-question-title");
    const formulaEl = root.querySelector(".quiz-formula");
    const imageEl = root.querySelector(".quiz-image");
    const optionsEl = root.querySelector(".quiz-options");
    const feedbackEl = root.querySelector(".quiz-feedback");
    const prevBtn = root.querySelector(".prev");
    const nextBtn = root.querySelector(".next");
    const finishBtn = root.querySelector(".finish");

    function currentScore() {
      return answers.reduce((s, a, i) => s + (a === questions[i].answer ? 1 : 0), 0);
    }

    function saveScore() {
      try {
        localStorage.setItem("qcm:" + location.pathname, JSON.stringify({
          title: title,
          score: currentScore(),
          total: questions.length,
          date: new Date().toISOString()
        }));
      } catch (e) {}
      scoreSaved = true;
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
      const q = questions[index];
      const answered = answers[index] !== null;
      progressBar.style.width = ((index + 1) / questions.length * 100) + "%";
      countEl.textContent = `Question ${index + 1} / ${questions.length}`;
      scoreEl.textContent = `Score : ${currentScore()} / ${questions.length}`;
      questionTitle.textContent = q.question;

      if (q.formula) {
        formulaEl.hidden = false;
        formulaEl.innerHTML = q.formula;
      } else {
        formulaEl.hidden = true;
      }

      if (q.image) {
        imageEl.hidden = false;
        imageEl.innerHTML = q.image;
      } else {
        imageEl.hidden = true;
      }

      optionsEl.innerHTML = "";
      q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option-btn";
        btn.innerHTML = `<span class="quiz-letter">${letters[i]}</span><span>${option}</span>`;
        if (answered) {
          btn.disabled = true;
          if (i === q.answer) btn.classList.add("reveal-good");
          if (answers[index] === i) btn.classList.add("selected", i === q.answer ? "good" : "bad");
        }
        btn.addEventListener("click", () => {
          if (answers[index] !== null) return;
          answers[index] = i;
          render();
        });
        optionsEl.appendChild(btn);
      });

      if (answered) {
        const good = answers[index] === q.answer;
        feedbackEl.className = "quiz-feedback " + (good ? "good" : "bad");
        feedbackEl.innerHTML = `
          <p class="font-black">${good ? "Bonne réponse ✅" : "À revoir ⚠️"}</p>
          <p class="mt-1 text-sm">${q.explanation}</p>
          <p class="mt-2 text-sm"><strong>Erreur fréquente :</strong> ${q.trap}</p>
        `;
      } else {
        feedbackEl.className = "quiz-feedback";
        feedbackEl.innerHTML = "";
      }

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === questions.length - 1;
      finishBtn.textContent = scoreSaved ? "Score enregistré" : "Terminer et enregistrer";
      setTimeout(renderMathSafe, 30);
    }

    prevBtn.addEventListener("click", () => { if (index > 0) { index--; render(); } });
    nextBtn.addEventListener("click", () => { if (index < questions.length - 1) { index++; render(); } });
    finishBtn.addEventListener("click", () => {
      saveScore();
      const box = document.createElement("div");
      box.className = "quiz-feedback good";
      box.innerHTML = `<p class="font-black">Score final : ${currentScore()} / ${questions.length}</p><p class="mt-1 text-sm">Ton score est enregistré dans ce navigateur.</p>`;
      feedbackEl.replaceWith(box);
      root.querySelector(".quiz-card-active").appendChild(box);
      scoreEl.textContent = `Score : ${currentScore()} / ${questions.length}`;
      finishBtn.textContent = "Score enregistré";
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-interactive-qcm]").forEach(renderQuiz);
  });
})();
