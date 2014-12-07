var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({

  name: {
    type    : String,
    require : true
  },
  description: {
    type    : String,
    require : false
  },
  completed:    {
    type    : Boolean,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
  
});

module.exports = mongoose.model('Todo', Todo);