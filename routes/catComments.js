const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByCatName,
} = require('../controllers/catComments.controller');
const authenticate = require('../middleware/auth');

router.route('/:catName').get(getCommentsByCatName);
router.route('/').post(authenticate, createComment);

module.exports = router;
