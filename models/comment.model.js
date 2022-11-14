"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Article, User }) {
      // Comments
      this.belongsTo(Article, { foreignKey: "article_id" });
      this.belongsTo(User, { as: "author", foreignKey: "user_id" });
    }
  }
  Comment.init(
    {
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
      underscored: true,
    }
  );
  return Comment;
};
