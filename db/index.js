const mongoose = require("mongoose");

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://18.218.134.226:27017/greenfield", {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

module.exports.db = db;
