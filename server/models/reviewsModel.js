const mongoose = require("mongoose");
const mongoDb = require("../../db/index.js");

const reviewSchema = new mongoose.Schema(
  {
    review_id: { type: Number, unique: true },
    product_id: Number,
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    photos: Array,
    reviewer_email: String,
    helpfulness: Number,
    reported: Number
  },
  { collection: "combined_reviews" }
);

const Review = mongoose.model("Review", reviewSchema);

const characteristicSchema = new mongoose.Schema(
  {
    product_id: Number,
    name: String,
    characteristic_id: Number,
    review_id: Number,
    value: Number
  },
  { collection: "combined_characteristics" }
);

const Characteristic = mongoose.model("Characteristic", characteristicSchema);

// const newReviewID

module.exports = {
  // getReviewID: (){
  //   //find query

  // },

  getReviewsdb: (productid, page = 1, count = 5, sort) => {
    let numToSkip = count * (page - 1);
    //if sort is undefined...
    if (sort === undefined) {
      return Review.find({ product_id: productid, reported: 0 })
        .limit(Number(count))
        .skip(numToSkip);
    }

    //if sort is newest...
    if (sort === "newest") {
      return Review.find({ product_id: productid, reported: 0 })
        .sort({ date: -1 })
        .limit(Number(count))
        .skip(numToSkip);
    }

    //if sort is helpful...
    if (sort === "helpful") {
      return Review.find({ product_id: productid, reported: 0 })
        .sort({ helpfulness: -1 })
        .limit(Number(count))
        .skip(numToSkip);
    }

    //if sort is relevant...same as helpful??
    if (sort === "relevant") {
      return Review.find({ product_id: productid })
        .sort({ helpfulness: -1 })
        .limit(Number(count))
        .skip(numToSkip);
    }
  },

  getRecommendCountdb: productid => {
    //TODO: fix output of data which is other (true, false )
    return Review.aggregate([
      { $match: { product_id: Number(productid) } },
      {
        $bucket: {
          groupBy: "$recommend",
          boundaries: [0, 1, 2],
          default: "Other",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
  },

  getRatingCountdb: productid => {
    return Review.aggregate([
      { $match: { product_id: Number(productid) } },
      {
        $bucket: {
          groupBy: "$rating",
          boundaries: [1, 2, 3, 4, 5, 6],
          default: "Other",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
  },

  getCharacteristicsdb: productid => {
    return Characteristic.find({ product_id: productid });
  },

  postReviewdb: (review, productid) => {
    let reviewID;
    // return (
    // Review.estimatedDocumentCount()
    return Review.find({})
      .sort({ review_id: -1 })
      .limit(1)
      .exec()
      .then(results => {
        // console.log("doc count", results);
        reviewID = results[0]["review_id"] + 1;
        // reviewID = results;
        const reviewToSave = new Review({
          product_id: productid,
          rating: review.rating,
          date: new Date(),
          summary: review.summary,
          body: review.body,
          recommend: review.recommend,
          reported: 0,
          reviewer_name: review.name,
          reviewer_email: review.email,
          response: null,
          helpfulness: 0,
          review_id: reviewID + 1
        });
        reviewToSave.save();
        for (let key in review.characteristics) {
          Characteristic.find({
            product_id: productid,
            characteristic_id: key
          })
            .limit(1)
            .exec()
            .then(results => {
              let charName = results[0].name;
              const newChar = new Characteristic({
                product_id: productid,
                name: charName,
                characteristic_id: key,
                review_id: reviewID + 1,
                value: review.characteristics[key]
              });
              newChar.save();
            });
        }
      });
    // );
  },

  markReviewHelpfuldb: reviewid => {
    return Review.updateOne(
      { review_id: reviewid },
      { $inc: { helpfulness: 1 } }
    );
  },

  reportReviewdb: reviewid => {
    return Review.update({ review_id: reviewid }, { $set: { reported: 1 } });
  }
};
