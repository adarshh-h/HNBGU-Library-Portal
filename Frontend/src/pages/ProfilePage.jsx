import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Hash,
  Lock,
  Save,
  Edit,
  Check,
  X,
  ChevronLeft,
} from "lucide-react";
const API_BASE_URL = "http://localhost:5000";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [messages, setMessages] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Determine the correct endpoint based on URL path
        const endpoint = window.location.pathname.includes("librarian")
          ? `${API_BASE_URL}/api/admin/profile`
          : `${API_BASE_URL}/api/student/profile`;

        console.log("Fetching profile from:", endpoint);

        const res = await axios.get(endpoint, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Profile API Response:", res.data);

        // Handle response
        const userData = res.data.user || res.data;

        if (!userData) {
          throw new Error("No user data received from server");
        }

        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          department: userData.department || "",
          ...(userData.role === "student" && {
            batch: userData.batch || "",
            rollNumber: userData.rollNumber || "",
          }),
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load profile"
        );

        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = window.location.pathname.includes("librarian")
        ? `${API_BASE_URL}/api/admin/profile`
        : `${API_BASE_URL}/api/student/profile`;

      const res = await axios.put(endpoint, formData, {
        withCredentials: true,
      });

      setUser(res.data.user || res.data);
      setIsEditing(false);
      setMessages({ success: "Profile updated successfully!", error: "" });
    } catch (err) {
      setMessages({
        error: err.response?.data?.message || "Update failed",
        success: "",
      });
    }
  };

  // const handlePasswordSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate inputs
  //   if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
  //     setMessages({ error: "All password fields are required", success: '' });
  //     return;
  //   }

  //   if (passwordData.new.length < 6) {
  //     setMessages({ error: "New password must be at least 6 characters", success: '' });
  //     return;
  //   }

  //   if (passwordData.new !== passwordData.confirm) {
  //     setMessages({ error: "New password and confirmation do not match", success: '' });
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       `${API_BASE_URL}/api/admin/change-password`,
  //       {
  //         currentPassword: passwordData.current,
  //         newPassword: passwordData.new
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );

  //     if (response.data.success) {
  //       setMessages({
  //         success: response.data.message || 'Password changed successfully!',
  //         error: ''
  //       });
  //       setPasswordData({ current: '', new: '', confirm: '' });

  //       // Optional: Force logout after password change
  //       setTimeout(() => {
  //         navigate('/logout');
  //       }, 2000);
  //     } else {
  //       setMessages({
  //         error: response.data.error || 'Password change failed',
  //         success: ''
  //       });
  //     }
  //   } catch (err) {
  //     setMessages({
  //       error: err.response?.data?.error ||
  //             err.response?.data?.message ||
  //             'Password change failed. Please try again.',
  //       success: ''
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setMessages({ error: "All password fields are required", success: "" });
      return;
    }

    if (passwordData.new.length < 6) {
      setMessages({
        error: "New password must be at least 6 characters",
        success: "",
      });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setMessages({
        error: "New password and confirmation do not match",
        success: "",
      });
      return;
    }

    try {
      setLoading(true);

      // 👇 Determine route based on role
      const passwordEndpoint = window.location.pathname.includes("librarian")
        ? `${API_BASE_URL}/api/admin/change-password`
        : `${API_BASE_URL}/api/student/change-password`;

      const response = await axios.post(
        passwordEndpoint,
        {
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessages({
          success: response.data.message || "Password changed successfully!",
          error: "",
        });
        setPasswordData({ current: "", new: "", confirm: "" });

        // Optional: logout after 2 seconds
        setTimeout(() => {
          navigate("/logout");
        }, 2000);
      } else {
        setMessages({
          error: response.data.error || "Password change failed",
          success: "",
        });
      }
    } catch (err) {
      setMessages({
        error:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Password change failed. Please try again.",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Loading profile data...</span>
      </div>
    );
  }

  const isStudent = user?.role === "student";
  const colorScheme = isStudent ? "green" : "blue";

  const profileFields = [
    { icon: User, label: "Name", key: "name", editable: true },
    { icon: Mail, label: "Email", key: "email", editable: false },
    { icon: Phone, label: "Phone", key: "phone", editable: true },
    { icon: BookOpen, label: "Department", key: "department", editable: true },
    ...(isStudent
      ? [
        { icon: GraduationCap, label: "Batch", key: "batch", editable: true },
        {
          icon: Hash,
          label: "Roll Number",
          key: "rollNumber",
          editable: false,
        },
      ]
      : []),
  ];
  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium bg-${colorScheme}-100 text-${colorScheme}-800`}
        >
          {isStudent ? "Student" : "Librarian"}
        </div>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "profile"
            ? `border-b-2 border-${colorScheme}-500 text-${colorScheme}-600`
            : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("profile")}
        >
          <User className="w-4 h-4" /> Profile
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "password"
            ? `border-b-2 border-${colorScheme}-500 text-${colorScheme}-600`
            : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("password")}
        >
          <Lock className="w-4 h-4" /> Password
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="bg-white rounded-lg shadow p-6">
          {isEditing ? (
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {profileFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.key === "email" ? "email" : "text"}
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className={`w-full p-2 border rounded ${field.editable ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                      disabled={!field.editable}
                      required={field.editable}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}
                >
                  <Save className="inline mr-2" size={16} /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {profileFields.map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full bg-${colorScheme}-100 text-${colorScheme}-600`}
                    >
                      <field.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium">
                        {user[field.key] || "Not provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}
              >
                <Edit className="inline mr-2" size={16} /> Edit Profile
              </button>
            </div>
          )}
        </div>
      )}

      {/* {activeTab === 'password' && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  name="new"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}
            >
              <Lock className="inline mr-2" size={16} /> Change Password
            </button>
          </form>
        </div>
      )} */}
      {activeTab === "password" && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password (min 6 chars)
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="inline mr-2" size={16} />
                  Change Password
                </>
              )}
            </button>
          </form>
        </div>
      )}
      {messages.error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded flex items-start gap-2">
          <X className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>{messages.error}</p>
        </div>
      )}
      {messages.success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded flex items-start gap-2">
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>{messages.success}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
