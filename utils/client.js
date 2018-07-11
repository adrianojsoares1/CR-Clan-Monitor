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
}

Client.prototype.API_HOST = 'api.royaleapi.com';

Client.prototype.setApiKey = (key) => {
    this.API_KEY = key;
    return this;
};

Client.prototype._getGenericLog = function(path, callback) {
    if(!this.API_KEY)
        console.error('API Key has not been set, cannot proceed. Set it by calling setApiKey(key) on the client.');

    this.REQUEST_OPTIONS.path = path;
    let partial_data = [];

    const req = https.request(this.REQUEST_OPTIONS, function (res) {
        res.on('data', (chunk) => partial_data.push(chunk));
        res.on('end', () => callback(JSON.parse(partial_data.join(''))));
    });

    req.on('error', (err) => console.error(err));
    req.end();
};

Client.prototype.player = function(name, callback){
    this._getGenericLog(`player/${name}`, callback);
};

Client.prototype.arbnoPlayers = (names, callback) => this._getGenericLog(`player/${names.join(',')}`, callback);

Client.prototype.playerBattles = (name, callback) => this._getGenericLog(`player/${name}/battles`);
Client.prototype.arbnoPlayerBattles = (names, callback) => this._getGenericLog(`player/${names.join(',')}/battles`);

Client.prototype.playerChests = (name, callback) => this._getGenericLog(`player/${name}/chests`, callback);
Client.prototype.arbnoPlayerChests = (names, callback) => this._getGenericLog(`player/${names.join(',')}`, callback);

Client.prototype.clan = (name, callback) => this._getGenericLog(`/clan/${name}`, callback);
Client.prototype.clanBattles = (name, callback) => this._getGenericLog(`/clan/${name}/battles`, callback);

Client.prototype.war = (name, callback) => this._getGenericLog(`/clan/${name}/war`, callback);
Client.prototype.warLog = (name, callback) => this._getGenericLog(`/clan/${name}/warlog`, callback);

module.exports = Client;
