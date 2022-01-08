'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];
		
		data[0] = { 'type': 'Turno 1'};
		data[1] = { 'type': 'Turno 2'};		
		
		await queryInterface.bulkInsert('work_shifts', data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:     
     */
     await queryInterface.bulkDelete('work_shifts', null);
  }
};
