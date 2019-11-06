const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get(`/reviews/:product_id/list`, (req, res) => {
  let product = req.params.product_id;
  console.log(req.query.page);
  console.log(req.query.count);
  console.log(req.query.sort);
  console.log(req.query);
  //   res.send(product);
});

app.get(`/reviews/:product_id/meta`, (req, res) => {
  console.log(req.params.product_id);
});

app.post(`/reviews/:product_id`, (req, res) => {});

app.put(`/reviews/helpful/:review_id`, (req, res) => {});

app.put(`/reviews/report/:review_id`, (req, res) => {});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
