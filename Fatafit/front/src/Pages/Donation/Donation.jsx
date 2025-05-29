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
  'الموقع الإلكتروني لفتافيت السكر',
  'تطبيق فتافيت السكر للهواتف المحمولة',
  'خدمة إي فواتيركم',
  'خدمة كليك',
  'خدمة سمارت لينك',
  'مواقع فتافيت السكر في المراكز التجارية',
  'CAF America',
  'CAF Canada',
  'مركز الاتصال',
  'مقر فتافيت السكر الرئيسي',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('تم استلام تبرعك بنجاح! شكراً لدعمك');
      setSuccess(true);
      setAmount('');
    } catch (error) {
      setMessage('حدث خطأ أثناء معالجة تبرعك. يرجى المحاولة مرة أخرى.');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:px-40 md:px-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <GiftIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تبرع لدعم مستفيدي فتافيت السكر
          </h1>
          <p className="text-gray-600">ساهم معنا في دعم الأطفال المصابين بالسكري</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Currency Selection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                اختيار العملة
              </h3>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrency('JOD')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    currency === 'JOD'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  دينار اردني
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    currency === 'USD'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  دولار امريكي
                </button>
              </div>
            </div>

            {/* Amount Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                المبلغ
              </h3>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  placeholder="أدخل المبلغ المطلوب التبرع به"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                طريقة الدفع
              </h3>

              <div className="relative">
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right appearance-none bg-white"
                  required
                >
                  {paymentMethods.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCardIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !amount}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري المعالجة...
                  </div>
                ) : (
                  "تبرع الآن"
                )}
              </button>
            </div>
          </form>

          {/* Success/Error Messages */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                {success ? (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>جميع التبرعات تذهب مباشرة لدعم أطفال مستفيدي السكري</p>
        </div>
      </div>
    </div>
  );
}
