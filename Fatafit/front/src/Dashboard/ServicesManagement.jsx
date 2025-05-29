import React from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function ServicesManagement({
  services,
  newService,
  showAddServiceForm,
  setNewService,
  setShowAddServiceForm,
  handleAddService,
  handleDeleteService,
}) {
  return (
    <div className="space-y-6 p-6">
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
                  <label className="block text-sm font-medium mb-1">
                    اسم الخدمة
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-lg p-2"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    الفئة
                  </label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={newService.category}
                    onChange={(e) =>
                      setNewService({ ...newService, category: e.target.value })
                    }
                  >
                    <option value="الطبي">الطبي</option>
                    <option value="التعليم">التعليم</option>
                    <option value="المستلزمات">المستلزمات</option>
                    <option value="الدعم النفسي">الدعم النفسي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    رابط الصورة
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={newService.image}
                    onChange={(e) =>
                      setNewService({ ...newService, image: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    الوصف
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full border rounded-lg p-2"
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
                  className="mr-2 px-4 py-2 border rounded-lg"
                  onClick={() => setShowAddServiceForm(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg"
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
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
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
  );
}
