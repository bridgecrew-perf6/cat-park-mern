const Comment = require('../models/comment.model');
const User = require('../models/user.model');

// @desc        Create a comment
// @route       POST /api/v1/comments
// @access      Public
exports.createComment = async (req, res) => {
    const { userName, comment, postId } = req.body;

    try {
        const user = await User.findOne({ userName });
        const newComment = new Comment({
            userName,
            comment,
            postId,
            name: user.name,
        });

        await newComment.save();
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get all comments under a post ID
// @route       GET /api/v1/comments/post/:postId
// @access      Public
exports.getCommentsByPostId = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.find({ postId });
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};
