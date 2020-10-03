'use strict';

module.exports = {
  up: async (queryInterface) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('./faculties.json');
    await queryInterface.bulkInsert('Faculties', data);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('truncate table `Faculties`');
  }
};
