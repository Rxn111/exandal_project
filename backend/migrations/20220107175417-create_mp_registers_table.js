'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mp_registers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      work_shift_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'work_shifts',
            key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      registration_datetime: {
        type: Sequelize.DATE,
      },
      operator_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'operators',
            key: 'id'
        }
      },
      production_order: {
        type: Sequelize.STRING,
      },
      lot_mp: {
        type: Sequelize.STRING,
      },
      material_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'materials',
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
    
    await queryInterface.dropTable('mp_registers');
  }
};
