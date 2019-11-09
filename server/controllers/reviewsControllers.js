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
    let productid = req.params.product_id;
    const promises = [
      reviewsModel.getCharacteristicsdb(productid).exec(),
      reviewsModel.getRatingCountdb(productid).exec(),
      reviewsModel.getRecommendCountdb(productid).exec()
    ];

    Promise.all(promises)
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
          charDetails[key].id = 1;
        }
        metadata.characteristics = charDetails;
        res.send(metadata);
      })
      .catch(err => {
        console.log(err);
      });
  },

  postReview: (req, res) => {
    reviewsModel
      .postReviewdb(req.body, req.params.product_id)
      .then(res.send("done"))
      .catch(err => {
        console.log(err);
      });
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
