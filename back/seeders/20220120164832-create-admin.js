'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin',
        uuid: '1c7cb41d-8f44-485b-a684-d2288624ebfc',
        email: 'superAdmin@email.com',
        password: '$2b$10$Wuk8hPMz//7nHUt7kqt8MeLvFLtHDS9MCYzrrPW.8cvXV.hKsrVPa',
        role: 'SuperAdmin',
        createdAt: '2022-01-19 17:00:00',
        updatedAt: '2022-01-19 17:00:00'
      }, {
        name: 'moderator',
        uuid: 'f42af7d6-c1df-4458-b0ab-a199afa7dc7b',
        email: 'moderator@email.com',
        password: '$2b$10$or2A7G7J8s12nb5j6W0Oquz38bFqbPUXpAfM/QdIxEiH5dFHd2u2W',
        role: 'moderator',
        createdAt: '2022-01-19 17:00:00',
        updatedAt: '2022-01-19 17:00:00'

      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
