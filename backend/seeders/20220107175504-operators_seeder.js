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
            let codeNumber = (i+1).toString().padStart(3, '0');
            
            const row = {
                code: `${alphabet[Math.floor(Math.random() * alphabet.length)]}${codeNumber}`,
                name: `${faker.name.findName()}`,
            };

            data.push(row);
        };

        await queryInterface.bulkInsert('operators', data);

    },

    down: async(queryInterface) => {
        /**
         * Add commands to revert seed here.
         */

        await queryInterface.bulkDelete('operators', null);
    }
};