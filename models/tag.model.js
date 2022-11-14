"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate({ Article }) {
      // Tag list
      this.belongsToMany(Article, {
        through: "article_tag",
        foreignKey: "tag_name",
      });
    }
  }
  Tag.init(
    {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      underscored: true,
    }
  );
  return Tag;
};
