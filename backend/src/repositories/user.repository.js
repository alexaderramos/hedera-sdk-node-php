const { models } = require('../libs/sequelize');

class UserRepository {
  /**
   * Create a new user
   */
  async create(user) {
    return models.User.create(user);
  }

  /**
   * Find a user by username
   */
  async findByUsername(username) {
    return models.User.findOne({ where: { username: username } });
  }

  /**
   * Find a user by id
   */
  async findById(id) {
    return models.User.findByPk(id);
  }
}

module.exports = new UserRepository();
