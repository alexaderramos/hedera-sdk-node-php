/**
 * Configuration file
 */

require('dotenv').config();

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || 'development',
  sequelize: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};

module.exports = { config };
