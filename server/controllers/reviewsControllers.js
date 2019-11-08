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
      })
      .catch(err => {
        console.log(err);
      });
  },

  getReviewMeta: (req, res) => {
    //TODO: need to combine output of rating and recommend
    reviewsModel
      .getCharacteristicsdb(req.params.product_id)
      .then(results => {
        console.log(results);
        res.send(results);
      })
      .catch(err => {
        console.log(err);
      });

    // reviewsModel
    //   .getRatingCountdb(req.params.product_id)
    //   .then(results => {
    //     res.send(results);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // reviewsModel
    //   .getRecommendCountdb(req.params.product_id)
    //   .then(results => {
    //     res.send(results);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // reviewsModel
    //   .getReviewMetadb(req.params.product_id)
    //   .then(results => {
    //     console.log(results);
    //     res.send(results);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

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
