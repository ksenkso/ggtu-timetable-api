'use strict';

module.exports = {
  up: async (queryInterface) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('./subjects.json');
    await queryInterface.bulkInsert('Subjects', data);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('truncate table `Subjects`');
  }
};
