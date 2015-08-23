/**
 * Created by yitaolee on 15-8-19.
 */
var crypto = require('crypto'),
    express = require('express'),
    fs = require('fs'),
    User = require('./../models/mongouser.js'),
    WechatAccount = require('./../models/wechatAcco.js'),
    Message = require('./../models/message.js'),
    router = express.Router();
    path = require('path');

router.post('/reg', function(req, res, next) {
    //debug
    console.log("start-register:##### email ###### password #####");
    console.log(req.body.email);
    console.log(req.body.password);

    //encode password
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    //find the user already register
    //
    User.findOne({email: req.body.email}, function(error, user) {
        if(user!=null)
        {
            err = '您的Email已经被使用过了。换一个试试吧。';
            var newMessage = new Message(
                'error',
                err
            );
            res.send(JSON.stringify(newMessage.toJson()));
        }
        else
        {
            //register user & set a session
            new User({email: req.body.email, password: password, registerDate: new Date()}).save();
            req.session.email = req.body.email;
            var newMessage = new Message(
                'success',
                ''
            );
            res.send(JSON.stringify(newMessage.toJson()));
        }
    });
});


    /* POST login api. Action*/
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.findOne({email: req.body.email, password: password}, function(error, user) {
        if(user===null)
        {
            var newMessage = new Message(
                'error',
                '邮箱或者密码有错误'
            );
            res.send(JSON.stringify(newMessage.toJson()));
        }
        else
        {
            //var temUser = JSON.stringify(user);
            req.session.email = req.body.email;
            var newMessage = new Message(
                'success',
                ''
            );
            res.send(JSON.stringify(newMessage.toJson()));
        }
    });
});


/* GET login api. */
router.get('/logout', function(req, res, next) {
    req.session.email = null;
    //req.flash('success','登出成功');
    res.redirect('/');
});

function checkLogin(req, res, next){
    if(!req.session.email) {
        return res.redirect('/');//back to home page
    }
    next();//go to next router
}

function checkNotLogin(req, res, next){
    console.log("ss");
    if(req.session!=null) {
        return res.redirect('/'+req.session.email);
    }
    next();
}

module.exports = router;