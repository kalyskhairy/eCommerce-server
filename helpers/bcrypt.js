const bcrypt = require("bcryptjs");

const generatePassword = (password) => {
  let salt = bcrypt.genSaltSync(9);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

const checkPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  generatePassword,
  checkPassword,
};
