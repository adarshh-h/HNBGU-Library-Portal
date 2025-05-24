import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User, Mail, Phone, BookOpen, GraduationCap, Hash,
  Lock, Save, Edit, Check, X, ChevronLeft
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [messages, setMessages] = useState({ error: '', success: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await axios.get("/api/profile", { withCredentials: true });
  //       setUser(res.data.user);
  //       setFormData({
  //         name: res.data.user.name || '',
  //         email: res.data.user.email || '',
  //         phone: res.data.user.phone || '',
  //         department: res.data.user.department || '',
  //         ...(res.data.user.role === 'student' && {
  //           batch: res.data.user.batch || '',
  //           rollNumber: res.data.user.rollNumber || ''
  //         })
  //       });
  //     } catch (err) {
  //       console.error("Redirecting due to error", err);
  //       navigate("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, [navigate]);
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/profile", { withCredentials: true });

      const user = res.data?.user;
      if (!user || typeof user !== 'object') {
        throw new Error("Invalid user data");
      }

      setUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        department: user.department || '',
        ...(user.role === 'student' && {
          batch: user.batch || '',
          rollNumber: user.rollNumber || ''
        })
      });
    } catch (err) {
      console.error("Redirecting due to error", err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [navigate]);


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/profile", formData, { withCredentials: true });
      setUser(res.data.user);
      setIsEditing(false);
      setMessages({ success: 'Profile updated successfully!', error: '' });
    } catch (err) {
      setMessages({ error: err.response?.data?.message || 'Update failed', success: '' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setMessages({ error: "New password and confirmation do not match.", success: '' });
      return;
    }
    try {
      await axios.post(
        "/api/change-password",
        {
          currentPassword: passwordData.current,
          newPassword: passwordData.new
        },
        { withCredentials: true }
      );
      setMessages({ success: 'Password changed successfully!', error: '' });
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      setMessages({ error: err.response?.data?.error || 'Password change failed', success: '' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isStudent = user?.role === 'student';
  const colorScheme = isStudent ? 'green' : 'blue';

  const profileFields = [
    { icon: User, label: 'Name', key: 'name', editable: true },
    { icon: Mail, label: 'Email', key: 'email', editable: false },
    { icon: Phone, label: 'Phone', key: 'phone', editable: true },
    { icon: BookOpen, label: 'Department', key: 'department', editable: true },
    ...(isStudent ? [
      { icon: GraduationCap, label: 'Batch', key: 'batch', editable: true },
      { icon: Hash, label: 'Roll Number', key: 'rollNumber', editable: false }
    ] : [])
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${colorScheme}-100 text-${colorScheme}-800`}>
          {user.role === 'librarian' ? 'Librarian' : 'Student'}
        </div>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'profile' ? `border-b-2 border-${colorScheme}-500 text-${colorScheme}-600` : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-4 h-4" /> Profile
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'password' ? `border-b-2 border-${colorScheme}-500 text-${colorScheme}-600` : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('password')}
        >
          <Lock className="w-4 h-4" /> Password
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow p-6">
          {isEditing ? (
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {profileFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <input
                      type={field.key === 'email' ? 'email' : 'text'}
                      name={field.key}
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className={`w-full p-2 border rounded ${field.editable ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                      disabled={!field.editable}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button type="submit" className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}>
                  <Save className="inline mr-2" size={16} /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {profileFields.map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-${colorScheme}-100 text-${colorScheme}-600`}>
                      <field.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium">{user[field.key]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsEditing(true)} className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}>
                <Edit className="inline mr-2" size={16} /> Edit Profile
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'password' && (
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
            <button type="submit" className={`px-4 py-2 bg-${colorScheme}-600 text-white rounded hover:bg-${colorScheme}-700`}>
              <Lock className="inline mr-2" size={16} /> Change Password
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
