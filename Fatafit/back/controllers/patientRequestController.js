const PatientRequest = require("../models/PatientRequest");

// GET /api/requests/patient/count
exports.getPatientRequestCount = async (req, res) => {
  try {
    const count = await PatientRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "فشل في جلب عدد طلبات المرضى", error: err });
  }
};
