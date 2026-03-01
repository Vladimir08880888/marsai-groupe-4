'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const cols = [
      'phone', 'mobile', 'birth_date', 'street', 'postal_code',
      'city', 'country', 'biography', 'current_job', 'portfolio_url',
      'youtube_url', 'instagram_url', 'linkedin_url', 'facebook_url',
      'tiktok_url', 'discovery_source'
    ];
    await queryInterface.sequelize.transaction(async (t) => {
      for (const col of cols) {
        await queryInterface.sequelize.query(
          `ALTER TABLE users ALTER COLUMN "${col}" DROP NOT NULL;`,
          { transaction: t }
        );
      }
    });
  },

  async down(queryInterface) {
    const cols = [
      'phone', 'mobile', 'birth_date', 'street', 'postal_code',
      'city', 'country', 'biography', 'current_job', 'portfolio_url',
      'youtube_url', 'instagram_url', 'linkedin_url', 'facebook_url',
      'tiktok_url', 'discovery_source'
    ];
    await queryInterface.sequelize.transaction(async (t) => {
      for (const col of cols) {
        await queryInterface.sequelize.query(
          `ALTER TABLE users ALTER COLUMN "${col}" SET NOT NULL;`,
          { transaction: t }
        );
      }
    });
  },
};
