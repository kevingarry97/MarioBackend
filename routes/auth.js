const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password!");

  const token = user.generateAuthToken();

  res.status(200).send(token);
});

module.exports = router;
