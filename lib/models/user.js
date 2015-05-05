'use strict';

var Mongoose = require('mongoose');

var userSchema = Mongoose.Schema({
  email: {type: String, required: true},
  avatar: {type: String, required: true},
  firebaseId: {type: String, required: true},
  createdAt : {type: Date, required: true, default: Date.now}
});

var User = Mongoose.model('User', userSchema);
module.exports = User;
