const Service = require("../models/Service");

// إنشاء خدمة جديدة
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض كل الخدمات
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("requestedBy", "name email");
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض خدمة واحدة
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "requestedBy",
      "name email"
    );
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تحديث خدمة
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف خدمة
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res
      .status(200)
      .json({ message: "Service marked as deleted", service: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
