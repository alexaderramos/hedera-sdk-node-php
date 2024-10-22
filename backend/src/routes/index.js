const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const tokenRoutes = require('./tokenRoutes');

/**
 * Routes for /api
 */

router.use('/auth', authRoutes);
router.use('/tokens', tokenRoutes);

module.exports = router;
