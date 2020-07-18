'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = require('./groups.json');
    await queryInterface.bulkInsert('groups', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param Sequelize
   * @return {Promise<void>}
   */
  down: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('truncate table `groups`');
  }
};
