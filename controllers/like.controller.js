const Like = require('../models/like.model');

// @desc        Create a like
// @route       POST /api/v1/likes
// @access      Public
exports.createLike = async (req, res) => {
    const { userName, name, catName } = req.body;

    try {
        const newLike = new Like({
            userName,
            name,
            catName,
        });

        await newLike.save();
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get all likes under a cat name
// @route       GET /api/v1/likes/:catName
// @access      Public
exports.getLikesByCatName = async (req, res) => {
    const catName = req.params.catName;

    try {
        const likes = await Like.find({ catName });
        return res.status(200).json(likes);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Check if there is a like under a cat name by a user name
// @route       GET /api/v1/likes/:catName
// @access      Public
exports.checkLikeByName = async (req, res) => {
    const { catName, userName } = req.params;

    try {
        const like = await Like.findOne({ catName, userName });
        if (like) {
            return res.status(200).json(true);
        }
        return res.status(200).json(false);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Delete a like
// @route       DELETE /api/v1/likes/:catName/:userName
// @access      Public
exports.deleteLikeByCatName = async (req, res) => {
    const { catName, userName } = req.params;
    try {
        await Like.deleteOne({ catName, userName });
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json('Server Error');
    }
};
