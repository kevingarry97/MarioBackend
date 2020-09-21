const auth = require("../middleware/auth");
const express = require("express");
const { Project } = require("../models/project");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const project = await Project.find();
  res.status(200).send(project);
});

router.post("/", auth, async (req, res) => {
  const project = new Project({
    authorId: req.user._id,
    authorFirstName: req.user.firstName,
    authorLastName: req.user.lastName,
    title: req.body.title,
    content: req.body.content,
  });

  await project.save();
  res.status(200).send(project);
});

module.exports = router;
