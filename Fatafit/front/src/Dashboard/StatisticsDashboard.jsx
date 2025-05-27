import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { UserPlus, Heart, ThumbsUp, Users } from "lucide-react";

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

export default function StatisticsDashboard({
  membershipCount,
  patientRequestCount,
  volunteerRequestCount,
  userCount,
  monthlyRegistrations,
  colors,
}) {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          الإحصائيات العامة
        </h2>

        {/* البطاقات الإحصائية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<UserPlus className="w-6 h-6 text-teal-500" />}
            title="طلبات الانتساب"
            value={membershipCount}
            color="#E0F7FA"
          />
          <StatCard
            icon={<Heart className="w-6 h-6 text-pink-500" />}
            title="طلبات المستفيدين"
            value={patientRequestCount}
            color="#FCE4EC"
          />
          <StatCard
            icon={<ThumbsUp className="w-6 h-6 text-orange-500" />}
            title="طلبات التطوع"
            value={volunteerRequestCount}
            color="#FFF3E0"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-indigo-500" />}
            title="المستفيدين النشطون"
            value={userCount}
            color="#E8EAF6"
          />
        </div>

        {/* الرسم البياني */}
        <div className="bg-white rounded-lg shadow-sm p-4 col-span-2">
          <p className="text-sm text-gray-500 mb-3">
            إحصائيات التسجيل للمستفيدين والمتطوعين خلال الأشهر الخمسة الماضية
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRegistrations}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="patients"
                  name="المستفيدين"
                  fill={colors?.softPink || "#FF8BB0"}
                />
                <Bar
                  dataKey="volunteers"
                  name="المتطوعين"
                  fill={colors?.lightYellow || "#FFF9C4"}
                />
                <Bar
                  dataKey="memberships"
                  name="طلبات الانتساب"
                  fill={colors?.mintGreen || "#A8E6CF"}
                />
                <Bar
                  dataKey="users"
                  name="المستفيدين النشطون"
                  fill={colors?.lavender || "#E6E6FA"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
