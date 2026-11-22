(()=>{
const secs=[...document.querySelectorAll('.sec')],N=secs.length,ov=document.getElementById('ov'),oc=ov.getContext('2d');
const R8=s=>s[Math.random()*s.length|0],lock=()=>document.body.classList.contains('pv'),clamp=v=>Math.max(0,Math.min(N-1,v));
const DK=secs.map(x=>!x.classList.contains('light'));
const GR=[['#ffffff','#000000'],['#ffffff','#000000'],['#ffffff','#000000'],['#d0d0d0','#000000'],['#8c8c8c','#000000'],['#5a5a5a','#ffffff']];
const mk=document.createElement('canvas'),mc=mk.getContext('2d'),S=8;
let DM=1,curI=0,curF=0,curYl=0,curBand=378,W,H,dpr,cols,rows,bw,bh,B=[],pos=0,target=null,lastDir=1,lastIn=0,lastF=0,lastI=0,lastPos=-1,parts=[],key='',masked=null;
function setup(){
  dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;ov.width=W*dpr;ov.height=H*dpr;
  const bs=Math.max(10,Math.round(W/120));cols=Math.ceil(W/bs);rows=Math.ceil(H/bs);bw=W/cols;bh=H/rows;
  mk.width=cols*S;mk.height=rows*S;B=[];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)B.push({c,r,t:Math.random(),rm:false,ch:R8('FRT3I%#@'),nx:0,g:GR[Math.random()*GR.length|0],n:Math.random()-.5,D:0});
  const sn=.2419,cs=.9703,b0=Math.min(378,H*.7);DM=1;
  for(const b of B){const x=(b.c+.5)*bw,y=(b.r+.5)*bh;b.D=Math.hypot(x*sn+y*cs,(x*cs-y*sn)*1.25)+b.n*b0*.35;DM=Math.max(DM,b.D)}
  key='';lastPos=-1;
}
setup();addEventListener('resize',setup);
function setMask(el,url){const v=url?'url('+url+')':'none';
  el.style.webkitMaskImage=el.style.maskImage=v;
  el.style.webkitMaskSize=el.style.maskSize='100% 100%';el.style.webkitMaskRepeat=el.style.maskRepeat='no-repeat'}
function resetRm(){for(const b of B)b.rm=false}
function apply(){
  let i=Math.floor(pos),f=pos-i;if(i>=N-1){i=N-1;f=0}
  curF=f;curI=i;
  secs.forEach((s,k)=>{s.classList.toggle('on',k===i||(f>0&&k===i+1));s.classList.toggle('top',k===i)});
  if(masked&&masked!==secs[i]){setMask(masked,null);masked=null;key='';resetRm()}
  if(f<=0.0005){if(masked){setMask(masked,null);masked=null;key=''}resetRm()}
  else{
    const el=secs[i],band=Math.min(378,H*.7),yl=-band/2+f*(DM+band);let chg=false;
    curYl=yl;curBand=band;
    for(const b of B){const rm=b.D<yl;if(rm!==b.rm){b.rm=rm;chg=true;
      if(rm&&i===lastI&&f>lastF&&Math.random()<.22&&parts.length<350){const vy=1+Math.random()*1.2;parts.push({x:b.c*bw,y:b.r*bh,vy,vx:vy*.28,life:1,g:b.g,ch:b.ch})}}}
    if(chg||masked!==el){
      mc.clearRect(0,0,mk.width,mk.height);mc.fillStyle='#000';mc.fillRect(0,0,mk.width,mk.height);
      for(const b of B)if(b.rm)mc.clearRect(b.c*S,b.r*S,S,S);
      setMask(el,mk.toDataURL());masked=el;
    }
  }
  if(f<=0.0005&&i!==window.__L){window.__L=i;window.__arrive=performance.now()}
  lastI=i;lastF=f;
}
function draw(now){
  oc.setTransform(dpr,0,0,dpr,0,0);oc.clearRect(0,0,W,H);
  oc.textAlign='center';oc.textBaseline='middle';oc.font='500 '+Math.round(bh*.72)+'px "Pixelify Sans",monospace';
  if(curF>0){const half=curBand/2;
    for(const b of B){
      const d=Math.abs(b.D-curYl)/half;if(d>=1)continue;
      if(Math.random()<.002)b.t=Math.random();
      if(b.t>Math.min(1,1.6*(1-d)*(1-d)))continue;
      if(now>b.nx){b.ch=R8('FRT3I%#@+=');b.nx=now+220+Math.random()*500}
      const x=b.c*bw,y=b.r*bh;
      oc.fillStyle=b.g[0];oc.fillRect(x,y,bw-1,bh-1);
      oc.fillStyle=b.g[1];oc.fillText(b.ch,x+bw/2,y+bh/2);
    }}
  parts=parts.filter(p=>p.life>0);
  for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.04;p.vx=p.vy*.28;p.life-=.014;
    oc.globalAlpha=Math.max(0,p.life);oc.fillStyle=p.g[0];oc.fillRect(p.x,p.y,bw-1,bh-1);
    oc.fillStyle=p.g[1];oc.fillText(p.ch,p.x+bw/2,p.y+bh/2)}
  oc.globalAlpha=1;
}
function loop(now){
  if(target===null&&now-lastIn>140){const i=Math.floor(pos),f=pos-i;
    if(f>.001)target=lastDir>0?(f>.15?i+1:i):(f<.85?i:i+1)}
  if(target!==null){pos+=(target-pos)*.05;if(Math.abs(target-pos)<.002){pos=target;target=null;lastIn=now}}
  if(pos!==lastPos){apply();lastPos=pos}
  draw(now);requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
let wl=0,anc=0,cool=0;
addEventListener('wheel',e=>{if(lock())return;const d=Math.max(-150,Math.min(150,e.deltaY));if(!d)return;
  const n=performance.now();if(n<cool)return;
  if(n-wl>250)anc=Math.round(pos);wl=n;
  let np=clamp(pos+d/(H*1.2));np=Math.max(anc-1,Math.min(anc+1,np));
  if(Math.abs(np-Math.round(np))<.0005&&Math.round(np)!==anc){cool=n+450;anc=Math.round(np)}
  pos=np;lastDir=d>0?1:-1;lastIn=n;target=null},{passive:true});
let y0=0,p0=0;
addEventListener('touchstart',e=>{y0=e.touches[0].clientY;p0=pos;target=null},{passive:true});
addEventListener('touchmove',e=>{if(lock())return;const y=e.touches[0].clientY;
  lastDir=y0>y?1:-1;pos=clamp(p0+(y0-y)/(H*1.4));lastIn=performance.now()},{passive:true});
addEventListener('touchend',()=>{lastIn=0},{passive:true});
function snap(n){pos=clamp(n);target=null;lastIn=performance.now();lastDir=1;parts=[]}
function jump(n){target=clamp(n);lastDir=n>pos?1:-1}
addEventListener('keydown',e=>{if(lock())return;
  if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();jump(Math.round(pos)+1)}
  if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();jump(Math.round(pos)-1)}});
const map={'#shop':1,'#collections':2,'#technology':3,'#about':4};
document.querySelectorAll('a.nb,a.logo').forEach(a=>{
  const h=a.getAttribute('href'),logo=a.classList.contains('logo');
  if(logo||h in map)a.addEventListener('click',e=>{e.preventDefault();try{closePanel();if(h!=='#technology')closeSub()}catch(_){};snap(logo?0:map[h])});
});
})();
