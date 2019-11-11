const reviewsModel = require("../models/reviewsModel.js");

let productid, reviewid;

module.exports = {
  getReviews: (req, res) => {
    productid = req.params.product_id;
    reviewsModel
      .getReviewsdb(productid, req.query.page, req.query.count, req.query.sort)
      .exec()
      .then(results => {
        const allReviews = {
          product: productid,
          page: req.query.page || 1,
          count: req.query.count || 5,
          results: results
        };
        res.send(allReviews);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getReviewMeta: (req, res) => {
    productid = req.params.product_id;
    let promisesMeta = [
      reviewsModel.getCharacteristicsdb(productid).exec(),
      reviewsModel.getRatingCountdb(productid).exec(),
      reviewsModel.getRecommendCountdb(productid).exec()
    ];

    Promise.all(promisesMeta)
      .then(results => {
        let characteristics = results[0];
        let ratings = results[1];
        let recommend = results[2];
        let metadata = {
          product_id: productid,
          ratings: {},
          recommended: {},
          characteristics: {}
        };
        let charIDs = {};
        let charDetails = {};
        let charCount = {};
        let charTotal = {};

        for (let i = 0; i < ratings.length; i++) {
          metadata.ratings[ratings[i]["_id"]] = ratings[i].count;
        }
        for (let j = 0; j < recommend.length; j++) {
          metadata.recommended[recommend[j]["_id"]] = recommend[j].count;
        }
        for (let k = 0; k < characteristics.length; k++) {
          let characteristic = characteristics[k];
          if (charIDs[characteristic.name] === undefined) {
            charIDs[characteristic.name] = characteristic["characteristic_id"];
          }
          if (charCount[characteristic.name]) {
            charCount[characteristic.name]++;
          } else {
            charCount[characteristic.name] = 1;
          }
          if (charTotal[characteristic.name]) {
            charTotal[characteristic.name] += characteristic.value;
          } else {
            charTotal[characteristic.name] = characteristic.value;
          }
        }

        //TODO: update to automatically update average in response

        for (let key in charTotal) {
          charDetails[key] = {};
          charDetails[key].value = charTotal[key] / charCount[key];
          charDetails[key].id = charIDs[key];
        }
        metadata.characteristics = charDetails;
        res.send(metadata);
      })
      .catch(err => {
        console.log(err);
      });
  },

  postReview: (req, res) => {
    productid = req.params.product_id;
    reviewsModel
      .postReviewdb(req.body, productid)
      .then(res.sendStatus(201))
      .catch(err => {
        console.log(err);
      });
  },

  markReviewHelpful: (req, res) => {
    reviewid = req.params.review_id;
    reviewsModel
      .markReviewHelpfuldb(reviewid)
      .then(res.sendStatus(204))
      .catch(err => {
        console.log(err);
      });
  },

  reportReview: (req, res) => {
    reviewid = req.params.review_id;
    reviewsModel
      .reportReviewdb(reviewid)
      .then(res.sendStatus(204))
      .catch(err => {
        console.log(err);
      });
  }
};
