'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_shifts', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,        
      },
      type: {
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('work_shifts');
  }
};
