const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

// require user model in app.js
const User = require('./models/user');

// reuire router in app.js
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// connect mongoose
mongoose.connect('mongodb+srv://toreturkmen:1234567890@cluster0.2rayjqe.mongodb.net/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});



passport.use(User.createStrategy()); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this code share user details globally
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

// now use authRoutes here
app.use(authRoutes);

// landing page
app.get('/', function(req, res){
	res.render('home');
});

// route to check middle ware is working
// now add middle ware to check login

app.get('/secure', isLoggedIn, function(req, res){
	res.render('secure');
});

// middle ware function
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		// req.isAuthenticated() passport.js function
		return next();
	}else{
		res.redirect('/login');
	}
}

app.listen(3000, function () {
	console.log('server started');
});
