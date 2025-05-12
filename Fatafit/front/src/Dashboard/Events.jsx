import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // استيراد مكتبة SweetAlert2

const Events = () => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    description: "",
    date: "",
    category: "توعوية",
    beneficiaries: "",
    image: "",
  });

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Fetch activities from backend
  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/activities");
      setActivities(response.data);
    } catch (err) {
      console.error("فشل في جلب الفعاليات:", err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "فشل في جلب الفعاليات",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Process beneficiaries
      const payload = {
        ...newActivity,
        beneficiaries: newActivity.beneficiaries
          ? newActivity.beneficiaries.split(",").map((b) => b.trim())
          : [],
      };

      // Send POST request to create new activity
      await axios.post("http://localhost:5000/api/activities", payload);

      // Refresh activities list
      fetchActivities();

      // Reset form
      setShowForm(false);
      setNewActivity({
        name: "",
        description: "",
        date: "",
        category: "توعوية",
        beneficiaries: "",
        image: "",
      });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "تمت إضافة الفعالية بنجاح",
        text: "تم إضافة الفعالية بنجاح إلى النظام",
      });
    } catch (err) {
      console.error("خطأ في إنشاء الفعالية:", err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "حدث خطأ في إنشاء الفعالية",
      });
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-8">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#2C3E50]">الفعاليات</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-4 py-2 rounded-md transition duration-300"
            >
              {showForm ? "إلغاء" : "إضافة فعالية"}
            </button>
          </div>

          {/* Activity Creation Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-[#ECF0F1] p-6 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-[#2C3E50] mb-2">الاسم</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-[#2C3E50] mb-2">التاريخ</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.date}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-[#2C3E50] mb-2">الوصف</label>
                <textarea
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-[#2C3E50] mb-2">التصنيف</label>
                <select
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.category}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, category: e.target.value })
                  }
                  required
                >
                  <option value="توعوية">توعوية</option>
                  <option value="رياضية">رياضية</option>
                  <option value="تربوية">تربوية</option>
                </select>
              </div>
              <div>
                <label className="block text-[#2C3E50] mb-2">
                  المستفيدين (افصلهم بفاصلة)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.beneficiaries}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      beneficiaries: e.target.value,
                    })
                  }
                  placeholder="مثال: أطفال، شباب، مسنين"
                />
              </div>
              <div>
                <label className="block text-[#2C3E50] mb-2">رابط الصورة</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  value={newActivity.image}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, image: e.target.value })
                  }
                  placeholder="أدخل رابط الصورة"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-md transition duration-300"
                >
                  حفظ الفعالية
                </button>
              </div>
            </form>
          )}

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="bg-white border border-[#ECF0F1] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                {/* Activity Image */}
                <img
                  src={activity.image || "https://via.placeholder.com/350x200"}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/350x200";
                  }}
                />

                {/* Activity Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-[#7F8C8D] mb-2">{activity.description}</p>

                  <div className="flex flex-col space-y-1 text-sm text-[#34495E]">
                    <p>
                      <span className="font-bold">التاريخ:</span>{" "}
                      {new Date(activity.date).toLocaleDateString("ar-EG")}
                    </p>
                    <p>
                      <span className="font-bold">التصنيف:</span>{" "}
                      {activity.category}
                    </p>
                    {activity.beneficiaries &&
                      activity.beneficiaries.length > 0 && (
                        <p>
                          <span className="font-bold">المستفيدون:</span>{" "}
                          {activity.beneficiaries.join(", ")}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
