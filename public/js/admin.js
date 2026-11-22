(()=>{
const C=window.__csl;if(!C)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const el=(t,c,x,p)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e};
const {put,all,del}=C,AK='csl_adm',SEC={s1:$('#s1 .pgrid'),s2:$('#s2 .pgrid')};
let CAT={},IMGS={},SITE={},adm=false,mem=false;
const isAdm=()=>mem||(()=>{try{return localStorage.getItem(AK)===C.PH}catch(_){return false}})();
Object.entries(SEC).forEach(([s,g])=>$$('.pcard',g).forEach((c,i)=>{c.dataset.pid=s+'-'+i;c.dataset.sec=s}));
const modal=f=>{const m=el('div','cov',null,document.body),b=el('div','cbox',null,m),x=()=>m.remove();m.onclick=e=>{if(e.target===m)x()};f(b,x)};
const ask=(t,v,ph,cb)=>modal((b,x)=>{el('h2',null,t,b);const i=el('input','fi',null,b);i.value=v||'';i.placeholder=ph||'';const g=el('button','buy','SAVE',b);g.type='button';const go=()=>{x();cb(i.value.trim())};g.onclick=go;i.onkeydown=e=>{if(e.key==='Enter')go()};setTimeout(()=>i.focus())});
const shrink=file=>new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();im.onerror=()=>rej();im.onload=()=>{URL.revokeObjectURL(u);let m=720,out='';for(let i=0;i<6;i++){const s=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);out=c.toDataURL('image/webp',.82);if(out.indexOf('image/webp')<0)out=c.toDataURL('image/png');if(out.length<230000)break;m*=.8}res(out)};im.src=u});
const avg=src=>new Promise(r=>{const i=new Image();i.onerror=()=>r('#777');i.onload=()=>{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.drawImage(i,0,0,24,24);const d=x.getImageData(0,0,24,24).data;let R=0,G=0,B=0,n=0;for(let k=0;k<d.length;k+=4)if(d[k+3]>200){R+=d[k];G+=d[k+1];B+=d[k+2];n++}r(n?'rgb('+(R/n|0)+','+(G/n|0)+','+(B/n|0)+')':'#777')};i.src=src});
const save=(c,p)=>{const pid=c.dataset.pid,d=Object.assign(CAT[pid]||{pid,sec:c.dataset.sec},p);CAT[pid]=d;return put('products',pid,d)};
const saveOrder=sec=>put('site','ord_'+sec,{ids:$$('.pcard',SEC[sec]).map(c=>c.dataset.pid)});
const refreshBar=sec=>{const b=$('.addbar',SEC[sec].closest('.sc'));if(b&&b._u)b._u()};
const setTitle=(c,t)=>{$('.ptitle',c).textContent=t;const sw=$$('.psw',c);$$('.pimg',c).forEach((im,i)=>{im.alt=t+(sw[i]?', '+(sw[i].getAttribute('aria-label')||''):'')})};
const setOos=(c,v)=>{c.classList.toggle('oos',v);const b=$('.st',c);if(b){b.textContent=v?'BACK IN STOCK':'PIN: OUT OF STOCK';b.classList.toggle('on',v)}};
const setPrice=(c,price,sale)=>{const p=$('.pprice',c);p.textContent='';if(sale){if(price){const o=el('s',null,price,p);o.style.cssText='opacity:.55;margin-right:8px'}el('span',null,sale,p);p.dataset.eff=sale}else{p.textContent=price||'[Price]';delete p.dataset.eff}};
const swapImg=(c,i,s)=>{const o=$$('.pimg',c)[i];if(!o)return;const n=new Image();n.className=o.className;n.alt=o.alt;n.src=s;o.replaceWith(n);window.__bindCard(c)};
const prep=c=>{if(!$('.so',c))c.insertBefore(el('div','so','OUT OF STOCK'),$('.buy',c))};
function mk(pid,sec,title,price,srcs,sws){const a=el('article','card pcard');a.dataset.pid=pid;a.dataset.sec=sec;el('h3','ptitle',title,a);const pm=el('div','pimgs',null,a);
 srcs.forEach((s,i)=>{const im=el('img','pimg'+(i?'':' on'),null,pm);im.alt=title+(srcs.length>1?', Color '+(i+1):'');im.src=s});
 if(srcs.length>1){const pc=el('div','pctl',null,a);sws.forEach((c,i)=>{const b=el('button','psw'+(i?'':' on'),null,pc);b.type='button';b.style.background=c;b.setAttribute('aria-label','Color '+(i+1));b.setAttribute('aria-pressed',i===0)})}
 el('div','pprice',price||'[Price]',a);const by=el('button','buy',null,a);by.type='button';by.setAttribute('aria-label','Add to cart');by.innerHTML='<b>+</b> COP IT';prep(a);return a}
function drag(card){card.addEventListener('dragstart',e=>e.preventDefault());
 card.addEventListener('pointerdown',e=>{if(!adm||e.button||e.target.closest('button,input,.atb'))return;
  const g=card.parentNode,sc=g.closest('.sc'),x0=e.clientX,y0=e.clientY,touch=e.pointerType!=='mouse',id=e.pointerId;let on=false,px=x0,py=y0,raf=0,gh=null,tm=0,gw=0;
  const cols=()=>getComputedStyle(g).gridTemplateColumns.split(' ').length;
  const place=()=>{if(gh)gh.style.transform='translate('+(px-gw*.275)+'px,'+(py-30)+'px) scale(.55)'};
  const step=()=>{const r=sc.getBoundingClientRect();if(py<r.top+110)sc.scrollTop-=12;else if(py>r.bottom-70)sc.scrollTop+=12;raf=requestAnimationFrame(step)};
  const start=()=>{on=true;window.__dragged=1;try{card.setPointerCapture(id)}catch(_){}card.classList.add('dragging');document.body.classList.add('pv');
   const r=card.getBoundingClientRect();gw=r.width;gh=card.cloneNode(true);gh.className='card';gh.removeAttribute('data-pid');
   gh.style.cssText='position:fixed;left:0;top:0;z-index:80;pointer-events:none;opacity:.9;width:'+gw+'px;transform-origin:top left';document.body.appendChild(gh);place();step()};
  const mv=ev=>{if(ev.pointerId!==id)return;px=ev.clientX;py=ev.clientY;
   if(!on){if(Math.hypot(px-x0,py-y0)>(touch?10:6)){if(touch)end();else start()}return}
   place();const t=document.elementFromPoint(px,py),o=t&&t.closest('.pcard');if(!o||o===card||o.parentNode!==g)return;
   const r=o.getBoundingClientRect(),after=cols()>1?px>r.left+r.width/2:py>r.top+r.height/2,ref=after?o.nextElementSibling:o;if(ref!==card)g.insertBefore(card,ref)};
  const tmv=ev=>{if(on)ev.preventDefault()};
  function end(){clearTimeout(tm);cancelAnimationFrame(raf);document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',end);document.removeEventListener('pointercancel',end);document.removeEventListener('touchmove',tmv);
   if(gh)gh.remove();card.classList.remove('dragging');if(on){document.body.classList.remove('pv');saveOrder(card.dataset.sec);setTimeout(()=>{window.__dragged=0},80)}on=false}
  document.addEventListener('pointermove',mv);document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);document.addEventListener('touchmove',tmv,{passive:false});
  if(touch)tm=setTimeout(start,350)})}
document.addEventListener('click',e=>{if(window.__dragged){e.stopPropagation();e.preventDefault()}},true);
const editImg=card=>modal((b,x)=>{el('h2',null,'Replace image',b);const f=el('input','fi',null,b);f.type='file';f.accept='image/*';const er=el('div','gs',null,b),g=el('button','buy','SAVE',b);g.type='button';
 g.onclick=async()=>{if(!f.files[0]){er.textContent='PICK AN IMAGE.';return}er.textContent='SAVING...';try{const s=await shrink(f.files[0]),k=Math.max(0,$$('.pimg',card).findIndex(i=>i.classList.contains('on'))),pid=card.dataset.pid;swapImg(card,k,s);IMGS[pid+'__'+k]={src:s};await put('pimgs',pid+'__'+k,{src:s});const d=CAT[pid]||{};await save(card,{rep:[...new Set([...(d.rep||[]),k])]});x()}catch(_){er.textContent='COULD NOT READ THAT IMAGE.'}}});
const rmProd=card=>modal((b,x)=>{el('h2',null,'Delete this product?',b);const g=el('button','buy','DELETE',b);g.type='button';
 g.onclick=async()=>{x();const pid=card.dataset.pid,sec=card.dataset.sec,d=CAT[pid]||{};window.__unbindCard(card);
  if(d.custom){card.remove();delete CAT[pid];await del('products',pid);for(let i=0;i<(d.n||0);i++)await del('pimgs',pid+'__'+i);await saveOrder(sec)}else{card.classList.add('gone');await save(card,{gone:1})}refreshBar(sec)}});
function decorate(card){if($('.atb',card))return;const t=el('div','atb');card.prepend(t);
 const B=(txt,fn,cls)=>{const b=el('button','ab'+(cls?' '+cls:''),txt,t);b.type='button';if(fn)b.onclick=fn;return b};
 drag(card);
 B('NAME',()=>ask('Product name',$('.ptitle',card).textContent,'name',v=>{if(v){setTitle(card,v);save(card,{title:v})}}));
 const cd=()=>CAT[card.dataset.pid]||{};B('PRICE',()=>ask('Regular price',cd().price||'','e.g. 250 MAD',v=>{setPrice(card,v,cd().sale||'');save(card,{price:v})}));B('DISCOUNT',()=>ask('Sale price (empty = remove)',cd().sale||'','e.g. 199 MAD',v=>{setPrice(card,cd().price||'',v);save(card,{sale:v})}));
 B('IMAGE',()=>editImg(card));
 B('PIN: OUT OF STOCK',()=>{const v=!card.classList.contains('oos');setOos(card,v);save(card,{oos:v})},'st');
 B('DELETE',()=>rmProd(card));setOos(card,card.classList.contains('oos'))}
const addModal=sec=>modal((b,x)=>{el('h2',null,'Add product',b);const n=el('input','fi',null,b);n.placeholder='name';const p=el('input','fi',null,b);p.placeholder='price (e.g. 250 MAD)';const f=el('input','fi',null,b);f.type='file';f.accept='image/*';f.multiple=true;el('div','gs','UP TO 4 IMAGES (ONE PER COLOR)',b);const er=el('div','gs',null,b),g=el('button','buy','ADD',b);g.type='button';
 g.onclick=async()=>{const fs=[...f.files].slice(0,4);if(!n.value.trim()||!fs.length){er.textContent='NAME AND AT LEAST ONE IMAGE.';return}er.textContent='SAVING...';
  try{const srcs=await Promise.all(fs.map(shrink)),sw=await Promise.all(srcs.map(avg)),pid='c'+Date.now().toString(36),title=n.value.trim(),price=p.value.trim(),c=mk(pid,sec,title,price,srcs,sw);
   SEC[sec].append(c);window.__bindCard(c);if(adm)decorate(c);srcs.forEach((s,i)=>{IMGS[pid+'__'+i]={src:s}});
   for(let i=0;i<srcs.length;i++)await put('pimgs',pid+'__'+i,{src:srcs[i]});
   await save(c,{custom:1,title,price,n:srcs.length,sw});await saveOrder(sec);x();c.scrollIntoView({block:'center',behavior:'smooth'})}catch(_){er.textContent='SOMETHING WENT WRONG. TRY SMALLER IMAGES.'}}});
function addbars(){$$('.sc').forEach(sc=>{const g=$('.pgrid',sc);if(!g||$('.addbar',sc))return;const sec=g.closest('.sec').id,bar=el('div','addbar');g.before(bar);
 const a=el('button','ab','+ ADD PRODUCT',bar);a.type='button';a.onclick=()=>addModal(sec);
 const r=el('button','ab',null,bar);r.type='button';
 bar._u=()=>{const n=$$('.pcard.gone',g).length;r.style.display=n?'':'none';r.textContent='RESTORE DELETED ('+n+')'};
 r.onclick=()=>{$$('.pcard.gone',g).forEach(c=>{c.classList.remove('gone');window.__bindCard(c);save(c,{gone:0})});bar._u()};bar._u()})}
const bar=el('div','admbar',null,document.body);bar.hidden=true;el('span',null,'ADMIN',bar);
const b1=el('button','ab','DASHBOARD',bar),b3=el('button','ab','HERO NOTICE',bar),b4=el('button','ab','',bar),b2=el('button','ab','DISCONNECT',bar);b1.type=b2.type=b3.type=b4.type='button';b3.onclick=()=>noticeModal();
const storeUI=d=>{const c=!!(d&&d.closed);b4.textContent=c?'STORE: CLOSED – CLICK TO OPEN':'STORE: OPEN – CLICK TO CLOSE';b4.classList.toggle('on',c)};storeUI(null);
b4.onclick=()=>{const v={closed:!(SITE.store&&SITE.store.closed)};SITE.store=v;applyStore(v);put('site','store',v)};
b1.onclick=()=>{if(!$('.dash'))C.dash()};
function enter(){adm=true;document.body.classList.add('adm','wl');bar.hidden=false;$$('.pcard').forEach(decorate);addbars()}
function logout(){try{localStorage.removeItem(AK)}catch(_){}mem=false;adm=false;document.body.classList.remove('adm','wl');bar.hidden=true;$$('.dash').forEach(d=>d.remove());
 const me=C.lg('me').e;if(me)fetch('/api/check?email='+encodeURIComponent(me)).then(r=>r.json()).then(j=>{if(j.ok)document.body.classList.add('wl')}).catch(()=>{})}
b2.onclick=logout;
window.__adm={on:()=>adm,store:()=>!!(SITE.store&&SITE.store.closed),toggleStore:()=>b4.click(),logout,login(){try{localStorage.setItem(AK,C.PH)}catch(_){mem=true}enter()},notice(){noticeModal()},goShop(){const a=$('a.nb[href="#shop"]');if(a)a.click()}};
function apply(c,d){if(d.gone){c.classList.add('gone');window.__unbindCard(c);return}
 if(d.title!=null)setTitle(c,d.title);if(d.price!=null||d.sale)setPrice(c,d.price||'',d.sale||'');
 (d.rep||[]).forEach(i=>{const s=(IMGS[c.dataset.pid+'__'+i]||{}).src;if(s)swapImg(c,i,s)});setOos(c,!!d.oos)}
async function load(){[CAT,IMGS,SITE]=await Promise.all([all('products'),all('pimgs'),all('site')]);applyNotice(SITE.notice);applyStore(SITE.store);
 Object.values(CAT).forEach(d=>{if(!d||!d.pid)return;let c=$('[data-pid="'+d.pid+'"]');
  if(d.custom&&!c){const srcs=[...Array(d.n||0)].map((_,i)=>(IMGS[d.pid+'__'+i]||{}).src).filter(Boolean);if(!srcs.length||!SEC[d.sec])return;c=mk(d.pid,d.sec,d.title||'',d.price,srcs,d.sw||[]);SEC[d.sec].append(c);window.__bindCard(c);if(adm)decorate(c)}
  if(c)apply(c,d)});
 ['s1','s2'].forEach(s=>{const g=SEC[s],ids=(SITE['ord_'+s]||{}).ids||[],rest=$$('.pcard',g).filter(c=>!ids.includes(c.dataset.pid));ids.forEach(id=>{const c=$('[data-pid="'+id+'"]',g);if(c)g.append(c)});rest.forEach(c=>g.append(c));refreshBar(s)})}
const hn=el('div','hnote',null,$('#s0'));hn.hidden=true;const hE=el('span','e',null,hn),hX=el('span','x',null,hn);
const applyStore=d=>{document.body.classList.toggle('closed',!!(d&&d.closed));storeUI(d);applyNotice(SITE.notice)};
const DEF={emoji:'🔒',text:'System Tayh'};
const applyNotice=d=>{const c=document.body.classList.contains('closed'),own=!!(d&&d.text);if(!c&&!(d&&d.on&&own)){hn.hidden=true;return}
 const e=own?(d.emoji||''):DEF.emoji,t=own?d.text:DEF.text;hn.hidden=false;hE.textContent=e;hE.style.display=e?'':'none';hX.textContent=t};
const noticeModal=()=>modal((b,x)=>{const d=SITE.notice||{};let em=d.emoji||'';el('h2',null,'Hero notice',b);
 const sr=el('div',null,null,b);sr.style.cssText='display:flex;gap:8px;align-items:center;justify-content:center';el('span',null,'STORE:',sr);
 const sb=[['CLOSE',true],['OPEN',false]].map(([n,c])=>{const k=el('button','ab',n,sr);k.type='button';k.onclick=()=>{const v={closed:c};put('site','store',v);SITE.store=v;applyStore(v);mk2()};return[k,c]});
 const mk2=()=>sb.forEach(([k,c])=>k.classList.toggle('on',c===!!(SITE.store&&SITE.store.closed)));mk2();
 const row=el('div',null,null,b);row.style.cssText='display:flex;flex-wrap:wrap;gap:6px;justify-content:center';
 const E=['','\u26A0\uFE0F','\uD83D\uDEE0\uFE0F','\uD83D\uDD25','\uD83D\uDE80','\uD83D\uDD12','\u23F3','\uD83C\uDF89','\uD83D\uDECD\uFE0F','\u274C','\u2139\uFE0F','\uD83D\uDD52'];
 const mark=()=>bs.forEach((z,i)=>z.classList.toggle('on',E[i]===em));
 const bs=E.map(e=>{const k=el('button','ab',e||'NONE',row);k.type='button';k.style.fontSize=e?'20px':'12px';k.onclick=()=>{em=e;mark()};return k});mark();
 const t=el('textarea','fi',null,b);t.placeholder='message for visitors (e.g. Back soon, we are fixing something)';t.value=d.text||'';t.style.height='110px';
 const er=el('div','gs',null,b),go=(on)=>{const v={emoji:em,text:t.value.trim(),on};if(on&&!v.text){er.textContent='WRITE A MESSAGE FIRST.';return}put('site','notice',v);SITE.notice=v;applyNotice(v);x()};
 const s1=el('button','buy','SAVE & SHOW',b),s2=el('button','buy','HIDE NOTICE',b);s1.type=s2.type='button';s1.onclick=()=>go(true);s2.onclick=()=>go(false)});
$$('.pcard').forEach(prep);if(isAdm())enter();load();setInterval(async()=>{try{const s=await all('site');if(s.store){SITE.store=s.store;applyStore(s.store)}}catch(_){}},30000);
const zi=$('#zimg'),zb=$('.zbuy');if(zi&&zb)new MutationObserver(()=>{const c=$$('.pcard .pimg').find(x=>x.src===zi.src);zb.style.display=c&&c.closest('.pcard').classList.contains('oos')?'none':''}).observe(zi,{attributes:true,attributeFilter:['src']});
const lo=$('a.logo');let lt,lp=false;lo.addEventListener('touchstart',()=>{lt=setTimeout(()=>{lp=true;setTimeout(()=>lp=false,900);lo.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true}))},650)},{passive:true});
['touchend','touchmove','touchcancel'].forEach(t=>lo.addEventListener(t,()=>clearTimeout(lt),{passive:true}));
document.addEventListener('click',e=>{if(lp){lp=false;e.stopPropagation();e.preventDefault()}},true);
})();
