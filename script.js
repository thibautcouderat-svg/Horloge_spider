const NS="http://www.w3.org/2000/svg",C=200;
const $=id=>document.getElementById(id);
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const pt=(r,deg)=>{const a=(deg-90)*Math.PI/180;return[C+r*Math.cos(a),C+r*Math.sin(a)]};

// Toile d'araignée
const web=$("web");
for(let i=0;i<12;i++){const[x,y]=pt(180,i*30);el("line",{x1:C,y1:C,x2:x,y2:y},web)}
[45,75,105,135,160].forEach(r=>{
  let d="";
  for(let i=0;i<12;i++){
    const[x1,y1]=pt(r,i*30),[x2,y2]=pt(r,(i+1)*30),[cx,cy]=pt(r*.9,i*30+15);
    d+=(i?"":`M${x1} ${y1}`)+` Q${cx} ${cy} ${x2} ${y2}`;
  }
  el("path",{d:d+"Z"},web);
});
// Graduations et chiffres
for(let i=0;i<60;i++){
  const big=i%5==0,[x1,y1]=pt(big?176:181,i*6),[x2,y2]=pt(187,i*6);
  el("line",{x1,y1,x2,y2,stroke:big?"#e62429":"rgba(255,255,255,.4)","stroke-width":big?3:1.2,"stroke-linecap":"round"},$("ticks"));
}
for(let h=1;h<=12;h++){const[x,y]=pt(152,h*30);const t=el("text",{x,y:y+7},$("nums"));t.textContent=h}

// Particules
for(let i=0;i<28;i++){
  const p=document.createElement("div");p.className="p";
  p.style.left=Math.random()*100+"vw";
  p.style.setProperty("--dx",(Math.random()*120-60)+"px");
  p.style.animationDuration=6+Math.random()*9+"s";
  p.style.animationDelay=Math.random()*10+"s";
  $("particles").appendChild(p);
}

// Inclinaison 3D à la souris (ordinateur)
addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;
  $("tilt").style.transform=`rotateY(${x*12}deg) rotateX(${-y*12}deg)`;
});
addEventListener("mouseleave",()=>$("tilt").style.transform="");

// Horloge
const rot=(id,a)=>$(id).setAttribute("transform",`rotate(${a} ${C} ${C})`);
const pad=n=>String(n).padStart(2,"0");
let lastSec=-1;
function tick(){
  const n=new Date(),ms=n.getMilliseconds(),s=n.getSeconds()+ms/1000,m=n.getMinutes()+s/60,h=(n.getHours()%12)+m/60;
  rot("sh",s*6);rot("mh",m*6);rot("hh",h*30);
  if(n.getSeconds()!==lastSec){
    lastSec=n.getSeconds();
    $("digital").textContent=`${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(lastSec)}`;
    $("date").textContent=n.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
    const c=el("circle",{class:"rip",cx:C,cy:C,r:190},$("ripples"));
    c.addEventListener("animationend",()=>c.remove());
  }
  requestAnimationFrame(tick);
}
tick();
