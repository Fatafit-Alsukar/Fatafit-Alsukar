import { useState, useEffect, act } from "react";
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
  MessageCircleIcon,
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
import { useRef } from "react";
import ContactMessage from "./ContactMessages";
import ArticlesManagement from "./ArticlesManagement";
import UsersManagement from "./UsersManagement";
import ServicesManagement from "./ServicesManagement";
import MembershipRequests from "./MembershipRequests";
import VolunteerRequests from "./VolunteerRequests";
import PatientRequestsByService from "./PatientRequestsByService";
import StatisticsDashboard from "./StatisticsDashboard";
import DashboardHome from "./DashboardHome";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const detailsRef = useRef(null);

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
  const [membershipRequests, setMembershipRequests] = useState([]);
  const [volunteerRequests, setVolunteerRequests] = useState([]);

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
      name: "مستفيدين نشطين",
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
      name: "طلبات المستفيدين",
      value: patientRequestCount,
    },
    {
      name: "طلبات التطوع",
      value: volunteerRequestCount,
    },
    {
      name: "المستفيدين النشطون",
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
      console.error("فشل في جلب طلبات المستفيدين حسب النوع:", error);
    }
  };

  const fetchRequestsByType = async (type) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/patient/by-type/${type}`
      );
      setRequestsByType(res.data);
      setSelectedServiceType(type);

      // انتظر ظهور القسم في الـ DOM ثم قم بالتمرير إليه
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // يمكن تعديل التأخير حسب الحاجة
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
  const fetchMembershipRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/membership"
      );
      setMembershipRequests(res.data);
    } catch (err) {
      console.error("فشل في جلب طلبات الانتساب:", err);
    }
  };
  const updateMembershipStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/membership/${id}`, {
        status: newStatus,
      });
      fetchMembershipRequests(); // إعادة التحميل بعد التحديث
    } catch (err) {
      console.error("فشل في تحديث حالة طلب الانتساب:", err);
    }
  };

  const fetchVolunteerRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/volunteer"
      );
      setVolunteerRequests(res.data);
    } catch (err) {
      console.error("فشل في جلب طلبات التطوع:", err);
    }
  };

  const updateVolunteerStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/volunteer/${id}`, {
        status: newStatus,
      });
      fetchVolunteerRequests(); // إعادة التحميل بعد التحديث
    } catch (err) {
      console.error("فشل في تحديث حالة المتطوع:", err);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        isApproved: newStatus === "نشط",
      });
      fetchUsers(); // لإعادة تحميل المستخدمين بعد التحديث
    } catch (err) {
      console.error("فشل في تحديث حالة المستخدم:", err);
      setError("فشل في تحديث حالة المستخدم.");
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
    fetchMembershipRequests(); // ✅ أضف هذا
    fetchVolunteerRequests(); // ✅ أضف هذا

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

  // جلب عدد طلبات المستفيدين
  const fetchPatientRequestCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests/patient/count"
      );
      setPatientRequestCount(res.data.count);
    } catch (error) {
      console.error("فشل في جلب عدد طلبات المستفيدين:", error);
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
          جمعية فتافيت السكر{" "}
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
              text="المستفيدين"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />

            <SidebarItem
              icon={<UserPlus />}
              text="طلبات الانتساب"
              active={activeTab === "membership"}
              onClick={() => setActiveTab("membership")}
            />
            <SidebarItem
              icon={<ThumbsUp />}
              text="طلبات التطوع"
              active={activeTab === "volunteers"}
              onClick={() => setActiveTab("volunteers")}
            />
            <SidebarItem
              icon={<AlertCircle />}
              text="طلبات المستفيدين حسب الخدمة"
              active={activeTab === "patientsByService"}
              onClick={() => setActiveTab("patientsByService")}
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
              active={activeTab === "ArticlesManagement"}
              onClick={() => setActiveTab("ArticlesManagement")}
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
            <SidebarItem
              icon={<MessageCircleIcon />}
              text="الرسائل"
              active={activeTab === "contactmessage"}
              onClick={() => setActiveTab("contactmessage")}
            />
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        {/* الهيدر */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "الرئيسية"}
            {activeTab === "users" && "المستفيدين"}
            {activeTab === "services" && "الخدمات"}
            {activeTab === "events" && "الفعاليات"}
            {activeTab === "news" && "الأخبار"}
            {activeTab === "statistics" && "الإحصائيات"}
            {activeTab === "donations" && "التبرعات"}
            {activeTab === "contactmessage" && "الرسائل"}
            {activeTab === "membership" && "طلبات الانتساب"}
            {activeTab === "volunteers" && "طلبات التطوع"}
            {activeTab === "patientsByService" && "طلبات المستفيدين حسب الخدمة"}
            {activeTab === "ArticlesManagement" && "إدارة المقالات"}
          </h1>
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
            <DashboardHome
              membershipCount={membershipCount}
              patientRequestCount={patientRequestCount}
              volunteerRequestCount={volunteerRequestCount}
              userCount={userCount}
              patientRequestsByType={patientRequestsByType}
              events={events}
              users={users}
              setActiveTab={setActiveTab}
              colors={colors}
              monthlyRegistrations={monthlyRegistrations}
              fetchRequestsByType={fetchRequestsByType}
              selectedServiceType={selectedServiceType}
              detailsRef={detailsRef}
              requestsByType={requestsByType}
              updateStatus={updateStatus}
              setSelectedServiceType={setSelectedServiceType}
            />
          )}

          {/* صفحة المستفيدين */}
          {activeTab === "users" && (
            <UsersManagement
              users={users}
              updateUserStatus={updateUserStatus}
            />
          )}

          {/* صفحة الخدمات */}
          {activeTab === "services" && (
            <ServicesManagement
              services={services}
              newService={newService}
              setNewService={setNewService}
              showAddServiceForm={showAddServiceForm}
              setShowAddServiceForm={setShowAddServiceForm}
              handleAddService={handleAddService}
              handleDeleteService={handleDeleteService}
            />
          )}

          {/*********************************************************/}

          {/* صفحة طلبات المستفيدين حسب الخدمة */}
          {activeTab === "patientsByService" && (
            <PatientRequestsByService
              patientRequestsByType={patientRequestsByType}
              selectedServiceType={selectedServiceType}
              requestsByType={requestsByType}
              fetchRequestsByType={fetchRequestsByType}
              updateStatus={updateStatus}
              detailsRef={detailsRef}
              setSelectedServiceType={setSelectedServiceType}
            />
          )}

          {/* صفحة طلبات التطوع */}
          {activeTab === "volunteers" && (
            <VolunteerRequests
              volunteerRequests={volunteerRequests}
              updateVolunteerStatus={updateVolunteerStatus}
            />
          )}

          {/* صفحة طلبات الانتساب */}
          {activeTab === "membership" && (
            <MembershipRequests
              membershipRequests={membershipRequests}
              updateMembershipStatus={updateMembershipStatus}
            />
          )}

          {activeTab === "events" && <Events />}

          {/* صفحة إدارة المقالات */}
          {activeTab === "ArticlesManagement" && <ArticlesManagement />}

          {/* صفحة الإحصائيات */}
          {activeTab === "statistics" && (
            <StatisticsDashboard
              membershipCount={membershipCount}
              patientRequestCount={patientRequestCount}
              volunteerRequestCount={volunteerRequestCount}
              userCount={userCount}
              monthlyRegistrations={monthlyRegistrations}
              colors={colors}
            />
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
                        جميع التبرعات تذهب مباشرة لدعم أطفال مستفيدين السكري
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contactmessage" && <ContactMessage />}
        </main>
      </div>
    </div>
  );
}
