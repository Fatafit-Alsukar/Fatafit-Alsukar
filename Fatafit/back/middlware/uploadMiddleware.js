const multer = require("multer");
const path = require("path");
const fs = require("fs");

// إنشاء المجلدات المطلوبة إذا لم تكن موجودة
const createUploadDirs = () => {
  const dirs = ['uploads', 'uploads/articles', 'uploads/activities', 'uploads/services'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// تكوين multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // تحديد المجلد المناسب بناءً على نوع الملف
    let uploadPath = 'uploads/';
    if (req.baseUrl.includes('/articles')) {
      uploadPath = 'uploads/articles/';
    } else if (req.baseUrl.includes('/activities')) {
      uploadPath = 'uploads/activities/';
    } else if (req.baseUrl.includes('/services')) {
      uploadPath = 'uploads/services/';
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// تكوين multer مع التحقق من نوع الملف
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // التحقق من نوع الملف
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('فقط ملفات الصور مسموح بها!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = { upload };