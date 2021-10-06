const FuelRest = require('fuel-rest');

const options = {
  auth: {
    clientId:'v8y5f40mlu5jckjyywc74t5t',
    clientSecret: 'EBZ756iUoLKOmdZgUaUIUZQY',
    authOptions: {
      authVersion: 2,
      accountId: '514015915',
    },
    authUrl: `https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token`,
  },
  origin: `https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/`,
  globalReqOptions: {
  },
};

const client = new FuelRest(options);

/**
 * Save data in DE
 * @param externalKey
 * @param data
 * @returns {?Promise}
 */
const saveData = function (externalKey, data) { 
  console.log('1----->'+data)
  console.log('2:'+externalKey)
  client.post({
  uri: `/hub/v1/dataevents/key:${externalKey}/rowset`,
  headers: {
    'Content-Type': 'application/json',
  },
  json: true,
  body: data,
}).then(message => console.log('Message '+JSON.stringify(message)));
}
module.exports = {
  client,
  saveData,
};


