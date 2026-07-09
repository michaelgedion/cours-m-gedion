const root = document.documentElement;
const btn = document.querySelector("[data-theme-toggle]");
const icon = document.querySelector("[data-theme-icon]");

function setTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Mode clair par défaut
setTheme(localStorage.getItem("theme") || "light");

if (btn) {
  btn.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });
}

const search = document.querySelector("#searchInput");
if (search) {
  const cards = [...document.querySelectorAll("[data-card]")];
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => {
      card.classList.toggle("hidden", !card.textContent.toLowerCase().includes(q));
    });
  });
}


// Sous-menus : hover + clic. Évite que le menu disparaisse trop vite.
document.querySelectorAll(".menu-group").forEach(group => {
  const button = group.querySelector(".nav-button");
  if (!button) return;

  button.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll(".menu-group.open").forEach(other => {
      if (other !== group) other.classList.remove("open");
    });
    group.classList.toggle("open");
  });
});

document.addEventListener("click", event => {
  if (!event.target.closest(".menu-group")) {
    document.querySelectorAll(".menu-group.open").forEach(group => group.classList.remove("open"));
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".menu-group.open").forEach(group => group.classList.remove("open"));
  }
});
