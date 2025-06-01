

// import React from "react";
// import axios from "axios";
// import { useState } from "react";

// export default function PatientRequestsByService({
//   patientRequestsByType,
//   selectedServiceType,
//   requestsByType,
//   fetchRequestsByType,
//   detailsRef,
//   setSelectedServiceType,
// }) {
//   const handleApproveAction = async (req) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/requests/${req._id}/approve`,
//         {
//           email: req.email,
//           fullName: req.fullName,
//           phone: req.phonenumber,
//         },
//         { withCredentials: true }
//       );

//       if (response.data.message) {
//         alert(response.data.message);
//         fetchRequestsByType(req.serviceId);
//       }
//     } catch (err) {
//       console.error("فشل الموافقة:", err);
//       alert("حدث خطأ أثناء المعالجة");
//     }
//   };
//   console.log("selectedServiceType:", selectedServiceType);



// function ReadMoreCell({ text = "-", maxLength = 50 }) {
//   const [expanded, setExpanded] = useState(false);

//   if (!text) return <span>-</span>;

//   const isLong = text.length > maxLength;
//   const displayText = expanded || !isLong ? text : text.slice(0, maxLength) + "...";
//     return (
//     <div className="max-w-[200px]">
//       <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{displayText}</span>
//       {isLong && !expanded && (
//         <button
//           className="text-blue-600 text-sm underline mt-1"
//           onClick={() => setExpanded(true)}
//         >
//           قراءة المزيد
//         </button>
//       )}
//     </div>
//   );
// }


//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-xl font-bold mb-4">
//         طلبات المستفيدين حسب نوع الخدمة
//       </h2>

//       {/* أنواع الخدمات */}
//       <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-lg font-semibold text-teal-700">
//             الخدمات المتوفرة
//           </h3>
//           <div className="text-sm text-gray-500">
//             {patientRequestsByType.length} أنواع خدمات
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {patientRequestsByType.map((item, index) => (
//             <div
//               key={index}
//               className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-all duration-300"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h4 className="font-bold text-gray-800">{item.serviceName}</h4>
//                 <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
//                   {item.count}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <button
//                   className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm font-medium flex items-center"
//                   onClick={async () => {
//                     await fetchRequestsByType(item.serviceId); // 🔄 انتظر انتهاء الجلب
//                     setSelectedServiceType(item); // ✅ بعدها فقط نعرض الاسم
//                   }}
//                 >
//                   عرض التفاصيل
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* تفاصيل الطلبات حسب نوع الخدمة المحدد */}
//       {selectedServiceType && (
//         <div
//           ref={detailsRef}
//           className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-100"
//         >
//           <div className="flex justify-between items-center mb-5">
//             <h3 className="text-lg font-bold text-gray-800">
//               تفاصيل طلبات "{selectedServiceType?.serviceName}"
//             </h3>

//             <button
//               onClick={() => setSelectedServiceType(null)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full text-right border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b">
//                   <th className="py-2 px-4">الاسم</th>
//                   <th className="py-2 px-4">البريد</th>
//                   <th className="py-2 px-4">الهاتف</th>
//                   <th className="py-2 px-4">المرفق</th>
//                   <th className="py-2 px-4">معلومات إضافية</th>
//                   <th className="py-2 px-4">الحالة</th>
//                   <th className="py-2 px-4">إجراء</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requestsByType.length > 0 ? (
//                   requestsByType.map((req) => (
//                     <tr key={req._id} className="border-b hover:bg-gray-50">
                      
//                       <td className="py-2 px-4">{req.fullName}</td>
//                       <td className="py-2 px-4">{req.email}</td>
//                       <td className="py-2 px-4">{req.phonenumber}</td>
//                       <td className="py-2 px-4">
//                         {req.attachment ? (
//                           <a
//                             href={req.attachment}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-teal-600 hover:underline"
//                           >
//                             تحميل
//                           </a>
//                         ) : (
//                           <span className="text-gray-400">لا يوجد</span>
//                         )}
//                       </td>
// <td className="py-2 px-4">
//   <ReadMoreCell text={req.additionalInfo} />
// </td>


//                       <td className="py-2 px-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             req.status === "approved"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {req.status === "approved"
//                             ? "تمت الموافقة"
//                             : "قيد المراجعة"}
//                         </span>
//                       </td>
//                       <td className="py-2 px-4">
//                         <button
//                           className={`text-sm px-3 py-1 rounded ${
//                             req.status === "approved"
//                               ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                               : "bg-teal-100 text-teal-800 hover:bg-teal-200"
//                           }`}
//                           onClick={() => handleApproveAction(req)}
//                         >
//                           {req.status === "approved" ? "تعليق" : "الموافقة"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4 text-gray-500">
//                       لا توجد طلبات.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Eye, X, Download, Users, Clock, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function PatientRequestsByService({
  patientRequestsByType,
  selectedServiceType,
  requestsByType: initialRequestsByType,
  fetchRequestsByType,
  detailsRef,
  setSelectedServiceType,
}) {
  const [popupText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [requestsByType, setRequestsByType] = useState(initialRequestsByType || []);
  const [loadingRequests, setLoadingRequests] = useState(new Set());

  // Update local state when props change
  useEffect(() => {
    if (initialRequestsByType) {
      setRequestsByType(initialRequestsByType);
    }
  }, [initialRequestsByType]);

  const handleApproveAction = async (req) => {
    try {
      // Add loading state for this specific request
      setLoadingRequests(prev => new Set([...prev, req._id]));
      
      // Make the actual API call (you'll need to import axios in your real component)
      const response = await fetch(`http://localhost:5000/api/requests/${req._id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: req.email,
          fullName: req.fullName,
          phone: req.phonenumber,
        })
      });
      
      const data = await response.json();
      
      if (data.message) {
        alert(data.message);
        // Update the request status locally
        setRequestsByType(prevRequests => 
          prevRequests.map(request => 
            request._id === req._id 
              ? { 
                  ...request, 
                  status: request.status === "approved" ? "pending" : "approved" 
                }
              : request
          )
        );
        // Call the parent function to refresh data
        fetchRequestsByType(req.serviceId);
      }
    } catch (err) {
      console.error("فشل الموافقة:", err);
      alert("حدث خطأ أثناء المعالجة");
    } finally {
      // Remove loading state
      setLoadingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(req._id);
        return newSet;
      });
    }
  };

  const openPopup = (text) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupText("");
  };

  function ReadMoreCell({ text = "-", maxLength = 50 }) {
    if (!text || text === "-") return <span className="text-gray-400 italic">لا يوجد</span>;

    const isLong = text.length > maxLength;
    const displayText = !isLong ? text : text.slice(0, maxLength) + "...";
    
    return (
      <div className="max-w-[200px]">
        <span className="block text-sm text-gray-700">{displayText}</span>
        {isLong && (
          <button
            className="inline-flex items-center gap-1 text-blue-600 text-xs hover:text-blue-800 transition-colors duration-200 mt-1 font-medium"
            onClick={() => openPopup(text)}
          >
            <Eye size={12} />
            قراءة المزيد
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
              <Sparkles className="text-teal-600" size={24} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                إدارة طلبات المستفيدين
              </h1>
            </div>
            <p className="text-gray-600 text-lg">نظام متقدم لإدارة ومتابعة طلبات الخدمات</p>
          </div>

          {/* Services Grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">الخدمات المتوفرة</h3>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full">
                <Users className="text-teal-600" size={16} />
                <span className="text-sm font-semibold text-teal-700">
                  {patientRequestsByType.length} نوع خدمة
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {patientRequestsByType && patientRequestsByType.length > 0 ? (
                patientRequestsByType.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-transparent rounded-bl-full opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full opacity-40"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-teal-700 transition-colors">
                        {item.serviceName}
                      </h4>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                        <Users size={12} />
                        {item.count}
                      </div>
                    </div>
                    
                    <button
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-2xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
                      onClick={async () => {
                        await fetchRequestsByType(item.serviceId);
                        setSelectedServiceType(item);
                        setTimeout(() => {
                          detailsRef?.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      <Eye size={16} />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">لا توجد خدمات متاحة</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          {selectedServiceType && (
            <div
              ref={detailsRef}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm animate-fadeIn"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-white rounded-full opacity-80"></div>
                    <h3 className="text-xl font-bold">
                      تفاصيل طلبات "{selectedServiceType?.serviceName}"
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedServiceType(null)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="min-w-full text-right">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">الاسم الكامل</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">البريد الإلكتروني</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">رقم الهاتف</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">المرفق</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">معلومات إضافية</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">الحالة</th>
                        <th className="py-4 px-6 font-semibold text-gray-700 text-sm">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requestsByType.length > 0 ? (
                        requestsByType.map((req, index) => (
                          <tr key={req._id} className="hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-blue-50/50 transition-all duration-200">
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-900">{req.fullName}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-gray-600 text-sm">{req.email}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-gray-600 text-sm font-mono">{req.phonenumber}</div>
                            </td>
                            <td className="py-4 px-6">
                              {req.attachment ? (
                                <a
                                  href={req.attachment}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
                                >
                                  <Download size={14} />
                                  تحميل
                                </a>
                              ) : (
                                <span className="text-gray-400 italic text-sm">لا يوجد مرفق</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <ReadMoreCell text={req.additionalInfo} />
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                {req.status === "approved" ? (
                                  <>
                                    <CheckCircle size={16} className="text-green-600" />
                                    <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                      تمت الموافقة
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Clock size={16} className="text-amber-600" />
                                    <span className="bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                                      قيد المراجعة
                                    </span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <button
                                className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                  loadingRequests.has(req._id)
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : req.status === "approved"
                                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
                                    : "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 hover:shadow-lg hover:-translate-y-0.5"
                                }`}
                                onClick={() => handleApproveAction(req)}
                                disabled={loadingRequests.has(req._id)}
                              >
                                {loadingRequests.has(req._id) ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                    معالجة...
                                  </>
                                ) : req.status === "approved" ? (
                                  <>
                                    <AlertCircle size={14} />
                                    تعليق
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle size={14} />
                                    الموافقة
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-12">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <Users size={24} className="text-gray-400" />
                              </div>
                              <p className="text-gray-500 font-medium">لا توجد طلبات متاحة</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Eye size={20} className="text-teal-600" />
                المعلومات الإضافية
              </h3>
              <button
                onClick={closePopup}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-right">
                  {popupText}
                </p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={closePopup}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}