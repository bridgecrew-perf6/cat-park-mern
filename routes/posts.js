const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    getPostByUserName,
    editPost,
    deletePost,
} = require('../controllers/posts.controller');
const authenticate = require('../middleware/auth');

router.route('/').post(authenticate, createPost).get(getAllPosts);
router
    .route('/:postId')
    .get(getPostById)
    .put(authenticate, editPost)
    .delete(authenticate, deletePost);
router.route('/profile/:userName').get(getPostByUserName);

module.exports = router;
