var express = require('express');
//const helmet = require('helmet')
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chartRouter = require('./routes/chart');
var currencyConverterRouter = require('./routes/currency-converter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(helmet());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/currencycharts', chartRouter);
app.use('/currencyconverter', currencyConverterRouter);

app.post('/data', function(req, res) {
  const result = req.body
  res.json({ result })
})

app.get('*', function(req, res, next) {
  res.status(404).send('page not found');
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
