const router = require("express").Router();
const passengerController = require("../controllers/passenger");
const destinationController = require("../controllers/destination");
const activityController = require("../controllers/activity");
const travelPackageController = require("../controllers/travelPackage");

router.get("/", (req, res) => {
  res.json({ message: "welcome to travel agency" });
});

// passenger routes
router.post("/passenger", passengerController.createPassenger);
router.get("/passengers", passengerController.getAllPassengers);
router.post(
  "/passenger/:passengerId/activity",
  passengerController.addActivity
);

// destination routes
router.post("/destination", destinationController.createDestination);
router.get("/destinations", destinationController.getAllDestinations);
router.post(
  "/destination/:destinationId/activity",
  destinationController.addActivity
);

// activity routes
router.post("/activity", activityController.createActivity);
router.get("/activities", activityController.getAllActivities);
router.get("/activity/:activityId", activityController.getPassengers);
router.post("/activity/:activityId/signup", activityController.signUpPassenger);

// travel package routes
router.post("/travelPackage", travelPackageController.createTravelPackage);
router.get("/travelPackages", travelPackageController.getAllTravelPackages);
router.post(
  "/travelPackage/:travelPackageId/destination",
  travelPackageController.addDestination
);
router.post(
  "/travelPackage/:travelPackageId/passenger",
  travelPackageController.addPassenger
);
router.get(
  "/travelPackage/:travelPackageId/destinations",
  travelPackageController.getDestinations
);
router.get(
  "/travelPackage/:travelPackageId/passengers",
  travelPackageController.getPassengers
);

module.exports = router;
