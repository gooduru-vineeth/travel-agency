const passengerService = require("../services/passenger");
const passengerValidation = require("../validations/passenger");
const activityService = require("../services/activity");

module.exports.createPassenger = async (req, res) => {
  const { error } = await passengerValidation.createPassenger(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await passengerService.createPassenger(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAllPassengers = async (req, res) => {
  try {
    const result = await passengerService.getAllPassengers();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.addActivity = async (req, res) => {
  if (!req.params.passengerId)
    return res
      .status(400)
      .json({ success: false, message: "Passenger ID is required" });
  if (!req.body.activityId)
    return res
      .status(400)
      .json({ success: false, message: "Activity ID is required" });
  try {
    const result = await activityService.signUpPassenger(
      req.body.activityId,
      req.params.passengerId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
