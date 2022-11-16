const { User } = require("../models");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");

class UsersController {
  static async signUp(req, res, next) {
    try {
      const { username, email, bio, image, password } = req.body.user;

      // const userExists = await User.findOne({
      //   where: { email: req.body.user.email },
      // });

      const newUser = await User.create({
        email: email,
        username: username,
        bio: bio,
        image: image,
        password: await bcryptHash(password),
      });

      newUser.dataValues.token = await jwtSign(newUser);

      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async signIn(req, res, next) {
    try {
      const { user } = req.body;

      const existentUser = await User.findOne({ where: { email: user.email } });
      // lançar exceção caso o usuário já exista

      const pwd = await bcryptCompare(user.password, existentUser.password);
      // lançar exceção caso o pasword esteja incorreto

      existentUser.dataValues.token = await jwtSign(user);

      res.json({ user: existentUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsersController;
