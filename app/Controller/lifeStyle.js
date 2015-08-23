/**
 * Created by yitaolee on 15-8-20
 */

var crypto = require('crypto'),
    express = require('express'),
    fs = require('fs'),
    User = require('./../models/mongouser.js'),
    WechatAccount = require('./../models/wechatAcco.js'),
    Message = require('./../models/message.js'),
    router = express.Router(),
    path = require('path');

router.post('/nightowl/', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.nightowl!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {nightowl_or_earlybird: req.body.nightowl}});
        });
    }
    else
    {
        res.redirect('/');
    }
});


router.post('/smoke', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.smoke!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {smoke: req.body.smoke}});
        });
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/idealRelationship', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.idealRelationship!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {idealRelationship: req.body.idealRelationship}});
        });
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/cleanInSharedPlace', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.cleanInSharedPlace!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {cleanInSharedPlace: req.body.cleanInSharedPlace}});
        });
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/noise', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.noise!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {noise: req.body.noise}});
        });
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/howOfenBringFriends', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.howOfenBringFriends!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.set({lifestyle : {howOfenBringFriends: req.body.howOfenBringFriends}});
        });
    }
    else
    {
        res.redirect('/');
    }
});

router.post('/arrOfInterests', function(req, res, next) {
    if(req.session.email != null && req.session.email !='' && req.body.arrOfInterests!=null)
    {
        User.findOne({ email : req.session.email }, function(err, user) {
            if (err) throw err;
            user.lifestyle.arrOfInterests.push(req.body.arrOfInterests);

            user.save(function (err) {
                if (!err) console.log('Success-interests-added!');
            });
        });
    }
    else
    {
        res.redirect('/');
    }
});
//get all info from user
router.get('/u/:id', function(req, res, next) {
    if(req.params.id!=null &&req.params.id!='')
    {
        User.findOne({email: req.params.id}, function(error, user) {
            if(user!=null)
            {
                if(error)
                {
                    return next(error);
                }
                res.json(user);
            }
            else
            {
                err = 'There is no such user. 没有此用户.';
                var newMessage = new Message(
                    'error',
                    err
                );
                res.send(JSON.stringify(newMessage.toJson()));
            }
        });
    }
});


module.exports = router;