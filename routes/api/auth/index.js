const express = require("express");
const controller = require("../../../controllers/authController");
const User = require("../../../models/user");
const mapResponse = require("../../../helpers/responseMapper");
const { encrypt } = require("../../../helpers/encrypt");

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    controller.login(req, res);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, username, isAdmin } = req.body;
    const encryptedPassword = await encrypt(password);
    const result = await controller.createUser({
      email,
      password: encryptedPassword,
      username,
      isAdmin,
    });
    if (result instanceof User) {
      const newUser = {
        _id: result._doc._id,
        email: result._doc.email,
        username: result._doc.username,
        isAdmin: result._doc.isAdmin,
        __v: result._doc.__v,
      };
      res.send(mapResponse(newUser, true, "")).json();
    }
    res.send(mapResponse({}, false, "Error trying to sign up")).json();
  } catch (error) {
    console.log("ERROR", error.message);
  }
});

module.exports = router;
