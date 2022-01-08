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
        
        const mp_registers = await queryInterface.sequelize.query(`SELECT id from mp_registers;`);
        const mp_registerRows = mp_registers[0];
        let mp_registersArray = [];
        
        mp_registerRows.forEach(item => {
          mp_registersArray.push(item.id);
        });
        
        for (let i = 0; i < 25; i++) {
          
          const row = {
              date: new Date(),
              work_shift_id: faker.random.arrayElement(workshiftsArray),
              registration_datetime: new Date(),
              production_order: faker.datatype.number({
                'min': 10000000,
                'max': 999999999,
              }).toString(),
              lot_pt: faker.datatype.number({
                'min': 99,
                'max': 9999,
              }).toString(),
              mp_register_id: faker.random.arrayElement(mp_registersArray),
              unit_quantity: faker.datatype.float({
                'min': 999,
                'max': 99999,
              }),
              createdAt: new Date(),
              updatedAt: new Date()
          };
          data.push(row);
        }
        
        await queryInterface.bulkInsert('rp_registers', data);
    },
    
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('rp_registers', null);
    }
};