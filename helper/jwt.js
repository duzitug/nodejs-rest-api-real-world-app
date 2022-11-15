const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY;

async function jwtSign({ username, email }) {
  return jwt.sign({ username, email }, "chave-privada");
}

async function jwtVerify(token) {
  return jwt.verify(token, "chave-privada");
}

module.exports = {
  jwtSign,
  jwtVerify,
};
