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
      return { ...this.get(), id: undefined, password: undefined, email: undefined }
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
        notNull: { msg: 'name cannot be null' },
        notEmpty: { msg: 'name cannot be empty' }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'email cannot be null' },
        notEmpty: { msg: 'email cannot be empty' },
        isEmail: { msg: 'email must be valid' }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImgUrl: {
      type: DataTypes.STRING,
      defaultValue: '/files/member.png'
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