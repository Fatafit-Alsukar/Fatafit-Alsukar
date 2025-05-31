import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { UserPlus, Heart, ThumbsUp, Users } from "lucide-react";
import PatientRequestsByService from "./PatientRequestsByService";
const StatCard = ({ icon, title, value, color }) => (
  <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <div className="p-3 bg-white bg-opacity-60 rounded-full">{icon}</div>
    </div>
  </div>
);

export default function DashboardHome({
  membershipCount,
  patientRequestCount,
  volunteerRequestCount,
  userCount,
  patientRequestsByType,
  events,
  users,
  setActiveTab,
  colors,
  monthlyRegistrations,
  fetchRequestsByType,
  selectedServiceType,
  detailsRef,
  requestsByType,
  updateStatus,
  setSelectedServiceType,
}) {
  return (
    <div className="space-y-6 p-6">
      {/* ترحيب */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-teal-700 mb-2">
          مرحباً بك في لوحة تحكم جمعية فتافيت السكر
        </h2>
        <p className="text-gray-600">
          هذه النظرة العامة توفر لك معلومات حول نشاطات الجمعية والإحصائيات
          الهامة.
        </p>
      </div>

      {/* بطاقات الإحصاء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<UserPlus className="w-6 h-6 text-teal-500" />}
          title="طلبات الانتساب"
          value={membershipCount}
          color={colors.mintGreen}
        />
        <StatCard
          icon={<Heart className="w-6 h-6 text-red-500" />}
          title="طلبات المستفيدين"
          value={patientRequestCount}
          color={colors.softPink}
        />
        <StatCard
          icon={<ThumbsUp className="w-6 h-6 text-orange-500" />}
          title="طلبات التطوع"
          value={volunteerRequestCount}
          color={colors.lightYellow}
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-indigo-500" />}
          title="المستفيدين النشطون"
          value={userCount}
          color={colors.lavender}
        />
      </div>

      {/* رسم بياني */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 col-span-2">
          <p className="text-sm text-gray-500 mb-3">
            إحصائيات التسجيل خلال الأشهر الخمسة الماضية
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRegistrations}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="patients"
                  name="المستفيدين"
                  fill={colors.softPink}
                />
                <Bar
                  dataKey="volunteers"
                  name="المتطوعين"
                  fill={colors.lightYellow}
                />
                <Bar
                  dataKey="memberships"
                  name="طلبات الانتساب"
                  fill={colors.mintGreen}
                />
                <Bar
                  dataKey="users"
                  name="المستفيدين النشطون"
                  fill={colors.lavender}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-3">
            أكثر الخدمات طلباً من المستفيدين
          </p>
          <ul className="space-y-3">
            {patientRequestsByType.length > 0 ? (
              patientRequestsByType
                .sort((a, b) => b.count - a.count) // ترتيب تنازلي حسب العدد
                .slice(0, 5) // أول 5 خدمات فقط
                .map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {item.serviceName}
                    </span>
                    <span className="text-sm font-semibold text-teal-600">
                      {item.count} طلب
                    </span>
                  </li>
                ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-3">
                لا توجد بيانات حالياً
              </p>
            )}
          </ul>
        </div>
      </div>

      <PatientRequestsByService
        patientRequestsByType={patientRequestsByType}
        selectedServiceType={selectedServiceType}
        requestsByType={requestsByType}
        fetchRequestsByType={fetchRequestsByType}
        updateStatus={updateStatus}
        detailsRef={detailsRef}
        setSelectedServiceType={setSelectedServiceType}
      />

      {/* المستفيدون */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">معلومات المستفيدين</h3>
          <button
            onClick={() => setActiveTab("users")}
            className="text-teal-600 hover:underline text-sm"
          >
            عرض الكل
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الاسم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  العمر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الانضمام
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 3).map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.age}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        user.status === "نشط"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* الفعاليات القادمة */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">الفعاليات القادمة</h3>
          <button
            onClick={() => setActiveTab("events")}
            className="text-blue-600 hover:underline text-sm"
          >
            عرض الكل
          </button>
        </div>
        <div className="space-y-3">
          {events
            .filter((e) => new Date(e.date) >= new Date())
            .slice(0, 3)
            .map((event) => (
              <div
                key={event._id}
                className="border p-3 rounded-lg hover:bg-gray-50"
              >
                <h4 className="font-bold">{event.name}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString("en-GB")}
              
                </p>
                <p className="text-sm text-gray-500">{event.category}</p>
              </div>
            ))}
          {events.filter((e) => new Date(e.date) >= new Date()).length ===
            0 && (
            <div className="text-center text-gray-500">
              لا توجد فعاليات حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
