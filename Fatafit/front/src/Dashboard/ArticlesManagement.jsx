import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon } from "lucide-react";

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
    tags: "",
    author: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/articles");
      setArticles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching articles", error);
      setError("حدث خطأ أثناء تحميل المقالات");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "tags") {
          formDataToSend.append(key, formData[key].split(",").map((tag) => tag.trim()));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedArticle) {
        await axios.put(`http://localhost:5000/api/articles/${selectedArticle._id}`, formDataToSend);
      } else {
        await axios.post("http://localhost:5000/api/articles", formDataToSend);
      }

      setIsModalOpen(false);
      setSelectedArticle(null);
      setFormData({
        title: "",
        content: "",
        category: "",
        image: null,
        tags: "",
        author: "",
      });
      fetchArticles();
    } catch (error) {
      console.error("Error saving article", error);
      setError("حدث خطأ أثناء حفظ المقال");
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      image: null,
      tags: article.tags?.join(", ") || "",
      author: article.author,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article", error);
        setError("حدث خطأ أثناء حذف المقال");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المقالات</h1>
        <button
          onClick={() => {
            setSelectedArticle(null);
            setFormData({
              title: "",
              content: "",
              category: "",
              image: null,
              tags: "",
              author: "",
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة مقال جديد</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">العنوان</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الفئة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">المؤلف</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">التاريخ</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/40"}
                        alt={article.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{article.author}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(article.date).toLocaleDateString("EN-GB")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {selectedArticle ? "تعديل المقال" : "إضافة مقال جديد"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">اختر الفئة</option>
                      <option value="نصائح صحية">نصائح صحية</option>
                      <option value="قصص نجاح">قصص نجاح</option>
                      <option value="تغذية">تغذية</option>
                      <option value="تمارين">تمارين</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المؤلف</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوسوم (مفصولة بفواصل)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="مثال: صحة، تغذية، تمارين"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة</label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                      <ImageIcon className="w-5 h-5" />
                      <span>اختر صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {formData.image && (
                      <span className="text-sm text-gray-600">
                        {formData.image.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-300"
                  >
                    {selectedArticle ? "حفظ التغييرات" : "إضافة المقال"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesManagement; 