const Activity = require("../models/Activity");

exports.findById = (_id) => Activity.findOne({ _id });

exports.findByIds = (ids) => {
  return Activity.find({ _id: { $in: ids } });
};

exports.updateOne = (findQuery, updateQuery) => {
  return Activity.updateOne(findQuery, {
    $set: updateQuery,
  });
};

exports.create = (name, description, cost, capacity, availableSpaces) => {
  let createQuery = {
    name: name,
    description: description,
    cost: cost,
    capacity: capacity,
    availableSpaces: availableSpaces,
  };

  return Activity.create(createQuery);
};

exports.getAll = () => {
  return Activity.find();
};
