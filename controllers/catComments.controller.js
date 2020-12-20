const CatComment = require('../models/catComment.model');
const User = require('../models/user.model');

// @desc        Create a comment
// @route       POST /api/v1/catcomments
// @access      Public
exports.createComment = async (req, res) => {
    const { catName, userName, name, comment } = req.body;

    try {
        const user = await User.findOne({ userName });
        const newCatComment = new CatComment({
            catName,
            userName,
            name: user.name,
            comment,
        });

        await newCatComment.save();
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get all comments under a cat name
// @route       GET /api/v1/catcomments/:catName
// @access      Public
exports.getCommentsByCatName = async (req, res) => {
    const catName = req.params.catName;

    try {
        const catComments = await CatComment.find({ catName });
        return res.status(200).json(catComments);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
