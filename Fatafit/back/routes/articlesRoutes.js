const express = require('express');
const router = express.Router();
const { upload } = require('../middlware/uploadMiddleware');
const articleController = require('../controllers/articleController');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'حجم الملف كبير جداً. الحد الأقصى هو 5 ميجابايت' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// مسارات المقالات
router.get('/', (req, res, next) => articleController.getArticles(req, res, next));
router.get('/:id', (req, res, next) => articleController.getArticle(req, res, next));
router.post('/', upload.single('image'), handleMulterError, (req, res, next) => articleController.createArticle(req, res, next));
router.put('/:id', upload.single('image'), handleMulterError, (req, res, next) => articleController.updateArticle(req, res, next));
router.delete('/:id', (req, res, next) => articleController.deleteArticle(req, res, next));

module.exports = router; 