const CRoyaleAPI = require('./utils/client');
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE2MCwiaWRlbiI6IjI2MjAxMzc3NDA3NTAwMjg4MSIsIm1kIjp7f' +
    'SwidHMiOjE1MzEyODA2OTI4NDJ9.SqFdPptY7SmJNW6JgpdEHpgDvnjEtArsTnGknx_NLpw';

const client = new CRoyaleAPI(API_KEY);

client.player('2PCL28RV0', function(data){
    console.log(`Player's name is: ${data.name}`);
});
