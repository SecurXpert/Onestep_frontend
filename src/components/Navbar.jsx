// import React, { useContext, useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
// import myImage from '../assets/logo.png';
// import cmplogo from '../assets/cmplogo.png';
// import { AuthContext } from '../context/AuthContext';
 
// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
 
//   // Fetch profile image from sessionStorage on mount
//   useEffect(() => {
//     const storedImage = sessionStorage.getItem('profileImage');
//     if (storedImage) {
//       const img = new Image();
//       img.src = storedImage;
//       img.onload = () => setProfileImage(storedImage);
//       img.onerror = () => {
//         console.error('Failed to load profile image from sessionStorage:', storedImage);
//         setProfileImage(null);
//         sessionStorage.removeItem('profileImage');
//       };
//     }
//   }, []);
 
//   const handleRegisterClick = () => navigate('/login-register');
 
//   // Toggle profile menu
//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen((prev) => !prev);
//   };
 
//   // Toggle mobile menu
//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//     // Close profile menu if mobile menu is opened
//     if (isProfileMenuOpen) setIsProfileMenuOpen(false);
//   };
 
//   // Handle logout
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsProfileMenuOpen(false);
//     setProfileImage(null); // Clear profile image on logout
//     sessionStorage.removeItem('profileImage'); // Clear from sessionStorage
//   };
 
//   // Handle image load error
//   const handleImageError = (e) => {
//     console.error('Failed to load profile image in Navbar');
//     setProfileImage(null);
//     sessionStorage.removeItem('profileImage');
//     e.target.src = 'https://placehold.co/80x80?text=Profile';
//   };
 
//   return (
//     <nav className="bg-white shadow fixed top-0 left-0 right-0 z-40">
//       <div className="w-full px-8 md:px-12">
//         <div className="flex justify-between items-center h-20">
//           {/* Left Logo */}
//           <div className="flex-shrink-0">
//             <NavLink to="/">
//               <img src={myImage} alt="Logo" className="h-16 w-auto" />
//             </NavLink>
//           </div>
 
//           {/* Center Nav Links (Desktop) */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <NavLink to="/" className="nav-link">
//               Home<hr />
//             </NavLink>
//             <NavLink to="/about" className="nav-link">
//               AboutUs<hr />
//             </NavLink>
//             <NavLink to="/doctors" className="nav-link">
//              Find Doctors<hr />
//             </NavLink>
//             <NavLink to="/contact" className="nav-link">
//               ContactUs<hr />
//             </NavLink>
//           </div>
 
//           {/* Right: Auth Buttons, Menu Icon & Company Logo */}
//           <div className="flex items-center space-x-4 relative">
//             <NavLink to="/" className="hidden md:block">
//               <img src={cmplogo} alt="Company Logo" className="h-10 w-auto" />
//             </NavLink>
//             {!isLoggedIn ? (
//               <button
//                 onClick={handleRegisterClick}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
//               >
//                 Login/Register
//               </button>
//             ) : (
//               <div className="relative">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-purple-100"
//                     onClick={toggleProfileMenu}
//                     onError={handleImageError}
//                   />
//                 ) : (
//                   <FaUserCircle
//                     className="text-3xl text-purple-700 cursor-pointer"
//                     onClick={toggleProfileMenu}
//                   />
//                 )}
//                 {/* Profile Dropdown Menu */}
//                 {isProfileMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
//                     <div className="flex flex-col p-4 space-y-2">
//                       <NavLink
//                         to="/profilepage"
//                         className="text-gray-700 hover:text-purple-700"
//                         onClick={toggleProfileMenu}
//                       >
//                         My Profile
//                       </NavLink>
//                       <button
//                         onClick={handleLogout}
//                         className="text-left text-red-600 hover:text-purple-700"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             {/* Mobile Menu Icon */}
//             <div className="md:hidden">
//               <FaBars
//                 className="text-3xl text-purple-700 cursor-pointer"
//                 onClick={toggleMenu}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
 
//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 h-auto w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         } md:hidden`}
//       >
//         <div className="flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <NavLink to="/" onClick={toggleMenu}>
//               <img src={cmplogo} alt="Company Logo" className="h-10 w-auto" />
//             </NavLink>
//             <FaTimes
//               className="text-2xl text-purple-700 cursor-pointer"
//               onClick={toggleMenu}
//             />
//           </div>
//           <div className="flex flex-col p-4 space-y-4">
//             <NavLink
//               to="/"
//               className="text-lg text-gray-700 hover:text-purple-700"
//               onClick={toggleMenu}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/about"
//               className="text-lg text-gray-700 hover:text-purple-700"
//               onClick={toggleMenu}
//             >
//               AboutUs
//             </NavLink>
//             <NavLink
//               to="/doctors"
//               className="text-lg text-gray-700 hover:text-purple-700"
//               onClick={toggleMenu}
//             >
//               Doctors
//             </NavLink>
//             <NavLink
//               to="/contact"
//               className="text-lg text-gray-700 hover:text-purple-700"
//               onClick={toggleMenu}
//             >
//               ContactUs
//             </NavLink>
//             {isLoggedIn && (
//               <>
//                 <NavLink
//                   to="/profilepage"
//                   className="text-lg text-gray-700 hover:text-purple-700"
//                   onClick={toggleMenu}
//                 >
//                   My Profile
//                 </NavLink>
//                 <NavLink
//                   to="/myappointment"
//                   className="text-lg text-gray-700 hover:text-purple-700"
//                   onClick={toggleMenu}
//                 >
//                   My Appointment
//                 </NavLink>
//                 <NavLink
//                   to="/user-dash"
//                   className="text-lg text-gray-700 hover:text-purple-700"
//                   onClick={toggleMenu}
//                 >
//                   My Prescription
//                 </NavLink>
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate('/');
//                     toggleMenu();
//                   }}
//                   className="text-lg text-left text-red-600 hover:text-purple-700"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
 
//       {/* Overlay for Mobile Menu */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
//           onClick={toggleMenu}
//         ></div>
//       )}
 
//       {/* Overlay for Profile Menu */}
//       {isProfileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:block"
//           onClick={toggleProfileMenu}
//         ></div>
//       )}
//     </nav>
//   );
// };
 
// export default Navbar;


import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import myImage from '../assets/logo.png';
import cmplogo from '../assets/cmplogo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile image from sessionStorage on mount
  useEffect(() => {
    const storedImage = sessionStorage.getItem('profileImage');
    if (storedImage) {
      const img = new Image();
      img.src = storedImage;
      img.onload = () => setProfileImage(storedImage);
      img.onerror = () => {
        console.error('Failed to load profile image from sessionStorage:', storedImage);
        setProfileImage(null);
        sessionStorage.removeItem('profileImage');
      };
    }
  }, []);

  const handleRegisterClick = () => navigate('/login-register');

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login-register');
    setIsProfileMenuOpen(false);
    setProfileImage(null);
    sessionStorage.removeItem('profileImage');
  };

  // Handle image load error
  const handleImageError = (e) => {
    console.error('Failed to load profile image in Navbar');
    setProfileImage(null);
    sessionStorage.removeItem('profileImage');
    e.target.src = '/assets/fallback-profile.png'; // Local fallback image
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-40">
      <div className="w-full px-8 md:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={myImage} alt="Logo" className="h-16 w-auto" />
            </NavLink>
          </div>
 
          {/* Center Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className="nav-link">
              Home<hr />
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About Us<hr />
            </NavLink>
            <NavLink to="/doctors" className="nav-link">
              Find Doctors<hr />
            </NavLink>
            {/* <NavLink to="/pharmacy" className="nav-link">
              Pharmacy<hr />
            </NavLink>
            <NavLink to="/pharmacy" className="nav-link">
              Lab Test<hr />
            </NavLink> */}
            <NavLink to="/article" className="nav-link">
              Articles<hr />
            </NavLink>
             {/* <NavLink to="/contact" className="nav-link">
              Contact Us<hr />
            </NavLink>
             <NavLink to="/contact" className="nav-link">
              Help?<hr />
            </NavLink> */}
           
          </div>
          <div className="flex items-center space-x-4 relative">
            {/* Contact Us and Help? buttons for Desktop */}
            <div className="hidden md:flex space-x-4">
              <NavLink to="/contact" className="nav-link">
                Contact Us<hr />
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Help?<hr />
              </NavLink>
            </div>
 
          {/* Right: Auth Buttons, Menu Icon & Company Logo */}
          <div className="flex items-center space-x-4 relative">
            {!isLoggedIn ? (
              <button
                onClick={handleRegisterClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
              >
                Login/Register
              </button>
            ) : (
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-purple-100"
                    onClick={toggleProfileMenu}
                    onError={handleImageError}
                  />
                ) : (
                  <FaUserCircle
                    className="text-3xl text-purple-700 cursor-pointer"
                    onClick={toggleProfileMenu}
                  />
                )}
                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                    <div className="flex flex-col p-4 space-y-2">
                      <NavLink
                        to="/profilepage"
                        className="text-gray-700 hover:text-purple-700"
                        onClick={toggleProfileMenu}
                      >
                        My Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="text-left text-red-600 hover:text-purple-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <FaBars
                className="text-3xl text-purple-700 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-auto w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <NavLink to="/" onClick={toggleMenu}>
              <img src={cmplogo} alt="Company Logo" className="h-10 w-auto" />
            </NavLink>
            <FaTimes
              className="text-2xl text-purple-700 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <NavLink
              to="/"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              AboutUs
            </NavLink>
            <NavLink
              to="/doctors"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/article"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Articles
            </NavLink>
            <NavLink
              to="/contact"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/contact"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Help?
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/profilepage"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/myappointment"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Appointment
                </NavLink>
                <NavLink
                  to="/user-dash"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Prescription
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    toggleMenu();
                  }}
                  className="text-lg text-left text-red-600 hover:text-purple-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Overlay for Profile Menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:block"
          onClick={toggleProfileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;