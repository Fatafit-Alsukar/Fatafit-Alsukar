const PatientRequest = require("../models/PatientRequest");

// GET /api/requests/patient/count
exports.getPatientRequestCount = async (req, res) => {
  try {
    const count = await PatientRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "فشل في جلب عدد طلبات المستفيدين", error: err });
  }
};

// إرجاع عدد الطلبات لكل نوع خدمة
exports.getPatientRequestsGrouped = async (req, res) => {
  try {
    const grouped = await PatientRequest.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "serviceType",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $group: {
          _id: {
            id: "$service._id",
            name: "$service.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          serviceId: "$_id.id",
          serviceName: "$_id.name",
          count: 1,
          _id: 0,
        },
      },
    ]);
    

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error grouping patient requests" });
  }
};


// جلب الطلبات حسب نوع الخدمة
exports.getRequestsByServiceType = async (req, res) => {
  try {
    const { serviceType } = req.params;
    const requests = await PatientRequest.find({ serviceType });
    res.json(requests);
  } catch (error) {
    console.error("فشل في جلب الطلبات حسب النوع:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePatientRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await PatientRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
