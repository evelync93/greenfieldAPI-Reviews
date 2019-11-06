const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/reviewsControllers.js");

router.get(`/:product_id/list`, reviewControllers.getReviews);

router.get(`/:product_id/meta`, reviewControllers.getReviewMeta);

router.post(`/:product_id`, reviewControllers.postReview);

router.put(`/helpful/:review_id`, reviewControllers.markReviewHelpful);

router.put(`/report/:review_id`, reviewControllers.reportReview);

module.exports = router;
