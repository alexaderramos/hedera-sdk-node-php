const { verify } = require('jsonwebtoken');
const blackListJwtTokenRepository = require('../repositories/blackListJwtToken.repository');

/**
 * Middleware to authenticate a user
 */
const authenticate = async (req, res, next) => {
  const token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const blacklistedToken = await blackListJwtTokenRepository.findByToken(token);

  if (blacklistedToken) {
    return res.status(401).json({ message: 'Token inválido (en lista negra)' });
  }

  if (!token) return res.status(403).json({ message: 'No token provided' });

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
