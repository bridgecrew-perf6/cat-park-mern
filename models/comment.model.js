const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        userName: String,
        comment: String,
        postId: String,
        name: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Comment', CommentSchema);
