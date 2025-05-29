import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function VolunteerRequest() {
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
      const res = await axios.post("http://localhost:5000/api/requests/volunteer", formData);
      toast.success(res.data.message || "تم إرسال طلب التطوع بنجاح");
      setFormData({
        fullName: "",
        email: "",
        phonenumber: "",
        birthDate: "",
        additionalInfo: "",
      });
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">انضم إلى فريق المتطوعين</h1>
          <p className="text-gray-600 text-lg">ساعدنا في دعم مرضى السكري وتقديم الرعاية اللازمة لهم</p>
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

            {/* Motivation Section */}
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                دافعك للتطوع
              </h3>
              
              <textarea
                name="additionalInfo"
                placeholder="أخبرنا عن دافعك للتطوع معنا، خبراتك السابقة، المهارات التي تملكها، والوقت المتاح لديك للتطوع..."
                onChange={handleChange}
                value={formData.additionalInfo}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                rows="4"
              />
            </div>

            {/* Volunteer Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                ما ستحصل عليه كمتطوع:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  شهادة تطوع معتمدة
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  تدريبات متخصصة مجانية
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  خبرة في المجال الطبي
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  شبكة تواصل مهنية
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  )}
                  {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التطوع"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">شكراً لرغبتك في التطوع معنا لخدمة المجتمع ومساعدة مرضى السكري</p>
          <div className="flex justify-center items-center mt-3 space-x-4 space-x-reverse">
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🤝 العمل الجماعي
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              ❤️ خدمة المجتمع
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🌟 التطوير المهني
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}