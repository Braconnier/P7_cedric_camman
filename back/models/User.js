'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Likes }) {
      // define association here
      this.hasMany(Post)
      this.hasMany(Comment)
      this.hasMany(Likes)
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined }
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: ' User must have a name' },
        notEmpty: { msg: ' Name must not be empty' }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' },
        isEmail: { msg: 'email must be valid' }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImgUrl: {
      type: DataTypes.STRING,
      defaultValue: '/files/default-profile.png'
    },
    bio: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: ' User must have a role' },
        notEmpty: { msg: ' role must not be empty' }
      },
      defaultValue: 'Membre'
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};