const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TheaterSchema = new Schema({
  theaterId: { type: Number, required: true },
  location: {
    address: {
      street1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    geo: {
      type: { type: String, required: true },
      coordinates: { type: Array, required: true },
    },
  },
});

module.exports = mongoose.model("theaters", TheaterSchema);
