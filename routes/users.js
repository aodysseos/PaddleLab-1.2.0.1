var express = require('express');
var crypto  = require('crypto');
var router = express.Router();
var users = require('../controllers/users_controller');

router.use('/public', express.static( 'public'));
router.use('/lib', express.static( 'lib'));
router.use('/assets', express.static( 'assets'));

router.get('/', function(req, res){
	if (req.session.user) {
		res.render('index', {username: req.session.username, msg:req.session.msg});
	} else { 
		req.session.msg = 'Access denied!';
		res.redirect('/login');
	}
});

router.get('/user', function(req, res){
	if (req.session.user) {
		res.render('user', {msg:req.session.msg});
	} else { 
		req.session.msg = 'Access denied!'; 
		res.redirect('/login');
	}
});

router.get('/signup', function(req, res){
	if (req.session.user){
		res.redirect('/');
	} 
	res.render('signup', {msg:req.session.msg});
});

router.get('/login',  function(req, res){ 
	if (req.session.user){ 
		res.redirect('/'); 
	} 
	res.render('login', {msg:req.session.msg});
}); 

router.get('/logout', function(req, res){ 
	req.session.destroy(function(){
		res.redirect('/login');
	}); 
}); 

router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

module.exports = router;
