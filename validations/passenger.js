const Joi = require("joi");

const createPassengerSchema = Joi.object({
  name: Joi.string().required(),
  passengerNumber: Joi.number().required(),
  type: Joi.string().valid("STANDARD", "GOLD", "PREMIUM").required(),
  balance: Joi.number().required(),
  activities: Joi.array().items(Joi.string()).required(),
}).required();

const signUpPassengerSchema = Joi.object({
  activityId: Joi.string().required(),
}).required();

module.exports = {
  createPassenger: (input) => {
    return createPassengerSchema.validate(input);
  },
  signUpPassenger: (input) => {
    return signUpPassengerSchema.validate(input);
  },
};
