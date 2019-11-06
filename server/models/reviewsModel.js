const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
