const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const img=new Image();img.src="assets/images/img-3d363ef7.png";
const DENSE='FRT3I%#@',ALL='FRT3I%#@+*:=';
const rnd=s=>s[Math.random()*s.length|0];
let cells=[],trail=[],cw=11,ch=16,fs=14,W,H,dpr=1,mouse={x:-999,y:-999};
let lastMove=0,bb=null;function build(){bb=null;
  dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
  cv.width=W*dpr;cv.height=H*dpr;
  const tw=Math.min(W*.94,1600),cols=Math.max(64,Math.round(tw/11));
  cw=tw/cols;ch=Math.round(cw*1.5);fs=Math.round(ch*.9);
  const rows=Math.round(cols*(img.height/img.width)*cw/ch);
  const m=document.createElement('canvas');m.width=cols*3;m.height=rows*3;
  const mx=m.getContext('2d');mx.imageSmoothingQuality='high';mx.drawImage(img,0,0,m.width,m.height);
  const o=document.createElement('canvas');o.width=cols;o.height=rows;
  const x=o.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,0,0,cols,rows);
  const d=x.getImageData(0,0,cols,rows).data;cells=[];
  const ox=(W-cols*cw)/2,oy=(H-rows*ch)/2;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
    const i=(r*cols+c)*4,l=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)/255;
    if(l>.5)cells.push({x:ox+c*cw+cw/2,y:oy+r*ch+ch/2,ch:rnd(DENSE),next:Math.random()*300,dx:0,dy:0});
  }
}
const HIMG=["assets/images/img-9f5f0c3e.jpg", "assets/images/img-e6449688.jpg", "assets/images/img-218abac8.jpg", "assets/images/img-4bfb7063.jpg"];
const SRC=[],IWH=[];let hi=0,hp=0,mix=1,step=0,hTimer=null,hAway=false;
const triH=v=>1-Math.abs(((v%2)+2)%2-1);
Promise.all(HIMG.map((u,k)=>new Promise(r=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;
  const g=c.getContext('2d');g.drawImage(im,0,0);SRC[k]=g.getImageData(0,0,im.width,im.height).data;IWH[k]=[im.width,im.height];r()};im.src=u}))).then(()=>{});
function sampleH(k,c,T,off){const [w,h]=IWH[k],u=c.x/W,v=c.y/H;
  const su=triH(u*.9+.05+Math.sin(v*3+T)*.05+off*.6),sv=triH(v*.55+off+T*.1+Math.sin(u*4+T*1.2)*.04);
  const j=((sv*(h-1)|0)*w+(su*(w-1)|0))*4,d=SRC[k];return [d[j],d[j+1],d[j+2]]}
function heroCol(c,T){const a=sampleH(hi,c,T,(step*.29)%1);
  if(mix<1&&SRC[hp]){const b=sampleH(hp,c,T,((step-1)*.29+1)%1);
    return 'rgb('+(b[0]+(a[0]-b[0])*mix|0)+','+(b[1]+(a[1]-b[1])*mix|0)+','+(b[2]+(a[2]-b[2])*mix|0)+')'}
  return 'rgb('+a[0]+','+a[1]+','+a[2]+')'}
const hNext=inst=>{hp=hi;hi=(hi+1)%HIMG.length;step++;mix=inst?1:0};
const hStart=()=>{clearInterval(hTimer);hTimer=setInterval(()=>hNext(false),2000)};
const heroSec=document.getElementById('s0');
new MutationObserver(()=>{const on=heroSec.classList.contains('on');
  if(!on&&!hAway){hAway=true;clearInterval(hTimer)}
  else if(on&&hAway){hAway=false;hNext(true);hStart()}
}).observe(heroSec,{attributes:true,attributeFilter:['class']});
hStart();
function frame(t){
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const T=t*.0004;if(mix<1)mix=Math.min(1,mix+.06);
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f4f4f4';
  ctx.font='500 '+fs+'px "Pixelify Sans",monospace';
  let big=false;
  for(const c of cells){
    const mx=c.x-mouse.x,my=c.y-mouse.y,dist=Math.hypot(mx,my);
    if(t-lastMove<120&&dist<76&&dist>0){const f=(76-dist)/76;c.dx+=mx/dist*f*4;c.dy+=my/dist*f*4}
    c.dx*=.985;c.dy*=.985;
    if(t>c.next){c.ch=rnd(DENSE);c.next=t+90+Math.random()*260}
    if(SRC[hi])ctx.fillStyle=heroCol(c,T);ctx.fillText(c.ch,c.x+c.dx,c.y+c.dy);
  }
  ctx.font='500 '+fs+'px "Pixelify Sans",monospace';
  trail=trail.filter(p=>p.life>0);
  for(const p of trail){p.x+=p.vx;p.y+=p.vy;ctx.globalAlpha=p.life;if(SRC[hi]&&cells.length)ctx.fillStyle=heroCol(cells[cells.length>>1],T);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();p.life-=.006}
  ctx.globalAlpha=1;
  requestAnimationFrame(frame);
}
addEventListener('pointermove',e=>{
  mouse.x=e.clientX;mouse.y=e.clientY;lastMove=performance.now();
  if(!bb&&cells.length){let a=1e9,b=-1e9,c2=1e9,d2=-1e9;for(const c of cells){a=Math.min(a,c.x);b=Math.max(b,c.x);c2=Math.min(c2,c.y);d2=Math.max(d2,c.y)}bb=[a-70,b+70,c2-70,d2+70]}
  if(bb&&mouse.x>bb[0]&&mouse.x<bb[1]&&mouse.y>bb[2]&&mouse.y<bb[3]&&Math.random()<.25)for(let i=0;i<1;i++){const a=Math.random()*6.283,r=15+Math.random()*85;trail.push({x:mouse.x+Math.cos(a)*r,y:mouse.y+Math.sin(a)*r,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6,r:1+Math.random()*2.6,life:1})}
  if(trail.length>30)trail.splice(0,trail.length-30);
});
addEventListener('pointerleave',()=>{mouse.x=mouse.y=-999});
addEventListener('resize',()=>img.complete&&build());
img.onload=()=>{(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{build();requestAnimationFrame(frame)})};
