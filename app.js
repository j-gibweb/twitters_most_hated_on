var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var path = require('path');
var Twit = require('twit');

var env = process.env.NODE_ENV || 'dev';
if (env === 'dev') {require('./config');}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended:false}));



var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

var tweets = [];

app.get('/', function(req, res) {
  res.render("index.html");
});


app.post('/track', function(req, res) {
  var term = "#"+req.body.word;
  var stream = T.stream('statuses/filter', { track: term, language: 'en'})
  stream.on('tweet', function (tweet) {
    tweets.push(tweet);
  });
  res.send("Ok, working");
});


app.get('/sample', function(req, res) {
  console.log('/sample ' + tweets.length);
  res.send({tweets: tweets});
  tweets = [];
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server is working')
});