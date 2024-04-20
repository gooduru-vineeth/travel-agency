const mongoose = require("mongoose");
const mongooseAsyncHooks = require("@mongoosejs/async-hooks");
const collection = "passenger";

const Passenger = new mongoose.Schema(
  {
    name: { type: String, required: true },
    passengerNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["STANDARD", "GOLD", "PREMIUM"],
      required: true,
    },
    balance: { type: Number, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

const model = mongoose.model("Passenger", Passenger, collection);

Passenger.plugin(mongooseAsyncHooks);

module.exports = model;
