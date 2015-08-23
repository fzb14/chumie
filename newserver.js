/**
 * Created by yitaolee on 15-4-27.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);


var routes = require('./app/Controller/routes');
var member = require('./app/Controller/member');
var lifeStyle = require('./app/Controller/lifeStyle');
// configuration ===========================================
var app = express();
// config files
var db = require('./settings');

var port = process.env.PORT || 8080; // set our port
//CONNECT TO MONGODB
mongoose.connect('mongodb://localhost/myapp');// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
app.use(cookieParser());

app.use(session({
    secret: 'chumie',
    key: 'chumie',//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        db: 'myapp',
        host: 'localhost',
        port: 27017,
        touchAfter: 24 * 3600
    })
}));
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users



// routes ==================================================
app.use('/',routes);// pass our application into our routes
app.use('/member',member);
app.use('/lifeStyle',lifeStyle);
// error handlers

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app