const express = require('express');
const { getProfileById } = require('../controllers/profile.controller');
const router = express.Router();

router.route('/:userId').get(getProfileById);

module.exports = router;
