const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


// authentication route
// 1.Show registeration form
router.get('/signup', function(req,res){
	res.render('register');
});

// 2.Post request for registeration
router.post('/register', function(req, res){
	// logic here
	User.register({username:req.body.username}, 
		req.body.password, 
		function(err,user){
			if(err){
				console.log(err);
			}else{
				passport.authenticate('local')(req,res, function(){
					//user require to regsiter to see this page  
					res.render('index')
				});
			}
		});

});

// 3. show login form 
router.get('/login', function(req, res){
	res.render('login');
});

// 4. Login validation logic 
router.post('/login', function(req, res){
	// validation logic here
	const user = new User({
		username: req.body.username,
		password:req.body.password
	});
	req.login(user, function(err){
		if(err){
			console.log(err);
		}else{
			passport.authenticate('local')(req,res,function(){
				res.render('index');
			});
		}
	});

});

// 5. logout user 
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

module.exports = router;
