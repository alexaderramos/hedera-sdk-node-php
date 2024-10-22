const userRepository = require('../repositories/user.repository');

class UserService {
  /**
   * Get a user by id
   */
  async getUserById(id) {
    return userRepository.findById(id);
  }
}

module.exports = new UserService();
