// append the data to a txt file called log.txt
var Twit = require('twit');
var request = require("request");
var fs = require("fs");
var apiKeys = require("./keys.js");
var imdb = require("imdb-api");
var Spotify = require("node-spotify-api");
var childProcess = require("child_process");


var imdbKey = apiKeys.imdb_key.api_key;
var twitterKey = apiKeys.twitter_key;
var spotifyKey = apiKeys.spotify_key;

var title = process.argv[3]; 

function check(command){
    switch(command){
        case "my-tweets":
            twit();
            break;
        case "spotify-this-song":
            if(title){
                song(title);
            }else {
                song("The Sign");
            }
            break;
        case "movie-this":
            if(title){
                movie(title);
            }else {
                movie("Mr. Nobody");
            }
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data){
                if(!error){
                    var n = data.split(",");
                    title = n[1];
                    check(n[0]);
                    
                    
                }
            });
            break;            
    }
}

check(process.argv[2]);

function movie(title) {
  imdb.get(title, {apiKey: imdbKey }, results);
    function results(error, data){
        if(!error){
            var output = "Title: " + data.title + " Released: " + data.year + " IMDB Rating: " + data.ratings[0].Value + " Rotten Tomatoes Rating: " + data.ratings[1].Value + " Country: " + data.country + " Actors: " + data.actors + " Plot: " + data.plot;
            
            console.log("Title: " + data.title);
            console.log("Released: " + data.year);
            console.log("IMDB Rating: " + data.ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + data.ratings[1].Value);
            console.log("Country: " + data.country);
            console.log("Actors: " + data.actors);
            console.log("Plot: " + data.plot);
            
            fs.appendFile("movies.txt", (", " + output))
        }
    }
}

function song(title) {
    var spotify = new Spotify(spotifyKey);
    
    spotify.search({type: "track", query: title, limit: 1}, function(error, data){
      if(!error){
          var artist = [];
                    
          console.log("Track: " + data.tracks.items[0].name);
          console.log("----------------------");
          console.log("Artists: ");
          for(var i = 0; i < data.tracks.items[0].artists.length; i++){
             artist.push(data.tracks.items[0].artists[i].name); console.log(data.tracks.items[0].artists[i].name);
          }
          console.log("----------------------");
          console.log("Album: " + data.tracks.items[0].album.name);
          
          console.log("----------------------");
          console.log("Link: " + data.tracks.href);
          
          var output = "Track: " + data.tracks.items[0].name + " Artists: " + artist + " Album: " + data.tracks.items[0].album.name +  " Link: " + data.tracks.href;
          
          fs.appendFile("songs.txt", ", " + output);
          
          
      }  
    })
}

function twit(){
    var T = new Twit(twitterKey); 
    var params = { q: 'BootsMcGoots17', count: 20 } 

    /*search/tweets*/
    T.get('search/tweets', params, searchedData); 

    function searchedData(err, data, response) {
        for(var i = 0; i<data.statuses.length; i++){
        console.log("------------------------------------------------------------------------");
        console.log(data.statuses[i].text);
        console.log(data.statuses[i].created_at);
        console.log(data.statuses[i].user.name); 
            
        fs.appendFile("tweets.txt", ", " + data.statuses[i].text + " " + data.statuses[i].created_at + " " + data.statuses[i].user.name);
        }
    }
}

function runScript(script, arg, callback){
    var process = childProcess.fork(script);
    
    process.on("error", function(err){
        
    });
}