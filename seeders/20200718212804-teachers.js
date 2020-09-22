'use strict';
module.exports = {
  up: async (queryInterface) => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('./teachers.json');
    await queryInterface.bulkInsert('Teachers', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.sequelize.query('truncate table `Teachers`');
  }
};
