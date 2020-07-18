'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = require('./buildings.json');
    await queryInterface.bulkInsert('buildings', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param Sequelize
   * @return {Promise<void>}
   */
  down: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('truncate table `buildings`');
  }
};
