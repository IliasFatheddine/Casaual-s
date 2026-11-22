(()=>{
/* shop grid scrolls inside its own container; hand over to the section transition only at the top/bottom */
const sc=document.querySelector('#s1 .sc');if(!sc)return;
const atTop=()=>sc.scrollTop<=0,atBot=()=>sc.scrollTop+sc.clientHeight>=sc.scrollHeight-1;
let lw=0,wIn=false,edgeAt=0;
sc.addEventListener('wheel',e=>{const n=performance.now();
  if(n-(window.__arrive||0)<700){e.preventDefault();e.stopPropagation();return}   /* leftover momentum from the section change */
  if(n-lw>250){wIn=false;edgeAt=0}lw=n;
  const out=(e.deltaY>0&&atBot())||(e.deltaY<0&&atTop());
  if(!out){wIn=true;edgeAt=0;e.stopPropagation()}
  else if(wIn){if(!edgeAt)edgeAt=n;if(n-edgeAt<400)e.stopPropagation()}},{passive:false});
let y0=0;sc.addEventListener('touchstart',e=>{y0=e.touches[0].clientY},{passive:true});
let inside=false;sc.addEventListener('touchstart',()=>{inside=false},{passive:true});
sc.addEventListener('touchmove',e=>{const dy=y0-e.touches[0].clientY;const out=(dy>0&&atBot())||(dy<0&&atTop());
  if(!out){inside=true;e.stopPropagation()}else if(inside)e.stopPropagation()},{passive:true});
addEventListener('keydown',e=>{const s1=document.getElementById('s1');if(!s1.classList.contains('on')||document.body.classList.contains('pv'))return;
  const dn=['ArrowDown','PageDown',' '].includes(e.key),up=['ArrowUp','PageUp'].includes(e.key);
  if((dn&&!atBot())||(up&&!atTop())){e.preventDefault();e.stopImmediatePropagation();sc.scrollBy({top:(dn?1:-1)*(e.key==='ArrowDown'||e.key==='ArrowUp'?120:sc.clientHeight*.8),behavior:'smooth'})}},true);
})();
