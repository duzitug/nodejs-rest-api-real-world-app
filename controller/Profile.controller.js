const { User } = require("../model");

const { appendFollowers } = require("../helper/util.js");

class ProfileController {
  static async followerToggler(req, res, next) {
    try {
      const { loggedUser } = req;

      const { username } = req.params;

      const user = await User.findOne({
        where: { username: username },
        attributes: { exclude: "email" },
      });

      if (req.method === "POST") {
        await user.addFollower(loggedUser);
      } else if (req.method === "DELETE") {
        await user.removeFollower(loggedUser);
      }

      await appendFollowers(loggedUser, user);

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProfileController;
