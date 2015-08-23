var crypto = require('crypto'),
	express = require('express'),
	fs = require('fs'),
	User = require('./../models/mongouser.js'),
	WechatAccount = require('./../models/wechatAcco.js'),
	Message = require('./../models/message.js'),
	router = express.Router(),
	path = require('path');



	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	//if already login just go system
	router.get('/', function(req, res, next) {
			res.sendfile('./public/index.html');
	});

	router.get('/memberSystem', function(req, res, next) {
		res.sendfile('./public/views/dashBoard.html');
	});


	/* GET influencer home page. */
	//app.get('/influencer', checkLogin);//if session expire, back to home page
	router.get('/influencer', function(req, res, next) {
			console.log("ssshey");
			new User({email: 'sfsdsaa', password: 'dsada'}).save();
			User.find(function(err, user) {
				res.send(JSON.stringify(user));
				//res.json('"广州","ProvinceId":27,"CityOrder":1}]');
			});
	});

		/* GET influencer self-service page. */
	router.get('/influencer-self-service', function(req, res, next) {
			res.render('layout', { title: 'influencer-self-service' });
	});

		/* GET advertiser home page. */
	router.get('/advertiser/:id', function(req, res, next) {//id exist =inivited.
			if(req.params.id!=null&&req.params.id!='')
			{//inivited page
				res.render('layout', { title: 'advertiser-target' });
			}
			else
			{//all functional page
				res.render('layout', { title: 'advertiser' });
			}
	});

		//app.get('*', function(req, res) {
		//	res.sendfile('./public/index.html');
		//});

module.exports = router;