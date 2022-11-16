const { jwtVerify } = require("../helper/jwt");
const { User } = require("../models");

async function verifyToken(req, res, next) {
  try {
    const token = headers.authorization.split(" ")[1];

    const userVerified = await jwtVerify(token);

    req.loggedUser = await User.findOne({
      attributes: { exclude: ["email"] },
      where: { email: userVerified.email },
    });

    headers.email = userVerified.email;
    req.loggedUser.dataValues.token = token;

    next();
  } catch (error) {}
}

module.exports = verifyToken;
