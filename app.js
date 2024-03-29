var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

//var index = require('./routes/index');
var processos = require('./routes/processos');

var app = express();

// Base de dados
/* var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/equivalencias', {useMongoClient: true})
mongoose.Promise = global.Promise */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/equivalencias', 
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use('/', processos);
app.use('/processos', processos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
