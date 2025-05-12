const PatientRequest = require("../models/PatientRequest");
const VolunteerRequest = require('../models/VolunteerRequest');
const MembershipRequest = require('../models/MembershipRequest');



exports.createRequest = async (req, res) => {
    try {
      const { fullName, email, phonenumber, serviceType, additionalInfo } = req.body;
      const file = req.file;
  
      // التحقق إذا كان هناك طلب سابق بنفس الإيميل
      const existingRequest = await PatientRequest.findOne({ email });
      if (existingRequest) {
        return res.status(400).json({ message: "لقد تم إرسال طلب مسبقًا بهذا البريد الإلكتروني" });
      }
  
      const newRequest = await PatientRequest.create({
        fullName,
        email,
        phonenumber,
        serviceType,
        additionalInfo,
        attachment: file?.filename, // نخزن فقط اسم الملف مثلاً
      });
  
      res.status(201).json({ message: "تم إرسال الطلب بنجاح، بانتظار الموافقة" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ أثناء إرسال الطلب", error: error.message });
    }
  };


// تطوع
exports.createVolunteerRequest = async (req, res) => {
  try {
    const { fullName, email, phonenumber, birthDate, additionalInfo} = req.body;

    const existing = await VolunteerRequest.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "تم إرسال طلب تطوع سابقًا بنفس البريد." });
    }

    await VolunteerRequest.create({ fullName, email, phonenumber, birthDate, additionalInfo });
    res.status(201).json({ message: "تم إرسال طلب التطوع بنجاح." });

  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء الإرسال.", error: error.message });
  }
};

// انتساب
exports.createMembershipRequest = async (req, res) => {
  try {
    const { fullName, email, phonenumber, birthDate, additionalInfo } = req.body;

    const existing = await MembershipRequest.findOne({ email });
 if (existing) {
      return res.status(400).json({ message: "تم إرسال طلب انتساب سابقًا بنفس البريد." });
    }

    await MembershipRequest.create({ fullName, email, phonenumber, birthDate, additionalInfo });
    res.status(201).json({ message: "تم إرسال طلب الانتساب بنجاح." });

  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء الإرسال." });
  }
};
