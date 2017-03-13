'use strict';
var mongoose = require('mongoose');
var logger = require('../utils/logger');

var userTransactionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId, // userid of the app user
	required: true
	},
	accountId:{
		type: mongoose.Schema.Types.ObjectId, // dwolla customer id of the user
	},
	product: {
		type: String,
	},
	stationId: {
		type:  mongoose.Schema.Types.ObjectId, // station to which payement done
	},
	pumpId: {
		type:String,
	},
	unitPrice: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
	paymentAmount:{
		type: Number,
	},
	feeAmount: {
		type: Number,
	},
	retailerShare:{
		type: Number,
	} ,
	profit:{
		type: Number,
	},
	history:[{
		status:String,
		timestamp:Date	
	}],
	reference: {
	dwolla: {
	 type:  mongoose.Schema.Types.Mixed,
	}
	},
	status: {
		type: String,
		default: null
	},
	cutoffAt: {
		type: Date,
		default: null
	},
	createdAt: {
		type : Date, 
	},
	ziplineSessionId: {
		type: Number,
	},
	isTest: {
		type: Boolean,
		default: false
	}
});

// create the model for transactions and expose it to our app
module.exports = mongoose.model('UserTransaction', userTransactionSchema);