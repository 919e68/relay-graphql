'use strict';
var mongoose = require('mongoose');

var CutoffHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  cutoffAmount: {
    type: Number,
    required: true
  },
  cutoffAt: {
    type: Date,
    required: true,
    default: null
  }
});

module.exports = mongoose.model('CutoffHistory', CutoffHistorySchema);