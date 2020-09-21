const express = require("express");
const parser = require("body-parser");
const config = require("config");
const cors = require("cors");
const { mongoose } = require("./db/db");

// Routes
const projects = require("./routes/projects");
const users = require("./routes/users");
const auths = require("./routes/auth");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
}

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use("/api/project", projects);
app.use("/api/user", users);
app.use("/api/auth", auths);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`App listening on Port ${port} successfully`)
);
