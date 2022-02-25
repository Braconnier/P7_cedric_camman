'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
      this.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
    }
    // toJSON() {
    //   return { ...this.get(), userId: undefined }
    // }

  }
  Comment.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',

  });
  return Comment;
};