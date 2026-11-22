const{ObjectId}=require('mongodb'),{state}=require('./db');
const tokens=new Set(),ERR='SERVER ERROR. TRY AGAIN.';
exports.tokens=tokens;
exports.wrap=f=>(q,r)=>Promise.resolve(f(q,r)).catch(e=>{console.error('[api] '+q.method+' '+q.path+':',e.message);if(!r.headersSent)r.status(500).json({msg:ERR,err:ERR})});
exports.dbUp=(q,r,n)=>state.ready?n():r.status(503).json({msg:'DATABASE NOT AVAILABLE.',err:'DATABASE NOT AVAILABLE.'});
exports.auth=(q,r,n)=>tokens.has((q.get('authorization')||'').slice(7))?n():r.sendStatus(401);
exports.oid=(q,r,n)=>ObjectId.isValid(q.params.id)?n():r.sendStatus(400);
