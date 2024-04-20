const destinationService = require("../services/destination");
const destinationValidation = require("../validations/destination");

module.exports.createDestination = async (req, res) => {
  const { error } = await destinationValidation.createDestination(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await destinationService.createDestination(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.addActivity = async (req, res) => {
  if (!req.params.destinationId)
    return res
      .status(400)
      .json({ success: false, message: "Destination ID is required" });
  if (!req.body.activityId)
    return res
      .status(400)
      .json({ success: false, message: "Activity ID is required" });
  try {
    const result = await destinationService.addActivity(
      req.params.destinationId,
      req.body.activityId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAllDestinations = async (req, res) => {
  try {
    const result = await destinationService.getAllDestinations();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
