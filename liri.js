// append the data to a txt file called log.txt
var request = require("request");
var fs = require("fs");
var apiKeys = require("./keys.js");
var imdbKey = apiKeys.imdb_key.api_key;
var twitterKey = apiKeys.twitter_key;
var spotifyKey = apiKeys.spotify_key;

if (process.argv[2] === "my-tweets"){
    //shows last 20 tweets
} else if(process.argv[2] === "spotify-this-song"){
    // takes a song and returns the artist, song name, preview link from spotify, and the album the song is from. 
    
    //if no song is provided default is "The Sign" by Ace of Base
} else if(process.argv[2] === "movie-this"){
    //takes a movie title
    //returns the title of the movie, year the movie came out, IMDB rating, rotten tomatoes rating, country movie was produced, language of the movie, plot of the movie, actors in the movie. 
    //if no movie is provided default is "Mr. Nobody
    request("http://www.omdbapi.com/?t=" + term + "&yplot=short&apikey=" + imdbKey, function(err, response, body){
        if(err){
            console.log(err);
        }
        
        
    })
    
} else if(process.argv[2] === "do-what-it-says"){
    // reads the text inside random.txt and uses that to call a command
}


function movie(title) {
    
}

function song(title) {
    
}

function twit(){
    
}