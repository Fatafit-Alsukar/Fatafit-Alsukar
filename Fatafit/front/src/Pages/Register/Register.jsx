import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phonenumber: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ ما");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
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
          type="text"
          name="phonenumber"
          placeholder="رقم الهاتف"
          className="w-full border border-gray-300 p-2 rounded"
          value={formData.phonenumber}
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
          تسجيل
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}



// import { useState } from "react";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phonenumber: "",
//   });
//   const [message, setMessage] = useState("");

//   // ألوان الموقع المطلوبة
//   const colors = {
//     skyBlue: "#87CEEB",
//     softPink: "#FF8BBD0",
//     lavender: "#E6E6FA",
//     mintGreen: "#A8E6CF",
//     lightYellow: "#FFF9C4",
//     lightGray: "#F2F2F2"
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");
    
//     try {
    
//       const res = await axios.post("http://localhost:5000/api/users/register", formData, {
//         withCredentials: true,
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "حدث خطأ ما");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: colors.lightYellow }}>
//       <div className="max-w-md w-full space-y-8">
//         {/* شعار الموقع والعنوان */}
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "#5B8C5A" }}>
//             فتافيت السكر
//           </h1>
//           <p className="mt-2 text-lg" style={{ color: "#5B8C5A" }}>
//             معاً لحياة صحية للأطفال مع السكري
//           </p>
//         </div>
        
//         {/* بطاقة التسجيل */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* رأس البطاقة */}
//           <div className="p-6 text-center" style={{ backgroundColor: colors.skyBlue }}>
//             <h2 className="text-2xl font-bold text-white">إنشاء حساب جديد</h2>
//           </div>
          
//           {/* محتوى النموذج */}
//           <div className="p-8" style={{ backgroundColor: colors.lightGray }}>
//             <div className="space-y-6" dir="rtl">
//               <div className="rounded-lg p-4" style={{ backgroundColor: colors.mintGreen }}>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="الاسم الكامل"
//                   className="w-full border-0 p-3 rounded-lg text-right bg-white"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="rounded-lg p-4" style={{ backgroundColor: colors.lavender }}>
//                 <input
//                   type="text"
//                   name="phonenumber"
//                   placeholder="رقم الهاتف"
//                   className="w-full border-0 p-3 rounded-lg text-right bg-white"
//                   value={formData.phonenumber}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="rounded-lg p-4" style={{ backgroundColor: colors.mintGreen }}>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="البريد الإلكتروني"
//                   className="w-full border-0 p-3 rounded-lg text-right bg-white"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="rounded-lg p-4" style={{ backgroundColor: colors.lavender }}>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="كلمة المرور"
//                   className="w-full border-0 p-3 rounded-lg text-right bg-white"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <button
//                 onClick={handleSubmit}
//                 className="w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition-all focus:outline-none focus:ring-2"
//                 style={{ backgroundColor: "#FF8BBD", boxShadow: "0 4px 6px rgba(255, 139, 189, 0.25)" }}
//               >
//                 تسجيل
//               </button>
//             </div>
            
//             {message && (
//               <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
//                 {message}
//               </div>
//             )}
            
//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 لديك حساب بالفعل؟{" "}
//                 <a href="login" className="font-bold" style={{ color: colors.skyBlue }}>
//                   تسجيل الدخول
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
        
//         {/* تذييل الصفحة */}
//         <div className="text-center text-gray-500 text-sm">
//           فتافيت السكر © 2025 - جميع الحقوق محفوظة
//         </div>
//       </div>
//     </div>
//   );
// }