// import React from "react";

// export default function PatientRequestsByService({
//   patientRequestsByType,
//   selectedServiceType,
//   requestsByType,
//   fetchRequestsByType,
//   updateStatus,
//   detailsRef,
//   setSelectedServiceType,
// }) {
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
//                 <p className="text-sm text-gray-600">
//                   {new Date().toLocaleDateString("ar-SA")}
//                 </p>
//                 <button
//                   className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm font-medium flex items-center"
//                   onClick={() => fetchRequestsByType(item.serviceId)}
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
//                       <td className="py-2 px-4 max-w-xs truncate">
//                         {req.additionalInfo || "-"}
//                       </td>
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
//                           onClick={() =>
//                             updateStatus(
//                               req._id,
//                               req.status === "approved" ? "pending" : "approved"
//                             )
//                           }
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


import React from "react";
import axios from "axios";

export default function PatientRequestsByService({
  patientRequestsByType,
  selectedServiceType,
  requestsByType,
  fetchRequestsByType,
  detailsRef,
  setSelectedServiceType,
}) {
  const handleApproveAction = async (req) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/requests/${req._id}/approve`,
        {
          email: req.email,
          fullName: req.fullName,
          phone: req.phonenumber,
        },
        { withCredentials: true }
      );

      if (response.data.message) {
        alert(response.data.message);
        fetchRequestsByType(req.serviceId);
      }
    } catch (err) {
      console.error("فشل الموافقة:", err);
      alert("حدث خطأ أثناء المعالجة");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold mb-4">
        طلبات المستفيدين حسب نوع الخدمة
      </h2>

      {/* أنواع الخدمات */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-teal-700">
            الخدمات المتوفرة
          </h3>
          <div className="text-sm text-gray-500">
            {patientRequestsByType.length} أنواع خدمات
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patientRequestsByType.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-800">{item.serviceName}</h4>
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                  {item.count}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString("ar-SA")}
                </p>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm font-medium flex items-center"
                  onClick={() => fetchRequestsByType(item.serviceId)}
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* تفاصيل الطلبات حسب نوع الخدمة المحدد */}
      {selectedServiceType && (
        <div
          ref={detailsRef}
          className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800">
              تفاصيل طلبات "{selectedServiceType?.serviceName}"
            </h3>

            <button
              onClick={() => setSelectedServiceType(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4">الاسم</th>
                  <th className="py-2 px-4">البريد</th>
                  <th className="py-2 px-4">الهاتف</th>
                  <th className="py-2 px-4">المرفق</th>
                  <th className="py-2 px-4">معلومات إضافية</th>
                  <th className="py-2 px-4">الحالة</th>
                  <th className="py-2 px-4">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {requestsByType.length > 0 ? (
                  requestsByType.map((req) => (
                    <tr key={req._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{req.fullName}</td>
                      <td className="py-2 px-4">{req.email}</td>
                      <td className="py-2 px-4">{req.phonenumber}</td>
                      <td className="py-2 px-4">
                        {req.attachment ? (
                          <a
                            href={req.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:underline"
                          >
                            تحميل
                          </a>
                        ) : (
                          <span className="text-gray-400">لا يوجد</span>
                        )}
                      </td>
                      <td className="py-2 px-4 max-w-xs truncate">
                        {req.additionalInfo || "-"}
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            req.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {req.status === "approved"
                            ? "تمت الموافقة"
                            : "قيد المراجعة"}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <button
                          className={`text-sm px-3 py-1 rounded ${
                            req.status === "approved"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              : "bg-teal-100 text-teal-800 hover:bg-teal-200"
                          }`}
                          onClick={() => handleApproveAction(req)}
                        >
                          {req.status === "approved" ? "تعليق" : "الموافقة"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      لا توجد طلبات.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
