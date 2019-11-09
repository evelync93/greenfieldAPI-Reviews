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
  { collection: "merged_reviews" }
);

const Characteristic = mongoose.model("Characteristic", characteristicSchema);

module.exports = {
  getReviewsdb: (productid, page = 1, count = 5, sort) => {
    let numToSkip = count * (page - 1);

    //if sort is undefined...
    if (sort === undefined) {
      return Review.find({ product_id: productid })
        .limit(Number(count))
        .skip(numToSkip);
    }

    //if sort is newest...
    if (sort === "newest") {
      return Review.find({ product_id: productid })
        .sort({ date: -1 })
        .limit(Number(count))
        .skip(numToSkip);
    }

    //if sort is helpful...
    if (sort === "helpful") {
      return Review.find({ product_id: productid })
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
    return Review.find({})
      .sort({ review_id: -1 })
      .limit(1)
      .exec()
      .then(results => {
        reviewID = results[0]["review_id"] + 1;
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

          // product_id: 234293,
          // rating: 3,
          // date: "2019-06-19",
          // summary: "NEW TEST",
          // body: "NEW TEST",
          // recommend: 1,
          // reported: 0,
          // reviewer_name: "hello",
          // reviewer_email: "check@gmail.com",
          // response: "null",
          // helpfulness: 0,
          // review_id: reviewID + 1

          //   rating: this.state.starValue,
          //   summary: this.state.title,
          //   body: this.state.description,
          //   recommend: this.state.recommend,
          //   name: this.state.userName,
          //   email: this.state.email,
          //   photos: this.state.photos,
          //   characteristics: this.state.characteristics
        });
        reviewToSave.save();
      });
  },

  markReviewHelpfuldb: () => {},

  reportReviewdb: () => {}
};
