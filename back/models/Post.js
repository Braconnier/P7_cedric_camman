'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Likes }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
      this.hasMany(Comment)
      this.hasMany(Likes)
    }
    // toJSON() {
    //   return { ...this.get(), }
    // }

  }
  Post.init({
    userId: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',

  });
  return Post;
};