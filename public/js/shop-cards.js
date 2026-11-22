(()=>{
const cards=[...document.querySelectorAll('.pcard')];
const bindSw=c=>{if(c._sw)return;c._sw=1;c.addEventListener('click',e=>{const b=e.target.closest('.psw');if(!b)return;const sw=[...c.querySelectorAll('.psw')],im=[...c.querySelectorAll('.pimg')],k=sw.indexOf(b);im.forEach((x,j)=>x.classList.toggle('on',j===k));sw.forEach((x,j)=>{x.classList.toggle('on',j===k);x.setAttribute('aria-pressed',j===k)})})};
cards.forEach(c=>{bindSw(c);const im=[],sw=[];
  sw.forEach((b,k)=>b.addEventListener('click',()=>{im.forEach((x,j)=>x.classList.toggle('on',j===k));sw.forEach((x,j)=>{x.classList.toggle('on',j===k);x.setAttribute('aria-pressed',j===k)})}))});
const cur=c=>c.querySelector('.pimg.on');
const z=document.getElementById('zoom'),zi=document.getElementById('zimg'),zl=document.getElementById('zl');
let ci=0,k=0,acc=0,lastW=0,tx=null,ty=null;
const imgsOf=c=>[...c.querySelectorAll('.pimg')];
function label(){const n=imgsOf(cards[ci]).length;zl.textContent=(ci+1)+' / '+cards.length+(n>1?'  /  SCROLL: COLOR '+(k+1)+'/'+n:'')}
function paint(instant){const im=imgsOf(cards[ci])[k];const go=()=>{zi.src=im.src;zi.alt=im.alt;label();zi.classList.remove('fade')};
  if(instant){go();return}zi.classList.add('fade');setTimeout(go,180)}
function card(d){ci=(ci+d+cards.length)%cards.length;k=imgsOf(cards[ci]).findIndex(x=>x.classList.contains('on'));if(k<0)k=0;paint()}
function color(d){const n=imgsOf(cards[ci]).length;if(n<2)return;k=(k+d+n)%n;paint()}
function open(c,im){ci=cards.indexOf(c);k=imgsOf(c).indexOf(im);paint(true);z.classList.add('open');document.body.classList.add('pv')}
function close(){z.classList.remove('open');document.body.classList.remove('pv');
  const c=cards[ci],ims=imgsOf(c),sw=[...c.querySelectorAll('.psw')];ims.forEach((x,j)=>x.classList.toggle('on',j===k));sw.forEach((x,j)=>{x.classList.toggle('on',j===k);x.setAttribute('aria-pressed',j===k)})}
const bindZ=c=>imgsOf(c).forEach(im=>{if(im._z)return;im._z=1;im.addEventListener('click',()=>open(c,im))});cards.forEach(bindZ);window.__bindCard=c=>{if(!cards.includes(c))cards.push(c);bindSw(c);bindZ(c)};window.__unbindCard=c=>{const i=cards.indexOf(c);if(i>=0)cards.splice(i,1)};
document.getElementById('zx').addEventListener('click',close);
z.addEventListener('click',e=>{if(e.target===z)close()});
z.addEventListener('wheel',e=>{e.preventDefault();const t=performance.now();if(t-lastW<400)return;
  acc+=e.deltaY;if(Math.abs(acc)<30)return;color(acc>0?1:-1);acc=0;lastW=t},{passive:false});
z.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
z.addEventListener('touchend',e=>{if(ty===null)return;const dx=tx-e.changedTouches[0].clientX,dy=ty-e.changedTouches[0].clientY;ty=null;
  if(Math.abs(dy)>=Math.abs(dx)){if(Math.abs(dy)>40)color(dy>0?1:-1)}else if(Math.abs(dx)>40)color(dx>0?1:-1)},{passive:true});
document.addEventListener('keydown',e=>{if(!z.classList.contains('open')||document.querySelector('.ov.open'))return;
  if(e.key==='Escape'){e.stopImmediatePropagation();close()}
  else if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();color(1)}
  else if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();color(-1)}
  else if(e.key==='ArrowRight'){e.preventDefault();color(1)}
  else if(e.key==='ArrowLeft'){e.preventDefault();color(-1)}},true);
})();
