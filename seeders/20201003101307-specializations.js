'use strict';

module.exports = {
    up: async (queryInterface) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('./secializations.json');
    await queryInterface.bulkInsert('Specializations', data);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('truncate table `Specializations`');
  }
};
