import { useState } from "react";
import axios from "axios";

export default function MembershipRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    birthDate: "",
    additionalInfo: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/requests/membership", formData);
      setMessage(res.data.message);
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phonenumber: "",
        birthDate: "",
        additionalInfo: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">طلب انتساب للجمعية</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="الاسم الكامل"
          required
          onChange={handleChange}
          value={formData.fullName}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          required
          onChange={handleChange}
          value={formData.email}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="رقم الهاتف"
          required
          onChange={handleChange}
          value={formData.phonenumber}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="birthDate"
          placeholder="تاريخ الميلاد"
          required
          onChange={handleChange}
          value={formData.birthDate}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="additionalInfo"
          placeholder="معلومات إضافية (اختياري)"
          onChange={handleChange}
          value={formData.additionalInfo}
          className="w-full border p-2 rounded"
          rows="3"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
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
