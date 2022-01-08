'use strict';

const faker = require('faker');
faker.locale = "es";

module.exports = {
    up: async (queryInterface) => {
            
        let data = [];
        
        const work_shifts = await queryInterface.sequelize.query(`SELECT id from work_shifts;`);
        const workshiftRows = work_shifts[0];
        let workshiftsArray = [];
        
        workshiftRows.forEach(item => {
          workshiftsArray.push(item.id);
        });
        
        const operators = await queryInterface.sequelize.query(`SELECT id from operators;`);
        const operatorRows = operators[0];
        let operatorsArray = [];
        
        operatorRows.forEach(item => {
          operatorsArray.push(item.id);
        });
        
        const materials = await queryInterface.sequelize.query(`SELECT id from materials;`);
        const materialRows = materials[0];
        let materialsArray = [];
        
        materialRows.forEach(item => {
          materialsArray.push(item.id);
        });
        
        for (let i = 0; i < 25; i++) {
          
          const row = {
              date: new Date(),
              work_shift_id: faker.random.arrayElement(workshiftsArray),
              registration_datetime: new Date(),
              operator_id: faker.random.arrayElement(operatorsArray),
              production_order: faker.datatype.number({
                'min': 10000000,
                'max': 999999999,
              }).toString(),
              lot_mp: faker.datatype.number({
                'min': 99,
                'max': 9999,
              }).toString(),
              material_id: faker.random.arrayElement(materialsArray),
              unit_quantity: faker.datatype.float({
                'min': 999,
                'max': 99999,
              }),
              createdAt: new Date(),
              updatedAt: new Date()
          };
          data.push(row);
        }
        
        await queryInterface.bulkInsert('mp_registers', data);
    },
    
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('mp_registers', null);
    }
};