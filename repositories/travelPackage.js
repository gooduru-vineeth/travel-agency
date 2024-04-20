const TravelPackage = require("../models/TravelPackage");

exports.findById = (_id) => TravelPackage.findOne({ _id });

exports.updateOne = (findQuery, updateQuery) => {
  return TravelPackage.updateOne(findQuery, {
    $set: updateQuery,
  });
};

exports.create = (data) => {
  let createQuery = {
    name: data.name,
    passengerCapacity: data.passengerCapacity,
    destinations: data.destinations,
  };

  return TravelPackage.create(createQuery);
};

exports.addDestination = (travelPackageId, destinationId) => {
  return TravelPackage.findByIdAndUpdate(
    { _id: travelPackageId },
    { $push: { destinations: destinationId } },
    { new: true }
  );
};

exports.addPassenger = (travelPackageId, passengerId) => {
  return TravelPackage.findByIdAndUpdate(
    { _id: travelPackageId },
    { $push: { passengers: passengerId } },
    { new: true }
  );
};

exports.getAll = () => {
  return TravelPackage.find();
};
