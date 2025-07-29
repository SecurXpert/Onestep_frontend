import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaStethoscope, FaFileMedical, FaStar, FaGift, FaHeart, FaBook, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { name: 'Profile', icon: FaUser, path: '/profilepage' },
    { name: 'My Orders', icon: FaShoppingCart, path: '/myorder' },
    { name: 'My Consultations', icon: FaStethoscope, path: '/myconsultations' },
    { name: 'Health Records', icon: FaFileMedical, path: '/health-record' },
    { name: 'Rate Your Recent Consultation', icon: FaStar, path: '/rate' },
    { name: 'My Rewards', icon: FaGift, path: '/reward' },
    { name: 'Health Plans', icon: FaHeart, path: '/healthplan' },
    { name: 'Blogs', icon: FaBook, path: '/blogs' },
    { name: 'Need Help?', icon: FaQuestionCircle, path: '/need' },
    { name: 'About Us', icon: FaInfoCircle, path: '/aboutus' },
    { name: 'Logout', icon: FaSignOutAlt, path: '/logout' },
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login-register');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-purple-800 mb-6">Menu</h2>
        {sidebarItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-purple-100 ${
              location.pathname === item.path ? 'bg-purple-200' : ''
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="text-purple-600 mr-3" />
            <span className="text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;