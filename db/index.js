const mongoose = require("mongoose");

// const options = {
//   autoIndex: false, // Don't build indexes
//   reconnectTries: 30, // Retry up to 30 times
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0
// };

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://18.224.150.214:27017/greenfield", {
    useNewUrlParser: true
  });
}

// const connectWithRetry = () => {
//   console.log("MongoDB connection with retry");
//   mongoose
//     .connect("mongodb://mongo:27017/test", options)
//     .then(() => {
//       console.log("MongoDB is connected");
//     })
//     .catch(err => {
//       console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
//       setTimeout(connectWithRetry, 5000);
//     });
// };
// connectWithRetry();

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
  // getReviewID()
});

module.exports.db = db;
