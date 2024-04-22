const mongoose = require("mongoose");
const mongooseAsyncHooks = require("@mongoosejs/async-hooks");
const collection = "travelPackage";

const TravelPackage = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    passengerCapacity: { type: Number, required: true },
    destinations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    ],
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passenger" }],
  },
  { timestamps: true }
);

const model = mongoose.model("TravelPackage", TravelPackage, collection);

TravelPackage.plugin(mongooseAsyncHooks);

module.exports = model;
