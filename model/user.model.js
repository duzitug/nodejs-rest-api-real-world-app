"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment, Article }) {
      // Comments
      this.hasMany(Comment, { foreignKey: "user_id" });

      // Articles
      this.hasMany(Article, { foreignKey: "user_id", onDelete: "CASCADE" });

      // Favorites
      this.belongsToMany(Article, {
        through: "user_article",
        as: "Favorite",
        foreignKey: "user_id",
      });

      // Followers
      this.belongsToMany(User, {
        through: "user_user",
        as: "Follower",
        foreignKey: "user_id",
      });
      this.belongsToMany(User, {
        through: "user_user",
        as: "Followee",
        foreignKey: "follower_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "users",
    }
  );
  return User;
};
