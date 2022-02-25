'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      postId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.STRING
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('likes');
  }
};