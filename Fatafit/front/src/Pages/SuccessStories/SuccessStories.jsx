// SuccessStories.jsx
import { useEffect, useState } from "react";
import { User, Star, Heart, Trophy } from "lucide-react";
import axios from "axios";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/success-stories")
      .then((res) => {
        console.log("API response:", res.data);
        setStories(res.data);
      })
      .catch((err) => console.error("فشل تحميل القصص:", err));
  }, []);

  const cardColors = [
    { bg: "bg-blue-100", text: "text-blue-700", accent: "text-blue-600" },
    { bg: "bg-pink-100", text: "text-pink-700", accent: "text-pink-600" },
    { bg: "bg-purple-100", text: "text-purple-700", accent: "text-purple-600" },
    { bg: "bg-green-100", text: "text-green-700", accent: "text-green-600" },
    { bg: "bg-yellow-100", text: "text-yellow-700", accent: "text-yellow-600" },
    { bg: "bg-gray-100", text: "text-gray-700", accent: "text-gray-600" },
  ];

  const icons = [User, Star, Heart, Trophy];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-teal-700 mb-2">قصص النجاح</h2>
        <p className="text-gray-600">اكتشف قصص ملهمة من أشخاص حققوا أحلامهم</p>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">لا توجد قصص حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => {
            const colorScheme = cardColors[index % cardColors.length];
            const IconComponent = icons[index % icons.length];

            return (
              <div
                key={story._id}
                className={`${colorScheme.bg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 backdrop-blur-sm`}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div
                      className={`w-14 h-14 ${colorScheme.bg} border-2 border-white mr-4 mt-2 rounded-full flex items-center justify-center shadow-md`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${colorScheme.accent}`}
                      />
                    </div>
                    <div className="flex-1 mt-2">
                      <h3 className={`text-xl font-bold ${colorScheme.text}`}>
                        {story.name}
                      </h3>
                      <p
                        className={`text-sm ${colorScheme.accent} font-medium`}
                      >
                        العمر: {story.age} سنة
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-6">
                  <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-gray-800 leading-relaxed text-sm line-clamp-4">
                      {story.story}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-end">
                    <button
                      className={`${colorScheme.text} hover:${colorScheme.accent} transition-colors duration-200 text-sm font-medium`}
                    >
                      قراءة المزيد ←
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
