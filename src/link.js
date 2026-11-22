// link base: the address the visitor used (works on LAN/phone), unless BASE_URL is a real domain
const cfg=require('./config');
exports.base=q=>/localhost|127\.0\.0\.1/.test(cfg.BASE_URL)?q.protocol+'://'+q.get('host'):cfg.BASE_URL.replace(/\/$/,'');
