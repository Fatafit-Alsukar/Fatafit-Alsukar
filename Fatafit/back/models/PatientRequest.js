const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        enum: ['إرشاد', 'توعية', 'مرافقة', 'استشارة'], // عدّل حسب الخدمات
        required: true
    },
    additionalInfo: {
        type: String
    },
    attachment: {
        type: String, // اسم الملف فقط
        default: null
      },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('PatientRequest', requestSchema);
