'use strict';
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    match: [/^\w+$/, 'Please fill a valid password']
  },
});

adminSchema.pre('save', function(callback) {
  var admin = this;

  // Break out if the password hasn't changed
  if (!admin.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(20160701, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(admin.password, salt, null, function(err, hash) {
        if (err) return callback(err);
        admin.password = hash;
        callback();
    });
  });
});

adminSchema.methods.verifyPassword = function(password) {
  var admin = this;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, admin.password, function(err, res) {
    if(err)
      reject(err);
    
    resolve(res);
    });
  });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Admin', adminSchema);

