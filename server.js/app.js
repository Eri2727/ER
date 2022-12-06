var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var homepageRouter = require('./routes/homepage');

var passport = require('passport');
var LocalStrategy = require('passport-local');
const { Database } = require('sqlite3');

var session = require('express-session');

var app = express();

var sessionInfo = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { user:'', type:'', secure:false }
};

app.use(session(sessionInfo));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', indexRouter);
app.use('/homepage', homepageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('base_de_dados.sqlite3');

  database.serialize(() => {
      database.run("CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, type TEXT NOT NULL, PRIMARY KEY('username'))");

      const insere_users_teste = database.prepare("INSERT INTO users VALUES (?,?,?)");
      insere_users_teste.run("joao","abc","docente", function() {console.log("user already exists")});
      insere_users_teste.run("maria","def","docente", function() {console.log("user already exists")});
      insere_users_teste.run("quim","ghi","encarregado", function() {console.log("user already exists")});
      insere_users_teste.finalize();
  });

database.close();

passport.use(new LocalStrategy(function verify(username, password, callback) {
  console.log("alo------------------------");
	let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
	database.get("SELECT * FROM users WHERE username = ?", [ username ], function(err, user) {
    console.log(user);
    if(err) {
      console.log('uh');
			return callback(err);
		}
		if(!user) {
      console.log("uhhhhhhhh");
			return callback(null, false, { message: 'Dados de login inválidos.' });
		}
		if(password === user.password) {
      console.log("very correct password");
      sessionInfo.cookie.secure = true;
      sessionInfo.cookie.user = user.username;
      sessionInfo.cookie.type = user.type;
		  return callback(null, user);
		}
		return callback(null, false, {message: 'Dados de login inválidos.'});
	});
  database.close();
}));

module.exports = app;
