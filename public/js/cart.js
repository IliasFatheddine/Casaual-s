(()=>{
const lab=document.querySelector('a.cart .t'),$=(s,r=document)=>r.querySelector(s);
const cart=[];let pend=null,btn=null,opener=null;
const count=()=>cart.reduce((a,i)=>a+i.qty,0);
const setLabel=()=>{const t='Cart [ '+count()+' ]';if(lab){lab.textContent=t;lab.setAttribute('data-t',t)}};
const root=document.createElement('div');
root.innerHTML=`<div class="ov" id="sizeOv" role="dialog" aria-modal="true" aria-labelledby="szT"><div class="pop"><button type="button" class="xb" aria-label="Close">&times;</button><h2 id="szT">Pick your size</h2><div class="szv" id="szV"></div><div class="sizes"><button type="button" class="sz" data-s="S">S</button><button type="button" class="sz" data-s="M">M</button><button type="button" class="sz" data-s="L">L</button><button type="button" class="sz" data-s="XL">XL</button><button type="button" class="sz" data-s="XXL">XXL</button></div></div></div>
<div class="ov" id="cartOv" role="dialog" aria-modal="true" aria-labelledby="ctT"><aside class="drawer"><div class="dh"><h2 id="ctT">Cart</h2><button type="button" class="xb" aria-label="Close">&times;</button></div><div class="dbody" id="cBody"></div><form class="dfoot" id="cForm" novalidate><label>Full name<input id="fName" name="name" type="text" autocomplete="name" placeholder="First and last name"></label><label>Phone number<input id="fPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+212 6 00 00 00 00"></label><div class="err" id="fErr" role="alert"></div><button type="submit" class="go">Confirm order</button></form></aside></div>`;
document.body.appendChild(root);
const sizeOv=$('#sizeOv'),cartOv=$('#cartOv'),cBody=$('#cBody'),cForm=$('#cForm'),fErr=$('#fErr');
function open(ov,focusSel){opener=document.activeElement;ov.classList.add('open');const f=$(focusSel,ov);if(f)f.focus()}
function close(ov){ov.classList.remove('open');if(opener&&opener.focus)opener.focus()}
[sizeOv,cartOv].forEach(ov=>{ov.addEventListener('click',e=>{if(e.target===ov||e.target.closest('.xb'))close(ov)})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(sizeOv.classList.contains('open'))close(sizeOv);else if(cartOv.classList.contains('open'))close(cartOv)}});
// COP IT -> size picker
document.addEventListener('click',e=>{const b=e.target.closest('.pcard .buy,.zbuy');if(!b||document.body.matches('.closed:not(.adm)'))return;
  const card=b.closest('.pcard'),im=b.classList.contains('zbuy')?$('#zimg'):(card&&card.querySelector('.pimg.on'));if(!im||!im.src)return;
  const oc=card||[...document.querySelectorAll('.pcard .pimg')].find(x=>x.src===im.src)?.closest('.pcard');if(oc&&oc.classList.contains('oos'))return;
  const pr=oc&&oc.querySelector('.pprice');
  pend={alt:im.alt,src:im.src,price:pr?(pr.dataset.eff||pr.textContent):''};btn=b;$('#szV').textContent=im.alt;open(sizeOv,'.sz')});
sizeOv.addEventListener('click',e=>{const z=e.target.closest('.sz');if(!z||!pend)return;
  const size=z.dataset.s,ex=cart.find(i=>i.alt===pend.alt&&i.size===size);
  if(ex)ex.qty++;else cart.push({alt:pend.alt,src:pend.src,price:pend.price,size,qty:1});
  setLabel();close(sizeOv);opener=btn;
  if(btn){const h=btn.innerHTML,bb=btn;bb.classList.add('done');bb.innerHTML='<b>+1</b> COPPED';clearTimeout(bb._t);bb._t=setTimeout(()=>{bb.classList.remove('done');bb.innerHTML=h},1100)}
  pend=null});
// cart drawer
function render(){cBody.textContent='';
  if(!cart.length){const d=document.createElement('div');d.className='empty';d.textContent='Your cart is empty.';cBody.appendChild(d);cForm.style.display='none';return}
  cForm.style.display='';
  cart.forEach((it,i)=>{const r=document.createElement('div');r.className='ci';
    const im=document.createElement('img');im.src=it.src;im.alt='';
    const m=document.createElement('div');
    const n=document.createElement('div');n.className='nm';n.textContent=it.alt;
    const s=document.createElement('div');s.className='sub2';s.textContent='Size '+it.size;
    const p=document.createElement('div');p.className='pr';p.textContent=it.price||'[Price]';
    m.append(n,s,p);
    const q=document.createElement('div');q.className='qty';
    const mk=(t,a,l)=>{const x=document.createElement('button');x.type='button';x.className='qb';x.textContent=t;x.dataset.a=a;x.dataset.i=i;x.setAttribute('aria-label',l);return x};
    const num=document.createElement('span');num.textContent=it.qty;
    q.append(mk('\u2212','dec','Less'),num,mk('+','inc','More'));
    const rm=document.createElement('button');rm.type='button';rm.className='rm';rm.textContent='Remove';rm.dataset.a='rm';rm.dataset.i=i;
    const right=document.createElement('div');right.append(q,rm);right.style.textAlign='right';
    r.append(im,m,right);cBody.appendChild(r)})}
cBody.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const i=+b.dataset.i,it=cart[i];if(!it)return;
  if(b.dataset.a==='inc')it.qty++;else if(b.dataset.a==='dec'){it.qty--;if(it.qty<1)cart.splice(i,1)}else cart.splice(i,1);
  setLabel();render()});
document.addEventListener('click',e=>{const a=e.target.closest('a.cart');if(!a)return;e.preventDefault();e.stopPropagation();
  fErr.textContent='';render();open(cartOv,cart.length?'#fName':'.xb')},true);
cForm.addEventListener('submit',e=>{e.preventDefault();if(document.body.matches('.closed:not(.adm)')){fErr.textContent='EVERYTHING IS OUT OF STOCK RIGHT NOW.';return}
  const name=$('#fName').value.trim().replace(/\s+/g,' '),phone=$('#fPhone').value.trim(),digits=phone.replace(/[\s().-]/g,'');
  if(!/^\S{2,}\s+\S{2,}/.test(name)){fErr.textContent='Please enter your full name (first and last).';$('#fName').focus();return}
  if(!/^\+?\d{8,15}$/.test(digits)){fErr.textContent='Please enter a valid phone number.';$('#fPhone').focus();return}
  const id='CSL-'+Math.random().toString(36).slice(2,8).toUpperCase(),items=cart.map(i=>({alt:i.alt,size:i.size,qty:i.qty}));
  cart.length=0;setLabel();cForm.style.display='none';cForm.reset();fErr.textContent='';cBody.textContent='';
  const box=document.createElement('div');box.className='okbox';
  const h=document.createElement('div');h.textContent='Order confirmed';
  const o=document.createElement('div');o.className='oid';o.textContent=id;
  const who=document.createElement('div');who.textContent=name+' \u00B7 '+phone;
  const ul=document.createElement('ul');items.forEach(i=>{const li=document.createElement('li');li.textContent=i.qty+' \u00D7 '+i.alt+' \u2014 '+i.size;ul.appendChild(li)});
  const msg=document.createElement('div');msg.textContent='Thank you, '+name.split(' ')[0]+'. We\u2019ll contact you on this number to confirm delivery.';
  const ok=document.createElement('button');ok.type='button';ok.className='go';ok.textContent='Close';ok.addEventListener('click',()=>close(cartOv));
  box.append(h,o,who,ul,msg);cBody.append(box,ok);ok.focus()});
})();
