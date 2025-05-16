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
  const [patientRequestsByType, setPatientRequestsByType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [requestsByType, setRequestsByType] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState([]);

  // بيانات الرسم البياني (يمكن استبدالها ببيانات ديناميكية لاحقًا)
  const [monthlyRegistrations, setMonthlyRegistrations] = useState([]);

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
  const dashboardStatsData = [
    {
      name: "طلبات الانتساب",
      value: membershipCount,
    },
    {
      name: "طلبات المرضى",
      value: patientRequestCount,
    },
    {
      name: "طلبات التطوع",
      value: volunteerRequestCount,
    },
    {
      name: "المستخدمون النشطون",
      value: userCount,
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
      const res = await axios.get("http://localhost:5000/api/activities");
      setEvents(res.data);

      // إحصائيات
      setUpcomingEvents(
        res.data.filter((e) => new Date(e.date) >= new Date()).length
      );
      setCompletedEvents(
        res.data.filter((e) => new Date(e.date) < new Date()).length
      );
    } catch (err) {
      console.error("فشل في جلب الفعاليات:", err);
    }
  };
  
  const fetchPatientRequestsGrouped = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/patient/grouped"
      );
      setPatientRequestsByType(res.data); // شكل البيانات: [{ serviceType: "إرشاد", count: 3 }, ...]
    } catch (error) {
      console.error("فشل في جلب طلبات المرضى حسب النوع:", error);
    }
  };


  const fetchRequestsByType = async (type) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/patient/by-type/${type}`
      );
      setRequestsByType(res.data);
      setSelectedServiceType(type);
    } catch (error) {
      console.error("فشل في جلب تفاصيل الطلبات:", error);
    }
  };
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/patient/${id}`, {
        status: newStatus,
      });
      // إعادة تحميل الطلبات بعد التحديث
      fetchRequestsByType(selectedServiceType);
    } catch (error) {
      console.error("فشل في تحديث الحالة:", error);
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
    fetchMonthlyCounts(); // 👈
    fetchPatientRequestsGrouped(); // ✅
    

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
  const fetchMonthlyCounts = async () => {
    try {
      const [patientRes, volunteerRes, membershipRes, usersRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/requests/patient/count"),
          axios.get("http://localhost:5000/api/requests/volunteer/count"),
          axios.get("http://localhost:5000/api/requests/membership/count"),
          axios.get("http://localhost:5000/api/users/count"),
        ]);

      const patientCount = patientRes.data.count;
      const volunteerCount = volunteerRes.data.count;
      const membershipCount = membershipRes.data.count;
      const userCount = usersRes.data.count;

      setPatientRequestCount(patientCount);
      setVolunteerRequestCount(volunteerCount);
      setMembershipCount(membershipCount);
      setUserCount(userCount);

      // تحديد الشهر الحالي تلقائيًا
      const currentMonth = new Date().toLocaleString("ar-EG", {
        month: "long",
      });

      // تحديث بيانات الرسم البياني
      setMonthlyRegistrations([
        {
          name: currentMonth,
          patients: patientCount,
          volunteers: volunteerCount,
          memberships: membershipCount,
          users: userCount,
        },
      ]);
    } catch (error) {
      console.error("فشل في جلب بيانات الإحصائيات الشهرية:", error);
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
جمعية فتافيت السكر        </div>
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
              text="المقالات"
              active={activeTab === "Articles"}
              onClick={() => setActiveTab("Articles")}
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
                  مرحباً بك في لوحة تحكم جمعية فتافيت السكر
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
                          fill={colors.lightYellow}
                        />
                        <Bar
                          dataKey="memberships"
                          name="طلبات الانتساب"
                          fill={colors.mintGreen}
                        />
                        <Bar
                          dataKey="users"
                          name="المستخدمون النشطون"
                          fill={colors.lavender}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* توزيع حسب العمر */}
                {/* آخر طلبات المرضى */}
                {/* أكثر الخدمات طلباً */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    أكثر الخدمات طلباً
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    ترتيب أكثر الخدمات المطلوبة من قبل المرضى
                  </p>
                  <ul className="space-y-3">
                    {patientRequestsByType
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 5)
                      .map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-800">
                              {item.serviceType}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-teal-600">
                            {item.count} طلب
                          </span>
                        </li>
                      ))}
                    {patientRequestsByType.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-3">
                        لا توجد بيانات حالياً
                      </p>
                    )}
                  </ul>
                </div>
              </div>

              {/* قسم طلبات المرضى حسب نوع الخدمة */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold text-teal-700">
                    طلبات المرضى حسب نوع الخدمة
                  </h2>
                  <div className="text-sm text-gray-500">
                    {patientRequestsByType.length} أنواع خدمات
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patientRequestsByType.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-800">
                          {item.serviceType}
                        </h3>
                        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                          {item.count}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          {new Date().toLocaleDateString("ar-SA")}
                        </p>
                        <button
                          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm font-medium flex items-center"
                          onClick={() => fetchRequestsByType(item.serviceType)}
                        >
                          <span>عرض التفاصيل</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedServiceType && (
                <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                      تفاصيل طلبات "{selectedServiceType}"
                    </h2>
                    <button
                      onClick={() => setSelectedServiceType(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-right border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            الاسم
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            البريد
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            الهاتف
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            المرفق
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            معلومات إضافية
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            الحالة
                          </th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-700">
                            تعديل
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {requestsByType.length > 0 ? (
                          requestsByType.map((req) => (
                            <tr
                              key={req._id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 text-sm">
                                {req.fullName}
                              </td>
                              <td className="py-3 px-4 text-sm">{req.email}</td>
                              <td className="py-3 px-4 text-sm">
                                {req.phonenumber}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                {req.attachment ? (
                                  <a
                                    href={req.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 hover:text-teal-800 flex items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 ml-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    تحميل
                                  </a>
                                ) : (
                                  <span className="text-gray-400">لا يوجد</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                {req.additionalInfo ? (
                                  <div className="max-w-xs truncate">
                                    {req.additionalInfo}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-sm">
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
                              <td className="py-3 px-4 text-sm">
                                <button
                                  className={`px-3 py-1 rounded text-xs font-medium ${
                                    req.status === "approved"
                                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      : "bg-teal-100 text-teal-800 hover:bg-teal-200"
                                  }`}
                                  onClick={() =>
                                    updateStatus(
                                      req._id,
                                      req.status === "approved"
                                        ? "pending"
                                        : "approved"
                                    )
                                  }
                                >
                                  {req.status === "approved"
                                    ? "تعيين كـ قيد المراجعة"
                                    : "الموافقة"}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="py-8 px-4 text-center text-gray-500"
                            >
                              لا توجد طلبات لعرضها
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* القسم الثالث: معلومات المرضى والمتطوعين */}
              <div className="grid grid-cols-1 gap-6 mt-6">
                {/* معلومات المرضى */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                      معلومات المرضى
                    </h2>
                    <button
                      className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium"
                      onClick={() => setActiveTab("users")}
                    >
                      عرض الكل
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
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
                      <tbody>
                        {users.slice(0, 3).map((user, index) => (
                          <tr
                            key={user.id}
                            className={
                              index !== users.slice(0, 3).length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-medium">
                                  {user.name.charAt(0)}
                                </div>
                                <div className="mr-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    #{user._id.substring(0, 8)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {user.age} سنة
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
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
              </div>

              {/* القسم الرابع: النشاطات الأخيرة والفعاليات */}
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

                <div className="space-y-4">
                  {events
                    .filter((event) => new Date(event.date) >= new Date())
                    .slice(0, 3)
                    .map((event) => (
                      <div
                        key={event._id}
                        className="flex items-center border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-all"
                      >
                        {/* الصورة */}
                        <img
                          src={
                            event.image || "https://via.placeholder.com/80x80"
                          }
                          alt={event.name}
                          className="w-20 h-20 rounded-md object-cover ml-4"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80x80";
                          }}
                        />

                        {/* التفاصيل */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {event.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">
                              التاريخ:{" "}
                            </span>
                            {new Date(event.date).toLocaleDateString("ar-EG")}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">
                              التصنيف:{" "}
                            </span>
                            {event.category}
                          </p>
                          {event.beneficiaries?.length > 0 && (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-700">
                                المستفيدون:{" "}
                              </span>
                              {event.beneficiaries.join("، ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* في حال لا يوجد فعاليات */}
                  {events.filter((e) => new Date(e.date) >= new Date())
                    .length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      لا توجد فعاليات قادمة حالياً
                    </div>
                  )}
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
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  الإحصائيات العامة
                </h2>

                {/* البطاقات الأربع */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={<UserPlus className="w-6 h-6 text-teal-500" />}
                    title="طلبات الانتساب"
                    value={membershipCount}
                    color="#E0F7FA"
                  />
                  <StatCard
                    icon={<Heart className="w-6 h-6 text-pink-500" />}
                    title="طلبات المرضى"
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
                    title="المستخدمون النشطون"
                    value={userCount}
                    color="#E8EAF6"
                  />
                </div>

                {/* مخطط شريطي أفقي */}
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
                          fill={colors.lightYellow}
                        />
                        <Bar
                          dataKey="memberships"
                          name="طلبات الانتساب"
                          fill={colors.mintGreen}
                        />
                        <Bar
                          dataKey="users"
                          name="المستخدمون النشطون"
                          fill={colors.lavender}
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
