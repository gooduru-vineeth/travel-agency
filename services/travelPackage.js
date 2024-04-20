const travelPackageRepo = require("../repositories/travelPackage");
const destinationRepo = require("../repositories/destination");
const passengerRepo = require("../repositories/passenger");

module.exports.createTravelPackage = async (data) => {
  const destinations = await destinationRepo.findByIds(data.destinations);

  // Check if all destinations exist if not throw an error
  if (destinations.length !== data.destinations.length) {
    throw new Error("One or more destinations not found");
  }
  return await travelPackageRepo.create(data);
};

module.exports.addDestination = async (travelPackageId, destinationId) => {
  const promises = [
    destinationRepo.findById(destinationId),
    travelPackageRepo.findById(travelPackageId),
  ];
  const [destination, travelPackage] = await Promise.all(promises);
  if (!destination) {
    throw new Error(
      `Destination not found for destinationId: ${destinationId}`
    );
  }
  if (!travelPackage) {
    throw new Error(
      `Travel package not found for travelPackageId: ${travelPackageId}`
    );
  }
  if (
    travelPackage.destinations
      .map((dest) => dest.toString())
      .includes(destinationId)
  ) {
    throw new Error(`Destination already added to travel package`);
  }
  return await travelPackageRepo.addDestination(travelPackageId, destinationId);
};

module.exports.addPassenger = async (travelPackageId, passengerId) => {
  const promises = [
    passengerRepo.findById(passengerId),
    travelPackageRepo.findById(travelPackageId),
  ];
  const [passenger, travelPackage] = await Promise.all(promises);
  if (!passenger) {
    throw new Error(`Passenger not found for passengerId: ${passengerId}`);
  }
  if (!travelPackage) {
    throw new Error(
      `Travel package not found for travelPackageId: ${travelPackageId}`
    );
  }
  if (
    travelPackage.passengers
      .map((pass) => pass.toString())
      .includes(passengerId)
  ) {
    throw new Error(`Passenger already added to travel package`);
  }
  return await travelPackageRepo.addPassenger(travelPackageId, passengerId);
};

module.exports.getDestinations = async (travelPackageId) => {
  const travelPackage = await travelPackageRepo.findById(travelPackageId);
  if (!travelPackage) {
    throw new Error(
      `Travel package not found for travelPackageId: ${travelPackageId}`
    );
  }
  const destinations = await destinationRepo.findByIds(
    travelPackage.destinations
  );
  const toReturn = destinations.map((destination) => {
    return {
      _id: destination._id,
      name: destination.name,
    };
  });
  return toReturn;
};

module.exports.getPassengers = async (travelPackageId) => {
  const travelPackage = await travelPackageRepo.findById(travelPackageId);
  if (!travelPackage) {
    throw new Error(
      `Travel package not found for travelPackageId: ${travelPackageId}`
    );
  }
  const passengers = await passengerRepo.findByIds(travelPackage.passengers);
  const toReturn = passengers.map((passenger) => {
    return {
      _id: passenger._id,
      name: passenger.name,
      passengerNumber: passenger.passengerNumber,
      type: passenger.type,
      balance: passenger.balance,
      activities: passenger.activities,
    };
  });
  return toReturn;
};

module.exports.getAllTravelPackages = async () => {
  const toReturn = [];
  const travelPackages = await travelPackageRepo.getAll();
  travelPackages.forEach((travelPackage) => {
    toReturn.push({
      _id: travelPackage._id,
      name: travelPackage.name,
      destinations: travelPackage.destinations,
      passengers: travelPackage.passengers,
      passengerCapacity: travelPackage.passengerCapacity,
    });
  });
  return toReturn;
};
