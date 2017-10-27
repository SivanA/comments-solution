const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    updatedAt: Date,
    comment: String,
    email: String,
    rating: Number
});

module.exports = mongoose.model('Comment', commentSchema);
