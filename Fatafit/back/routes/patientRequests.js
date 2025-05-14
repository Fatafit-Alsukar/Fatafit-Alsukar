const express = require("express");
const router = express.Router();
const {
  getPatientRequestCount,
} = require("../controllers/patientRequestController");

// Route: GET /api/requests/patient/count
router.get("/patient/count", getPatientRequestCount);

module.exports = router;
