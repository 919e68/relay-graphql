var mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema({
    _uid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    comment:String,
    category: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);