var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var express = require('express');
var app = express();
var port = Number(process.env.OPENSHIFT_NODEJS_PORT || 8080);
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

passport.use( new GoogleStrategy({
	returnURL: 'http://communicator-sushilkumar.rhcloud.com/auth/google/return',
	realm: 'http://communicator-sushilkumar.rhcloud.com'
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

app.listen(port,ipAddress,function(){
	console.log('Server Started at ' + port);
});