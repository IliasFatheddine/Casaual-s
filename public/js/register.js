const $=s=>document.querySelector(s),t=new URLSearchParams(location.search).get('token')||'',J={'Content-Type':'application/json'};
const fail=m=>{$('.b').innerHTML='<h1>Link problem</h1><p></p><a href="/">Back to the site</a>';$('.b p').textContent=m};
// check the link as soon as the page opens
(async()=>{try{const r=await(await fetch('/api/register-info?token='+encodeURIComponent(t))).json();if(r.ok)$('#e').textContent=r.email;else fail(r.err||r.msg||'ERROR.')}catch(_){fail('SERVER NOT REACHABLE.')}})();
$('#g').onclick=async()=>{const b=$('#g');b.disabled=true;$('#m').textContent='...';
 try{const r=await(await fetch('/api/register',{method:'POST',headers:J,body:JSON.stringify({token:t,name:$('#n').value,phone:$('#p').value})})).json();
  if(r.ok){try{localStorage.setItem('csl_me',JSON.stringify({e:r.email}))}catch(_){}
   $('.b').innerHTML='<h1>You are in.</h1><p>Welcome to the club.</p><a href="/#collections">Open Collections</a>'}
  else{$('#m').textContent=r.err||r.msg||'ERROR.';b.disabled=false}}
 catch(_){$('#m').textContent='SERVER NOT REACHABLE.';b.disabled=false}};
