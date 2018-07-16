https = require('https');

function Client(key) {
  this.API_KEY = (typeof key === 'string') ? key : undefined;


  this.REQUEST_OPTIONS = {
    hostname: this.API_HOST,
    port: 443,
    method: 'GET',
    headers: {
      auth: this.API_KEY,
      accept: 'application/json',
      'Accept-Language': 'en-US',
      connection: 'keep-alive'
    }
  };

  this.setApiKey = function (key) {
    this.API_KEY = key;
    this.REQUEST_OPTIONS['headers']['auth'] = this.API_KEY;
  }

}

//API_HOST: The CR-API Host URI
Client.prototype.API_HOST = 'api.royaleapi.com';

//_getGenericLog: string, string, array, function -> void
//purpose: Send a HTTP request on behalf of given path, and return that data.
Client.prototype._getGenericLog = function(path, name, fields, callback) {
    //ensure API key exists
    if(!this.API_KEY)
        throw new Error('API Key has not been set, cannot proceed. Set it by calling setApiKey(key) on the client.');

    this.REQUEST_OPTIONS.path = path;
    let partial_data = [];

    //Make request - will use async streams
    const req = https.request(this.REQUEST_OPTIONS, function (res) {

        //read partial data chunk from buffer
        res.on('data', (chunk) => partial_data.push(chunk));

        //Data transfer is complete, begin data extrapolation
        res.on('end', function(){
          let data = null, error = null;

          switch(res.statusCode){

            case 200: {
              try {
                data = getSpecificFields(fields, JSON.parse(partial_data.join('')));
              } catch(e) {
                error = new Error('The JSON was not able to be parsed. Check your request or try again later.');
              }
              break;
            }

            case 401: error = new Error('401 (Unauthorized). Most likely cause is an invalid API key.');
              break;

            case 404: error = new Error('404 (Not Found). This player or clan wasn\'t found. ' +
              'Most likely the tag was typed incorrectly.');
              break;

            case 500: error = new Error('500 (Internal Server Error). Something is wrong with the RoyaleAPI servers, ' +
              'this is out of my control!');
              break;

            default: error = new Error(`Unexpected Error: ${res.statusCode}: (${res.statusMessage}).`);
          }
          callback(error, data);
        });
    });

    req.on('error', (err) => {
      throw new Error(`The API returned ${err.statusCode}: ${err.statusMessage}.\nHear ye, Hear ye:\n${err}`);
    });

    req.end();
};

function getSpecificFields(fields, obj){
  const new_obj = {};

  for(let i = 0; i < fields.length; i++){
    let field = obj[fields[i]];
    if(!field)
      console.warn(`Warning! Field ${field} does not exist! References will be 'undefined'.`);
    else new_obj[fields[i]] = field;
  }
  return (fields.length === 0) ? obj : new_obj;
}

Client.prototype.player = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${name}`, name, [], fields);
  return this._getGenericLog(`/player/${name}`, name, fields, callback);
};

Client.prototype.arbnoPlayers = function(names, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${names.join(',')}`, name, [], fields);
  return this._getGenericLog(`/player/${names.join(',')}`, name, fields, callback);
} ;

Client.prototype.playerBattles = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${name}/battles`, name, [], fields);
  return this._getGenericLog(`/player/${name}/battles`, name, fields, callback);
};

Client.prototype.arbnoPlayerBattles = function(names, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${names.join(',')}/battles`, name, [], fields);
  return this._getGenericLog(`/player/${names.join(',')}/battles`, name, fields, callback);
};

Client.prototype.playerChests = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${name}/chests`, name, [], fields);
  return this._getGenericLog(`/player/${name}/chests`, name, fields, callback);
};

Client.prototype.arbnoPlayerChests = function(names, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/player/${names.join(',')}/chests`, name, [], fields);
  return this._getGenericLog(`/player/${names.join(',')}/chests`, name, fields, callback);
};

Client.prototype.clan = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/clan/${name}`, name, [], fields);
  return this._getGenericLog(`/clan/${name}`, name, fields, callback);
};

Client.prototype.clanBattles = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/clan/${name}/battles`, name, [], fields);
  return this._getGenericLog(`/clan/${name}/battles`, name, fields, callback);
};

Client.prototype.war = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/clan/${name}/war`, name, [], fields);
  return this._getGenericLog(`/clan/${name}/war`, name, fields, callback);
};

Client.prototype.warLog = function(name, fields, callback){
  if(typeof fields === 'function')
    return this._getGenericLog(`/clan/${name}/warlog`, name, [], fields);
  return this._getGenericLog(`/clan/${name}/warlog`, name, fields, callback);
};

module.exports = Client;
