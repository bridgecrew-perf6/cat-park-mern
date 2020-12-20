const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/subscription.controller');

router.route('/').post(subscribe);

module.exports = router;
