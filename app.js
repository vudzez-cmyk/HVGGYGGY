let gold=0;
let boosts=JSON.parse(localStorage.getItem("boosts"))||{energy:0,tap:false,auto:false};
let maxEnergy=5500+boosts.energy*1000;
let energy=maxEnergy;

let lastTap=0;

const g=document.getElementById("gold");
const e=document.getElementById("energyFill");
const et=document.getElementById("energyText");
const orb=document.getElementById("orb");

function save(){localStorage.setItem("boosts",JSON.stringify(boosts));}
function render(){
 g.textContent=gold;
 e.style.width=(energy/maxEnergy*100)+"%";
 et.textContent=energy+" / "+maxEnergy;
 document.getElementById("b-tap").classList.toggle("active",boosts.tap);
 document.getElementById("b-auto").classList.toggle("active",boosts.auto);
}
render();

orb.onclick=()=>{
 const now=Date.now();
 if(now-lastTap<120)return; // anti-spam
 lastTap=now;
 if(energy<=0)return;
 energy--;
 gold+=boosts.tap?2:1;
 render();
};

setInterval(()=>{
 energy=Math.min(maxEnergy,energy+1);
 render();
},1000);

setInterval(()=>{
 if(boosts.auto){gold++;render();}
},2000);

function buyEnergy(){
 if(gold<500)return;
 gold-=500;
 boosts.energy++;
 maxEnergy=5500+boosts.energy*1000;
 energy=maxEnergy;
 save();render();
}

function buyTap(){
 if(boosts.tap||gold<2000)return;
 gold-=2000;
 boosts.tap=true;
 save();render();
}

function buyAuto(){
 if(boosts.auto||gold<3000)return;
 gold-=3000;
 boosts.auto=true;
 save();render();
}

document.querySelectorAll(".menu button").forEach(btn=>{
 btn.onclick=()=>{
  document.querySelectorAll(".menu button").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("screen-"+btn.dataset.screen).classList.add("active");
 };
});