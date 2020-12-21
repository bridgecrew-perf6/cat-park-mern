const express = require('express');
const router = express.Router();
const { getCats, getCatApiKey } = require('../controllers/cats.controller');

router.route('/').get(getCats);
router.route('/catapi').get(getCatApiKey);

module.exports = router;
