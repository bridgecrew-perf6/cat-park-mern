const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByPostId,
} = require('../controllers/comments.controller');
const authenticate = require('../middleware/auth');

router.route('/post/:postId').get(getCommentsByPostId);
router.route('/').post(authenticate, createComment);

module.exports = router;
