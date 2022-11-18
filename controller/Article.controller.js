const { slugify } = require("../helper/util.js");

const { Article, Tag, User } = require("../model");

class ArticleController {
  static includeOptions = [
    { model: Tag, as: "tagList", attributes: ["name"] },
    { model: User, as: "author", attributes: { exclude: ["email"] } },
  ];

  static async allArticles(req, res, next) {
    try {
      const { loggedUser } = req;

      const { author, tag, favorited, limit = 3, offset = 0 } = req.query;

      const searchOptions = {
        include: [
          {
            model: Tag,
            as: "tagList",
            attributes: ["name"],
            // Conditionally spread
            ...(tag && { where: { name: tag } }),
          },
          {
            model: User,
            as: "author",
            attributes: { exclude: ["email"] },
            ...(author && { where: { username: author } }),
          },
        ],
        limit: parseInt(limit),
        offset: offset * limit,
        order: [["createdAt", "DESC"]],
      };

      const articles = await Article.findAndCountAll(searchOptions);

      res.json({ articles: articles.rows, articlesCount: articles.count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createArticle(req, res, next) {
    try {
      const { loggedUser } = req;

      const { title, description, body, tagList } = req.body.article;

      const slug = slugify(title);

      const article = await Article.create({
        slug: slug,
        title: title,
        description: description,
        body: body,
      });

      delete loggedUser.dataValues.token;

      await article.setUser(loggedUser);
      article.dataValues.author = loggedUser;

      res.status(201).json({ article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async singleArticleBySlug(req, res, next) {
    try {
      const { loggedUser } = req;

      const { slug } = req.params;

      const article = await Article.findOne({
        where: { slug: slug },
        include: ArticlesController.includeOptions,
      });

      res.json({ article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const article = await Article.findOne({
        where: { slug: slug },
        include: ArticlesController.includeOptions,
      });

      const { title, description, body } = req.body.article;

      if (title) {
        article.slug = slugify(title);
        article.title = title;
      }
      if (description) article.description = description;
      if (body) article.body = body;
      await article.save();

      res.json({ article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const article = await Article.findOne({
        where: { slug: slug },
        include: ArticlesController.includeOptions,
      });

      await article.destroy();

      res.json({ message: { body: ["Article deleted successfully"] } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ArticleController;
