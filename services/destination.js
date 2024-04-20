const destinationRepo = require("../repositories/destination");
const activitiesRepo = require("../repositories/activity");

module.exports.createDestination = async (data) => {
  const activities = await activitiesRepo.findByIds(data.activities);
  // Check if all activities exist if not throw an error
  if (activities.length !== data.activities.length) {
    throw new Error("One or more activities not found");
  }
  return await destinationRepo.create(data.name, data.activities);
};

module.exports.addActivity = async (destinationId, activityId) => {
  const destination = await destinationRepo.findById(destinationId);
  if (!destination) {
    throw new Error("Destination not found");
  }
  const activity = await activitiesRepo.findById(activityId);
  if (!activity) {
    throw new Error("Activity not found");
  }
  return await destinationRepo.addActivity(destinationId, activityId);
};

// getAllDestinations
module.exports.getAllDestinations = async () => {
  const toReturn = [];
  const destinations = await destinationRepo.getAll();
  destinations.forEach((destination) => {
    toReturn.push({
      _id: destination._id,
      name: destination.name,
      activities: destination.activities,
    });
  });
  return toReturn;
};
