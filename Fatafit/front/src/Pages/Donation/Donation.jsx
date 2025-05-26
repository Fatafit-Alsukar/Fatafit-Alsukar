// src/pages/Donation/Donation.jsx
import React, { useState } from 'react';
import {
  CreditCardIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  GiftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const paymentMethods = [
  'الموقع الإلكتروني لتكية أم علي',
  'تطبيق تكية أم علي للهواتف المحمولة',
  'خدمة إي فواتيركم',
  'خدمة كليك',
  'خدمة سمارت لينك',
  'مواقع تكية أم علي في المراكز التجارية',
  'CAF America',
  'CAF Canada',
  'مركز الاتصال',
  'مقر تكية أم علي الرئيسي',
  'صناديق جمع التبرعات (الحصّالات)',
  'محفظة UWallet',
  'محفظة Orange Money',
  'محفظة Zain Cash',
  'محفظة دينارك',
  'تطبيق وافي',
  'تطبيق طلبات',
  'تطبيق كريم',
  'الحوالات والاقتطاعات البنكية',
];

export default function DonatePage() {
  const [currency, setCurrency] = useState('JOD');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(paymentMethods[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF8FF] to-[#BEE3F8] flex flex-col items-center justify-center py-10 px-4" dir="rtl">
      {/* Donation Card */}
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-2xl p-8 border border-blue-100 flex flex-col gap-6 items-center animate-fade-in">
        <h1 className="text-2xl font-bold text-[#1D3E79] mb-2">أدوات التبرع</h1>
        {/* Currency Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all border ${currency === 'JOD' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setCurrency('JOD')}
          >
            دينار اردني
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all border ${currency === 'USD' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setCurrency('USD')}
          >
            دولار امريكي
          </button>
        </div>
        {/* Amount Input */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="amount" className="text-blue-700 font-medium">المبلغ</label>
          <input
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg text-right"
            placeholder="أدخل المبلغ المطلوب التبرع به"
          />
        </div>
        {/* Payment Method Dropdown */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="method" className="text-blue-700 font-medium">اختر طريقة الدفع</label>
          <select
            id="method"
            value={method}
            onChange={e => setMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg"
          >
            {paymentMethods.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>
        {/* Donate Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-300 text-lg mt-2"
        >
          تبرع الآن
        </button>
      </div>
      
      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
