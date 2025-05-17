const MembershipRequest = require("../models/MembershipRequest");

exports.getMembershipRequestCount = async (req, res) => {
  try {
    const count = await MembershipRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد الطلبات", error: err });
  }
};

exports.getAllMembershipRequests = async (req, res) => {
  try {
    const requests = await MembershipRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب الطلبات", error: err });
  }
};

exports.updateMembershipRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await MembershipRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "فشل في تحديث الحالة", error: err });
  }
};
