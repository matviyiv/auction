var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    expressHbs = require('express3-handlebars'),
    path = require('path'),
    publicFolder = path.join(__dirname, './public'),
    routes = require('./routes');
    

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', expressHbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs',
  partialsDir: 'views/partials/',
  layoutsDir: 'views/layouts/'
}));

app.set('view engine', 'hbs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get('env') === 'development') {
  app.use('/', function(req, res, next) {
    //TODO: fake authentication goes here
    next();
  });
} else {s
  app.use('/', function(req, res, next) {
    //TODO: production authentication goes here
    next();
  });
}

app.use(express.static(publicFolder));

app.use(function(req, res, next) {
  //TODO: parse request and find out userId
  req.usedId = 777;
  next();
});

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
