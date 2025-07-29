import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import banner from '../assets/home.png';
 
const Headers = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
 
  const handleAppointmentClick = () => {
    navigate(isLoggedIn ? '/doctors' : '/login-register');
  };
 
  return (
    <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
        <h1 className="text-5xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Welcome to OneStep Medi  </h1>
         <h1 className="text-5xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Your all-in-one healthcare services </h1>
        {/* <p className="text-custom-blue font-bold text-4xl mb-4">
          Now
        </p> */}
        <p className="text-custom-blue font-bold text-m mb-4">
          We bring medical care to your fingertips, including online and in-clinic doctor appointments, diagnostics and more..!
        </p>
        <p className="text-custom-blue font-bold text-m mb-4">
          Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.  
        </p>
        <div className="flex justify-center md:justify-center gap-4">
          <button
            onClick={handleAppointmentClick}
            className="px-6 py-3 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Video Consultant <span className="ml-2 text-xl">→</span>
          </button>
          <NavLink to="/contact">
            <button
              className="px-6 py-3 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
             Help? <span className="ml-2 text-xl">→</span>
            </button>
          </NavLink>
        </div>
      </div>
 
      {/* Right Image */}
      <div className="md:w-3/4 flex justify-center">
        <img src={banner} alt="Healthcare" className="max-w-full h-auto max-h-[30vh]" />
      </div>
    </div>
  );
};
 
export default Headers;