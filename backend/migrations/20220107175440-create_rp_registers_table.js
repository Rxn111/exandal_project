'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rp_registers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      work_shift_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'work_shifts',
            key: 'id'
        }
      },
      registration_datetime: {
        type: Sequelize.DATE,
      },
      lot_pt: {
        type: Sequelize.STRING,
      },
      production_order: {
        type: Sequelize.STRING,
      },
      mp_register_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'mp_registers',
            key: 'id'
        }
      },
      unit_quantity: {
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
     })
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('rp_registers');
  }
};
