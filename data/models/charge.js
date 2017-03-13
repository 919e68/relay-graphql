'use strict';
var mongoose = require('mongoose');

var ChargeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  bankAccountId: {
    type: mongoose.Schema.Types.ObjectId
  },
  amount: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
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
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isTest: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Charge', ChargeSchema);