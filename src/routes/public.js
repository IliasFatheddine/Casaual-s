const router=require('express').Router(),crypto=require('crypto'),{base}=require('../link'),{state}=require('../db'),{wrap,dbUp}=require('../middleware'),mailer=require('../mailer');
const okEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)&&e.length<255;
const BAD='THIS LINK IS INVALID, ALREADY USED OR EXPIRED. REQUEST A NEW ONE.';
router.use(dbUp);
// 1. e-mail entered on Collections -> pending_registrations + e-mailed link
router.post('/request',wrap(async(q,r)=>{
 const email=String(q.body.email||'').trim().toLowerCase();
 if(!okEmail(email))return r.json({msg:'ENTER A VALID E-MAIL.'});
 const m=await state.members.findOne({email});
 if(m)return r.json(m.blocked?{status:'blocked',msg:'NOT THIS TIME.'}:{status:'member'});
 const p=await state.pending.findOne({email});
 if(p&&p.lastSent>Date.now()-6e4)return r.json({status:'pending',msg:'E-MAIL ALREADY SENT. CHECK YOUR GMAIL (AND SPAM).'});
 const token=crypto.randomBytes(24).toString('hex');
 await state.pending.updateOne({email},{$set:{token,tokenExp:Date.now()+864e5,lastSent:Date.now(),expireAt:new Date(Date.now()+7*864e5)},$setOnInsert:{requestedAt:new Date()}},{upsert:true});
 try{await mailer.sendRegistrationLink(email,base(q)+'/register.html?token='+token)}
 catch(e){console.error('[mail] send failed:',e.message);await state.pending.updateOne({email},{$unset:{lastSent:''}});return r.json({msg:'COULD NOT SEND THE E-MAIL. TRY AGAIN.'})}
 r.json({status:'pending',msg:'CHECK YOUR GMAIL TO COMPLETE YOUR REGISTRATION.'})}));
// 2. member access check (blocked members are refused)
router.get('/check',wrap(async(q,r)=>{const m=await state.members.findOne({email:String(q.query.email||'').trim().toLowerCase()});r.json({ok:!!(m&&!m.blocked)})}));
// 3. registration page asks first whether its link is valid
router.get('/register-info',wrap(async(q,r)=>{
 const token=String(q.query.token||'');
 const p=token&&await state.pending.findOne({token,tokenExp:{$gt:Date.now()}});
 r.json(p?{ok:true,email:p.email}:{ok:false,err:BAD})}));
// 4. full name + number -> pending becomes club member
router.post('/register',wrap(async(q,r)=>{
 const n=String(q.body.name||'').trim(),ph=String(q.body.phone||'').trim(),token=String(q.body.token||'');
 if(n.length<2||n.length>80)return r.json({err:'ENTER YOUR FULL NAME.'});
 if(!/^\+?[\d\s().-]{6,20}$/.test(ph))return r.json({err:'ENTER A VALID NUMBER.'});
 const p=token&&await state.pending.findOne({token,tokenExp:{$gt:Date.now()}});
 if(!p)return r.json({err:BAD});
 await state.members.updateOne({email:p.email},{$set:{name:n,phone:ph},$setOnInsert:{blocked:false,registeredAt:new Date()}},{upsert:true});
 await state.pending.deleteOne({_id:p._id});
 r.json({ok:true,email:p.email})}));
module.exports=router;
