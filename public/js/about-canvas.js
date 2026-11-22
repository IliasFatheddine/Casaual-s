(()=>{
const s4=document.getElementById('s4'),cv=document.getElementById('bw'),ctx=cv.getContext('2d');
const bg=getComputedStyle(document.querySelector('.bgword')).backgroundImage.replace(/^url\(["']?|["']?\)$/g,'');
const SW=360,SH=640,WORD='BlerY',SYM='FRT3I%#@';
const rnd=a=>a[Math.random()*a.length|0],tri=v=>1-Math.abs(((v%2)+2)%2-1);
let cells=[],CW=0,CH=0,cw=10,ch=15,dpr=1,src=null,ready=false,mx=-1e4,my=-1e4,sx=-1e4,sy=-1e4,lastMove=0;
function build(){
  dpr=Math.min(devicePixelRatio||1,2);
  const fs=Math.min(340,Math.max(110,innerWidth*.22)),m=document.createElement('canvas').getContext('2d');
  m.font='400 '+fs+'px "Nordic Frost",serif';
  const tw=Math.ceil(m.measureText(WORD).width),th=Math.ceil(fs*1.25),pad=110;
  cw=Math.max(7,Math.round(fs/30));ch=Math.round(cw*1.5);
  CW=tw+pad*2;CH=th+pad*2;
  cv.style.width=CW+'px';cv.style.height=CH+'px';cv.width=CW*dpr;cv.height=CH*dpr;
  const cols=Math.ceil(CW/cw),rows=Math.ceil(CH/ch),mc=document.createElement('canvas');
  mc.width=cols;mc.height=rows;const g=mc.getContext('2d');
  g.setTransform(1/cw,0,0,1/ch,0,0);g.font='400 '+fs+'px "Nordic Frost",serif';g.textAlign='center';g.fillStyle='#fff';
  g.fillText(WORD,CW/2,pad+th*.8);
  const d=g.getImageData(0,0,cols,rows).data;cells=[];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)
    if(d[(r*cols+c)*4+3]>110)cells.push({x:c*cw+cw/2,y:r*ch+ch/2,dx:0,dy:0,ch:rnd(SYM),nx:Math.random()*300});
}
const img=new Image();
img.onload=()=>{
  const c=document.createElement('canvas');c.width=SW;c.height=SH;const g=c.getContext('2d');
  g.drawImage(img,0,0,SW,SH);src=g.getImageData(0,0,SW,SH).data;
  (document.fonts?Promise.all([document.fonts.load('200px "Nordic Frost"'),document.fonts.load('500 20px "Pixelify Sans"')]):Promise.resolve()).then(()=>{build();ready=true});
};
img.src=bg;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;lastMove=performance.now()});
addEventListener('resize',()=>{if(ready)build()});
function frame(t){
  requestAnimationFrame(frame);
  if(!ready||!s4.classList.contains('on'))return;
  const r=cv.getBoundingClientRect(),lx=mx-r.left,ly=my-r.top;
  sx+=(lx-sx)*.07;sy+=(ly-sy)*.07;
  const T=t*.0004,Rm=CW*.2,R2=Rm*Rm,moving=t-lastMove<120;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,CW,CH);
  ctx.font='500 '+Math.round(ch*.85)+'px "Pixelify Sans",monospace';ctx.textAlign='center';ctx.textBaseline='middle';
  for(const c of cells){
    const mdx=c.x-lx,mdy=c.y-ly,dist=Math.hypot(mdx,mdy);
    if(moving&&dist<76&&dist>0){const f=(76-dist)/76;c.dx+=mdx/dist*f*4;c.dy+=mdy/dist*f*4}
    c.dx*=.985;c.dy*=.985;
    if(t>c.nx){c.ch=rnd(SYM);c.nx=t+90+Math.random()*260}
    const dx=c.x-sx,dy=c.y-sy,f=Math.exp(-(dx*dx+dy*dy)/R2),ang=f*1.5,co=Math.cos(ang),si=Math.sin(ang);
    let u=(c.x+(dx*co-dy*si-dx)*1.2)/CW,v=(c.y+(dx*si+dy*co-dy)*1.2)/CH;
    u+=Math.sin(v*4+T*1.1)*.08+T*.15;v+=Math.sin(v*5+T*1.3)*.05+Math.sin(u*3+T)*.05+T*.05;
    const j=((tri(v*.4+.3)*(SH-1)|0)*SW+(tri(u*.55+.2)*(SW-1)|0))*4,k=1+.3*f;
    ctx.fillStyle='rgb('+Math.min(255,src[j]*k|0)+','+Math.min(255,src[j+1]*k|0)+','+Math.min(255,src[j+2]*k|0)+')';
    ctx.fillText(c.ch,c.x+c.dx,c.y+c.dy);
  }
}
requestAnimationFrame(frame);
})();
