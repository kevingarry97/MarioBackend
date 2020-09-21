const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("mongoUrl"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err));

exports.mongoose = mongoose;
