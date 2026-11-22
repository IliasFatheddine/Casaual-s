const{MongoClient}=require('mongodb'),cfg=require('./config');
// state.pending -> collection "pending_registrations", state.members -> collection "club_members"
const state={ready:false,pending:null,members:null};
let client=null,starting=null;
async function start(){try{
 if(cfg.mongoMissing)throw new Error('MONGODB_URI is missing or still a placeholder');
 client=new MongoClient(cfg.MONGODB_URI,{serverSelectionTimeoutMS:10000});
 client.on('serverHeartbeatFailed',()=>{if(state.ready){state.ready=false;console.error('[mongo] connection lost - retrying...')}});
 client.on('serverHeartbeatSucceeded',()=>{if(!state.ready&&state.pending){state.ready=true;console.log('[mongo] connection restored')}});
 await client.connect();const d=client.db(cfg.DB_NAME);await d.command({ping:1});
 state.pending=d.collection('pending_registrations');state.members=d.collection('club_members');
 await Promise.all([state.pending.createIndex({email:1},{unique:true}),state.pending.createIndex({token:1}),state.pending.createIndex({expireAt:1},{expireAfterSeconds:0}),state.members.createIndex({email:1},{unique:true})]);
 state.ready=true;console.log('[mongo] connected to database "'+cfg.DB_NAME+'"')
}catch(e){
 console.error('\n[mongo] connection failed: '+e.message);
 if(/auth/i.test(e.message))console.error('-> Wrong username/password in MONGODB_URI (special characters in the password must be URL-encoded).');
 else console.error('-> Check MONGODB_URI and Atlas > Network Access (hosting needs 0.0.0.0/0 because its IPs change).');
 if(client){try{await client.close()}catch(_){}client=null}
 throw e}}
// safe to call on every request: connects once, reuses the connection, retries after a failure
const connect=()=>{if(state.ready)return Promise.resolve();if(!starting)starting=start().finally(()=>{starting=null});return starting};
module.exports={state,connect,close:async()=>{if(client)await client.close()}};
