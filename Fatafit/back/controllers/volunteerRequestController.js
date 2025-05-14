const VolunteerRequest = require("../models/VolunteerRequest");

// GET /api/requests/volunteer/count
exports.getVolunteerRequestCount = async (req, res) => {
  try {
    const count = await VolunteerRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "فشل في جلب عدد طلبات التطوع", error: err });
  }
};
