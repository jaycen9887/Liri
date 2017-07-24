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

if (process.argv[2] === "my-tweets"){
    //shows last 20 tweets
    twit();
} else if(process.argv[2] === "spotify-this-song"){
    // takes a song and returns the artist, song name, preview link from spotify, and the album the song is from. 
    if(process.argv[3]){
        song(process.argv[3]);
    }else {
        song("The Sign");
    }
    
    //if no song is provided default is "The Sign" by Ace of Base
} else if(process.argv[2] === "movie-this"){
    //takes a movie title
    //returns the title of the movie, year the movie came out, IMDB rating, rotten tomatoes rating, country movie was produced, language of the movie, plot of the movie, actors in the movie. 
    //if no movie is provided default is "Mr. Nobody
    if(process.argv[3]){
       movie(process.argv[3]);
    }else {
        movie("Mr. Nobody");
    }
    
} else if(process.argv[2] === "do-what-it-says"){
    // reads the text inside random.txt and uses that to call a command
    fs.readFile("random.txt", "utf8", function(error, data){
        if(!error){
            
        }
    })
    
}


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