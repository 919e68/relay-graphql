'use strict';
var mongoose = require('mongoose');

var vehicleSchema = new mongoose.Schema({
    _uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    fuelType: String,
    maker: String,
    model: String,
    year: Number,
    style: String,
    styleId: Number,
    selected: Boolean,
    spec: {},
    preferedBrand: [String],
    removedAt: Date,
    createdAt: Date,
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Vehicle', vehicleSchema);