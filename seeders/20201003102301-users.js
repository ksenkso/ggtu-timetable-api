'use strict';

const User = require('../dist/models/user.model.js').User;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'root',
        password: await User.hashPassword('root'),
        facultyId: 1
      }
    ])
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query('truncate table `Users`');
  }
};
