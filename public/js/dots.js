(()=>{const d=document.getElementById('dots'),F='linear-gradient(#000,#000)';let last='';
const set=(p,v)=>{d.style.setProperty(p,v);d.style.setProperty('-webkit-'+p,v)};
const IM=[...document.querySelectorAll('.pimg')],SIL=new Map();
function sil(im){let u=SIL.get(im);if(u!==undefined)return u;u=null;
  try{if(!im.complete||!im.naturalWidth)return null;const c=document.createElement('canvas');c.width=c.height=192;const x=c.getContext('2d');
    x.drawImage(im,0,0,192,192);const g=x.getImageData(0,0,192,192),q=g.data;
    for(let i=0;i<q.length;i+=4){q[i]=q[i+1]=q[i+2]=0;q[i+3]=q[i+3]>40?255:0}
    x.putImageData(g,0,0);u='url('+c.toDataURL('image/png')+')'}catch(_){u=F}
  SIL.set(im,u);return u}
function upd(){const vh=innerHeight,vw=innerWidth,rs=[],us=[];
 if(document.getElementById('s1').classList.contains('on')&&document.querySelectorAll('.sec.on').length===1)for(const im of document.querySelectorAll('.pimg')){const r=im.getBoundingClientRect();
   if(r.width>0&&r.bottom>0&&r.top<vh&&r.right>0&&r.left<vw){const u=sil(im);if(u){rs.push(r);us.push(u)}}}
 const key=rs.map(r=>[r.left|0,r.top|0,r.width|0,r.height|0].join()).join('|')+us.length;
 if(key===last)return;last=key;
 if(!rs.length){set('mask-image',F);set('mask-size','100% 100%');set('mask-position','0 0');set('mask-repeat','no-repeat');return}
 set('mask-image',[F,...us].join(','));set('mask-size',['100% 100%',...rs.map(r=>r.width+'px '+r.height+'px')].join(','));
 set('mask-position',['0 0',...rs.map(r=>r.left+'px '+r.top+'px')].join(','));set('mask-repeat','no-repeat');
 d.style.maskComposite='exclude';d.style.webkitMaskComposite='xor'}
(function loop(){upd();requestAnimationFrame(loop)})()})();
