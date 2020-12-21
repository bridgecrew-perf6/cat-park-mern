const express = require('express');
const router = express.Router();
const {
    subscribe,
    getPublicVapidKey,
} = require('../controllers/subscription.controller');
const authenticate = require('../middleware/auth');

router
    .route('/')
    .post(authenticate, subscribe)
    .get(authenticate, getPublicVapidKey);

module.exports = router;
