const activityRepo = require("../repositories/activity");
const passengerRepo = require("../repositories/passenger");
const pricing = [
  {
    name: "STANDARD",
    discount: 0.0,
    description:
      "Standard pricing for all passengers whose PassengerType is `STANDARD` and they will not have any discount",
  },
  {
    name: "GOLD",
    discount: 0.1,
    description:
      "GOLD pricing for all passengers whose PassengerType is `GOLD` and they will not have 10 % discount",
  },
  {
    name: "PREMIUM",
    discount: 1,
    description:
      "PREMIUM pricing for all passengers whose PassengerType is `PREMIUM` and they will have 100 % discount i.e free of cost, they can signup for free for any activity",
  },
];
const checkIsPassengerEligibleForActivity = (passenger, activity) => {
  const passengerType = passenger.type;
  const passengerDiscount = pricing.find(
    (price) => price.name === passengerType
  ).discount;

  // calculate the discounted cost
  const cost = activity.cost;
  const discountedCost = cost - cost * passengerDiscount;
  if (discountedCost === 0) {
    return { isEligible: true, discountedCost: 0 };
  }
  return { isEligible: passenger.balance >= discountedCost, discountedCost };
};
module.exports.createActivity = async (data) => {
  return await activityRepo.create(
    data.name,
    data.description,
    data.cost,
    data.capacity,
    data.availableSpaces
  );
};

module.exports.getAllActivities = async () => {
  const toReturn = [];
  const activities = await activityRepo.getAll();
  activities.forEach((activity) => {
    toReturn.push({
      _id: activity._id,
      name: activity.name,
      description: activity.description,
      cost: activity.cost,
      capacity: activity.capacity,
      availableSpaces: activity.availableSpaces,
    });
  });
  return toReturn;
};
module.exports.getPassengers = async (activityId) => {
  const activity = await activityRepo.findById(activityId);
  if (!activity) {
    throw new Error("Activity not found");
  }
  const toReturn = [];
  const passengers = await passengerRepo.findByIds(activity.passengers);
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

module.exports.signUpPassenger = async (activityId, passengerId) => {
  const promises = [
    passengerRepo.findById(passengerId),
    activityRepo.findById(activityId),
  ];
  const [passenger, activity] = await Promise.all(promises);
  if (!activity) {
    throw new Error("Activity not found");
  }
  if (!passenger) {
    throw new Error("Passenger not found");
  }
  if (activity.availableSpaces === 0) {
    throw new Error("No available spaces");
  }
  if (activity.passengers.some((id) => id.toString() === passengerId)) {
    throw new Error("Passenger already signed up");
  }
  const { isEligible, discountedCost } = checkIsPassengerEligibleForActivity(
    passenger,
    activity
  );
  if (!isEligible) {
    throw new Error(
      "Passenger is not eligible for this activity as balance is low"
    );
  }
  // update the activity and passenger details
  activity.availableSpaces -= 1;
  activity.passengers.push(passengerId);
  await activityRepo.updateOne(
    { _id: activityId },
    {
      availableSpaces: activity.availableSpaces,
      passengers: activity.passengers,
    }
  );
  const updatedPassengerBalance = passenger.balance - discountedCost;
  await passengerRepo.updateOne(
    { _id: passengerId },
    {
      balance: updatedPassengerBalance,
      activities: [...passenger.activities, activityId],
    }
  );
  return { message: "Passenger signed up successfully" };
};
