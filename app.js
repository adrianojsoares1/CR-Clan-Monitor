const CRoyaleAPI = require('./utils/client');
const API_KEY = 'YOUR_KEY_HERE';

const client = new CRoyaleAPI();

client.setApiKey(API_KEY);

client.player('2PCL28RV0', function(err, data){
  if(err)
    throw(err);

  console.log(`Player's name is: ${data.name} and he has ${data.trophies} trophies.`);

  console.log(data);
});

/*
client.clan('22QV8CC', ['name', 'tag'], function(err, data){
  if(err)
    throw(err);

  console.log('Clan data is: ' + data.name + ' and the tag is: ' + data.tag);
});

*/
