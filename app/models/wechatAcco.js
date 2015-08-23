/**
 * Created by yitaolee on 15/5/7.
 */
// For setting up wechat account for user.

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var WechatSchema = new Schema({
    wechatId:  String,
    name:  String,
    originalId:  String,
    AppID:  String,
    AppSecret:  String,
    URL:  String,
    Token:  String,
    EncodingAESKey:  String,
    fansNumber:  String,
    prevURL: String
});

module.exports = mongoose.model('WechatAccount', WechatSchema);