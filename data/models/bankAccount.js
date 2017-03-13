'use strict';
var mongoose = require('mongoose');
var logger = require('../utils/logger');


var bankAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  displayName: {
    type: String,
    default: null
  },
  plaidAccountId: {
    type: String,
    default: null
  },
  plaidAccessToken: {
    type: String,
  },
  routingNumber: {
    type: String,
    default: null
  },
  accountNumber: {
    type: String,
    default: null
  },
  accountType: {
    type: String,
    default: null
  },
  metaInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  stripeAccountToken: {
    type: String,
    default: null,
  },
  stripeCustomerToken: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  removedAt: {
    type: Date,
    default: null,
  },
});

bankAccountSchema.statics.STATUS = {
  VALID: 1,
  REJECTED: 2,
  REMOVED: 3,
}

module.exports = mongoose.model('BankAccount', bankAccountSchema);