const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["cash", "in-kind"],
    required: true,
  },
  description: {
    type: String,
  },
  value: {
    type: Number, // في حالة التبرع النقدي
  },
  item: {
    type: String, // في حالة التبرع العيني (مثل: مضخة، إبر إنسولين)
  },
  donorName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
