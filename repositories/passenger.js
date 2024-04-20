const Passenger = require("../models/Passenger");
const mongoose = require("mongoose");

exports.findById = (_id) => Passenger.findOne({ _id });
exports.findByQuery = (query) => Passenger.findOne(query);

exports.findByIds = (ids) => {
  const ObjectIds = ids.map((id) => mongoose.Types.ObjectId(id));
  return Passenger.find({ _id: { $in: ObjectIds } });
};

exports.findByPassengerNumber = (pNo) =>
  Passenger.findOne({ passengerNumber: pNo });

exports.updateOne = (findQuery, updateQuery) => {
  return Passenger.updateOne(findQuery, {
    $set: updateQuery,
  });
};

exports.findByPassengerNumbers = (pNos) => {
  return Passenger.find({ passengerNumber: { $in: pNos } });
};
exports.create = (
  name,
  passengerNumber,
  type,
  balance = 0,
  activities = []
) => {
  const createQuery = {
    name,
    passengerNumber,
    type,
    balance,
    activities,
  };
  return Passenger.create(createQuery);
};

exports.getAll = () => {
  return Passenger.find();
};
