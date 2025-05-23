import { useState, useEffect } from "react";
import axios from "axios";
import {
  Heart,
  Star,
  Users,
  Calendar,
  Activity,
  Apple,
  Droplets,
  BookOpen,
  Coffee,
  Award,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin,
  Clock,
  Tag
} from "lucide-react";

export default function DiabetesHomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const [activeReminder, setActiveReminder] = useState(0);
  const [showReminders, setShowReminders] = useState(true);
  const [activities, setActivities] = useState([]);

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate slides
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Auto-rotate reminders
    const reminderInterval = setInterval(() => {
      setActiveReminder((prev) => (prev + 1) % reminders.length);
    }, 8000);

    // Fetch latest activities
    fetchActivities();

    return () => {
      clearInterval(interval);
      clearInterval(reminderInterval);
    };
  }, []);

  // Function to fetch latest activities
  const fetchActivities = async () => {
    try {
      // Fetch activities from the backend API
      const response = await axios.get('http://localhost:5000/api/activities');
      
      // Sort activities by date (most recent first)
      const sortedActivities = response.data.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      // Limit to 3 most recent activities for the home page
      const recentActivities = sortedActivities.slice(0, 3);
      
      setActivities(recentActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    }
  };

  // Format date in Arabic
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-SA", options);
  };

  const slides = [
    {
      title: "اهلا بك في كتاكيت السكر ",
      description: "معاً نحو حياة صحية وسعيدة مع مرض السكري",
      image: "/api/placeholder/800/450",
      color: "from-teal-500 to-blue-600",
    },
    {
      title: "المعرفة قوة",
      description: "نوفر لك أحدث المعلومات والنصائح للتعايش مع مرض السكري",
      image: "/api/placeholder/800/450",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "مجتمع داعم",
      description: "انضم إلى مجتمعنا الداعم واستفد من تجارب الآخرين",
      image: "/api/placeholder/800/450",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "٢٥٠٠٠+",
      label: "مستفيد",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: "١٢٠٠+",
      label: "مقال تثقيفي",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "٣٦٥",
      label: "يوم دعم متواصل",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "٩٩%",
      label: "نسبة رضا المستخدمين",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const features = [
    {
      icon: <Activity className="w-12 h-12" />,
      title: "متابعة صحية متكاملة",
      description:
        "أدوات متطورة لمراقبة مستويات السكر وتسجيل الملاحظات اليومية",
      color: "bg-gradient-to-br from-teal-500 to-emerald-600",
      animation: "pulse",
    },
    {
      icon: <Apple className="w-12 h-12" />,
      title: "تغذية مناسبة",
      description: "نصائح غذائية مخصصة وقوائم طعام متنوعة مناسبة لمرضى السكري",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600",
      animation: "bounce",
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "استشارات طبية",
      description:
        "تواصل مباشر مع أطباء متخصصين في علاج السكري والتغذية العلاجية",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      animation: "wiggle",
    },
  ];

  const experts = [
    {
      name: "د. سارة الأحمد",
      role: "استشارية سكري وغدد صماء",
      image: "/api/placeholder/400/400",
      color: "bg-teal-600",
    },
    {
      name: "د. خالد عبدالله",
      role: "اختصاصي تغذية علاجية",
      image: "/api/placeholder/400/400",
      color: "bg-indigo-600",
    },
    {
      name: "د. نورة السالم",
      role: "استشارية سكري الأطفال",
      image: "/api/placeholder/400/400",
      color: "bg-blue-600",
    },
  ];

  const reminders = [
    {
      title: "تذكير بشرب الماء",
      description: "شرب الماء بانتظام يساعد على استقرار مستويات السكر في الدم",
      icon: <Droplets className="w-6 h-6" />,
      color: "from-teal-400 to-blue-500",
    },
    {
      title: "فحص السكر",
      description: "تذكر قياس مستوى السكر في الدم قبل وبعد الوجبات",
      icon: <Activity className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-500",
    },
    {
      title: "ممارسة الرياضة",
      description: "30 دقيقة من المشي اليومي تساعد في تنظيم مستوى السكر",
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "تناول الأدوية",
      description: "تذكر تناول أدويتك في المواعيد المحددة",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "النوم الكافي",
      description: "7-8 ساعات من النوم تساعد في تنظيم مستوى السكر",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 overflow-x-hidden font-sans ${
        isLoaded ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
      }`}
      dir="rtl"
    >
      {/* Floating Elements - Removing this section */}
      {/* <div className="fixed w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-5 w-16 h-16 rounded-full bg-teal-500 opacity-10 animate-pulse duration-7000"></div>
        <div className="absolute top-3/4 left-10 w-20 h-20 rounded-full bg-blue-500 opacity-10 animate-pulse duration-8000 delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-indigo-500 opacity-10 animate-pulse duration-5000 delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 rounded-full bg-emerald-500 opacity-10 animate-pulse duration-9000 delay-3000"></div>
        <div className="absolute top-2/3 right-1/4 w-14 h-14 rounded-full bg-amber-500 opacity-10 animate-pulse duration-6000"></div>
      </div> */}

      {/* Hero Section - New Design */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background with enhanced animations */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}
              ></div>

              {/* Animated Pattern Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0id2hpdGUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMzBjMC0xNi41NjkgMTMuNDMxLTMwIDMwLTMwIDE2LjU2OSAwIDMwIDEzLjQzMSAzMCAzMCAwIDE2LjU2OS0xMy40MzEgMzAtMzAgMzBDMTMuNDMxIDYwIDAgNDYuNTY5IDAgMzAiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PC9wYXRoPgo8L3N2Zz4=')]"></div>

                {/* Animated Circles */}
                <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-20 -left-20 animate-blob"></div>
                <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-0 right-10 animate-blob delay-2000"></div>
                <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full top-1/2 left-1/3 animate-blob delay-4000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 pt-16 md:pt-0">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-right">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ease-in-out ${
                  activeSlide === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute"
                } ${activeSlide !== index ? "pointer-events-none" : ""}`}
              >
                <div className="bg-white/10 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 text-white">
                  <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                    كتاكيت السكر #{index + 1}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-start">
                    <a
                      href="#register"
                      className="inline-flex items-center justify-center bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-100 shadow-lg hover:shadow-2xl"
                    >
                      انضم إلينا الآن
                      <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                    </a>
                    <a
                      href="#learn-more"
                      className="inline-flex items-center justify-center bg-indigo-600/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:bg-indigo-600/40 shadow-lg hover:shadow-2xl"
                    >
                      اعرف المزيد
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Image/Animation Side */}
          <div className="w-full md:w-1/2 relative h-96 md:h-[36rem]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute w-64 h-64 rounded-full border-8 border-white/20 animate-pulse"></div>
              <div className="absolute w-80 h-80 rounded-full border-8 border-white/10 animate-pulse delay-1000"></div>
              <div className="absolute w-96 h-96 rounded-full border-8 border-white/5 animate-pulse delay-2000"></div>

              {/* Center Icon/Image */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-12 rounded-full shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-110">
                <Activity className="w-24 h-24 text-white" />
              </div>

              {/* Floating Health Icons */}
              <div className="absolute top-1/4 right-1/4 bg-white/20 backdrop-blur-lg p-3 rounded-full shadow-xl border border-white/20 animate-float">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-1/4 left-1/4 bg-white/20 backdrop-blur-lg p-3 rounded-full shadow-xl border border-white/20 animate-float-delay-1">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-1/3 left-1/5 bg-white/20 backdrop-blur-lg p-3 rounded-full shadow-xl border border-white/20 animate-float-delay-2">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-14 h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "bg-white scale-110 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`الانتقال إلى الشريحة ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <a
            href="#stats"
            className="flex flex-col items-center text-white text-sm font-medium hover:text-white/80 transition-colors"
          >
            <span className="mb-2">استكشف المزيد</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-lg border border-white/10 animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </div>
          </a>
        </div>

        {/* Wave Divider - Updated for smoother transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,144C672,171,768,213,864,208C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl ${stat.color} shadow-md transition-all duration-500 transform hover:scale-105 hover:shadow-xl`}
                onMouseEnter={() => setHoverItem(`stat-${index}`)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <div
                  className={`mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-white shadow transition-all duration-500 ${
                    hoverItem === `stat-${index}` ? "scale-110" : ""
                  }`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-600">
            خدماتنا المميزة
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600">
            نقدم لك كل ما تحتاجه للتعايش بصحة وسعادة مع مرض السكري
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl bg-white relative group`}
                onMouseEnter={() => setHoverItem(`feature-${index}`)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <div
                  className={`h-48 ${feature.color} flex items-center justify-center`}
                >
                  <div
                    className={`text-white transition-transform duration-500 ${
                      hoverItem === `feature-${index}` ? "scale-125" : ""
                    }`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gray-100 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-150"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute top-24 right-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-blob delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob delay-4000"></div>
      </section>

      {/* Latest Activities Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-600">
            آخر الأنشطة
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600">
            تعرف على أحدث الفعاليات والأنشطة التي نقدمها
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.length > 0
              ? activities.map((activity, index) => (
                  <div
                    key={activity._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
                    onMouseEnter={() => setHoverItem(`activity-${index}`)}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    {/* Activity Image with Category Tag */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={
                          activity.image || "https://via.placeholder.com/400"
                        }
                        alt={activity.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{
                          transform:
                            hoverItem === `activity-${index}`
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                          {activity.category}
                        </span>
                      </div>
                      {/* Overlay gradient on hover */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 transition-opacity duration-300"
                        style={{
                          opacity: hoverItem === `activity-${index}` ? 0.7 : 0,
                        }}
                      ></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-indigo-600 mb-3 transition-colors duration-300">
                        {activity.name}
                      </h3>

                      {activity.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
                          {activity.description}
                        </p>
                      )}

                      {/* Activity Details */}
                      <div className="py-3 px-4 bg-indigo-50 rounded-xl mb-4">
                        <div className="flex items-center gap-2 text-indigo-700 mb-2">
                          <Calendar className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm">
                            {formatDate(activity.date)}
                          </span>
                        </div>

                        {activity.location && (
                          <div className="flex items-center gap-2 text-indigo-700 mb-2">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm">{activity.location}</span>
                          </div>
                        )}

                        {activity.time && (
                          <div className="flex items-center gap-2 text-indigo-700">
                            <Clock className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm">{activity.time}</span>
                          </div>
                        )}
                      </div>

                      <a
                        href={`/Activities/${activity._id}`}
                        className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg text-center font-medium"
                      >
                        عرض التفاصيل
                        <ArrowRight className="inline-block mr-2 h-4 w-4 rotate-180" />
                      </a>
                    </div>
                  </div>
                ))
              : // Loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                  >
                    {/* Skeleton image */}
                    <div className="w-full h-52 bg-gray-200"></div>

                    <div className="p-6">
                      <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-5 bg-gray-200 rounded mb-3 w-full"></div>
                      <div className="h-5 bg-gray-200 rounded mb-3 w-2/3"></div>

                      <div className="h-24 bg-gray-200 rounded-xl mb-4"></div>

                      <div className="h-12 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/Activities"
              className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
            >
              عرض جميع الأنشطة
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-1/3 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-blob delay-2000"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-600">
            قصص نجاح
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600">
            تجارب حقيقية من أشخاص تغلبوا على تحديات مرض السكري
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-end mb-4">
                <div className="text-amber-500">
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "بفضل برامج التوعية والمتابعة المستمرة، استطعت السيطرة على
                مستويات السكر لدي بشكل أفضل. الدعم المقدم ساعدني كثيراً في تغيير
                نمط حياتي للأفضل."
              </p>
              <div className="flex items-center justify-end">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">أحمد محمد</p>
                  <p className="text-sm text-gray-500">, عمان 45 سنة</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 mr-4 flex items-center justify-center text-indigo-600 font-bold">
                  أ.م
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-end mb-4">
                <div className="text-amber-500">
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "كأم لطفل مصاب بالسكري، وجدت هنا كل الدعم والمعلومات التي
                احتجتها. البرامج التعليمية والاستشارات الطبية غيرت حياتنا
                للأفضل."
              </p>
              <div className="flex items-center justify-end">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">نورة عبدالله</p>
                  <p className="text-sm text-gray-500">عمان 38 سنة</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-teal-100 mr-4 flex items-center justify-center text-teal-600 font-bold">
                  ن.ع
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-end mb-4">
                <div className="text-amber-500">
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                  <Star className="inline-block w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "اكتشفت إصابتي بالسكري قبل عامين، وكنت خائفاً جداً. لكن مع الدعم
                والتوجيه الذي تلقيته هنا، أصبحت أكثر ثقة في التعامل مع حالتي
                ومواصلة حياتي بشكل طبيعي."
              </p>
              <div className="flex items-center justify-end">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">سعد الفهد</p>
                  <p className="text-sm text-gray-500">الزرقاء، 29 سنة</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-blue-600 font-bold">
                  س.ف
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply opacity-10 animate-blob delay-4000"></div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-600">
            مكتبة التثقيف الصحي
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600">
            تعرف على كل ما يهمك حول مرض السكري
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-white">
              <div className="p-8 flex flex-col items-center text-center">
                <Coffee className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">السكري والتغذية</h3>
                <p className="mb-6">
                  تعرف على الأطعمة المناسبة لمرضى السكري وكيفية تنظيم وجباتك
                </p>
                <a
                  href="https://altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%A7%D9%84%D8%AD%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%BA%D8%B0%D8%A7%D8%A6%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9-%D9%84%D9%85%D8%B1%D8%B6%D9%89-%D8%B3%D9%83%D8%B1%D9%8A-%D8%A7%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84-2686"
                  className="mt-auto inline-block bg-white text-teal-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100"
                >
                  اقرأ المزيد
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-white">
              <div className="p-8 flex flex-col items-center text-center">
                <Activity className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">الرياضة والسكري</h3>
                <p className="mb-6">
                  اكتشف التمارين المناسبة وكيفية ممارسة الرياضة بأمان مع مرض
                  السكري
                </p>
                <a
                  href="https://altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%8A%D8%B4-%D9%85%D8%B9-%D8%B3%D9%83%D8%B1%D9%8A-%D8%A7%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84-1796"
                  className="mt-auto inline-block bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100"
                >
                  اقرأ المزيد
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-white">
              <div className="p-8 flex flex-col items-center text-center">
                <Heart className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">العناية اليومية</h3>
                <p className="mb-6">
                  نصائح للعناية اليومية ومراقبة مستويات السكر بالدم بشكل فعال
                </p>
                <a
                  href="https://altibbi.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A/%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%8A%D8%B4-%D9%85%D8%B9-%D8%B3%D9%83%D8%B1%D9%8A-%D8%A7%D9%84%D8%A7%D8%B7%D9%81%D8%A7%D9%84-1796"
                  className="mt-auto inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100"
                >
                  اقرأ المزيد
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  {/* Donation Section */}
  <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-4">
              ساهم في دعم مرضى السكري
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تبرعك يساعدنا في تقديم الدعم والرعاية لمرضى السكري وتطوير خدماتنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">دعم المرضى</h3>
              <p className="text-gray-600">
                مساعدة المرضى في الحصول على الأدوية والمستلزمات الطبية
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">التوعية الصحية</h3>
              <p className="text-gray-600">
                تنظيم برامج توعوية وورش عمل لمرضى السكري وأسرهم
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">الأنشطة الرياضية</h3>
              <p className="text-gray-600">
                تنظيم أنشطة رياضية وترفيهية لمرضى السكري
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/donation"
              className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              تبرع الآن
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-blob delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob delay-4000"></div>
      </section>
      {/* CTA Section */}
      <section id="register" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
        <div className="absolute inset-0">
          <div className="absolute w-60 h-60 rounded-full bg-white opacity-10 top-0 left-1/4 animate-pulse duration-10000"></div>
          <div className="absolute w-40 h-40 rounded-full bg-white opacity-10 bottom-0 right-1/4 animate-pulse duration-8000 delay-2000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Droplets className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            انضم إلينا اليوم
          </h2>
          <p className="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
            احصل على الدعم والمعلومات التي تحتاجها للتعايش بصحة وسعادة مع مرض
            السكري
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#signup"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-indigo-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">سجل الآن مجاناً</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a
              href="#contact"
              className="group rounded-full bg-transparent border-2 border-white px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:scale-105"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>

      {/* Popup Reminders */}
      <div className="fixed bottom-6 right-6 z-50">
        {showReminders && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 relative overflow-hidden border border-gray-100">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200"
              onClick={() => setShowReminders(false)}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Reminders Container */}
            <div className="relative h-[180px]">
              {reminders.map((reminder, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-500 ease-in-out ${
                    activeReminder === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="flex justify-end mb-3">
                    <div
                      className={`bg-gradient-to-br ${reminder.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
                    >
                      {reminder.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {reminder.title}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {reminder.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1.5">
                      {reminders.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveReminder(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeReminder === i
                              ? "bg-indigo-600 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`الانتقال إلى التذكير ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm">
                      المزيد من النصائح
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1) translate(10px, -10px);
          }
          66% {
            transform: scale(0.9) translate(-10px, 10px);
          }
          100% {
            transform: scale(1);
          }
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .delay-4000 {
          animation-delay: 4s;
        }

        .duration-5000 {
          animation-duration: 5s;
        }

        .duration-6000 {
          animation-duration: 6s;
        }

        .duration-7000 {
          animation-duration: 7s;
        }

        .duration-8000 {
          animation-duration: 8s;
        }

        .duration-9000 {
          animation-duration: 9s;
        }

        .duration-10000 {
          animation-duration: 10s;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        .shadow-text {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        .shadow-text-light {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>

    
    </div>
  );
}
