const tokenService = require('../services/token.service');

class TokenController {
  /**
   * Create a new token
   */
  async createToken(req, res, next) {
    try {
      const response = await tokenService.createToken(req);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   * List all tokens
   */
  async listTokens(req, res, next) {
    try {
      const response = await tokenService.listTokens(req);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TokenController();
