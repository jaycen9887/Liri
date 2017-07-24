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
    //console.log(data.statuses);
    for(var i = 0; i<data.statuses.length; i++){
    console.log("------------------------------------------------------------------------");
    console.log(data.statuses[i].text);
    console.log(data.statuses[i].created_at);
    console.log(data.statuses[i].user.name); 
    }
}