import React from "react";

export default function UsersManagement({ users, updateUserStatus }) {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold mb-4">المستفيدين</h2>
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-2 px-4">الاسم</th>
              <th className="py-2 px-4">العمر</th>
              <th className="py-2 px-4">الحالة</th>
              <th className="py-2 px-4">تاريخ الانضمام</th>
              <th className="py-2 px-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.age}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "نشط"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4">{user.joinDate}</td>
                <td className="py-2 px-4">
                  <button
                    className={`text-sm px-3 py-1 rounded ${
                      user.status === "نشط"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                    onClick={() =>
                      updateUserStatus(
                        user._id,
                        user.status === "نشط" ? "غير نشط" : "نشط"
                      )
                    }
                  >
                    {user.status === "نشط" ? "تعليق" : "تفعيل"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  لا توجد بيانات.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
