var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//This code posts a new todo
app.post('/todos', (req, res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//This code gets all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234123
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };
  Todo.findById(id).then((todo) => {
     if (!todo) {
       return res.status(404).send();
     }
   res.send({todo});
 }).catch((e) => res.status(400).send());
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});

module.exports = {app};
