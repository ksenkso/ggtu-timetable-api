'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = require('./teachers.json');
    await queryInterface.bulkInsert('teachers', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param Sequelize
   * @return {Promise<void>}
   */
  down: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('truncate table `teachers`');
  }
};
