const express = require("express");
const router = express.Router();
const {
  getVolunteerRequestCount,
} = require("../controllers/volunteerRequestController");

// Route: GET /api/requests/volunteer/count
router.get("/volunteer/count", getVolunteerRequestCount);

module.exports = router;
