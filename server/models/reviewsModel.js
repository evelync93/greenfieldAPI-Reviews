const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = require("../../db/index.js");

const productSchema = new Schema({
  id: { type: Number, unique: true }
});

const reviewSchema = new Schema({
  review_id: { type: Number, unique: true },
  rating: Number,
  summary: String,
  recommend: Number,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  photos: Array
});

module.exports = {
  getReviewsdb: (productid, page = 1, count = 5, sort) => {
    console.log(productid, page, count, sort);
    // return { data: "dataexample" };
  },

  postReviewdb: () => {},

  markReviewHelpfuldb: () => {},

  reportReviewdb: () => {}
};
