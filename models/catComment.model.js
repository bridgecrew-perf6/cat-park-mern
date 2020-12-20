const mongoose = require('mongoose');

const CatCommentSchema = new mongoose.Schema(
    {
        catName: String,
        userName: String,
        name: String,
        comment: String,
        like: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('CatComment', CatCommentSchema);
