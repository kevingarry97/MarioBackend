const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  authorId: {
    type: Number,
    required: true,
  },
  authorFirstName: {
    type: String,
    required: true,
  },
  authorLastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Project = mongoose.model("Project", projectSchema);

exports.Project = Project;
