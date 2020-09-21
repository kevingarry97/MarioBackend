const auth = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      token,
      user: _.pick(user, ["_id", "firstName", "lastName", "email"]),
    });
});

module.exports = router;
