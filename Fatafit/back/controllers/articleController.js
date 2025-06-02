const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/articles';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// تكوين multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// الحصول على جميع المقالات
exports.getArticles = async (req, res) => {
  try {
    const { archived } = req.query;
    const query = archived === 'true' ? { isArchived: true } : { isArchived: false };
    const articles = await Article.find(query).sort({ date: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المقالات' });
  }
};

// الحصول على مقال محدد
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'المقال غير موجود' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المقال' });
  }
};

// إنشاء مقال جديد
exports.createArticle = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      image: req.file ? `/uploads/articles/${req.file.filename}` : null
    });

    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).json({ 
      message: 'حدث خطأ أثناء إنشاء المقال',
      error: error.message 
    });
  }
};

// تحديث مقال
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'المقال غير موجود' });
    }

    // Delete old image if new one is uploaded
    if (req.file && article.image) {
      const oldImagePath = path.join(__dirname, '..', article.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;
    article.author = req.body.author || article.author;
    article.tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : article.tags;
    if (req.file) {
      article.image = `/uploads/articles/${req.file.filename}`;
    }

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(400).json({ 
      message: 'حدث خطأ أثناء تحديث المقال',
      error: error.message 
    });
  }
};

// حذف مقال
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'المقال غير موجود' });
    }

    // Delete article image if exists
    if (article.image) {
      const imagePath = path.join(__dirname, '..', article.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف المقال بنجاح' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء حذف المقال',
      error: error.message 
    });
  }
};

// أرشفة مقال
exports.archiveArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'المقال غير موجود' });
    }

    if (article.isArchived) {
      return res.status(400).json({ message: 'المقال مؤرشف بالفعل' });
    }

    article.isArchived = true;
    article.archivedAt = new Date();
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error archiving article:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء أرشفة المقال',
      error: error.message 
    });
  }
};

// إلغاء أرشفة مقال
exports.unarchiveArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'المقال غير موجود' });
    }

    if (!article.isArchived) {
      return res.status(400).json({ message: 'المقال غير مؤرشف' });
    }

    article.isArchived = false;
    article.archivedAt = null;
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error unarchiving article:', error);
    res.status(500).json({ 
      message: 'حدث خطأ أثناء إلغاء أرشفة المقال',
      error: error.message 
    });
  }
}; 