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
  UserPlus,
  AlertCircle,
  X,
  BookOpen,
  ThumbsUp,
  MessageCircleIcon,
  Sun,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
import DonationDashboard from "./DonationDashboard";
import SuccessStories from "./SuccessStories";
import SummerClubsManagement from "./SummerClubsManagement";

export default function Dashboard(   
) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const detailsRef = useRef(null);

  // إحصائيات النظام - تم تحديثها لاستخدام البيانات الديناميكية
  const [membershipCount, setMembershipCount] = useState(0);
  const [patientRequestCount, setPatientRequestCount] = useState(0);
  const [volunteerRequestCount, setVolunteerRequestCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [patientRequestsByType, setPatientRequestsByType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [requestsByType, setRequestsByType] = useState([]);
  const [membershipRequests, setMembershipRequests] = useState([]);
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  // بيانات الرسم البياني (يمكن استبدالها ببيانات ديناميكية لاحقًا)
  const [monthlyRegistrations, setMonthlyRegistrations] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [donations, setDonations] = useState([]);
  const totalDonations = donations.length;
  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donations");
      setDonations(res.data);
    } catch (error) {
      console.error("فشل في جلب التبرعات:", error);
    }
  };
  useEffect(() => {
    fetchDonations();
  }, []);

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

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

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
      // Don't make the API call if type is undefined
      if (!type) {
        console.warn("Service type is undefined, skipping request");
        return;
      }

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
  const updateMembershipStatus = async (id, newStatus, email, fullName) => {
    try {
      if (typeof newStatus === 'string' && (newStatus === 'approved' || newStatus === 'pending')) {
        // Use the new approve endpoint
        await axios.post(`http://localhost:5000/api/requests/membership/${id}/approve`, {
          email,
          fullName,
        });
      } else {
        // fallback to old PUT if needed
        await axios.put(`http://localhost:5000/api/requests/membership/${id}`, {
          status: newStatus,
        });
      }
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

  const updateVolunteerStatus = async (id, newStatus, email, fullName) => {
    try {
      if (typeof newStatus === 'string' && (newStatus === 'approved' || newStatus === 'pending')) {
        // Use the new approve endpoint
        await axios.post(`http://localhost:5000/api/requests/volunteer/${id}/approve`, {
          email,
          fullName,
        });
      } else {
        // fallback to old PUT if needed
        await axios.put(`http://localhost:5000/api/requests/volunteer/${id}`, {
          status: newStatus,
        });
      }
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

  const fetchSuccessStories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/success-stories");
      setSuccessStories(res.data);
    } catch (error) {
      console.error("فشل في جلب قصص النجاح:", error);
    }
  };
  useEffect(() => {
    // ... استدعاءات API الأخرى
    fetchSuccessStories();
  }, []);

  const handleStorySubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/success-stories", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("تم حفظ قصة النجاح بنجاح!");
      setShowForm(false);
      fetchSuccessStories(); // إعادة تحميل القصص بعد الإضافة
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ.");
      console.error(error);
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
  const SidebarItem = ({ icon, text, active, onClick, customClass = "" }) => (
    <button
      className={`flex items-center space-x-2 space-x-reverse p-2 rounded-lg w-full text-right ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"} ${customClass}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-medium">{text}</span>
        <span className="ml-2">{icon}</span>
      </div>
    </button>
  );

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
              icon={<Sun />}
              text="نوادي صيفية"
              active={activeTab === "summerClubs"}
              onClick={() => setActiveTab("summerClubs")}
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
            <SidebarItem
              icon={<BookOpen />}
              text="قصص النجاح"
              active={activeTab === "successStories"}
              onClick={() => setActiveTab("successStories")}
            />
           
            <div className="flex justify-center">
              <SidebarItem
                icon={<Home className="w-7 h-7" />}
                text={<span className="text-lg font-extrabold">الصفحة الرئيسية للموقع</span>}
                active={false}
                onClick={() => window.location.href = '/'}
                customClass="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl mt-8 py-4 px-6 hover:from-blue-700 hover:to-indigo-700 transition-all font-extrabold shadow-xl scale-100 hover:scale-105 border-2 border-blue-100"
              />
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
            {activeTab === "successStories" && "قصص النجاح"}
            {activeTab === "summerClubs" && "نوادي صيفية"}
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
              totalDonations={totalDonations}
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
              totalDonations={totalDonations}
            />
          )}

          {/* صفحة التبرعات */}
          {activeTab === "donations" && 
            <DonationDashboard 
              totalDonations={totalDonations}
            />
          }

          {activeTab === "contactmessage" && <ContactMessage />}
          {activeTab === "successStories" && (
            <SuccessStories
              successStories={successStories}
              onSubmit={handleStorySubmit}
            />
          )}
          {activeTab === "summerClubs" && <SummerClubsManagement />}
        </main>
      </div>
    </div>
  );
}
