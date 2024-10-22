const { models } = require('../libs/sequelize');

class BlackListJwtTokenRepository {
  async create(token) {
    return models.BlackListJwtToken.create(token);
  }

  async findByToken(token) {
    return models.BlackListJwtToken.findOne({ where: { token } });
  }
}

module.exports = new BlackListJwtTokenRepository();
