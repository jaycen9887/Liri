var Twit = require('twit'); 
var config = require('./keys');

var key = config.twitter_key;
var T = new Twit(key); 
var params = {
q: 'nodejs',
count: 20
} 

T.get('search/tweets', params, searchedData); 

function searchedData(err, data, response) {
    console.log("------------------------------------------------------------------------");
    console.log(data.statuses[0].text);
    console.log(data.statuses[0].created_at);
    console.log(data.statuses[0].user.name); 
}