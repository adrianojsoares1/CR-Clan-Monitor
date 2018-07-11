const https = require('https');
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE2MCwiaWRlbiI6IjI2MjAxMzc3NDA3NTAwMjg4MSIsIm1kIjp7fSwidHMiOjE1MzEyODA2OTI4NDJ9.SqFdPptY7SmJNW6JgpdEHpgDvnjEtArsTnGknx_NLpw';
const API_HOST = 'api.royaleapi.com';
const REQUEST_OPTIONS = {
  hostname: API_HOST,
  port: 443,
  method: 'GET',
  headers: {
    auth: API_KEY,
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.5',
    connection: 'keep-alive'
  }
};
const CLAN_ID = '22QV8CC';

let getClanMembers = (callback) => getGenericLog(`/clan/${CLAN_ID}`, callback);
let getWarLog = (callback) => getGenericLog(`/clan/${CLAN_ID}/warlog`, callback);

function getGenericLog(path, callback){
  REQUEST_OPTIONS.path = path;
  let partial_data = [];

  const req = https.request(REQUEST_OPTIONS, function(res){
    res.on('data', (chunk) => partial_data.push(chunk));
    res.on('end', () => callback(JSON.parse(partial_data.join(''))));
  });

  req.on('error', (err) => console.error(err));
  req.end();
}


