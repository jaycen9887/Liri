var imdb = require("imdb-api");

imdb.get(title, {key: imdbKey, timeout: 30}, function(error, data, response){
    console.log(data);
})