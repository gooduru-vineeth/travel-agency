const Joi = require("joi");

const createActivitySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  cost: Joi.number().required(),
  capacity: Joi.number().required(),
  availableSpaces: Joi.number().required(),
}).required();

module.exports = {
  createActivity: (input) => {
    return createActivitySchema.validate(input);
  },
};
