import { useState, useEffect } from "react";
import axios from "axios";
import {
  Home,
  Users,
  CalendarDays,
  Newspaper,
  PieChart,
  Heart,
  Activity,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  UserPlus,
  Calendar,
  AlertCircle,
  Trash2,
  Edit,
  X,
} from "lucide-react";
import {
  getServices,
  createService,
  deleteService,
  getAllUsers,
} from "./serviceAPI";

// ألوان الواجهة
const colors = {
  skyBlue: "#87CEEB",
  softPink: "#FF8BBD0",
  lavender: "#E6E6FA",
  mintGreen: "#A8E6CF",
  lightYellow: "#FFF9C4",
  lightGray: "#F2F2F2",
  background: "#FFFCF0",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  // إحصائيات العينة
  const [statistics, setStatistics] = useState({
    totalPatients: 1287,
    newRegistrations: 45,
    upcomingAppointments: 23,
    donationsThisMonth: 13500,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
   try {
     const data = await getAllUsers();
     const formattedUsers = data.map((user) => ({
       _id: user._id,
       name: user.fullName,
       age: "-", // العمر غير متوفر من الباكند، يمكنك تعديله إذا أضفته لاحقًا
       status: user.isApproved ? "نشط" : "غير نشط",
       joinDate: user.createdAt || new Date().toISOString(), // لو مش موجود createdAt
     }));
     setUsers(formattedUsers);
   } catch (err) {
     console.error("فشل في جلب المستخدمين:", err);
     setError("فشل في تحميل المستخدمين.");
   }
 };


  const [events, setEvents] = useState([
    {
      id: 1,
      title: "ورشة توعية بمرض السكري",
      date: "2025-05-15",
      location: "المقر الرئيسي",
    },
    {
      id: 2,
      title: "مجموعة دعم الأسرة",
      date: "2025-05-20",
      location: "عبر زووم",
    },
    {
      id: 3,
      title: "ندوة التغذية",
      date: "2025-05-25",
      location: "قاعة المجتمع",
    },
  ]);

  // حالات النماذج
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "التعليم",
    image: "/api/placeholder/400/250",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    status: "نشط",
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
  });

  const [donationAmount, setDonationAmount] = useState("");

  // جلب الخدمات من API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      const servicesData = Array.isArray(response.data) ? response.data : [];
      setServices(servicesData);
      setError(null);
    } catch (err) {
      console.error("خطأ في جلب الخدمات:", err);
      setError("فشل في تحميل الخدمات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const serviceData = {
        name: newService.name,
        description: newService.description,
        image: newService.image,
      };

      const response = await createService(serviceData);
      setServices((prevServices) => [...prevServices, response.data]);
      setNewService({
        name: "",
        description: "",
        category: "التعليم",
        image: "/api/placeholder/400/250",
      });
      setShowAddServiceForm(false);
      setError(null);
    } catch (err) {
      console.error("خطأ في إنشاء الخدمة:", err);
      setError(err.message || "فشل في إنشاء الخدمة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      try {
        setLoading(true);
        await deleteService(id);
        setServices(services.filter((service) => service._id !== id));
        setError(null);
      } catch (err) {
        console.error("خطأ في حذف الخدمة:", err);
        setError(err.message || "فشل في حذف الخدمة. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    const joinDate = new Date().toISOString().split("T")[0];
    setUsers([...users, { id, ...newUser, joinDate }]);
    setNewUser({ name: "", age: "", status: "نشط" });
    setShowAddUserForm(false);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const id = events.length + 1;
    setEvents([...events, { id, ...newEvent }]);
    setNewEvent({ title: "", date: "", location: "" });
    setShowAddEventForm(false);
  };

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    if (!isNaN(amount)) {
      setStatistics({
        ...statistics,
        donationsThisMonth: statistics.donationsThisMonth + amount,
      });
      setDonationAmount("");
      alert(`شكراً لتبرعك بمبلغ ${amount} ريال!`);
    }
  };

  return (
    <div
      className="flex h-screen bg-yellow-50"
      style={{ backgroundColor: colors.background }}
    >
      {/* الشريط الجانبي */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 text-xl font-bold text-center text-teal-600">
          جمعية سكري الأطفال
        </div>
        <div className="p-2">
          <div className="flex flex-col space-y-1">
            <SidebarItem
              icon={<Home />}
              text="الرئيسية"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={<Users />}
              text="المستخدمون"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <SidebarItem
              icon={<Activity />}
              text="الخدمات"
              active={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            />
            <SidebarItem
              icon={<CalendarDays />}
              text="الفعاليات"
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            />
            <SidebarItem
              icon={<Newspaper />}
              text="الأخبار"
              active={activeTab === "news"}
              onClick={() => setActiveTab("news")}
            />
            <SidebarItem
              icon={<PieChart />}
              text="الإحصائيات"
              active={activeTab === "statistics"}
              onClick={() => setActiveTab("statistics")}
            />
            <SidebarItem
              icon={<Heart />}
              text="التبرعات"
              active={activeTab === "donations"}
              onClick={() => setActiveTab("donations")}
            />
            <div className="pt-8 mt-6 border-t border-gray-200">
              <SidebarItem icon={<Settings />} text="الإعدادات" />
              <SidebarItem icon={<LogOut />} text="تسجيل الخروج" />
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1">
        {/* الهيدر */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "الرئيسية"}
            {activeTab === "users" && "المستخدمون"}
            {activeTab === "services" && "الخدمات"}
            {activeTab === "events" && "الفعاليات"}
            {activeTab === "news" && "الأخبار"}
            {activeTab === "statistics" && "الإحصائيات"}
            {activeTab === "donations" && "التبرعات"}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="w-4 h-4 absolute top-2.5 right-3 text-gray-400" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                م
              </div>
              <span className="text-sm font-medium">مدير النظام</span>
            </div>
          </div>
        </header>

        {/* المحتوى الرئيسي للوحة التحكم */}
        <main className="p-6">
          {/* عرض رسالة الخطأ */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
              <span className="block sm:inline">{error}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setError(null)}
              >
                <X className="h-4 w-4" />
              </span>
            </div>
          )}

          {/* مؤشر التحميل */}
          {loading && (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Users className="w-6 h-6 text-purple-500" />}
                  title="إجمالي المرضى"
                  value={statistics.totalPatients}
                  color={colors.lavender}
                />
                <StatCard
                  icon={<UserPlus className="w-6 h-6 text-blue-500" />}
                  title="تسجيلات جديدة"
                  value={statistics.newRegistrations}
                  color={colors.skyBlue}
                />
                <StatCard
                  icon={<Calendar className="w-6 h-6 text-green-500" />}
                  title="المواعيد القادمة"
                  value={statistics.upcomingAppointments}
                  color={colors.mintGreen}
                />
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-pink-500" />}
                  title="التبرعات هذا الشهر"
                  value={`${statistics.donationsThisMonth.toLocaleString()} ريال`}
                  color={colors.softPink}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* النشاطات الحديثة */}
                <div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
                  <h2 className="text-lg font-semibold mb-4">
                    النشاطات الحديثة
                  </h2>
                  <div className="space-y-4">
                    <ActivityItem
                      icon={<UserPlus className="w-5 h-5 text-blue-500" />}
                      title="تسجيل مريض جديد"
                      description="إيميلي تومسون، 8 سنوات"
                      time="منذ ساعتين"
                    />
                    <ActivityItem
                      icon={<Calendar className="w-5 h-5 text-green-500" />}
                      title="تم تحديد موعد"
                      description="فحص مع د. مارتينيز"
                      time="بالأمس"
                    />
                    <ActivityItem
                      icon={<DollarSign className="w-5 h-5 text-pink-500" />}
                      title="تم استلام تبرع"
                      description="500 ريال من جمعية الأعمال المحلية"
                      time="منذ يومين"
                    />
                    <ActivityItem
                      icon={<AlertCircle className="w-5 h-5 text-yellow-500" />}
                      title="تنبيه بالإمدادات"
                      description="شرائط فحص الجلوكوز قاربت على النفاد"
                      time="منذ 3 أيام"
                    />
                  </div>
                </div>

                {/* الفعاليات القادمة */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    الفعاليات القادمة
                  </h2>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-12 h-12 flex flex-col items-center justify-center bg-blue-100 rounded-lg">
                          <span className="text-xs font-medium text-blue-800">
                            {new Date(event.date).toLocaleString("ar-SA", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-lg font-bold text-blue-800">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={() => setActiveTab("events")}
                    >
                      عرض جميع الفعاليات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">الخدمات</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddServiceForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة خدمة</span>
                </button>
              </div>

              {showAddServiceForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">إضافة خدمة جديدة</h3>
                  <form onSubmit={handleAddService}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          اسم الخدمة
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newService.name}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          التصنيف
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newService.category}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="التعليم">التعليم</option>
                          <option value="المستلزمات">المستلزمات</option>
                          <option value="الدعم">الدعم</option>
                          <option value="الطبي">الطبي</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          رابط الصورة
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newService.image}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              image: e.target.value,
                            })
                          }
                          placeholder="رابط الصورة أو المسار"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          للاختبار، يمكنك استخدام "/api/placeholder/400/250"
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الوصف
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="3"
                          required
                          value={newService.description}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAddServiceForm(false)}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        إضافة الخدمة
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* قائمة الخدمات */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(services) &&
                  services.map((service) => (
                    <div
                      key={service._id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                          {service.description}
                        </p>
                        <div className="flex justify-end mt-4 space-x-2">
                          <button
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                            title="حذف"
                            onClick={() => handleDeleteService(service._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {services.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    لا توجد خدمات
                  </h3>
                  <p className="mt-2 text-gray-500">ابدأ بإضافة خدمة جديدة.</p>
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition mx-auto"
                    onClick={() => setShowAddServiceForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة خدمة</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">المستخدمون المسجلون</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddUserForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مستخدم</span>
                </button>
              </div>

              {showAddUserForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">
                    إضافة مستخدم جديد
                  </h3>
                  <form onSubmit={handleAddUser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الاسم الكامل
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          العمر
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          max="18"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.age}
                          onChange={(e) =>
                            setNewUser({ ...newUser, age: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الحالة
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.status}
                          onChange={(e) =>
                            setNewUser({ ...newUser, status: e.target.value })
                          }
                        >
                          <option value="نشط">نشط</option>
                          <option value="غير نشط">غير نشط</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAddUserForm(false)}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        إضافة مستخدم
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاسم
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العمر
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاريخ الانضمام
                      </th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                              {user.name ? user.name.charAt(0) : "؟"}
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {user.age} سنة
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {new Date(user.joinDate).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "نشط"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-left text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900 ml-3">
                            حذف
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            تعديل
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">الفعاليات القادمة</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddEventForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة فعالية</span>
                </button>
              </div>

              {showAddEventForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">
                    إضافة فعالية جديدة
                  </h3>
                  <form onSubmit={handleAddEvent}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان الفعالية
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          التاريخ
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الموقع
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.location}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowAddEventForm(false)}
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        إضافة فعالية
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-16 h-16 flex flex-col items-center justify-center bg-blue-100 rounded-lg">
                      <span className="text-xs font-medium text-blue-800">
                        {new Date(event.date).toLocaleString("ar-SA", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-xl font-bold text-blue-800">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <p className="text-gray-500">{event.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "donations" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">تقديم تبرع</h2>
                <form onSubmit={handleDonation} className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      مبلغ التبرع (ريال)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">ريال</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    تبرع الآن
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">آخر التبرعات</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المتبرع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المبلغ
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          التاريخ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            جمعية الأعمال المحلية
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            500.00 ريال
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            ١٤ شوال ١٤٤٦
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            متبرع مجهول
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            250.00 ريال
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            ١٣ شوال ١٤٤٦
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            مؤسسة عائلة جونسون
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            1,000.00 ريال
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            ٨ شوال ١٤٤٦
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// عنصر الشريط الجانبي
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full ${
        active ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}

// بطاقة الإحصائيات
function StatCard({ icon, title, value, color }) {
  return (
    <div
      className="rounded-lg p-6 shadow-sm transition-all"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-50">{icon}</div>
      </div>
    </div>
  );
}

// عنصر النشاط
function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 rounded-full bg-gray-100">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
