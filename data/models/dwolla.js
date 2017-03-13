'use strict';
var mongoose = require('mongoose');

var access_token = '';

// define the schema for dwolla account details 
var dwollaAccountSchema = new mongoose.Schema({
    dwolla_id:{
        type: String,
        unique:true },
    dwolla_refresh:{
        type:String
    },
    dwolla_access:{
        type:String
    }   
 });

dwollaAccountSchema.methods.setToken = function(token, callback) {
        access_token = token;
        console.log(access_token);
         callback(true);  
}
console.log(access_token);
dwollaAccountSchema.methods.getToken = function(callback) {
    console.log('getToken')
    console.log(access_token);
        callback(access_token);
}

module.exports = mongoose.model('DwollaAccount',dwollaAccountSchema);
