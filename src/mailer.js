const nodemailer=require('nodemailer'),cfg=require('./config');
const t=nodemailer.createTransport({service:'gmail',auth:{user:cfg.GMAIL_USER,pass:cfg.GMAIL_APP_PASSWORD},connectionTimeout:15000});
exports.sendRegistrationLink=(email,link)=>t.sendMail({
 from:'"Casauals." <'+cfg.GMAIL_USER+'>',to:email,subject:'Complete your Casauals. registration',
 text:'Complete your registration here:\n'+link+'\n\nThis link expires in 24 hours.',
 html:'<p>Complete your registration here:</p><p><a href="'+link+'">'+link+'</a></p><p>This link expires in 24 hours.</p>'});
// runs once at startup so a bad Gmail login is visible immediately
exports.verify=()=>t.verify().then(()=>console.log('[mail] Gmail login OK ('+cfg.GMAIL_USER+')')).catch(e=>{
 console.error('[mail] Gmail login FAILED: '+e.message);
 console.error('-> GMAIL_APP_PASSWORD must be the 16-letter Google App Password created for '+cfg.GMAIL_USER+' (not the account password). Registration e-mails cannot be sent until this is fixed.')});
