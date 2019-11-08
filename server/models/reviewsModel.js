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

const characteristicSchema = new mongoose.Schema(
  {},
  { collection: "merged_reviews" }
);

const Characteristic = mongoose.model("Characteristic", characteristicSchema);

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

  getReviewMetadb: productid => {
    // {
    //   "product_id": "2",
    //   "ratings": {
    //     2: 1,
    //     3: 1,
    //     4: 2,
    //     // ...
    //   },
    //   "recommended": {
    //     0: 5
    //     // ...
    //   },
    //   "characteristics": {
    //     "Size": {
    //       "id": 14,
    //       "value": "4.0000"
    //     },
    //     "Width": {
    //       "id": 15,
    //       "value": "3.5000"
    //     },
    //     "Comfort": {
    //       "id": 16,
    //       "value": "4.0000"
    //     },
    //     // ...
    // }
    //TODO: check merged_reviews collection for info
  },

  getRecommendCount: productid => {
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

  getRatingCount: productid => {
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

  getCharacteristics: productid => {
    return Characteristic.find({ product_id: 4 });
  },

  postReviewdb: () => {},

  markReviewHelpfuldb: () => {},

  reportReviewdb: () => {}
};
