const { User, UserSchema } = require('./user.model');
const { Token, TokenSchema } = require('./token.model');
const {
  BlackListJwtToken,
  BlackListJwtTokenSchema,
} = require('./blackListJwtToken.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Token.init(TokenSchema, Token.config(sequelize));
  BlackListJwtToken.init(
    BlackListJwtTokenSchema,
    BlackListJwtToken.config(sequelize),
  );

  User.associate(sequelize.models);
  Token.associate(sequelize.models);
}

module.exports = {
  setupModels,
};
