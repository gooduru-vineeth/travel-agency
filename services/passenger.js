const passengerRepo = require("../repositories/passenger");
const activitiesRepo = require("../repositories/activity");

module.exports.createPassenger = async (data) => {
  const activities = await activitiesRepo.findByIds(data.activities);
  // Check if all activities exist if not throw an error
  if (activities.length !== data.activities.length) {
    throw new Error("One or more activities not found");
  }
  return await passengerRepo.create(
    data.name,
    data.passengerNumber,
    data.type,
    data.balance,
    data.activities
  );
};

module.exports.getAllPassengers = async () => {
  const toReturn = [];
  const passengers = await passengerRepo.getAll();
  passengers.forEach((passenger) => {
    toReturn.push({
      _id: passenger._id,
      name: passenger.name,
      passengerNumber: passenger.passengerNumber,
      type: passenger.type,
      balance: passenger.balance,
      activities: passenger.activities,
    });
  });
  return toReturn;
};
