import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Clock, Tag, ChevronLeft } from "lucide-react";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // جلب البيانات من الـ Backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/activities"
        );
        setActivities(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching activities", error);
        setError("حدث خطأ أثناء تحميل الفعاليات، يرجى المحاولة مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // استخراج جميع الفئات الفريدة
  const categories =
    activities.length > 0
      ? ["all", ...new Set(activities.map((activity) => activity.category))]
      : ["all"];

  // فلترة الفعاليات حسب الفئة المختارة
  const filteredActivities =
    selectedCategory === "all"
      ? activities
      : activities.filter((activity) => activity.category === selectedCategory);

  // تنسيق التاريخ باللغة العربية
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-SA", options);
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen p-6 rtl" dir="rtl">
      {/* العنوان والعنوان الفرعي */}
      <div className="text-center mb-12 pt-6">
        <h1 className="text-4xl font-bold text-[#FF8BD0] mb-3">
          الفعاليات القادمة
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          استكشف مجموعة متنوعة من الفعاليات المميزة والأنشطة المثيرة التي تناسب
          اهتماماتك
        </p>
      </div>

      {/* فلتر الفئات */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex justify-center gap-2 pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${
                  selectedCategory === category
                    ? "bg-[#FF8BD0] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-[#FFF9C4]"
                }`}
            >
              {category === "all" ? "جميع الفعاليات" : category}
            </button>
          ))}
        </div>
      </div>

      {/* حالة التحميل */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8BD0]"></div>
        </div>
      )}

      {/* رسالة الخطأ */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
          {error}
        </div>
      )}

      {/* عرض عدم وجود فعاليات */}
      {!loading && !error && filteredActivities.length === 0 && (
        <div className="text-center p-10 bg-[#E6E6FA] rounded-lg">
          <p className="text-lg font-medium text-gray-600">
            لا توجد فعاليات في هذه الفئة حالياً
          </p>
        </div>
      )}

      {/* بطاقات الفعاليات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredActivities.map((activity) => (
          <div
            key={activity._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            {/* صورة الفعالية مع شريط الفئة */}
            <div className="relative">
              <img
                src={activity.image || "https://via.placeholder.com/400"}
                alt={activity.name}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-[#87CEEB] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </span>
              </div>
            </div>

            {/* محتوى البطاقة */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#FF8BD0] mb-3">
                {activity.name}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
                {activity.description}
              </p>

              {/* تفاصيل الفعالية */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-[#A8E6CF]" />
                  <span>{formatDate(activity.date)}</span>
                </div>

                {activity.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-[#A8E6CF]" />
                    <span>{activity.location}</span>
                  </div>
                )}

                {activity.time && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-[#A8E6CF]" />
                    <span>{activity.time}</span>
                  </div>
                )}
              </div>

              {/* زر التفاصيل */}
              <button className="w-full px-4 py-3 bg-gradient-to-l from-[#A8E6CF] to-[#87CEEB] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-transform hover:translate-y-[-2px]">
                عرض التفاصيل
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
