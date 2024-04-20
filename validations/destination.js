const Joi = require("joi");

const createDestinationSchema = Joi.object({
  name: Joi.string().required(),
  activities: Joi.array().items(Joi.string()).required(),
}).required();

module.exports = {
  createDestination: (input) => {
    return createDestinationSchema.validate(input);
  },
};
