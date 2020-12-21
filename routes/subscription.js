const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/subscription.controller');
const authenticate = require('../middleware/auth');

router.route('/').post(authenticate, subscribe);

module.exports = router;
