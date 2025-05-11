const multer = require("multer");
const path = require("path");

// تحديد مكان حفظ الملف واسم الملف
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // تأكد إن مجلد uploads موجود أو أنشئه
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });
module.exports = { upload };