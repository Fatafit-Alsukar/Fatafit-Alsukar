const express = require("express");
const router = express.Router();
const {
  getMembershipRequestCount,
} = require("../controllers/membershipRequestController");

// Route: GET /api/requests/membership/count
router.get("/membership/count", getMembershipRequestCount);

module.exports = router;
