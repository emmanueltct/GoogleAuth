'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const Users = await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoGenerated: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      names: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      profile: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    return Users;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
