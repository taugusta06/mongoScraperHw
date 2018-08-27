// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


var express = require('express');
var exphbs = require('express-handlebars');
var request = require("request");
var cheerio = require("cheerio");
var PORT = process.env.PORT || 3000;
var scrapeUrl = "https://old.reddit.com/r/webdev/";

var app = express();

app.use(express.static("public"));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));

app.set('view engine', '.hbs');

app.get("/", function(req, res){
    request(scrapeUrl, function(err, status, html){
        var $ = cheerio.load(html);
        $("p.title").each(function(err, elem){
            var data = {};
            var text = $(elem).find("a".text);
            data.text = text;
            scrapeData.push(data);
        })
    });
    res.render("index");
});

app.get("/", function(req, res){
    res.render("index");
});



app.listen(PORT, function(){
    console.log('app listening on localhost:' + PORT);
});