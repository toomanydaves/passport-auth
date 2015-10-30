var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var port = process.env.PORT || 3000;
var host = process.env.HOST_NAME || 'localhost';
var app = express();
var server;
var user;

app.use(passport.initialize());

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID || 1515229655462039,
        clientSecret: process.env.FACEBOOK_APP_SECRET || '3316be86d54c498815089a354e4435ac',
        callbackURL: 'http://' + host + ':' + port + '/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('accessToken:' + accessToken);

        // TODO Get/set user via persistance service.
        user = profile;

        // If the user isn't in the system

        done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    // TODO Save meaningful id
    done(null, 'id');
});

passport.deserializeUser(function (id, done) {
     // TODO Retrieve user from persistance service using ID
     done(null, user);
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/auth/facebook', passport.authenticate('facebook', { session: false }));

app.get('/auth/facebook/callback', passport.authenticate(
    'facebook',
    { successRedirect: '/index', failureRedirect: '/login', session: false }
));

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server = app.listen(port, host, function (err) {
    var url;

    if (!err) {
        url = server.address();

        console.log('Server listening at ' + url.address + ':' + url.port);
    }
});

