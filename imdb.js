
exports.movie = function (title) {
    var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + apiKey;
    $.ajax({
        url: url,
        method: "GET"
   }).done(function (data)) {
        console.log(data.Title);
        console.log(data.Year);
        console.log(data.Genre);
        console.log(data.Director);
        console.log(data.Actors);
        console.log(data.Runtime);
        console.log(data.Rated);
        console.log(data.Plot);
    }
}