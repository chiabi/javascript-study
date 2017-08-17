const FetchStream = require("fetch").FetchStream;

const fetch = new FetchStream("http://google.com");

fetch.on("data", function(chunk){
    console.log(chunk);
});