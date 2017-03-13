'use strict';
var mongoose = require('mongoose');

var PayoutSchema = new mongoose.Schema({
  gasStationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payout', PayoutSchema);