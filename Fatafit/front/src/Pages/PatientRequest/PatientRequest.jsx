import { useState, useEffect } from "react";

export default function PatientRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    serviceType: "",
    additionalInfo: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate URL params - you can replace this with your actual routing solution
  const [urlParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم");
        }
        const data = await response.json();
        setServices(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const serviceIdFromUrl = urlParams.get("serviceType");
    if (serviceIdFromUrl) {
      setFormData((prev) => ({ ...prev, serviceType: serviceIdFromUrl }));
    }
  }, [urlParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (attachment) {
      data.append("attachment", attachment);
    }

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        setMessage(responseData.message);
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phonenumber: "",
          serviceType: "",
          additionalInfo: "",
        });
        setAttachment(null);
      } else {
        throw new Error(responseData.message || "حدث خطأ أثناء إرسال الطلب");
      }
    } catch (err) {
      setMessage(err.message || "حدث خطأ أثناء إرسال الطلب");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">
            جاري تحميل البيانات...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:px-40 md:px-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            طلب خدمة 
          </h1>
          <p className="text-gray-600">للمرضى المصابين بالسكري</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                المعلومات الشخصية
              </h3>

              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="الاسم الكامل"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="phonenumber"
                    placeholder="رقم الهاتف"
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                معلومات الخدمة
              </h3>

              <div className="relative">
                <select
                  name="serviceType"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right appearance-none bg-white"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  {services.map((s, index) => (
                    <option key={index} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="additionalInfo"
                  placeholder="معلومات إضافية أو ملاحظات خاصة (اختياري)"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right resize-none"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                المرفقات
              </h3>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="w-full border-2 border-dashed border-gray-300 p-6 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500 mt-2 text-right">
                  يمكنك رفع ملفات بصيغة: JPG, PNG, PDF (حد أقصى 5 ميجابايت)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري الإرسال...
                  </div>
                ) : (
                  "إرسال الطلب"
                )}
              </button>
            </div>
          </form>

          {/* Success/Error Messages */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                {success ? (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>جميع المعلومات المدخلة محفوظة وآمنة</p>
        </div>
      </div>
    </div>
  );
}
