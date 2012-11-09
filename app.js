var Express = require('express');
var Routes = require('./routes');

// var TryCatch = require('./trycatch');

//var App = module.exports = Express.createServer();
var App = Express();

// Configuration

App.configure(function(){
  App.set('views', __dirname + '/views');
  App.set('view engine', 'jade');
  // This gives us scoped errors with long stack traces
  // App.use(function (req, res, next) {
  //   TryCatch(next, next);
  // });
  App.use(Express.bodyParser());
  App.use(Express.methodOverride());
  App.use(App.router);
  App.use(Express.static(__dirname + '/public'));
});

App.configure('development', function(){
  App.use(Express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

App.configure('production', function(){
  App.use(Express.errorHandler()); 
});

// Routes
App.get('/', Routes.index);
App.get('/:name', Routes.view);
App.get('/:name/edit', Routes.edit);
App.post('/:name', Routes.save);

server = App.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", server.address().port, App.settings.env);
