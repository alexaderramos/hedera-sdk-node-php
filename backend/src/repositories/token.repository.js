const { models } = require('../libs/sequelize');

class TokenRepository {
  /**
   * Create a new token
   */
  async createToken(token) {
    return models.Token.create(token);
  }

  /**
   * Get all tokens
   */
  async all() {
    return models.Token.findAll();
  }

  /**
   * Get all tokens by user
   */
  async allByUser(userId) {
    return models.Token.findAll({ where: { userId } });
  }
}

module.exports = new TokenRepository();
