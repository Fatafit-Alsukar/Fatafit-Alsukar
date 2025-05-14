const MembershipRequest = require("../models/MembershipRequest");

// GET /api/requests/membership/count
exports.getMembershipRequestCount = async (req, res) => {
  try {
    const count = await MembershipRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد الطلبات", error: err });
  }
};
