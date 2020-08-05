const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  let token = jwt.sign(data, process.env.WAKACAU);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.WAKACAU);
};

module.exports = {
  generateToken,
  verifyToken,
};
