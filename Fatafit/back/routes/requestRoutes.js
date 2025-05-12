const express = require("express");
const router = express.Router();
const request = require("../controllers/requestController");
const { upload } = require("../middlware/uploadMiddleware");

// إرسال طلب جديد
router.post("/", upload.single("attachment"), request.createRequest);
router.post("/volunteer", request.createVolunteerRequest);
router.post("/membership", request.createMembershipRequest);

module.exports = router;
