const jwt = require("jsonwebtoken");
const mapResponse = require("../helpers/responseMapper");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, isValid) => {
      if (err || !isValid)
        return res.send(mapResponse({}, false, "Invalid Token")).json();
      res.send(mapResponse({}, false, "Invalid Token")).json();
      next();
    });
  } catch (error) {
    return res.send(mapResponse({}, false, "Invalid Token")).json();
  }
};

module.exports = {
  checkToken,
};
