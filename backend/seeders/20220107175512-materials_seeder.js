'use strict';

const faker = require('faker');
faker.locale = "es";

module.exports = {
    up: async(queryInterface) => {
        /**
         * Add seed commands here.
         */

        let data = [];
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        for (let i = 0; i < 20; i++) {
            let codeNumber = ((i+1)*1000).toString().padStart(1, '0');
            
            const row = {
                code: `${alphabet[Math.floor(Math.random() * alphabet.length)]}${codeNumber}`,
                description: faker.commerce.productMaterial(),
                unit: 'KG',
            };

            data.push(row);
        };

        await queryInterface.bulkInsert('materials', data);

    },

    down: async(queryInterface) => {
        /**
         * Add commands to revert seed here.
         */

        await queryInterface.bulkDelete('materials', null);
    }
};