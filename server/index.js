const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewsRoutes = require("./routes/reviewsRoutes.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/loaderio-b5b6a9b5caf9f0aa9449b0e8b6ae7b41/", (req, res) => {
  res.send("loaderio-b5b6a9b5caf9f0aa9449b0e8b6ae7b41");
});
app.use("/reviews", reviewsRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
