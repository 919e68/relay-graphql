'use strict';
var mongoose = require('mongoose');
// define the schema for our user model
var userHistroySchema = new mongoose.Schema({
     was: { type: mongoose.Schema.Types.Mixed}, 
     updatedAt: {type: Date}, 
     _uId: { type: mongoose.Schema.Types.ObjectId, 
             required: true, 
             index: true 
         }
     }); 
          
// create the model for users and expose it to our app
module.exports = mongoose.model('UserHistory', userHistroySchema);