const travelPackageService = require("../services/travelPackage");
const travelPackageValidation = require("../validations/travelPackage");

module.exports.createTravelPackage = async (req, res) => {
  const { error } = await travelPackageValidation.createTravelPackage(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await travelPackageService.createTravelPackage(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.addDestination = async (req, res) => {
  const { error } = await travelPackageValidation.addDestination(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await travelPackageService.addDestination(
      req.params.travelPackageId,
      req.body.destinationId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.addPassenger = async (req, res) => {
  const { error } = await travelPackageValidation.addPassenger(req.body);
  if (error) {
    return res
      .status(401)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const result = await travelPackageService.addPassenger(
      req.params.travelPackageId,
      req.body.passengerId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getDestinations = async (req, res) => {
  try {
    if (!req.params.travelPackageId)
      return res
        .status(400)
        .json({ success: false, message: "travelPackageId is required" });
    const result = await travelPackageService.getDestinations(
      req.params.travelPackageId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getPassengers = async (req, res) => {
  try {
    if (!req.params.travelPackageId)
      return res
        .status(400)
        .json({ success: false, message: "travelPackageId is required" });
    const result = await travelPackageService.getPassengers(
      req.params.travelPackageId
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAllTravelPackages = async (req, res) => {
  try {
    const result = await travelPackageService.getAllTravelPackages();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
