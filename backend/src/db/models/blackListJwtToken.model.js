const { Model, DataTypes } = require('sequelize');

const BLACK_LIST_TOKEN_TABLE = 'black_list_jwt_tokens';

const BlackListJwtTokenSchema = {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

class BlackListJwtToken extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BLACK_LIST_TOKEN_TABLE,
      modelName: 'BlackListJwtToken',
      timestamps: true,
    };
  }
}

module.exports = {
  BLACK_LIST_TOKEN_TABLE,
  BlackListJwtTokenSchema,
  BlackListJwtToken,
};
