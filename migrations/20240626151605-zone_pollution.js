'use strict';

/** @type {import('sequelize-cli').Migration} */
const DataTypes = require('sequelize').DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('zone_pollution', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      aqius: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      aqicn: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      timestamp: {
        allowNull: false,
        type: 'TIMESTAMPTZ',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('zone_pollution');
  },
};
