'use strict';
module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @return {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {

    const data = [];
    const buildingIds = await queryInterface.sequelize.query('select id from `buildings`', {
      raw: true,
      type: Sequelize.QueryTypes.SELECT
    });
    buildingIds.forEach(buildingId => {
      for (let i = 100; i < 121; i++) {
        data.push({name: `Кабинет ${i}`, buildingId: +buildingId.id, number: i, floor: 1});
      }
    });
    await queryInterface.bulkInsert('cabinets', data);
  },
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param Sequelize
   * @return {Promise<void>}
   */
  down: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('truncate table `cabinets`');
  }
};
