'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        `UPDATE users SET role = 'PRODUCER' WHERE role IN ('DIRECTOR', 'PARTICIPANT');`,
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE users ALTER COLUMN role SET DEFAULT 'PRODUCER';`,
        { transaction: t }
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        `ALTER TABLE users ALTER COLUMN role SET DEFAULT 'PARTICIPANT';`,
        { transaction: t }
      );
    });
  },
};
