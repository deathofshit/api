// eksisozluk/api

'use strict';

// node packages
const express = require('express');

// local packages
const routes = require('./routes');

// vars
const app = express();
const port = process.env.PORT || 3000;

// route
app.use('/', (req, res) => {
  res.status(200).json({
    version: pkg.version
  });
});

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
