const jwt = require("jsonwebtoken");
const mapResponse = require("../helpers/responseMapper");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const isValid = !!jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!isValid) {
      return res.send(mapResponse({}, false, "Invalid Token")).json();
    }
    next();
  } catch (error) {
    return res.send(mapResponse({}, false, "Invalid Token")).json();
  }
};

module.exports = {
  checkToken,
};
