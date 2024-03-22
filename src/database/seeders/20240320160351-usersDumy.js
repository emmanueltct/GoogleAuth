'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration } */

module.exports = {
  async up (queryInterface, Sequelize) {
    
    /// Add seed commands here.
     await queryInterface.bulkInsert('Users', [{
        id:uuidv4(),
        names: 'Emmanuel MUNEZERO',
        email:'emmanuelmunezero10@gmail.com',
        profile:"test.png",
        googleId:'1244353553553',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
          id:uuidv4(),
          names: 'John Doe',
          email:'princerwigimba17@gmail.com',
          profile:"test.png",
          googleId:'124435355355354',
          createdAt:new Date(),
          updatedAt:new Date()
        },               
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
