const conf = require('./config.json');
const Client = require('../dist/index');

const client = new Client(conf.url, conf);

// client.domain.upload({
//   domain_name: conf.domain_name,
//   image: conf.image
// }).then(console.log).catch(console.error);
client.domain.status({
  domain_name: conf.domain_name,
  lang: 'zh_CN'
}).then(console.log).catch(console.error);

// client.registrant.upload({
//   registrant_id: conf.registrant_id,
//   image: conf.image
// }).then(console.log).catch(console.error);
client.registrant.status({
  registrant_id: conf.registrant_id,
  lang: 'zh_CN'
}).then(console.log).catch(console.error);
