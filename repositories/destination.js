const Destination = require("../models/Destination");
const mongoose = require("mongoose");

exports.findById = (_id) => Destination.findOne({ _id });

exports.findByNames = (names) => {
  return Destination.find({ name: { $in: names } });
};

exports.findByIds = (ids) => {
  const ObjectIds = ids.map((id) => mongoose.Types.ObjectId(id));
  return Destination.find({ _id: { $in: ObjectIds } });
};

exports.updateOne = (findQuery, updateQuery) => {
  return Destination.updateOne(findQuery, {
    $set: updateQuery,
  });
};

exports.addActivity = (destinationId, activityId) => {
  return Destination.findByIdAndUpdate(
    { _id: destinationId },
    { $push: { activities: activityId } },
    { new: true }
  );
};
exports.create = (name, activities = []) => {
  let createQuery = { name, activities };
  return Destination.create(createQuery);
};

exports.getAll = () => {
  return Destination.find();
};
