const reviewsModel = require("../models/reviewsModel.js");

module.exports = {
  getReviews: (req, res) => {
    reviewsModel
      .getReviewsdb(
        req.params.product_id,
        req.query.page,
        req.query.count,
        req.query.sort
      )
      .then(results => {
        res.send(results);
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getReviewMeta: (req, res) => {
    reviewsModel.getReviewMeta;

    // res.send("done");
  },

  postReview: (req, res) => {
    reviewsModel.postReviewdb(req.body);

    res.send("done");
  },

  markReviewHelpful: (req, res) => {
    reviewsModel.markReviewHelpfuldb(req.params.product_id);

    res.send("done");
  },

  reportReview: (req, res) => {
    reviewsModel.markReviewHelpfuldb(req.params.product_id);

    res.send("done");
  }
};
