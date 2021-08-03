const actionHandler = require("../helpers/actionHandler");
const authModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../helpers/encrypt");
const bcrypt = require("bcrypt");
const mapResponse = require("../helpers/responseMapper");
const controller = {
  createUser: (data) => {
    return actionHandler(() => {
      authModel.findOne({ email: data.email }, (err, user) => {
        if (err) throw new Error(err.message);
        if (user) throw new Error("User already already exists.");
        authModel.create(data);
      });
    });
  },
  login: (req, res) => {
    console.log(req.body);
    authModel.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.send(mapResponse({}, false, err.message)).json();

      if (!user)
        return res.send(mapResponse({}, false, "Invalid Credentials")).json();
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return res.send(mapResponse({}, false, err.message)).json();
        if (!isMatch)
          return res.send(mapResponse({}, false, "Invalid Credentials"));
        const token = jwt.sign({ user }, `${process.env.SECRET_KEY}`);
        return res.send(
          mapResponse(
            {
              ...user._doc,
              jwt: token,
            },
            true
          )
        );
      });
    });
  },
};

module.exports = controller;
