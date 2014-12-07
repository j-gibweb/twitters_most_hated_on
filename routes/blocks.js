var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


var blocks = {
  'Red': "This block is red, it shoots fire out of its asshole",
  'Green': "This block is green, it's gangrenous.",
  'Blue': "This block is blue, it's choking."
};

  // Which Express function maps placeholders to callback functions, 
  // and is commonly used for running pre-conditions on Dynamic Routes?
  // middleware approach to validations / formatting

router.route('/')
  .post(parseUrlencoded, function(req, res) {
    // console.log(req.body.description);
    blocks[req.body.name] = req.body.description;
    res.json(blocks[req.body.name]);
  })
  .get(function(req, res) {
    res.status(201).json(blocks)
  });

router.route('/:name')
  .delete(function(req, res) {
    delete blocks[req.params.name]
    console.log(blocks)
    res.sendStatus(200);
  })
  .get(function(req, res) {
    var returnedThing = blocks[req.blockName];
    if (!returnedThing) {
      res.status(404).json("Not Found, ya retahd. " + req.params.name);
    } else {
      res.json(returnedThing);
      // res.send(returnedThing);
    }
  })
  .all(function(req, res, next) {
    var name = req.params.name;
    req.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    next();
  });

module.exports = router;