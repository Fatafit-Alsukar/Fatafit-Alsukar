const ContactMessage = require('../models/ContactMessage');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'تم إرسال رسالتك بنجاح!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء إرسال الرسالة.' });
  }
}; 