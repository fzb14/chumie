/**
 * Created by yitaolee on 15-8-26.
 */

var crypto = require('crypto'),
    express = require('express'),
    fs = require('fs'),
    User = require('./../models/mongouser.js'),
    WechatAccount = require('./../models/wechatAcco.js'),
    Message = require('./../models/message.js'),
    router = express.Router(),
    path = require('path');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var extension = file.mimetype.split("/");
        extension = extension[extension.length-1];
        cb(null, file.fieldname + '-' + Date.now()+extension);
    }
});

var upload = multer({ storage: storage, fileFilter:fileFilter, limits:limit }).single('userPhoto');
var mimetypes = ["image/jpeg","image/gif","image/png"];

router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            var newMessage = new Message(
                'error',
                err
            );
            res.send(newMessage.toJson());
        }
        else{
            var newMessage = new Message(
                'success',
                ''
            );
            res.send(newMessage.toJson());
        }

    })
})

function fileFilter (req, file, cb) {
    console.log(mimetypes.indexOf(file.mimetype) === -1);
    if(mimetypes.indexOf(file.mimetype) === -1) {
        return cb(new Error('Must be an image file'));
    }

    cb(null, true);
}

var limit = {
    fileSize: 5 * 1024 * 1024
}


module.exports = router;