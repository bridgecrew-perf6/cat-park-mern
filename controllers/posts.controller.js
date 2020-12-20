const Post = require('../models/post.model');
const User = require('../models/user.model');

// @desc        Create a post
// @route       POST /api/v1/posts
// @access      Public
exports.createPost = async (req, res) => {
    const { title, content, id } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json('Fail');
        }

        const post = new Post({
            title,
            content,
            userName: user.userName,
            name: user.name,
        });

        await post.save();
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get all posts
// @route       GET /api/v1/posts
// @access      Public
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get a post by post ID
// @route       GET /api/v1/posts/:postId
// @access      Public
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(401).json({
                success: false,
                error: 'No such post ID on record',
            });
        }
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Get all posts by user name
// @route       GET /api/v1/posts/profile/:userName
// @access      Public
exports.getPostByUserName = async (req, res) => {
    try {
        const postUserName = req.params.userName;
        const post = await Post.find({ userName: postUserName });
        if (!post) {
            return res.status(401).json({
                success: false,
                error: 'No such post user name on record',
            });
        }
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Edit a post
// @route       PUT /api/v1/posts/:postId
// @access      Public
exports.editPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const postId = req.params.postId;

        await Post.updateOne({ _id: postId }, { title, content });
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc        Delete a post
// @route       DELETE /api/v1/posts/:postId
// @access      Public
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        await Post.deleteOne({ _id: postId });
        res.status(200).json('Success');
    } catch (err) {
        res.status(500).json('Server Error');
    }
};
