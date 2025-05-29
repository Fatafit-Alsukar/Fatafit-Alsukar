import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Clock, ArrowRight } from "lucide-react";

// تعريف الألوان الخاصة بالموقع
const colors = {
  lightBlue: "#4A90E2",
  darkBlue: "#1D3E79",
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم");
        }
        const data = await response.json();
        console.log("البيانات المستلمة:", data);

        setServices(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 rtl">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64 md:h-96"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/6a/8c/64/6a8c640d6a6ed65d59e389f32f2d9d3d.jpg")',
          backgroundColor: colors.darkBlue,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
            خدماتنا
          </h1>
          <p className="text-lg md:text-xl text-center max-w-3xl">
            نقدم مجموعة من الخدمات الداعمة لأطفال السكري وعائلاتهم لتحسين جودة
            حياتهم
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.darkBlue }}
          >
            خدمات جمعية أطفال كتاكيت السكر
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            نسعى لتقديم الدعم الشامل لمساعدة الأطفال المصابين بالسكري وعائلاتهم
            على التعايش بصورة أفضل مع المرض
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div
              className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin"
              style={{
                borderColor: colors.lightBlue,
                borderTopColor: "transparent",
              }}
            ></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              className="mt-4 px-6 py-2 rounded-md text-white"
              style={{ backgroundColor: colors.lightBlue }}
              onClick={() => window.location.reload()}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:mx-25 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} colors={colors} />
            ))}
          </div>
        )}
      </div>

      {/* How to Request Section */}
      <div
        className="py-16 px-4"
        style={{ backgroundColor: `${colors.lightBlue}15` }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.darkBlue }}
            >
              كيفية طلب الخدمة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              خطوات بسيطة للحصول على خدماتنا المجانية للأطفال المصابين بالسكري
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="1"
              title="تقديم الطلب"
              description="قم بتعبئة نموذج طلب الخدمة من خلال موقعنا الإلكتروني أو زيارة مقر الجمعية"
              colors={colors}
            />
            <StepCard
              number="2"
              title="دراسة الحالة"
              description="سيقوم فريقنا المختص بدراسة طلبك وتحديد الاحتياجات المناسبة"
              colors={colors}
            />
            <StepCard
              number="3"
              title="تقديم الخدمة"
              description="سيتم التواصل معك لتحديد موعد وآلية تقديم الخدمة المطلوبة"
              colors={colors}
            />
          </div>

          <div className="text-center mt-12">
            <button
              className="px-8 py-3 text-white rounded-md transition duration-300 hover:bg-opacity-90"
              style={{ backgroundColor: colors.darkBlue }}
            >
              تقديم طلب خدمة
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-16 px-4 text-white"
        style={{ backgroundColor: colors.darkBlue }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ساهم معنا في دعم أطفال كتاكيت السكر
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            تبرعك، مهما كان بسيطاً، يساهم في توفير الدعم المادي والمعنوي للأطفال
            المصابين بالسكري وعائلاتهم
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-3 bg-white text-lg rounded-md transition duration-300 hover:bg-gray-100"
              style={{ color: colors.darkBlue }}
            >
              تبرع الآن
            </button>
            <button className="px-8 py-3 hover:text-[#1D3E79] text-lg rounded-md transition duration-300 border-2 border-white hover:bg-white hover:bg-opacity-10">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, colors }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* صورة الخدمة */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <img
          src={service.image || "/api/placeholder/400/300"}
          alt={service.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />

        {/* عداد الطلبات */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
            <Users size={14} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">
              {service.requestsCount || service.requestedBy?.length || 0}
            </span>
          </div>
        </div>

        {/* مؤشر جديد إذا كانت الخدمة حديثة */}
        {new Date() - new Date(service.createdAt) < 7 * 24 * 60 * 60 * 1000 && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              جديد
            </div>
          </div>
        )}
      </div>

      {/* محتوى البطاقة */}
      <div className="relative p-6 z-10">
        {/* العنوان */}
        <h3
          className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300"
          style={{ color: colors?.darkBlue || "#1e40af" }}
        >
          {service.name}
        </h3>

        {/* الوصف */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* معلومات إضافية */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>
              {new Date(service.createdAt).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* زر طلب الخدمة */}
        <Link to={`/patientrequest?serviceType=${service._id}`}>
          <button
            className="w-full hover:cursor-pointer group/btn relative overflow-hidden rounded-xl py-3 px-6 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${
                colors?.lightBlue || "#3b82f6"
              }, ${colors?.darkBlue || "#1e40af"})`,
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              طلب الخدمة
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </span>

            {/* تأثير الهوفر */}
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
          </button>
        </Link>
      </div>

      {/* حد متوهج عند الهوفر */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/50 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
}

// مكون بطاقة الخطوات
function StepCard({ number, title, description, colors }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div
        className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
        style={{ backgroundColor: colors.lightBlue }}
      >
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: colors.darkBlue }}>
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
