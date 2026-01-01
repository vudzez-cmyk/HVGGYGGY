// ===== LANGUAGE =====
const LANG = {
  en: {
    gold:"GOLD",
    boosts:"BOOSTS",
    tapRate:"+1 GOLD / 3 sec",
    bonus:"Welcome bonus applied"
  },
  ru: {
    gold:"ЗОЛОТО",
    boosts:"БУСТЫ",
    tapRate:"+1 ЗОЛОТО / 3 сек",
    bonus:"Приветственный бонус начислен"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLang(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = LANG[currentLang][el.dataset.i18n];
  });
  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "RU" : "EN";
}

document.getElementById("langToggle").onclick = ()=>{
  currentLang = currentLang === "en" ? "ru" : "en";
  localStorage.setItem("lang",currentLang);
  applyLang();
};

// ===== LOADING =====
let appReady = false;
const loader = document.getElementById("loader");
const loaderPercent = document.getElementById("loaderPercent");

let load = 0;
const loaderTimer = setInterval(()=>{
  load += Math.floor(Math.random()*6)+4;
  if(load >= 100){
    load = 100;
    clearInterval(loaderTimer);
    setTimeout(()=>{
      loader.style.opacity="0";
      setTimeout(()=>{
        loader.style.display="none";
        appReady = true;
      },400);
    },300);
  }
  loaderPercent.textContent = load;
},90);

// ===== GAME =====
let gold = 0;
let energy = 6500;

const goldCount = document.getElementById("goldCount");
const energyValue = document.getElementById("energyValue");
const energyFill = document.getElementById("energyFill");
const circle = document.getElementById("goldCircle");

function update(){
  goldCount.textContent = gold;
  energyValue.textContent = energy;
  energyFill.style.width = (energy/6500*100)+"%";
}

circle.onclick = ()=>{
  if(!appReady || energy<=0) return;
  gold++;
  energy--;
  update();
};

// dynamic light
function light(e){
  const r = circle.getBoundingClientRect();
  const x = (e.touches?e.touches[0].clientX:e.clientX)-r.left;
  const y = (e.touches?e.touches[0].clientY:e.clientY)-r.top;
  circle.style.setProperty("--lx",x+"px");
  circle.style.setProperty("--ly",y+"px");
}

circle.addEventListener("touchstart",light);
circle.addEventListener("touchmove",light);
circle.addEventListener("mousemove",e=>{ if(e.buttons) light(e); });

// MENU
document.querySelectorAll(".bottom-menu button").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".bottom-menu button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

applyLang();
update();
