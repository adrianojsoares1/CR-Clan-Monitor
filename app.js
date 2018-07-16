const CRoyaleAPI = require('./utils/client');
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE2MCwiaWRlbiI6IjI2MjAxMzc3NDA3NTAwMjg4MSIsIm1kIjp7f' +
  'SwidHMiOjE1MzEyODA2OTI4NDJ9.SqFdPptY7SmJNW6JgpdEHpgDvnjEtArsTnGknx_NLpw';

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
