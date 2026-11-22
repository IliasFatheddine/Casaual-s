const SYM='FRT3I%#@+*:=-';
document.querySelectorAll('.nb').forEach(a=>{
  const t=a.querySelector('.t'),orig=t.dataset.t.toUpperCase();let iv;
  const on=()=>{clearInterval(iv);a.style.minWidth=a.offsetWidth+'px';let n=0;
    iv=setInterval(()=>{n++;t.textContent=[...orig].map((c,i)=>/[A-Z0-9]/.test(c)?((i<n/2&&Math.random()>.25)?c:SYM[Math.random()*SYM.length|0]):c).join('')},55)};
  const off=()=>{clearInterval(iv);t.textContent=orig;a.style.minWidth=''};
  a.addEventListener('mouseenter',on);a.addEventListener('mouseleave',off);
  a.addEventListener('focus',on);a.addEventListener('blur',off);
});
