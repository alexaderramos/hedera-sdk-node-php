const { Model, DataTypes } = require('sequelize');

const TOKEN_TABLE = 'tokens';

const TokenSchema = {
  tokenId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initialSupply: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class Token extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TOKEN_TABLE,
      modelName: 'Token',
      timestamps: false,
    };
  }
}

module.exports = { TOKEN_TABLE, TokenSchema, Token };
