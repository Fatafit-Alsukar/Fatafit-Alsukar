import { useState, useEffect } from "react";

export default function Profile() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setForm({ fullName: data.user.fullName, email: data.user.email, password: "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = { fullName: form.fullName, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("تم تحديث الملف الشخصي بنجاح");
        setForm(f => ({ ...f, password: "" }));
      } else {
        setError("حدث خطأ أثناء التحديث");
      }
    } catch {
      setError("حدث خطأ أثناء التحديث");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4" dir="rtl">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-6">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-700 mb-2">الملف الشخصي</h2>
          <p className="text-gray-500 text-lg">يمكنك تعديل بياناتك الشخصية هنا</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-right text-gray-700 font-medium text-lg">الاسم الكامل</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition"
              placeholder="الاسم الكامل"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-right text-gray-700 font-medium text-lg">البريد الإلكتروني</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition bg-gray-100 cursor-not-allowed"
              placeholder="البريد الإلكتروني"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-right text-gray-700 font-medium text-lg">كلمة المرور الجديدة (اختياري)</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition"
              placeholder="كلمة المرور الجديدة"
              autoComplete="new-password"
            />
            <span className="text-xs text-gray-400">اترك الحقل فارغًا إذا لا تريد تغيير كلمة المرور</span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </button>
        </form>
        {message && <div className="mt-8 text-center text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl py-3 text-lg">{message}</div>}
        {error && <div className="mt-8 text-center text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl py-3 text-lg">{error}</div>}
      </div>
    </div>
  );
} 