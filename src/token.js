// stateless admin tokens (signed with ADMIN_PASSWORD) so they survive serverless restarts
const crypto=require('crypto'),cfg=require('./config');
const sig=e=>crypto.createHmac('sha256',cfg.ADMIN_PASSWORD||'').update(String(e)).digest('hex');
exports.make=()=>{const e=Date.now()+12*36e5;return e+'.'+sig(e)};
exports.valid=t=>{const[e,s]=String(t).split('.');if(!e||!s||!cfg.ADMIN_PASSWORD||+e<Date.now())return false;const a=Buffer.from(s),b=Buffer.from(sig(e));return a.length===b.length&&crypto.timingSafeEqual(a,b)};
