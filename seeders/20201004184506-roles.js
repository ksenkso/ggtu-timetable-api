'use strict';

module.exports = {
  up: async (queryInterface) => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('./roles.json');
    await queryInterface.bulkInsert('Roles', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  down: async (queryInterface) => {

    await queryInterface.sequelize.query('truncate table `Roles`');
  }
};
