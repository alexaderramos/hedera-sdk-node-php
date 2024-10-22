const express = require('express');
const /*{ register, login, logout }*/ authController = require('../controllers/authController');
const router = express.Router();

/**
 * Routes for /api/auth
 */

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
