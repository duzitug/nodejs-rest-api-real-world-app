const { Article, Tag, User } = require("../model");

class FavoriteController {
  static async favoriteToggler(req, res, next) {
    try {
      const { loggedUser } = req;

      const { slug } = req.params;

      const article = await Article.findOne({
        where: { slug: slug },
        include: [
          {
            model: Tag,
            as: "tagList",
            attributes: ["name"],
          },
          {
            model: User,
            as: "author",
            attributes: ["username", "bio", "image" /* "following" */],
          },
        ],
      });

      if (req.method === "POST") await article.addUser(loggedUser);
      if (req.method === "DELETE") await article.removeUser(loggedUser);

      res.json({ article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FavoriteController;
