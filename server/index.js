const express = require("express");
const bodyParser = require("body-parser");
const reviewsRoutes = require("./routes/reviewsRoutes.js");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/reviews", reviewsRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
