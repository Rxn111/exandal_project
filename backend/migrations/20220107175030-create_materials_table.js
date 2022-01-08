'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,        
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('materials');
  }
};
