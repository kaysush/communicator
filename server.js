var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var express = require('express');
var app = express();
var port = Number(process.env.PORT || 8080);

passport.use( new GoogleStrategy({
	returnURL: 'http://hdccommunicator.herokuapp.com/auth/google/return',
	realm: 'http://hdccommunicator.herokuapp.com'
}, function(identifier, profile, done){
	User.findOrCreate({openId: identifier}, function(err,user){
		done(err,user)
	});
} 
));
app.get('/' , function(req, res){
	res.send('Hello World...');
} )
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

app.listen(port,function(){
	console.log('Server Started at ' + port);
});