const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = require("../../db/index.js");

const reviewSchema = new mongoose.Schema(
  {
    review_id: { type: Number, unique: true },
    product_id: Number,
    rating: Number,
    summary: String,
    recommend: Number,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    photos: Array,
    reviewer_email: String,
    helpfulness: Number
  },
  { collection: "combined_reviews" }
);

const Review = mongoose.model("Review", reviewSchema);

const productSchema = new Schema({
  id: { type: Number, unique: true }
});

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

  getReviewMetadb: () => {},

  postReviewdb: () => {},

  markReviewHelpfuldb: () => {},

  reportReviewdb: () => {}
};
