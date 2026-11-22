const{MongoClient}=require('mongodb'),cfg=require('./config');
const client=new MongoClient(cfg.MONGODB_URI,{serverSelectionTimeoutMS:10000});
// state.pending -> collection "pending_registrations", state.members -> collection "club_members"
const state={ready:false,pending:null,members:null};
client.on('serverHeartbeatFailed',()=>{if(state.ready){state.ready=false;console.error('[mongo] connection lost - retrying...')}});
client.on('serverHeartbeatSucceeded',()=>{if(!state.ready&&state.pending){state.ready=true;console.log('[mongo] connection restored')}});
async function connect(){try{
 await client.connect();const d=client.db(cfg.DB_NAME);await d.command({ping:1});
 state.pending=d.collection('pending_registrations');state.members=d.collection('club_members');
 await Promise.all([state.pending.createIndex({email:1},{unique:true}),state.pending.createIndex({token:1}),state.pending.createIndex({expireAt:1},{expireAfterSeconds:0}),state.members.createIndex({email:1},{unique:true})]);
 state.ready=true;console.log('[mongo] connected to database "'+cfg.DB_NAME+'"')
}catch(e){
 console.error('\n[mongo] connection failed: '+e.message);
 if(/auth/i.test(e.message))console.error('-> Wrong username/password in MONGODB_URI (special characters in the password must be URL-encoded).');
 else console.error('-> Check the host in MONGODB_URI and Atlas > Network Access: your current IP must be allowed.');
 throw e}}
module.exports={state,connect,close:()=>client.close()};
