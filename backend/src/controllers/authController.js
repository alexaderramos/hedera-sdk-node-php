const userService = require('../services/user.service');
const authService = require('../services/auth.service');

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res, next) {
    try {
      const response = await authService.register(req);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Login a user
   */
  async login(req, res, next) {
    try {
      const response = await authService.login(req);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Logout a user
   */
  async logout(req, res, next) {
    try {
      const response = await authService.logout(req);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
