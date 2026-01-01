let gold=0,energy=5500,max=5500;
let boost={tap:false,auto:false,energy:0};
const g=document.getElementById('gold');
const ef=document.getElementById('ef');
const orb=document.getElementById('orb');

function haptic(){
 if(window.Telegram?.WebApp?.HapticFeedback){
  Telegram.WebApp.HapticFeedback.impactOccurred('light');
 }
}

function render(){
 g.textContent=gold;
 ef.style.width=(energy/max*100)+'%';
}

orb.onclick=()=>{
 if(energy<=0)return;
 energy--;
 gold+=boost.tap?2:1;
 orb.classList.add('tap');
 setTimeout(()=>orb.classList.remove('tap'),120);
 haptic();
 render();
};

setInterval(()=>{
 energy=Math.min(max,energy+1);
 render();
},1000);

setInterval(()=>{
 if(boost.auto){gold++;render();}
},2000);

function buyEnergy(){
 if(gold<500)return;
 gold-=500;
 boost.energy++;
 max=5500+boost.energy*1000;
 energy=max;
 haptic();
 render();
}
function buyTap(){
 if(boost.tap||gold<2000)return;
 gold-=2000;
 boost.tap=true;
 haptic();
 render();
}
function buyAuto(){
 if(boost.auto||gold<3000)return;
 gold-=3000;
 boost.auto=true;
 haptic();
 render();
}

function go(id){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

let p=0;
const t=setInterval(()=>{
 p+=5;
 document.getElementById('p').textContent=p;
 if(p>=100){
  clearInterval(t);
  document.getElementById('loader').style.display='none';
  document.getElementById('app').classList.remove('hidden');
 }
},80);
