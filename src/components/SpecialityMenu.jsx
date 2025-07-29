import React from 'react';
import { useNavigate } from 'react-router-dom';
import { specialitymenu } from '../assets/assets';
import dental from '../assets/dental.jpg';
import ent from '../assets/ent.png';
import Ophthalmologist from '../assets/Ophthalmologist.png';
import derma from '../assets/derma.png';
import  physiotherapist from '../assets/phys.jpg';
import phys from '../assets/physiotherapist.png';
import nutritionist from '../assets/nutritionist.jpg';
import nurse from '../assets/nurse.png';

const SpecialityMenu = () => {
  const navigate = useNavigate();

  const handleClick = (specialtyName) => {
    navigate(`/doctors/${encodeURIComponent(specialtyName)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    const locality = formData.get('locality');
    const searchTerm = formData.get('searchTerm');
    console.log({ city, locality, searchTerm });
  };

  const handleViewAll = () => {
    navigate('/doctors');
  };
 const handleSeeAllArticles = () => {
    // Implement navigation to articles page
    navigate('/article');
  };
  return (
    <div className="w-full bg-b3d8e4-gradient py-10">
      {/* Search Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-8">
  <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
    <div className="relative w-full md:w-2/3 flex border border-gray-300 rounded-lg overflow-hidden">
      <div className="relative w-1/3 border-r border-gray-300">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          className="w-full pl-10 pr-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
        />
      </div>
      <input
        type="text"
        name="locality"
        placeholder="Enter Locality"
        className="w-1/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
      />
      <input
        type="text"
        name="searchTerm"
        placeholder="Doctor Name or Hospital or Specialist"
        className="w-1/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
      />
    </div>
    <button
      type="submit"
      className="w-full md:w-auto px-6 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Search
    </button>
  </form>
</div>

      <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h2 className="text-2xl text-custom-blue font-bold mb-2">Connect with top doctor specialists for all your healthcare needs</h2>
          <p className="text-custom-blue">Schedule online or in-clinic consultations with verified specialists...</p>
          {/* <p className="text-custom-blue font-bold text-m mb-4">Schedule online or in-clinic consultations with verified specialists</p> */}
        </div>
        
        <button
          onClick={handleViewAll}
          className="px-6 py-2 bg-custom-blue text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300"
        >
          View All 
        </button>
      </div>

      {/* Marquee Container with constrained width */}
      <div className="relative overflow-hidden w-full flex justify-center">
        {/* Constrained marquee */}
        <div className="w-full max-w-7xl mx-auto overflow-hidden group">
          {/* Seamless marquee animation */}
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{
              animation: 'marquee 40s linear infinite',
              width: 'max-content',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {/* Duplicate the menu multiple times to ensure seamless looping */}
            {[...specialitymenu, ...specialitymenu, ...specialitymenu].map((specialty, index) => (
              <div
                key={index}
                className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 pt-2"
                onClick={() => handleClick(specialty.name)}
              >
                <div className="w-24 h-24 bg-custom-blue md:w-36 md:h-36 rounded-full border-2 border-custom-blue overflow-hidden shadow-md">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-custom-blue text-center mt-2">
                  {specialty.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In-Clinic Consultation Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Book an in-clinic appointment with our Experienced & Verified Doctors </h2>
        <p className="text-gray-600 mb-6">Find Nearby Specialists for Your Health Needs – Easy and Fast </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <img src={dental} alt="Orthopedist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Dentist</h3>
            <p className="text-sm text-gray-600 text-center">for dental care, cleaning, root canal, etc.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={derma} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Cosmetologist / Dermatologist</h3>
            <p className="text-sm text-gray-600 text-center">For skin, hair, and aesthetic treatments</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={ent} alt="Orthopedist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">ENT Specialist</h3>
            <p className="text-sm text-gray-600 text-center">For ear, nose, and throat disorders</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={Ophthalmologist} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Ophthalmologist</h3>
            <p className="text-sm text-gray-600 text-center">for eye checkups, vision problems, and surgeries. </p>
          </div>
        </div>
      </div>
          <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Expert HealthCare – Right at Your Doorstep </h2>
        <p className="text-gray-600 mb-6">Book trusted specialists nearby for quick consultations and appointments </p> 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <img src={phys} alt="Physiotherapist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Physiotherapist</h3>
            <p className="text-sm text-gray-600 text-center">for recovery, rehabilitation, and mobility support.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={nutritionist} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Nutritionist / Dietitian</h3>
            <p className="text-sm text-gray-600 text-center">for personalized diet planning and nutrition advice.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={physiotherapist} alt="Orthopedist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">General Physician</h3>
            <p className="text-sm text-gray-600 text-center">for fever, infections, chronic conditions, and elderly care</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={nurse} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Nurse / Elderly Care Assistant</h3>
            <p className="text-sm text-gray-600 text-center">for post-surgical care, injections, wound dressing</p>
          </div>
        </div>
      </div>
        <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-8 flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Read top articles from health experts</h2>
          <p className="text-gray-600 mb-4">Health articles that keep you informed about good health practices and achieve your goals.</p>
          <button
            onClick={handleSeeAllArticles}
            className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors mt-10"
          >
            See all articles
          </button>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start">
            <img src="/images/coronavirus.jpg" alt="Coronavirus" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">FOOD</h3>
            <p className="text-sm text-gray-600">“Top 5 Foods That Naturally Whiten Your Teeth”</p>
            <p className="text-xs text-gray-500">Dr. Diana Borgio</p>
          </div>
          <div className="flex flex-col items-start">
            <img src="/images/vitamins.jpg" alt="Vitamins and Supplements" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">DERMA</h3>
            <p className="text-sm text-gray-600"> “Clear Skin from Within: Foods That Fight Acne” </p>
            <p className="text-xs text-gray-500">Dr. Diana Borgio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;