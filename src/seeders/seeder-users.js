'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password: '12345',
      firstName: 'phan',
      lastName: 'nhan',
      address: 'VN',
      gender: 1,
      roleId: 'R1',
      phoneNumber: '0778',
      positionId: '1',
      image: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
