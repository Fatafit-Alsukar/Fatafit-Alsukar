import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function MembershipRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    birthDate: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/requests/membership", formData);
      
      toast.success(res.data.message || "تم إرسال طلب الانتساب بنجاح!", {
        duration: 5000,
        position: "top-center",
        style: {
          backgroundColor: '#f0fdf4',
          borderLeft: '4px solid #4ade80',
          padding: '1rem',
          minWidth: '300px',
          maxWidth: '90vw',
        },
      });
      
      setFormData({
        fullName: "",
        email: "",
        phonenumber: "",
        birthDate: "",
        additionalInfo: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء إرسال الطلب", {
        duration: 5000,
        position: "top-center",
        style: {
          backgroundColor: '#fef2f2',
          borderLeft: '4px solid #f87171',
          padding: '1rem',
          minWidth: '300px',
          maxWidth: '90vw',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4" dir="rtl">
      {/* Toast Container */}
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          className: '',
          style: {
            maxWidth: '100%',
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">انضم إلى جمعيتنا</h1>
          <p className="text-gray-600 text-lg">كن جزءاً من مجتمعنا الداعم لمرضى السكري وعائلاتهم</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                    required
                    onChange={handleChange}
                    value={formData.fullName}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    name="phonenumber"
                    placeholder="رقم الهاتف"
                    required
                    onChange={handleChange}
                    value={formData.phonenumber}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    required
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    name="birthDate"
                    placeholder="تاريخ الميلاد"
                    required
                    onChange={handleChange}
                    value={formData.birthDate}
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white text-gray-700"
                  />
                  <label className="absolute -top-2 right-3 bg-white px-1 text-xs text-gray-500">تاريخ الميلاد</label>
                </div>
              </div>
            </div>

            {/* Interest & Goals Section */}
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                سبب الانتساب واهتماماتك
              </h3>
              
              <textarea
                name="additionalInfo"
                placeholder="أخبرنا عن سبب رغبتك في الانتساب لجمعيتنا، اهتماماتك في مجال دعم مرضى السكري، أو أي معلومات إضافية تود مشاركتها معنا..."
                onChange={handleChange}
                value={formData.additionalInfo}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                rows="4"
              />
            </div>

            {/* Membership Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                مزايا العضوية في جمعيتنا:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  استشارات طبية مجانية
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  ورش توعوية متخصصة
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  دعم نفسي واجتماعي
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  مجتمع داعم ومتفهم
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  أنشطة ترفيهية وثقافية
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  خصومات على الأدوية والفحوصات
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  )}
                  {isSubmitting ? "جاري الإرسال..." : "طلب الانتساب للجمعية"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">نتطلع لانضمامك إلى عائلة جمعيتنا الكبيرة</p>
          <div className="flex justify-center items-center mt-3 space-x-4 space-x-reverse">
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🤝 مجتمع داعم
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🏥 رعاية صحية
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              💡 توعية مستمرة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}