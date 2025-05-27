import React from "react";

export default function MembershipRequests({
  membershipRequests,
  updateMembershipStatus,
}) {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold mb-4">طلبات الانتساب</h2>
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-2 px-4">الاسم</th>
              <th className="py-2 px-4">البريد</th>
              <th className="py-2 px-4">الهاتف</th>
              <th className="py-2 px-4">تاريخ الميلاد</th>
              <th className="py-2 px-4">معلومات إضافية</th>
              <th className="py-2 px-4">الحالة</th>
              <th className="py-2 px-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {membershipRequests.length > 0 ? (
              membershipRequests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{req.fullName}</td>
                  <td className="py-2 px-4">{req.email}</td>
                  <td className="py-2 px-4">{req.phonenumber}</td>
                  <td className="py-2 px-4">{req.birthDate}</td>
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
                      className="text-sm text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded"
                      onClick={() =>
                        updateMembershipStatus(
                          req._id,
                          req.status === "approved" ? "pending" : "approved"
                        )
                      }
                    >
                      {req.status === "approved" ? "تعليق" : "الموافقة"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  لا توجد طلبات حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
