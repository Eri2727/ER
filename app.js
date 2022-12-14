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
  cookie: { user:'', type:'', id:'', secure:false }
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
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRouter);
app.use('/homepage', homepageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error:err} );
});

const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('base_de_dados.sqlite3');

database.serialize(() => {
    database.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY , username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, type TEXT NOT NULL, name TEXT NOT NULL)");

    const insere_users_teste = database.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
    insere_users_teste.run("1","joao","123","docente","Jo??o Lamego Zambujal", function() {console.log("user already exists")});
    insere_users_teste.run("2","maria","123","docente","Maria Elsa Gomes Angelim", function() {console.log("user already exists")});
    insere_users_teste.run("3","quim","123","encarregado","Quim Patr??cio Lousado", function() {console.log("user already exists")});
    insere_users_teste.run("4","jesse","123","encarregado","Jess?? Carvalhais Morais", function() {console.log("user already exists")});
    insere_users_teste.run("5","dinarte","123","encarregado","Dinarte Valim Fernandes", function() {console.log("user already exists")});
    insere_users_teste.run("6","dalila","123","encarregado","Dalila Carvalheiro Arantes", function() {console.log("user already exists")});
    insere_users_teste.run("7","marie","123","encarregado","Marie Borges Pacheco", function() {console.log("user already exists")});
    insere_users_teste.run("8","aron","123","encarregado","Aron Mangueira Ros??rio", function() {console.log("user already exists")});
    insere_users_teste.finalize();
});

database.close();

passport.use('loginEE', new LocalStrategy(function verify(username, password, callback) {
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
			return callback(null, false, { message: 'Dados de login inv??lidos.' });
		}
    if(user.type == "docente"){
      console.log("uhhhh");
			return callback(null, false, { message: 'Dados de login inv??lidos.' });
    }
		if(password === user.password) {
      console.log("very correct passwordEE");
      sessionInfo.cookie.secure = true;
      sessionInfo.cookie.user = user.username;
      sessionInfo.cookie.nome = user.nome;
      sessionInfo.cookie.type = user.type;
      sessionInfo.cookie.id = user.id;
		  return callback(null, user);
		}
		return callback(null, false, {message: 'Dados de login inv??lidos.'});
	});
  database.close();
}));


passport.use('loginD', new LocalStrategy(function verify(username, password, callback) {
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
			return callback(null, false, { message: 'Dados de login inv??lidos.' });
		}
    if(user.type == "encarregado"){
      console.log("uhhhh");
			return callback(null, false, { message: 'Dados de login inv??lidos.' });
    }
		if(password === user.password) {
      console.log("very correct passwordD");
      sessionInfo.cookie.secure = true;
      sessionInfo.cookie.user = user.username;
      sessionInfo.cookie.nome = user.nome;
      sessionInfo.cookie.type = user.type;
      sessionInfo.cookie.id = user.id;
		  return callback(null, user);
		}
		return callback(null, false, {message: 'Dados de login inv??lidos.'});
	});
  database.close();
}));

module.exports = app;
