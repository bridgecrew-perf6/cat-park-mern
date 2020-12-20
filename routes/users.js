const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();
const {
    createUser,
    getLoggedinUser,
    getUserByUsername,
    editUser,
    updateSubscription,
} = require('../controllers/users.controller');

router.route('/').post(createUser).get(authenticate, getLoggedinUser);
router.route('/:userName').get(getUserByUsername).put(authenticate, editUser);
router.route('/:userName/subscription').put(authenticate, updateSubscription);

module.exports = router;
