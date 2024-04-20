const mongoose = require("mongoose");
const mongooseAsyncHooks = require("@mongoosejs/async-hooks");
const collection = "activity";

const Activity = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    cost: Number,
    capacity: Number,
    availableSpaces: Number,
    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
      },
    ],
  },
  { timestamps: true }
);

const model = mongoose.model("Activity", Activity, collection);

Activity.plugin(mongooseAsyncHooks);

module.exports = model;
