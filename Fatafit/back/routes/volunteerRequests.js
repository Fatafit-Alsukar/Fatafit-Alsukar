const express = require("express");
const router = express.Router();
const {
  getVolunteerRequestCount,
  getAllVolunteerRequests,
  updateVolunteerRequestStatus,
  
} = require("../controllers/volunteerRequestController");

// Route: GET /api/requests/volunteer/count
router.get("/volunteer/count", getVolunteerRequestCount);

// GET العدد
router.get("/count", getVolunteerRequestCount);

// GET جميع الطلبات
router.get("/", getAllVolunteerRequests);

// PUT لتحديث الحالة
router.put("/:id", updateVolunteerRequestStatus);
module.exports = router;
