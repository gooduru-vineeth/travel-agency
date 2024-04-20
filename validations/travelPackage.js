const Joi = require("joi");

const createTravelPackageSchema = Joi.object({
  name: Joi.string().required(),
  passengerCapacity: Joi.number().required(),
  destinations: Joi.array().items(Joi.string()).required(),
}).required();

const addDestinationSchema = Joi.object({
  destinationId: Joi.string().required(),
}).required();

const addPassengerSchema = Joi.object({
  passengerId: Joi.string().required(),
}).required();

module.exports = {
  createTravelPackage: (input) => {
    return createTravelPackageSchema.validate(input);
  },
  addDestination: (input) => {
    return addDestinationSchema.validate(input);
  },
  addPassenger: (input) => {
    return addPassengerSchema.validate(input);
  },
};
