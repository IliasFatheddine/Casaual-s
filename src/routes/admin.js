const router=require('express').Router(),crypto=require('crypto'),{ObjectId}=require('mongodb'),cfg=require('../config'),{state}=require('../db'),{wrap,dbUp,auth,oid,tokens}=require('../middleware'),{base}=require('../link'),mailer=require('../mailer');
router.post('/admin/login',(q,r)=>{if(cfg.ADMIN_PASSWORD&&q.body.password===cfg.ADMIN_PASSWORD){const t=crypto.randomBytes(24).toString('hex');tokens.add(t);return r.json({token:t})}r.sendStatus(401)});
router.use(dbUp);
router.get('/members',auth,wrap(async(q,r)=>r.json(await state.members.find().sort({registeredAt:-1}).toArray())));
router.patch('/members/:id',auth,oid,wrap(async(q,r)=>{await state.members.updateOne({_id:new ObjectId(q.params.id)},[{$set:{blocked:{$not:[{$ifNull:['$blocked',false]}]}}}]);r.sendStatus(204)}));
router.delete('/members/:id',auth,oid,wrap(async(q,r)=>{await state.members.deleteOne({_id:new ObjectId(q.params.id)});r.sendStatus(204)}));
// whitelist = pending_registrations (e-mails that asked for access but have not finished registering)
router.get('/pending',auth,wrap(async(q,r)=>r.json(await state.pending.find().sort({requestedAt:-1}).toArray())));
router.delete('/pending/:id',auth,oid,wrap(async(q,r)=>{await state.pending.deleteOne({_id:new ObjectId(q.params.id)});r.sendStatus(204)}));
router.post('/pending/:id/resend',auth,oid,wrap(async(q,r)=>{
 const p=await state.pending.findOne({_id:new ObjectId(q.params.id)});if(!p)return r.sendStatus(404);
 const token=crypto.randomBytes(24).toString('hex');
 await state.pending.updateOne({_id:p._id},{$set:{token,tokenExp:Date.now()+864e5,lastSent:Date.now(),expireAt:new Date(Date.now()+7*864e5)}});
 try{await mailer.sendRegistrationLink(p.email,base(q)+'/register.html?token='+token);r.json({ok:true})}
 catch(e){console.error('[mail] resend failed:',e.message);r.json({ok:false})}}));
module.exports=router;
