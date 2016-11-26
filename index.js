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
const hbs = require('express-hbs');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const session = require('express-session');

// local packages
const helpers = require('./helpers');
const routes = require('./routes');

// vars
const app = express();
const port = process.env.PORT || 3000;
const production = process.env.NODE_ENV === 'production';

// application settings
app.set('trust proxy', 1);

// register custom hbs helpers
helpers.forEach(helper => {
  hbs.registerHelper(helper.name, helper.file);
});

// log requests to the console
// :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
app.use(morgan('short'));

// compress response
app.use(compression());

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// sass middleware
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: !production,
  force: true,
  outputStyle: production ? 'compressed' : 'extended',
  sourceMap: true
}));

// process requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

// simple session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'eksisozluk',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

// simple flash messages
app.use(flash());

// view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views/layouts/default.hbs'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: production ? {} : err
  });
});

// start server
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.log('eksisozluk api is ready! \n');
});
