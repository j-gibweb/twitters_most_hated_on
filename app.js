var express = require('express');
var app = express();
var mongoose       = require("mongoose");

// app.use(express.static('public'));
var logger = require('./logger');
app.use(logger);

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

var blockRoutes = require('./routes/blocks');
app.use('/blocks', blockRoutes);

var todoRoutes = require('./routes/todo');
app.use('/todo', todoRoutes);



// MongoDB config
mongoose.connect('mongodb://jweber000:M4cb00kpr0!@ds053140.mongolab.com:53140/sandbox', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.listen(3000, function() {
  console.log('shh, im working over here...')
});