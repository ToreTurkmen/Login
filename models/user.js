const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// setup user model
const userSchema = new mongoose.Schema({
	username:String,
	password:String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);