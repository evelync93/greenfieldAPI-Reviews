const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const reviewsRoutes = require("./routes/reviewsRoutes.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/reviews", reviewsRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
