// eksisozluk/api

'use strict';

// core packages
const path = require('path');

// node packages
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const session = require('express-session');

// local packages
const routes = require('./routes');

// vars
const app = express();
const port = process.env.PORT || 3000;

// application settings
app.set('trust proxy', 1);

// compress response
app.use(compression());

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// static folder
app.use(express.static('./public'));

// process requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

// simple session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'eksisozluk',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

// simple flash messages
app.use(flash());

// routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start server
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.log('eksisozluk api is ready! \n');
});
