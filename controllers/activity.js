const activityService = require("../services/activity");
const activityValidation = require("../validations/activity");

module.exports.createActivity = async (req, res) => {
  const { error } = await activityValidation.createActivity(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await activityService.createActivity(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAllActivities = async (req, res) => {
  try {
    const result = await activityService.getAllActivities();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getPassengers = async (req, res) => {
  try {
    const result = await activityService.getPassengers(req.params.activityId);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.signUpPassenger = async (req, res) => {
  try {
    if (!req.body.passengerId) {
      return res
        .status(401)
        .json({ success: false, message: "Passenger ID is required" });
    }
    const result = await activityService.signUpPassenger(
      req.params.activityId,
      req.body.passengerId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
