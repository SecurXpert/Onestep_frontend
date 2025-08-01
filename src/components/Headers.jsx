import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import banner from '../assets/home.png';
import home1 from '../assets/home3.png';

const Headers = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleAppointmentClick = () => {
    navigate(isLoggedIn ? '/doctors' : '/login-register');
  };

  return (
    <div className="w-full min-h-[45vh] mx-auto bg-b3d8e4-gradient flex flex-col lg:flex-row items-center justify-between ">
      {/* Left Content */}
      <div className="w-full lg:w-3/4 mb-6 lg:mb-0 text-center lg:text-left lg:pl-12 xl:pl-28 2xl:pl-24 3xl:pl-36 lg:pr-8">
        <h1 className="text-2xl 2xs:text-2xl xs:text-2xl 2sm:text-3xl sm:text-3xl md:text-4xl md800:text-4xl md900:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-4xl font-bold text-custom-blue mb-2 sm:mb-3 md:mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
          Welcome to OneStep Medi
        </h1>
        <h1 className="text-2xl 2xs:text-2xl xs:text-2xl 2sm:text-3xl sm:text-3xl md:text-4xl md800:text-4xl md900:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl 3xl:text-4xl font-bold text-custom-blue mb-2 sm:mb-3 md:mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
          Your all-in-one healthcare services
        </h1>
        <p className="text-custom-blue font-bold text-xs 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm mb-2 sm:mb-3 md:mb-4">
          We bring medical care to your fingertips, including online and in-clinic doctor appointments, diagnostics, and more..!
        </p>
        <p className="text-custom-blue font-bold text-xs 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm mb-4 sm:mb-5 md:mb-6">
          Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
        </p>
        <div className="flex pl-20  gap-4">
          <button
            onClick={handleAppointmentClick}
            className="px-4 py-2 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Video Consultant <span className="ml-2 text-lg">→</span>
          </button>
          <NavLink to="/contact">
            <button
              className="px-4 py-2 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              Help? <span className="ml-2 text-lg">→</span>
            </button>
          </NavLink>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-[50%] flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-0">
        <img 
          src={home1} 
          alt="Healthcare" 
          className="w-full max-w-xs 2xs:max-w-xs xs:max-w-xs 2sm:max-w-sm sm:max-w-sm md:max-w-md md800:max-w-md md900:max-w-lg lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl h-auto max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] lg:max-h-[50vh]" 
        />
      </div>
    </div>
  );
};

export default Headers;