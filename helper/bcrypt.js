const bcrypt = require("bcrypt");

async function bcryptHash(password) {
  return bcrypt.hash(password, 10);
}

async function bcryptCompare(password, encryptedPassword) {
  return bcrypt.compare(password, encryptedPassword);
}

module.exports = {
  bcryptCompare,
  bcryptHash,
};
