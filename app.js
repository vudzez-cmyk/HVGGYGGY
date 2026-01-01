// Telegram init
if(window.Telegram?.WebApp){
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

// Loader
let lp = 0;
const loader = document.getElementById('loader');
const app = document.getElementById('app');

const loadTimer = setInterval(()=>{
  lp += 4;
  document.getElementById('lp').textContent = lp;
  if(lp >= 100){
    clearInterval(loadTimer);
    loader.classList.add('hide');
    setTimeout(()=>{
      loader.style.display = 'none';
      app.classList.remove('hidden');
    },600);
  }
},90);

// Game state
let gold = 0;
let energy = 5500;
const maxEnergy = 5500;

const goldEl = document.getElementById('gold');
const enEl = document.getElementById('en');
const ef = document.getElementById('ef');
document.getElementById('em').textContent = maxEnergy;

// Tap
document.getElementById('orb').onclick = ()=>{
  if(energy <= 0) return;
  energy--;
  gold++;
  goldEl.textContent = gold;
  enEl.textContent = energy;
  ef.style.width = (energy/maxEnergy*100)+'%';
};

// Energy regen
setInterval(()=>{
  if(energy < maxEnergy){
    energy++;
    enEl.textContent = energy;
    ef.style.width = (energy/maxEnergy*100)+'%';
  }
},3000);

// Tabs
document.querySelectorAll('.menu button').forEach(btn=>{
  btn.onclick = ()=>{
    const id = btn.dataset.tab;
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  };
});
