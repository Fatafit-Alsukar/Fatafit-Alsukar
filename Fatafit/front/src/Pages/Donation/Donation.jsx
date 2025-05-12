// src/pages/Donation/Donation.jsx
import React from 'react';
import {
  CreditCardIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  GiftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" dir="rtl">
      {/* Header */}
      <header className="bg-[#1D3E79] text-white py-12">
        <h1 className="text-4xl font-bold text-center">التبرع والدعم</h1>
        <p className="text-center mt-2 opacity-80">Donate / Support Us</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* 1. Donation Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1D3E79] mb-6">طرق التبرع</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <button className="flex items-center space-x-2 justify-center bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-4 rounded-lg transition">
              <CreditCardIcon className="w-6 h-6" />
              <span>تحويل إلكتروني</span>
            </button>
            <button className="flex items-center space-x-2 justify-center bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-4 rounded-lg transition">
              <DevicePhoneMobileIcon className="w-6 h-6" />
              <span>Apple Pay</span>
            </button>
            <button className="flex items-center space-x-2 justify-center bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-4 rounded-lg transition">
              <CurrencyDollarIcon className="w-6 h-6" />
              <span>نقداً / شيك</span>
            </button>
          </div>
        </section>

        {/* 2. Transparency */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1D3E79] mb-6">شفافية التبرعات</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="mb-4">
              نلتزم بنشر تقرير مفصل عن كيفية صرف أموال التبرّع بشكل دوري لضمان أقصى درجات
              الشفافية.
            </p>
            <button className="inline-flex items-center space-x-2 bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-2 px-4 rounded transition">
              <ChartBarIcon className="w-5 h-5" />
              <span>عرض التقارير</span>
            </button>
          </div>
        </section>

        {/* 3. Monthly / Ongoing Support */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1D3E79] mb-6">دعم مستمر أو شهري</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {['شهري', 'ربع سنوي', 'سنوي'].map((plan) => (
              <div
                key={plan}
                className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-medium mb-2">{plan}</h3>
                <p className="mb-4 opacity-75">استمر في دعمنا للحصول على تحديثات ومكافآت خاصة.</p>
                <button className="bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-2 px-4 rounded transition">
                  اختر {plan}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. In-Kind Donations */}
        <section>
          <h2 className="text-2xl font-semibold text-[#1D3E79] mb-6">تبرع بأجهزة أو أدوات</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="mb-4">
              يمكنك التبرع بأي جهاز أو أداة بحسب مقدرتك، وسنقوم بتوزيعها على مستحقيها بأعلى كفاءة.
            </p>
            <button className="inline-flex items-center space-x-2 bg-[#4A90E2] hover:bg-[#3B7ACB] text-white py-2 px-4 rounded transition">
              <GiftIcon className="w-5 h-5" />
              <span>اطلب استلام التبرع</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
