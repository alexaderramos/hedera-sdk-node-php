const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const blackListJwtTokenRepository = require('../repositories/blackListJwtToken.repository');

class AuthService {
  async register(req) {
    const { username, password } = req.body;

    const user = await userRepository.findByUsername(username);

    if (user) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await hash(password, 10);

    const newUser = { username, password: hashedPassword };
    await userRepository.create(newUser);

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }

  /**
   * Login a user
   */
  async login(req) {
    const { username, password } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }

  /**
   * Logout a user
   */
  async logout(req) {
    const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[1];

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      throw new Error('Token invalido');
    }

    const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds

    await blackListJwtTokenRepository.create({
      token: token,
      expiresAt: expiresAt,
    });

    return { message: 'Logout exitoso. Token agregado a la lista negra.' };
  }
}

module.exports = new AuthService();
