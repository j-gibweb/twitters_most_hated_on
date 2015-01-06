var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended:false}));



var Linkedin = require('node-linkedin')(process.env.LINKEDIN_API, process.env.LINKEDIN_SECRET, 'localhost:3000/oauth/linkedin/loggedin');
var linkedin;
var access_token;
linkedin = Linkedin.init(access_token, { timeout: 10000 });

app.get('/oauth/linkedin', function(req, res) {
    Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);
});

app.get('/oauth/linkedin/loggedin', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
        if (err) {return console.error(err);}

        access_token = JSON.parse(results).access_token;
        linkedin = Linkedin.init(access_token, {
          timeout: 10000 
        });
        
        return res.redirect('/');
    });
});

app.get('/:name', function(req, res) {
  
  linkedin.companies.name(req.params.name, function(err, company) {
      if (err) {
        res.send(err);  
      } else {
        res.send(company);
      }
  });
  
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server is working')
});