'use strict';

const User = require('../dist/models/user.model.js').User;

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @return {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.bulkInsert('Users', [
      {
        username: 'root',
        password: await User.hashPassword('root'),
        facultyId: 1,
      },
    ]);
    const roles = await queryInterface.sequelize.query(
      `select id from \`Roles\` where name = 'admin'`,
      { type: Sequelize.QueryTypes.SELECT },
    );
    await queryInterface.bulkInsert('user_role', [
      {
        userId,
        roleId: roles[0].id,
      },
    ]);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query('truncate table `Users`');
  },
};
