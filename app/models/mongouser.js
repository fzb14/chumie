// The Thread model

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    inviteCode:  String,
    registerDate: Date,
    lastLogin:  Date,
    username: String,
    lifestyle: {
        nightowl_or_earlybird: Number,
        smoke: Number,
        idealRelationship: Number,
        cleanInSharedPlace: Number,
        noise: Number,
        howOfenBringFriends: Number,
        arrOfInterests: [String]
    }
});

module.exports = mongoose.model('User', UserSchema);