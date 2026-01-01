// Telegram
if(window.Telegram?.WebApp){
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

// Loader
let lp=0;
const loader=document.getElementById('loader');
const app=document.getElementById('app');
const lt=setInterval(()=>{
  lp+=4;
  document.getElementById('lp').textContent=lp;
  if(lp>=100){
    clearInterval(lt);
    loader.classList.add('hide');
    setTimeout(()=>{
      loader.style.display='none';
      app.classList.remove('hidden');
    },600);
  }
},90);

// STATE
let gold=0;
let energy=5500;
let boosts=JSON.parse(localStorage.getItem('boosts')) || {
  energy:0,
  tap:false,
  auto:false
};

let maxEnergy=5500 + boosts.energy*1000;

// ELEMENTS
const goldEl=document.getElementById('gold');
const enEl=document.getElementById('en');
const ef=document.getElementById('ef');
document.getElementById('em').textContent=maxEnergy;

// RENDER
function render(){
  goldEl.textContent=gold;
  enEl.textContent=energy;
  ef.style.width=(energy/maxEnergy*100)+'%';

  document.getElementById('b-tap').classList.toggle('active',boosts.tap);
  document.getElementById('b-auto').classList.toggle('active',boosts.auto);
}
render();

// TAP
document.getElementById('orb').onclick=()=>{
  if(energy<=0)return;
  energy--;
  gold+=boosts.tap?2:1;
  render();
};

// REGEN
setInterval(()=>{
  if(energy<maxEnergy){
    energy++;
    render();
  }
},3000);

// AUTO TAP
setInterval(()=>{
  if(boosts.auto){
    gold++;
    render();
  }
},2000);

// BOOSTS
document.getElementById('b-energy').onclick=()=>{
  if(gold<500)return;
  gold-=500;
  boosts.energy++;
  maxEnergy=5500+boosts.energy*1000;
  energy=maxEnergy;
  localStorage.setItem('boosts',JSON.stringify(boosts));
  document.getElementById('em').textContent=maxEnergy;
  render();
};

document.getElementById('b-tap').onclick=()=>{
  if(boosts.tap||gold<2000)return;
  gold-=2000;
  boosts.tap=true;
  localStorage.setItem('boosts',JSON.stringify(boosts));
  render();
};

document.getElementById('b-auto').onclick=()=>{
  if(boosts.auto||gold<3000)return;
  gold-=3000;
  boosts.auto=true;
  localStorage.setItem('boosts',JSON.stringify(boosts));
  render();
};

// TABS
document.querySelectorAll('.menu button').forEach(btn=>{
  btn.onclick=()=>{
    const id=btn.dataset.tab;
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  };
});
