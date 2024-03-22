'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /// Add seed commands here.
     
   
     await queryInterface.bulkInsert('Users', [{
        names: 'Emmanuel MUNEZERO',
        email:'emmanuelmunezero@gmail.com',
        profile:"test.png",
        googleId:'12443535535535',
        createdAt:new Date(),
        updatedAt:new Date()
        },

      {
        names: 'John Doe',
        email:'princerwigimba07@gmail.com',
        profile:"test.png",
        googleId:'12443535535535',
        createdAt:new Date(),
        updatedAt:new Date()
        },

        {
          names: 'John Doe',
          email:'kayigm105@gmail.com',
          profile:"test.png",
          googleId:'12443535535535',
          createdAt:new Date(),
          updatedAt:new Date()
          },
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
