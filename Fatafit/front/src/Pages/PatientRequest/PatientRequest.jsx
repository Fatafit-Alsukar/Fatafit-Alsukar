import { useState } from "react";
import axios from "axios";

export default function PatientRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    serviceType: "",
    additionalInfo: "",
  });

  const [attachment, setAttachment] = useState(null); // ملف الصورة أو المستند
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData();

    // إضافة البيانات النصية
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // إضافة الملف إذا وُجد
    if (attachment) {
      data.append("attachment", attachment);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/requests", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phonenumber: "",
        serviceType: "",
        additionalInfo: "",
      });
      setAttachment(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">طلب خدمة لمصاب بالسكري</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="الاسم الكامل"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="رقم الهاتف"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />

        <select
          name="serviceType"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.serviceType}
          onChange={handleChange}
          required
        >
          <option value="">اختر نوع الخدمة</option>
          <option value="إرشاد">إرشاد</option>
          <option value="توعية">توعية</option>
          <option value="مرافقة">مرافقة</option>
          <option value="استشارة">استشارة</option>
        </select>

        <textarea
          name="additionalInfo"
          placeholder="معلومات إضافية (اختياري)"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="3"
        ></textarea>

        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf" // حسب ما تقبله من ملفات
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          إرسال الطلب
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center text-sm ${success ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

