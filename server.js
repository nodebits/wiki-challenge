var Http = require('http');
var Stack = require('stack');
var Creationix = require('creationix');
var App = require('./app');

var PORT = process.env.PORT || 8080;

Http.createServer(Stack(
  Creationix.log(),
  App
)).listen(PORT);
console.log("Server listening on http://localhost:%s/", PORT);

