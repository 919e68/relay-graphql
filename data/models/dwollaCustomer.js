'use strict';
var mongoose = require('mongoose');
var logger = require('../utils/logger');


// define the schema for our user payement model
var dwollaSchema = new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId}, // id of a valid user , which holding this account details
    customerUrl:{type: String },
    fundingUrl:{type: String},
    transferUrl:{type: String}
 });

module.exports = mongoose.model('Dwolla',dwollaSchema);

