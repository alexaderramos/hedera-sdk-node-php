const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const { setupModels } = require('../db/models');

const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.user,
  config.sequelize.password,
  {
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: config.sequelize.dialect,
    logging: config.sequelize.logging,
  },
);

setupModels(sequelize);

sequelize.sync({ force: false });

module.exports = sequelize;
