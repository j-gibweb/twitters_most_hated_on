var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var Todo = require('../models/todo.js');


// var todos = {
//   "1" : {name: "Not Changed", description: "Not anything"}
// }

router.route('/')
  // show all
  .get(function(req, res) {
    return Todo.find(function(err, todos) {
      if(!err) {
        return res.status(201).send(todos);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    })
  })
  // create
  .post(parseUrlencoded, function(req, res) {
    console.log(req.body)
    var todo = new Todo({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed
    });
    todo.save(function(err) {
      if(err) {
        console.log('Error while saving user: ' + err);
        res.send({ error: err });
        return;
      } else {
        console.log("User created");
        return res.send({ status: 'OK', todo: todo });
      }
    })
    
  })

router.route('/:id')
  // update
  .put(parseUrlencoded, function(req, res) {
    console.log(req.body)
    // todos[req.params.id].name = req.body.name
    res.send(todos[req.params.id])
  })
  
  // show
  .get(function(req, res) {
    res.send(todos[req.params.id])
  })
  // delete
  .delete(function(req, res) {
    return Todo.findById(req.params.id, function(err, todo) {
      return todo.remove(function(err) {
        if(!err) {
          console.log('Removed todo');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s', res.statusCode, err.message);
          return res.send({ error: 'Server error' });
        }
      })
    })
  });











module.exports = router;