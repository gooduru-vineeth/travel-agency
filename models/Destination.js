const mongoose = require("mongoose");
const mongooseAsyncHooks = require("@mongoosejs/async-hooks");
const collection = "destination";

const Destination = new mongoose.Schema(
  {
    name: { type: String, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

const model = mongoose.model("Destination", Destination, collection);

Destination.plugin(mongooseAsyncHooks);

module.exports = model;
