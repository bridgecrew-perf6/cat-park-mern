const express = require('express');
const router = express.Router();
const {
    createLike,
    getLikesByCatName,
    deleteLikeByCatName,
    checkLikeByName,
} = require('../controllers/like.controller');
const authenticate = require('../middleware/auth');

router.route('/').post(authenticate, createLike);
router.route('/:catName').get(getLikesByCatName);
router
    .route('/:catName/:userName')
    .delete(authenticate, deleteLikeByCatName)
    .get(checkLikeByName);

module.exports = router;
