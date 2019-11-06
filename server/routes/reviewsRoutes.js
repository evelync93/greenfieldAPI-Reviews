const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/reviewsControllers.js");

router.get(`/reviews/:product_id/list`, (req, res) => {
  let product = req.params.product_id;
  console.log(req.query.page);
  console.log(req.query.count);
  console.log(req.query.sort);
  console.log(req.query);
  //   res.send(product);
});

router.get(`/reviews/:product_id/meta`, (req, res) => {
  console.log(req.params.product_id);
});

router.post(`/reviews/:product_id`, (req, res) => {});

router.put(`/reviews/helpful/:review_id`, (req, res) => {});

router.put(`/reviews/report/:review_id`, (req, res) => {});

module.exports = router;
