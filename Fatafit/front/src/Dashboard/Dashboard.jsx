import { useState, useEffect } from "react";
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
} from "lucide-react";

// Color palette from the image
const colors = {
  skyBlue: "#87CEEB",
  softPink: "#FF8BBD0",
  lavender: "#E6E6FA",
  mintGreen: "#A8E6CF",
  lightYellow: "#FFF9C4",
  lightGray: "#F2F2F2",
  background: "#FFFCF0",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  // Sample data
  const [statistics, setStatistics] = useState({
    totalPatients: 1287,
    newRegistrations: 45,
    upcomingAppointments: 23,
    donationsThisMonth: 13500,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      age: 12,
      joinDate: "2025-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 9,
      joinDate: "2025-04-02",
      status: "Active",
    },
    {
      id: 3,
      name: "Sophia Patel",
      age: 14,
      joinDate: "2025-02-28",
      status: "Inactive",
    },
    {
      id: 4,
      name: "James Wilson",
      age: 7,
      joinDate: "2025-04-22",
      status: "Active",
    },
    {
      id: 5,
      name: "Olivia Garcia",
      age: 11,
      joinDate: "2025-03-10",
      status: "Active",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Diabetes Awareness Workshop",
      date: "2025-05-15",
      location: "Main Center",
    },
    {
      id: 2,
      title: "Family Support Group",
      date: "2025-05-20",
      location: "Online Zoom",
    },
    {
      id: 3,
      title: "Nutrition Seminar",
      date: "2025-05-25",
      location: "Community Hall",
    },
  ]);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Diabetes Education",
      description: "Educational programs for children and families",
      category: "Education",
    },
    {
      id: 2,
      name: "Medical Supplies",
      description: "Free glucose monitors and testing supplies",
      category: "Supplies",
    },
    {
      id: 3,
      name: "Counseling",
      description: "Mental health support for affected families",
      category: "Support",
    },
  ]);

  // Forms state
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "Education",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    status: "Active",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
  });
  const [donationAmount, setDonationAmount] = useState("");

  const handleAddService = (e) => {
    e.preventDefault();
    const id = services.length + 1;
    setServices([...services, { id, ...newService }]);
    setNewService({ name: "", description: "", category: "Education" });
    setShowAddServiceForm(false);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    const joinDate = new Date().toISOString().split("T")[0];
    setUsers([...users, { id, ...newUser, joinDate }]);
    setNewUser({ name: "", age: "", status: "Active" });
    setShowAddUserForm(false);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const id = events.length + 1;
    setEvents([...events, { id, ...newEvent }]);
    setNewEvent({ title: "", date: "", location: "" });
    setShowAddEventForm(false);
  };

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    if (!isNaN(amount)) {
      setStatistics({
        ...statistics,
        donationsThisMonth: statistics.donationsThisMonth + amount,
      });
      setDonationAmount("");
      alert(`Thank you for your donation of $${amount}!`);
    }
  };

  return (
    <div
      className="flex h-screen bg-yellow-50"
      style={{ backgroundColor: colors.background }}
    >
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 text-xl font-bold text-center text-teal-600">
          Children's Diabetes Association
        </div>
        <div className="p-2">
          <div className="flex flex-col space-y-1">
            <SidebarItem
              icon={<Home />}
              text="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={<Users />}
              text="Users"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <SidebarItem
              icon={<Activity />}
              text="Services"
              active={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            />
            <SidebarItem
              icon={<CalendarDays />}
              text="Events"
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            />
            <SidebarItem
              icon={<Newspaper />}
              text="News"
              active={activeTab === "news"}
              onClick={() => setActiveTab("news")}
            />
            <SidebarItem
              icon={<PieChart />}
              text="Statistics"
              active={activeTab === "statistics"}
              onClick={() => setActiveTab("statistics")}
            />
            <SidebarItem
              icon={<Heart />}
              text="Donations"
              active={activeTab === "donations"}
              onClick={() => setActiveTab("donations")}
            />
            <div className="pt-8 mt-6 border-t border-gray-200">
              <SidebarItem icon={<Settings />} text="Settings" />
              <SidebarItem icon={<LogOut />} text="Logout" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="w-4 h-4 absolute top-2.5 right-3 text-gray-400" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={<Users className="w-6 h-6 text-purple-500" />}
                  title="Total Patients"
                  value={statistics.totalPatients}
                  color={colors.lavender}
                />
                <StatCard
                  icon={<UserPlus className="w-6 h-6 text-blue-500" />}
                  title="New Registrations"
                  value={statistics.newRegistrations}
                  color={colors.skyBlue}
                />
                <StatCard
                  icon={<Calendar className="w-6 h-6 text-green-500" />}
                  title="Upcoming Appointments"
                  value={statistics.upcomingAppointments}
                  color={colors.mintGreen}
                />
                <StatCard
                  icon={<DollarSign className="w-6 h-6 text-pink-500" />}
                  title="Donations This Month"
                  value={`$${statistics.donationsThisMonth.toLocaleString()}`}
                  color={colors.softPink}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
                  <h2 className="text-lg font-semibold mb-4">
                    Recent Activities
                  </h2>
                  <div className="space-y-4">
                    <ActivityItem
                      icon={<UserPlus className="w-5 h-5 text-blue-500" />}
                      title="New Patient Registration"
                      description="Emily Thompson, 8 years old"
                      time="2 hours ago"
                    />
                    <ActivityItem
                      icon={<Calendar className="w-5 h-5 text-green-500" />}
                      title="Appointment Scheduled"
                      description="Check-up with Dr. Martinez"
                      time="Yesterday"
                    />
                    <ActivityItem
                      icon={<DollarSign className="w-5 h-5 text-pink-500" />}
                      title="Donation Received"
                      description="$500 from Local Business Association"
                      time="2 days ago"
                    />
                    <ActivityItem
                      icon={<AlertCircle className="w-5 h-5 text-yellow-500" />}
                      title="Supply Alert"
                      description="Glucose test strips running low"
                      time="3 days ago"
                    />
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Upcoming Events
                  </h2>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-12 h-12 flex flex-col items-center justify-center bg-blue-100 rounded-lg">
                          <span className="text-xs font-medium text-blue-800">
                            {new Date(event.date).toLocaleString("default", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-lg font-bold text-blue-800">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={() => setActiveTab("events")}
                    >
                      View all events
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Services</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddServiceForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {showAddServiceForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Add New Service</h3>
                  <form onSubmit={handleAddService}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                          Category
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newService.category}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="Education">Education</option>
                          <option value="Supplies">Supplies</option>
                          <option value="Support">Support</option>
                          <option value="Medical">Medical</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="3"
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
                    <div className="flex justify-end mt-4 space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => setShowAddServiceForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {service.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {service.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              service.category === "Education"
                                ? "bg-blue-100 text-blue-800"
                                : ""
                            }
                            ${
                              service.category === "Supplies"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                            ${
                              service.category === "Support"
                                ? "bg-purple-100 text-purple-800"
                                : ""
                            }
                            ${
                              service.category === "Medical"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }
                          `}
                          >
                            {service.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Users</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddUserForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>

              {showAddUserForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Add New User</h3>
                  <form onSubmit={handleAddUser}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          max="18"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.age}
                          onChange={(e) =>
                            setNewUser({ ...newUser, age: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newUser.status}
                          onChange={(e) =>
                            setNewUser({ ...newUser, status: e.target.value })
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => setShowAddUserForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save User
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          `}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Events</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                  onClick={() => setShowAddEventForm(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>

              {showAddEventForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Add New Event</h3>
                  <form onSubmit={handleAddEvent}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={newEvent.location}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => setShowAddEventForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save Event
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <div className="bg-blue-100 p-6">
                      <div className="text-center">
                        <p className="text-sm text-blue-700 font-medium">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-gray-900">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-gray-700 mb-1">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <div className="mt-1">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">News & Updates</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition">
                  <Plus className="w-4 h-4" />
                  <span>Add News</span>
                </button>
              </div>

              <div className="space-y-6">
                <NewsItem
                  title="New Diabetes Management App Released"
                  date="May 5, 2025"
                  content="We're excited to announce the launch of our new mobile app designed specifically for children with diabetes. The app features glucose tracking, medication reminders, and educational games to help children better understand their condition."
                  image="/api/placeholder/400/250"
                />
                <NewsItem
                  title="Annual Fundraising Gala Raises Over $50,000"
                  date="April 28, 2025"
                  content="Thanks to our generous donors and supporters, our annual Spring Gala was a tremendous success, raising over $50,000 to support our programs for children with diabetes. These funds will help provide medical supplies, education, and support services."
                  image="/api/placeholder/400/250"
                />
                <NewsItem
                  title="New Support Groups Starting Next Month"
                  date="April 15, 2025"
                  content="We're launching new virtual support groups for families of children with diabetes. These weekly sessions will be facilitated by experienced counselors and provide a space for sharing experiences and strategies."
                  image="/api/placeholder/400/250"
                />
              </div>
            </div>
          )}

          {activeTab === "statistics" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">
                Statistics & Analytics
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-md font-medium mb-4">
                    Patient Demographics
                  </h3>
                  <div className="h-64 flex items-center justify-center">
                    <DemographicsChart />
                  </div>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="text-md font-medium mb-4">
                    Monthly Registrations
                  </h3>
                  <div className="h-64 flex items-center justify-center">
                    <RegistrationsChart />
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 rounded-lg">
                  <h3 className="text-md font-medium mb-4">Service Usage</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ServiceUsageChart />
                  </div>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h3 className="text-md font-medium mb-4">Donation Trends</h3>
                  <div className="h-64 flex items-center justify-center">
                    <DonationTrendsChart />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "donations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Make a Donation</h2>
                <form onSubmit={handleDonation}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Donation Amount ($)
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                          <span className="font-medium">Credit Card</span>
                        </div>
                        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                          <span className="font-medium">PayPal</span>
                        </div>
                        <div className="border border-gray-300 rounded-md p-3 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Donate Now</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">
                  How Your Donation Helps
                </h2>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Medical Supplies</h3>
                      <p className="text-sm text-gray-600">
                        Your donation helps provide essential medical supplies
                        like glucose monitors, test strips, and insulin to
                        families in need.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Education Programs</h3>
                      <p className="text-sm text-gray-600">
                        We provide educational resources and workshops for
                        children and families to better understand and manage
                        diabetes.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Support Groups</h3>
                      <p className="text-sm text-gray-600">
                        We offer support groups and counseling services to help
                        children and families cope with the emotional aspects of
                        diabetes.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Camp Programs</h3>
                      <p className="text-sm text-gray-600">
                        Your donations fund summer camp programs where children
                        with diabetes can have fun while learning important
                        self-management skills.
                      </p>
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

// Component for sidebar items
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer 
        ${
          active
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      onClick={onClick}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

// Component for dashboard stat cards
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5" style={{ backgroundColor: color }}>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for activity items
function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Component for news items
function NewsItem({ title, date, content, image }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6">
      <div className="md:w-1/3">
        <img
          src={image}
          alt={title}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>
      <div className="md:w-2/3">
        <span className="text-sm text-gray-500">{date}</span>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-gray-600 mt-2">{content}</p>
        <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm">
          Read more →
        </button>
      </div>
    </div>
  );
}

// Sample chart components
function DemographicsChart() {
  const data = [
    { name: "0-5", value: 15 },
    { name: "6-10", value: 30 },
    { name: "11-14", value: 35 },
    { name: "15-18", value: 20 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-4 gap-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-full bg-blue-200 rounded-t-lg"
              style={{ height: `${item.value * 3}px` }}
            ></div>
            <div className="text-xs font-medium mt-1">{item.name}</div>
            <div className="text-xs text-gray-500">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegistrationsChart() {
  const data = [
    { month: "Jan", value: 18 },
    { month: "Feb", value: 22 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 25 },
    { month: "May", value: 45 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-5 gap-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-full bg-green-200 rounded-t-lg"
              style={{ height: `${item.value * 2}px` }}
            ></div>
            <div className="text-xs font-medium mt-1">{item.month}</div>
            <div className="text-xs text-gray-500">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceUsageChart() {
  const data = [
    { name: "Education", value: 35 },
    { name: "Supplies", value: 30 },
    { name: "Support", value: 20 },
    { name: "Medical", value: 15 },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100">
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;

            // Convert to radians
            const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
            const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

            // Calculate path
            const x1 = 50 + 40 * Math.cos(startAngleRad);
            const y1 = 50 + 40 * Math.sin(startAngleRad);
            const x2 = 50 + 40 * Math.cos(endAngleRad);
            const y2 = 50 + 40 * Math.sin(endAngleRad);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            const colors = ["#A8E6CF", "#87CEEB", "#E6E6FA", "#FFF9C4"];

            startAngle = endAngle;

            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="#fff"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
      <div className="ml-6 space-y-1">
        {data.map((item, index) => {
          const colors = ["#A8E6CF", "#87CEEB", "#E6E6FA", "#FFF9C4"];
          return (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-sm mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-xs">
                {item.name}: {item.value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DonationTrendsChart() {
  const data = [
    { month: "Jan", value: 8500 },
    { month: "Feb", value: 12000 },
    { month: "Mar", value: 9800 },
    { month: "Apr", value: 11500 },
    { month: "May", value: 13500 },
  ];

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex w-full h-48 items-end">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center pb-5">
              <div
                className="w-4/5 bg-purple-200 rounded-t-lg relative"
                style={{ height: `${height}%` }}
              >
                <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                  ${(item.value / 1000).toFixed(1)}k
                </span>
              </div>
              <span className="text-xs mt-1">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
