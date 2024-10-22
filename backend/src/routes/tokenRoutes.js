const express = require('express');
const tokenController = require('../controllers/tokenController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

/**
 * Routes for /api/tokens
 */

router.post('/create-token-hedera', authenticate, tokenController.createToken);
router.get('/list-tokens', authenticate, tokenController.listTokens);

module.exports = router;
