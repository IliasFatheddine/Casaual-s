const DATA={
 web:{t:'Website technology',i:'Everything this website runs on. It is a single page built with no frameworks and no JavaScript libraries, so it loads fast and stays light. Only the font comes from Google Fonts.',l:[
  ['HTML5','Semantic structure: header, nav, sections and footer. Every section is a full-screen layer, and menu buttons are real links with labels for screen readers.'],
  ['CSS3','Custom layout with Flexbox and Grid, a dotted CRT-style screen overlay, safe-area spacing for phones, and a responsive menu that moves to a second row on small screens. The hidden scroll bar is done in CSS.'],
  ['Vanilla JavaScript','All interactions are plain JavaScript with no framework: the menu hover effect, the Technology dropdown and panels, keyboard shortcuts and the scroll controls.'],
  ['Canvas 2D: ASCII logo','The hero logo is an image read pixel by pixel. The brightness of each pixel decides whether a character is drawn, and every character keeps swapping to a new symbol (F, R, T, 3, I, %, #, @). It is redrawn about 60 times per second.'],
  ['Mouse physics','Characters near your cursor are pushed away only while you move, then drift back slowly using a damping formula. Small random dots appear around the cursor when you are near the logo.'],
  ['Pixel scroll transition','Scrolling is read from the wheel, touch and keys, and moves a diagonal band from the top-left corner. A small mask image is rebuilt each frame to cut the old section into squares, while a second canvas draws the white squares and falling pieces.'],
  ['Menu text effect','On hover each letter scrambles through random symbols and settles back on the real word, while the button keeps a fixed width so nothing around it jumps.'],
  ['Google Fonts','Pixelify Sans for the pixel look of the menu, headings and symbols, with a monospace fallback if the font cannot load.'],
  ['Performance','Canvas resolution is capped for sharp screens without slowing phones, the scroll mask is only rebuilt when the squares change, and the whole page is a single file with the logo embedded.'],
  ['Responsive design','The logo grid, the square size and the menu all adapt to the screen width, and touch swiping works like the mouse wheel on phones.']]},
 product:{t:'Product technology',i:'How our pieces are made.',l:[
  ['Fabric','[Add your fabric type and quality]'],
  ['Printing','[Add your print method, e.g. screen print or embroidery]'],
  ['Cut & fit','[Add details about patterns and sizing]'],
  ['Quality control','[Add how each piece is checked]']]}};
const tb=document.getElementById('techBtn'),sub=document.getElementById('techSub'),panel=document.getElementById('panel');
const closeSub=()=>{sub.classList.remove('open');tb.setAttribute('aria-expanded','false')};
const closePanel=()=>{panel.classList.remove('open');document.body.classList.remove('pv')};
tb.addEventListener('click',e=>e.preventDefault());
document.querySelectorAll('[data-panel]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
  const d=DATA[a.dataset.panel];
  document.getElementById('pTitle').textContent=d.t;
  document.getElementById('pIntro').textContent=d.i;
  document.getElementById('pList').innerHTML=d.l.map(x=>'<li><b>'+x[0]+'</b><span>'+x[1]+'</span></li>').join('');
  panel.classList.add('open');document.body.classList.add('pv');closeSub();}));
document.getElementById('panelClose').addEventListener('click',e=>{e.preventDefault();closePanel()});
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))closeSub()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSub();closePanel()}});
