import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function PatientRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    serviceType: "",
    additionalInfo: "",
  });

  const [services, setServices] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests/services");
        setServices(res.data);
      } catch (err) {
        toast.error("حدث خطأ أثناء جلب أنواع الخدمات");
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (attachment) {
      data.append("attachment", attachment);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/requests", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "تم إرسال الطلب بنجاح");
      setFormData({
        fullName: "",
        email: "",
        phonenumber: "",
        serviceType: "",
        additionalInfo: "",
      });
      setAttachment(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6" dir="rtl">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: '14px',
            maxWidth: '500px',
            padding: '16px',
            margin: '8px',
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">طلب خدمة طبية</h1>
          <p className="text-gray-600 text-lg">نحن هنا لمساعدتك في رحلتك مع مرض السكري</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                المعلومات الشخصية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="الاسم الكامل"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    name="phonenumber"
                    placeholder="رقم الهاتف"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Service Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
                </svg>
                نوع الخدمة المطلوبة
              </h3>
              
              {isLoadingServices ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <select
                  name="serviceType"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white text-gray-700"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="text-gray-500">اختر نوع الخدمة التي تحتاجها</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Additional Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                معلومات إضافية
              </h3>
              
              <textarea
                name="additionalInfo"
                placeholder="يرجى كتابة أي تفاصيل إضافية تساعدنا في تقديم الخدمة المناسبة لك (الحالة الصحية، الأدوية الحالية، متطلبات خاصة...)"
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
                إرفاق ملف (اختياري)
              </h3>
              
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="w-full border-2 border-dashed border-gray-300 px-4 py-6 rounded-lg hover:border-blue-400 transition-colors duration-200 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">يمكنك إرفاق التقارير الطبية أو الصور بصيغة JPG, PNG أو PDF (حد أقصى 5 ميجابايت)</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isLoadingServices}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, #4A90E2 0%, #1D3E79 100%)`
                }}
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  )}
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">نحن ملتزمون بحماية خصوصيتك وسرية معلوماتك الطبية</p>
        </div>
      </div>
    </div>
  );
}