const express = require("express");
const router = express.Router();
const {
  getPatientRequestCount,
  getPatientRequestsGrouped,
  getRequestsByServiceType,
  updatePatientRequestStatus,
} = require("../controllers/patientRequestController");

// Route: GET /api/requests/patient/count
router.get("/patient/count", getPatientRequestCount);
router.get("/grouped", getPatientRequestsGrouped);
router.get("/by-type/:serviceType", getRequestsByServiceType);
router.put("/:id", updatePatientRequestStatus);

module.exports = router;
