var express = require('express');
var app = express();

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');


var cheerio = require('cheerio');
var request = require('request');


var mongojs = require('mongojs');
var databaseURL = "news";
var collections = ["stories"];


app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


var db = mongojs(databaseURL, collections);
db.on('error', function(err){
	console.log("Database Error:", err);
});




app.get('/', function(req, res) {
 
  res.render('index');
});


app.post('/submit', function(req, res){

	
request('http://elitedaily.com/category/news/', function(err, res, body){
	var $ = cheerio.load(body);
	
	
	$('h2').each(function(i, element){


		var title = $(this).text();
		var link = $(this).find('a').attr('href');

		
		results.push({
			title: title,
			url: link,
			thoughts: []
		});

		console.log(results);
		
		db.stories.insert(results, function(err, result){
			if (err){
		    console.log(err);
			}
			else{
		    res.send(result); 
			}
		});
		
	  });

	});
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Listening on %d", PORT);
});