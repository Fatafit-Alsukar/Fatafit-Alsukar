import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // تأكد من أنك تستخدم React Router

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData, {
        withCredentials: true,
      });

      if (res.data.mustChangePassword) {
        setMessage("يرجى تغيير كلمة المرور المؤقتة.");
        navigate("/changepassword"); // أو أي صفحة إعداد كلمة مرور جديدة
      } else {
        setMessage(res.data.message);
        // navigate("/"); // أو الصفحة الرئيسية للمستخدم
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ ما");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="password"
          name="password"
          placeholder="كلمة المرور"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          دخول
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}
