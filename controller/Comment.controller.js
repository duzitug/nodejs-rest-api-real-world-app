const { Article, Comment, User } = require("../model");

class CommentController {
  static async allComments(req, res, next) {
    try {
      const { slug } = req.params;

      const article = await Article.findOne({ where: { slug: slug } });

      const comments = await article.getComments({
        include: [
          { model: User, as: "author", attributes: { exclude: ["email"] } },
        ],
      });
      res.json({ comments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createComment(req, res, next) {
    try {
      const { loggedUser } = req;
      const { body } = req.body.comment;
      const { slug } = req.params;
      const article = await Article.findOne({ where: { slug: slug } });

      const comment = await Comment.create({
        body: body,
        article_id: article.id,
        user_id: loggedUser.id,
      });

      delete loggedUser.dataValues.token;
      comment.dataValues.author = loggedUser;

      res.status(201).json({ comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CommentController;
