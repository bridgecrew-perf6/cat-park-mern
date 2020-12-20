const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        userName: String,
        name: String,
        catName: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Like', LikeSchema);
