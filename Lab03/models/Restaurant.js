const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    borough: {
      type: String
    },
    cuisine: {
      type: String
    },
    address: {
      building: String,
      street: String,
      zipcode: String,
      coord: [Number]
    }
  },
  {
    collection: "Restaurants"
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
