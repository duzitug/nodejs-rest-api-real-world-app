"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate({ Tag, Comment, User }) {
      // Comments
      this.hasMany(Comment, { foreignKey: "article_id", onDelete: "cascade" });

      // Users
      this.belongsTo(User, { foreignKey: "user_id", as: "author" });

      // Tag list
      this.belongsToMany(Tag, {
        through: "article_tag",
        as: "tagList",
        foreignKey: "article_id",
      });

      // Favorites
      this.belongsToMany(User, {
        through: "user_article",
        foreignKey: "article_id",
      });
    }
  }
  Article.init(
    {
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
      underscored: true,
      tableName: "articles",
    }
  );
  return Article;
};
