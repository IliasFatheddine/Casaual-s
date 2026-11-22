require('dotenv').config();
const e=process.env;
const cfg={MONGODB_URI:e.MONGODB_URI,DB_NAME:e.DB_NAME||'casauals',GMAIL_USER:e.GMAIL_USER,GMAIL_APP_PASSWORD:e.GMAIL_APP_PASSWORD,BASE_URL:e.BASE_URL||'http://localhost:3000',ADMIN_PASSWORD:e.ADMIN_PASSWORD,PORT:e.PORT||3000};
cfg.mongoMissing=!cfg.MONGODB_URI||/<db_user>|<db_password>|<cluster-host>/.test(cfg.MONGODB_URI);
if(cfg.mongoMissing)console.error('\n[config] MONGODB_URI is missing or still a placeholder.\nLocal: paste your Atlas connection string into .env. Vercel/hosting: add it under Environment Variables.\n');
['GMAIL_USER','GMAIL_APP_PASSWORD','ADMIN_PASSWORD'].forEach(k=>{if(!cfg[k]||/^(your-|change-me)/.test(cfg[k]))console.warn('[config] '+k+' is not set - related features will not work.')});
module.exports=cfg;
