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
  Clock,
  HelpCircle,
  BarChart2,
  LineChart,
  ThumbsUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend,
  LineChart as RLineChart,
  Line,
} from "recharts";
import {
  getServices,
  createService,
  deleteService,
  getAllUsers,
  getAllEvents,
} from "./serviceAPI";

import Events from "./Events";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  // إحصائيات النظام - تم تحديثها لاستخدام البيانات الديناميكية
  const [membershipCount, setMembershipCount] = useState(0);
  const [patientRequestCount, setPatientRequestCount] = useState(0);
  const [volunteerRequestCount, setVolunteerRequestCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [activePatients, setActivePatients] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [completedEvents, setCompletedEvents] = useState(0);

  // بيانات الرسم البياني (يمكن استبدالها ببيانات ديناميكية لاحقًا)
  const [monthlyRegistrations, setMonthlyRegistrations] = useState([
    { name: "يناير", patients: 12, volunteers: 5 },
    { name: "فبراير", patients: 19, volunteers: 7 },
    { name: "مارس", patients: 15, volunteers: 9 },
    { name: "أبريل", patients: 25, volunteers: 12 },
    { name: "مايو", patients: 22, volunteers: 8 },
  ]);

  const [ageDistribution, setAgeDistribution] = useState([
    { name: "0-5", value: 45 },
    { name: "6-10", value: 78 },
    { name: "11-15", value: 56 },
    { name: "16-18", value: 23 },
  ]);

  const [genderDistribution, setGenderDistribution] = useState([
    { name: "ذكور", value: 110 },
    { name: "إناث", value: 108 },
  ]);

  const [patientsByRegion, setPatientsByRegion] = useState([
    { name: "الرياض", value: 57 },
    { name: "جدة", value: 42 },
    { name: "الدمام", value: 31 },
    { name: "المدينة", value: 19 },
    { name: "أبها", value: 15 },
    { name: "أخرى", value: 54 },
  ]);

  const [volunteerHoursByMonth, setVolunteerHoursByMonth] = useState([
    { name: "يناير", hours: 120 },
    { name: "فبراير", hours: 145 },
    { name: "مارس", hours: 132 },
    { name: "أبريل", hours: 190 },
    { name: "مايو", hours: 170 },
  ]);

  const [donationsByMonth, setDonationsByMonth] = useState([
    { name: "يناير", donations: 5200 },
    { name: "فبراير", donations: 6100 },
    { name: "مارس", donations: 4800 },
    { name: "أبريل", donations: 9200 },
    { name: "مايو", donations: 8500 },
  ]);

  const [volunteersByCategory, setVolunteersByCategory] = useState([
    { name: "طبي", value: 28 },
    { name: "تعليمي", value: 15 },
    { name: "إداري", value: 12 },
    { name: "لوجستي", value: 8 },
  ]);

  const statisticData = [
    {
      name: "مرضى نشطين",
      value: activePatients,
      color: "#A8E6CF",
      icon: <Users className="w-6 h-6 text-teal-500" />,
    },
    {
      name: "متطوعين",
      value: totalVolunteers,
      color: "#FF8BB0",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
    },
    {
      name: "فعاليات قادمة",
      value: upcomingEvents,
      color: "#FFF9C4",
      icon: <Calendar className="w-6 h-6 text-yellow-500" />,
    },
    {
      name: "فعاليات منتهية",
      value: completedEvents,
      color: "#E6E6FA",
      icon: <Activity className="w-6 h-6 text-purple-500" />,
    },
  ];

  // ألوان الواجهة
  const colors = {
    skyBlue: "#87CEEB",
    softPink: "#FF8BB0",
    lavender: "#E6E6FA",
    mintGreen: "#A8E6CF",
    lightYellow: "#FFF9C4",
    lightGray: "#F2F2F2",
    background: "#FFFCF0",
  };

  const pieColors = ["#A8E6CF", "#FFD3B6", "#FF8BB0", "#E6E6FA"];

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      icon: <UserPlus className="w-5 h-5 text-blue-500" />,
      title: "تسجيل مريض جديد",
      description: "أحمد محمد، 8 سنوات",
      time: "منذ ساعتين",
    },
    {
      id: 2,
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      title: "تم تحديد موعد",
      description: "فحص مع د. سلطان",
      time: "بالأمس",
    },
    {
      id: 3,
      icon: <DollarSign className="w-5 h-5 text-pink-500" />,
      title: "تم استلام تبرع",
      description: "2500 ريال من شركة السعادة",
      time: "منذ يومين",
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "متطوع جديد",
      description: "نورة العتيبي انضمت للفريق",
      time: "منذ 3 أيام",
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
  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);

      // تحديث الإحصائيات
      setUpcomingEvents(
        data.filter((e) => new Date(e.date) >= new Date()).length
      );
      setCompletedEvents(
        data.filter((e) => new Date(e.date) < new Date()).length
      );
    } catch (err) {
      console.error("فشل في جلب الفعاليات:", err);
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchServices();
    fetchUsers();
    fetchMembershipCount();
    fetchPatientRequestCount();
    fetchVolunteerRequestCount();
    fetchUserCount();
    fetchEvents(); // ✅ أضف هذا

    // يمكنك إضافة المزيد من استدعاءات API هنا للحصول على البيانات الأخرى
  }, []);

  // جلب عدد طلبات العضوية
  const fetchMembershipCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/membership/count"
      );
      setMembershipCount(res.data.count);
    } catch (error) {
      console.error("فشل في جلب عدد طلبات العضوية:", error);
    }
  };

  // جلب عدد طلبات المرضى
  const fetchPatientRequestCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/patient/count"
      );
      setPatientRequestCount(res.data.count);
    } catch (error) {
      console.error("فشل في جلب عدد طلبات المرضى:", error);
    }
  };

  // جلب عدد طلبات المتطوعين
  const fetchVolunteerRequestCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/volunteer/count"
      );
      setVolunteerRequestCount(res.data.count);
    } catch (error) {
      console.error("فشل في جلب عدد طلبات التطوع:", error);
    }
  };

  // جلب عدد المستخدمين
  const fetchUserCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/count");
      setUserCount(res.data.count);
    } catch (error) {
      console.error("فشل في جلب عدد المستخدمين:", error);
    }
  };

  // جلب الخدمات
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

  // جلب المستخدمين
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      const formattedUsers = data.map((user) => ({
        _id: user._id,
        name: user.fullName,
        age: "-",
        status: user.isApproved ? "نشط" : "غير نشط",
        joinDate: user.createdAt || new Date().toISOString(),
      }));
      setUsers(formattedUsers);
    } catch (err) {
      console.error("فشل في جلب المستخدمين:", err);
      setError("فشل في تحميل المستخدمين.");
    }
  };

  // إضافة خدمة جديدة
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

  // حذف خدمة
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

  // إضافة مستخدم جديد
  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    const joinDate = new Date().toISOString().split("T")[0];
    setUsers([...users, { id, ...newUser, joinDate }]);
    setNewUser({ name: "", age: "", status: "نشط" });
    setShowAddUserForm(false);
  };

  // إضافة فعالية جديدة
  const handleAddEvent = (e) => {
    e.preventDefault();
    const id = events.length + 1;
    setEvents([...events, { id, ...newEvent }]);
    setNewEvent({ title: "", date: "", location: "" });
    setShowAddEventForm(false);
  };

  // معالجة التبرع
  const handleDonation = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    if (!isNaN(amount)) {
      setDonationAmount("");
      alert(`شكراً لتبرعك بمبلغ ${amount} ريال!`);
    }
  };

  // مكونات واجهة المستخدم (تبقى كما هي بدون تغيير)
  const SidebarItem = ({ icon, text, active, onClick }) => (
    <button
      className={`flex items-center space-x-2 space-x-reverse p-2 rounded-lg w-full text-right ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium">{text}</span>
        <span className="ml-2">{icon}</span>
      </div>
    </button>
  );

  const StatCard = ({ icon, title, value, color }) => (
    <div
      className="p-6 rounded-lg shadow-sm"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        <div className="p-3 bg-white bg-opacity-60 rounded-full">{icon}</div>
      </div>
    </div>
  );

  const ActivityItem = ({ icon, title, description, time }) => (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap">{time}</div>
    </div>
  );

  // بقية الكود (العناصر الأخرى والواجهة) تبقى كما هي بدون تغيير
  // ...

  return (
    <div
      dir="rtl"
      className="flex h-screen bg-yellow-50"
      style={{ backgroundColor: colors.background }}
    >
      {/* الشريط الجانبي */}
      <div className="w-64 bg-white border-l border-gray-200 shadow-sm">
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
      <div className="flex-1 overflow-auto">
        {/* الهيدر */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "الرئيسية"}
            {activeTab === "users" && "المستخدمون"}
            {activeTab === "services" && "الخدمات"}
            {activeTab === "events" && "الفعاليات"}
            {activeTab === "news" && "الأخبار"}
            {activeTab === "statistics" && "الإحصائيات"}
            {activeTab === "donations" && "التبرعات"}
          </h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="بحث..."
                className="bg-gray-100 pr-9 pl-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="w-4 h-4 absolute top-2.5 right-3 text-gray-400" />
            </div>
            <div className="relative ml-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium ml-2">مدير النظام</span>
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                م
              </div>
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
                className="absolute top-0 bottom-0 left-0 px-4 py-3 cursor-pointer"
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

          {/* الصفحة الرئيسية */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* نظرة عامة - نص ترحيبي */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-teal-700 mb-2">
                  مرحباً بك في لوحة تحكم جمعية سكري الأطفال
                </h2>
                <p className="text-gray-600">
                  هذه النظرة العامة توفر لك معلومات حول نشاطات الجمعية
                  والإحصائيات الهامة.
                </p>
              </div>

              {/* القسم الأول: البطاقات الإحصائية الرئيسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<UserPlus className="w-6 h-6 text-teal-500" />}
                  title="طلبات الانتساب"
                  value={membershipCount}
                  color={colors.mintGreen}
                />

                <StatCard
                  icon={<Heart className="w-6 h-6 text-red-500" />}
                  title="طلبات المرضى"
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
                  title="المستخدمون النشطون"
                  value={userCount}
                  color={colors.lavender}
                />
              </div>

              {/* القسم الثاني: الإحصائيات والرسوم البيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* اتجاهات التسجيل */}
                <div className="bg-white rounded-lg shadow-sm p-4 col-span-2">
                  <h2 className="text-lg font-semibold mb-2">
                    اتجاهات التسجيل
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    إحصائيات التسجيل للمرضى والمتطوعين خلال الأشهر الخمسة
                    الماضية
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
                          name="المرضى"
                          fill={colors.softPink}
                        />
                        <Bar
                          dataKey="volunteers"
                          name="المتطوعين"
                          fill={colors.mintGreen}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* توزيع حسب العمر */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    توزيع المرضى حسب العمر
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    الفئات العمرية للمرضى المسجلين في النظام
                  </p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={ageDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {ageDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={pieColors[index % pieColors.length]}
                            />
                          ))}
                        </Pie>
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                        />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* القسم الثالث: معلومات المرضى والمتطوعين */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* معلومات المرضى */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">معلومات المرضى</h2>
                    <button
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100"
                      onClick={() => setActiveTab("users")}
                    >
                      عرض الكل
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            الاسم
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            العمر
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            الحالة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            تاريخ الانضمام
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.slice(0, 3).map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.age}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.joinDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* معلومات المتطوعين */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    معلومات المتطوعين
                  </h2>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {totalVolunteers}
                      </div>
                      <div className="text-sm text-gray-500">
                        إجمالي المتطوعين
                      </div>
                    </div>
                    <div className="h-16 border-l border-gray-200"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">5</div>
                      <div className="text-sm text-gray-500">
                        متطوعين جدد هذا الشهر
                      </div>
                    </div>
                    <div className="h-16 border-l border-gray-200"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        757
                      </div>
                      <div className="text-sm text-gray-500">
                        مجموع ساعات التطوع
                      </div>
                    </div>
                  </div>
                  <h3 className="text-md font-medium mb-3">
                    توزيع المتطوعين حسب المجال
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={volunteersByCategory}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {volunteersByCategory.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={pieColors[index % pieColors.length]}
                            />
                          ))}
                        </Pie>
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* القسم الرابع: النشاطات الأخيرة والفعاليات */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* النشاطات الأخيرة */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    النشاطات الأخيرة
                  </h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <ActivityItem
                        key={activity.id}
                        icon={activity.icon}
                        title={activity.title}
                        description={activity.description}
                        time={activity.time}
                      />
                    ))}
                  </div>
                </div>

                {/* الفعاليات القادمة */}

                {/* الفعاليات القادمة */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">الفعاليات القادمة</h2>
                    <button
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100"
                      onClick={() => setActiveTab("events")}
                    >
                      عرض الكل
                    </button>
                  </div>
                  <div className="space-y-3">
                    {events
                      .filter((event) => new Date(event.date) >= new Date()) // ✅ فقط الفعاليات القادمة
                      .slice(0, 3) // ✅ نعرض فقط 3 فعاليات
                      .map((event) => (
                        <div
                          key={event._id || event.id}
                          className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div className="p-2 bg-yellow-100 rounded-lg ml-3">
                            <Calendar className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4 ml-1" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  "ar-EG"
                                )}
                              </span>
                              <span className="mx-2">|</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {events.filter(
                      (event) => new Date(event.date) >= new Date()
                    ).length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        لا توجد فعاليات قادمة حالياً
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* القسم الخامس: مؤشرات أداء إضافية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ساعات التطوع */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-3">
                    ساعات التطوع الشهرية
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    إجمالي ساعات التطوع المسجلة شهرياً
                  </p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RLineChart
                        data={volunteerHoursByMonth}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="hours"
                          name="ساعات التطوع"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                      </RLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* التبرعات */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-3">
                    التبرعات الشهرية
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    إجمالي التبرعات المستلمة شهرياً (بالريال)
                  </p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RLineChart
                        data={donationsByMonth}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="donations"
                          name="التبرعات"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </RLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* صفحة المستخدمين */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">المستخدمون</h2>
                  <button
                    className="flex items-center space-x-1 space-x-reverse bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600"
                    onClick={() => setShowAddUserForm(true)}
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    <span>إضافة مستخدم</span>
                  </button>
                </div>

                {/* نموذج إضافة مستخدم */}
                {showAddUserForm && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">إضافة مستخدم جديد</h3>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => setShowAddUserForm(false)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddUser}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            الاسم
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowAddUserForm(false)}
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                        >
                          إضافة
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          الاسم
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          العمر
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          الحالة
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          تاريخ الانضمام
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          إجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 ml-3">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* صفحة الخدمات */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">الخدمات</h2>
                  <button
                    className="flex items-center space-x-1 space-x-reverse bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600"
                    onClick={() => setShowAddServiceForm(true)}
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    <span>إضافة خدمة</span>
                  </button>
                </div>

                {/* نموذج إضافة خدمة */}
                {showAddServiceForm && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">إضافة خدمة جديدة</h3>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => setShowAddServiceForm(false)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddService}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            اسم الخدمة
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                            الفئة
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={newService.category}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="الطبي">الطبي</option>
                            <option value="التعليم">التعليم</option>
                            <option value="المستلزمات">المستلزمات</option>
                            <option value="الدعم النفسي">الدعم النفسي</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            رابط الصورة
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={newService.image}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                image: e.target.value,
                              })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            الوصف
                          </label>
                          <textarea
                            required
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowAddServiceForm(false)}
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                        >
                          إضافة
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div
                      key={service._id}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {service.name}
                            </h3>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mt-1">
                              {service.category}
                            </span>
                          </div>
                          <div className="flex">
                            <button className="text-blue-600 hover:text-blue-800 ml-2">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteService(service._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "events" && <Events />}
          {/* صفحة الإحصائيات */}
          {activeTab === "statistics" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  الإحصائيات والبيانات
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {statisticData.map((item, index) => (
                    <StatCard
                      key={index}
                      icon={item.icon}
                      title={item.name}
                      value={item.value}
                      color={item.color}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* توزيع المرضى حسب المناطق */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">
                      توزيع المرضى حسب المناطق
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={patientsByRegion}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {patientsByRegion.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={pieColors[index % pieColors.length]}
                              />
                            ))}
                          </Pie>
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                          />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* توزيع المرضى حسب الجنس */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">
                      توزيع المرضى حسب الجنس
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={genderDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            <Cell fill="#FF8BB0" />
                            <Cell fill="#A8E6CF" />
                          </Pie>
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                          />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* صفحة التبرعات */}
          {activeTab === "donations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">التبرعات</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">
                      سجل التبرعات الشهرية
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={donationsByMonth}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} ريال`, "التبرعات"]}
                          />
                          <Bar
                            dataKey="donations"
                            name="التبرعات (بالريال)"
                            fill="#82ca9d"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">تبرع الآن</h3>
                    <form onSubmit={handleDonation}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          المبلغ (بالريال)
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                      >
                        تبرع الآن
                      </button>
                      <div className="mt-4 text-center text-sm text-gray-500">
                        جميع التبرعات تذهب مباشرة لدعم أطفال مرضى السكري
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* صفحة الأخبار */}
          {activeTab === "news" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">أخبار الجمعية</h2>

                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      صحة الطفل أولاً: مبادرة جديدة للكشف المبكر عن مرض السكري
                    </h3>
                    <div className="flex space-x-reverse space-x-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>15 أبريل 2025</span>
                    </div>
                    <img
                      src="/api/placeholder/800/400"
                      alt="صورة المبادرة"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <p className="text-gray-600">
                      أطلقت الجمعية مبادرة "صحة الطفل أولاً" للكشف المبكر عن مرض
                      السكري لدى الأطفال في المدارس الابتدائية، وتهدف المبادرة
                      إلى فحص أكثر من 5000 طفل خلال العام الحالي...
                    </p>
                    <button className="text-blue-600 mt-2 text-sm hover:underline">
                      قراءة المزيد
                    </button>
                  </div>

                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      افتتاح العيادة المتنقلة الثانية للخدمات الصحية في المناطق
                      النائية
                    </h3>
                    <div className="flex space-x-reverse space-x-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>3 مارس 2025</span>
                    </div>
                    <img
                      src="/api/placeholder/800/400"
                      alt="صورة العيادة المتنقلة"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <p className="text-gray-600">
                      دشنت الجمعية العيادة المتنقلة الثانية التي ستقدم خدماتها
                      الصحية للأطفال المصابين بالسكري في المناطق النائية، حيث
                      ستغطي العيادة 12 قرية جديدة في منطقة جازان...
                    </p>
                    <button className="text-blue-600 mt-2 text-sm hover:underline">
                      قراءة المزيد
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      حملة توعوية في المدارس للوقاية من مرض السكري عند الأطفال
                    </h3>
                    <div className="flex space-x-reverse space-x-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>18 فبراير 2025</span>
                    </div>
                    <img
                      src="/api/placeholder/800/400"
                      alt="صورة الحملة التوعوية"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <p className="text-gray-600">
                      نظمت الجمعية بالتعاون مع وزارة التعليم حملة توعوية شاملة
                      في 30 مدرسة في مختلف أنحاء المملكة للتوعية بمرض السكري
                      وطرق الوقاية منه، واستفاد من البرنامج أكثر من 15,000 طالب
                      وطالبة...
                    </p>
                    <button className="text-blue-600 mt-2 text-sm hover:underline">
                      قراءة المزيد
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* صفحة التقارير */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">التقارير</h2>
                  <div className="flex items-center">
                    <input
                      type="month"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-2"
                      value={reportDateFilter}
                      onChange={(e) => setReportDateFilter(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 mr-2"
                      onClick={generateReport}
                    >
                      توليد تقرير
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">
                      التقرير الشهري - أبريل 2025
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">إجمالي المرضى</p>
                        <p className="text-2xl font-bold text-green-700">
                          1,845
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">التبرعات (ريال)</p>
                        <p className="text-2xl font-bold text-blue-700">
                          267,500
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          عدد الخدمات المقدمة
                        </p>
                        <p className="text-2xl font-bold text-purple-700">
                          578
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-blue-600 flex items-center hover:underline">
                        <Download className="w-4 h-4 ml-1" />
                        <span>تحميل التقرير كامل (PDF)</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">
                      التقرير الشهري - مارس 2025
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">إجمالي المرضى</p>
                        <p className="text-2xl font-bold text-green-700">
                          1,789
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">التبرعات (ريال)</p>
                        <p className="text-2xl font-bold text-blue-700">
                          235,800
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          عدد الخدمات المقدمة
                        </p>
                        <p className="text-2xl font-bold text-purple-700">
                          542
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-blue-600 flex items-center hover:underline">
                        <Download className="w-4 h-4 ml-1" />
                        <span>تحميل التقرير كامل (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* صفحة الإعدادات */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">إعدادات النظام</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <h3 className="text-lg font-medium mb-4">
                      الإعدادات العامة
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          اسم الجمعية
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value="الجمعية السعودية لرعاية مرضى السكري"
                          onChange={() => {}}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          البريد الإلكتروني للتواصل
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value="info@diabetes-care.sa"
                          onChange={() => {}}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value="966555555555+"
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-medium mb-4">
                      إعدادات الإشعارات
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700">
                          إشعارات البريد الإلكتروني
                        </span>
                        <Switch
                          checked={emailNotifications}
                          onChange={setEmailNotifications}
                          className={`${
                            emailNotifications ? "bg-teal-500" : "bg-gray-300"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${
                              emailNotifications
                                ? "translate-x-6"
                                : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700">
                          إشعارات الرسائل النصية
                        </span>
                        <Switch
                          checked={smsNotifications}
                          onChange={setSmsNotifications}
                          className={`${
                            smsNotifications ? "bg-teal-500" : "bg-gray-300"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${
                              smsNotifications
                                ? "translate-x-6"
                                : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700">
                          تنبيهات الفعاليات القادمة
                        </span>
                        <Switch
                          checked={eventReminders}
                          onChange={setEventReminders}
                          className={`${
                            eventReminders ? "bg-teal-500" : "bg-gray-300"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${
                              eventReminders ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-medium mb-4">
                      إعدادات الأمان والخصوصية
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          تغيير كلمة المرور
                        </label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                          placeholder="كلمة المرور الحالية"
                        />
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                          placeholder="كلمة المرور الجديدة"
                        />
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="تأكيد كلمة المرور الجديدة"
                        />
                      </div>
                      <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                        حفظ التغييرات
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
