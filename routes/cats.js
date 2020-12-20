const express = require('express');
const router = express.Router();
const { getCats } = require('../controllers/cats.controller');

router.route('/').get(getCats);

module.exports = router;
