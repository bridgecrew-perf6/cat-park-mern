const express = require('express');
const router = express.Router();
const {
    handleLogin,
    handleDelete,
    handleTokenValidation,
} = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth');

router.route('/login').post(handleLogin);
router.route('/delete').delete(authenticate, handleDelete);
router.route('/tokenValidation').post(handleTokenValidation);

module.exports = router;
