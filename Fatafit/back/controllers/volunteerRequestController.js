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


// GET /api/requests/volunteer/count
exports.getVolunteerRequestCount = async (req, res) => {
  try {
    const count = await VolunteerRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد طلبات التطوع", error: err });
  }
};

// GET /api/requests/volunteer
exports.getAllVolunteerRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب الطلبات", error: err });
  }
};

// PUT /api/requests/volunteer/:id
exports.updateVolunteerRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await VolunteerRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "فشل في تحديث الحالة", error: err });
  }
};