// ===== LANGUAGE =====
const LANG = {
  en: {
    gold: "GOLD",
    boosts: "BOOSTS",
    tapRate: "+1 GOLD / 3 sec",
    bonus: "Welcome bonus applied"
  },
  ru: {
    gold: "ЗОЛОТО",
    boosts: "БУСТЫ",
    tapRate: "+1 ЗОЛОТО / 3 сек",
    bonus: "Приветственный бонус начислен"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = LANG[currentLang][key];
  });
  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "RU" : "EN";
}

document.getElementById("langToggle").onclick = () => {
  currentLang = currentLang === "en" ? "ru" : "en";
  localStorage.setItem("lang", currentLang);
  applyLang();
};

// ===== LOADER =====
let load = 0;
const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loaderFill");
const loaderPercent = document.getElementById("loaderPercent");

const loaderInterval = setInterval(() => {
  load += Math.floor(Math.random() * 8) + 3;
  if (load >= 100) {
    load = 100;
    clearInterval(loaderInterval);
    setTimeout(() => loader.style.display = "none", 400);
  }
  loaderFill.style.width = load + "%";
  loaderPercent.textContent = load + "%";
}, 80);

// ===== GAME =====
let gold = 0;
let energy = 6500;
let tapPower = 1;

const goldCount = document.getElementById("goldCount");
const energyValue = document.getElementById("energyValue");
const energyFill = document.getElementById("energyFill");

function updateUI() {
  goldCount.textContent = gold;
  energyValue.textContent = energy;
  energyFill.style.width = (energy / 6500 * 100) + "%";
}

document.getElementById("goldCircle").onclick = () => {
  if (energy <= 0) return;
  gold += tapPower;
  energy--;
  updateUI();
};

// ===== MENU =====
document.querySelectorAll(".bottom-menu button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".bottom-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

// INIT
applyLang();
updateUI();
