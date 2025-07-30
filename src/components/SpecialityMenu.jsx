import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialitymenu } from '../assets/assets';
import dental from '../assets/dental.jpg';
import ent from '../assets/ent.png';
import Ophthalmologist from '../assets/Ophthalmologist.png';
import derma from '../assets/derma.png';
import physiotherapist from '../assets/phys.jpg';
import phys from '../assets/physiotherapist.png';
import nutritionist from '../assets/nutritionist.jpg';
import nurse from '../assets/nurse.png';

// City options for dropdown
const cityOptions = ['Visakhapatnam', 'Hyderabad'];

const SpecialityMenu = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    locality: '',
    searchTerm: '',
  });
  const specialties = [
    "Specialities List",
    "Gynecologist",
    "Dentist",
    "Endocrinologist",
    "Cardiologist",
    "Dermatologist",
    "Nutritionist",
    "GeneralPhysician",
    "Proctologist or General Surgeon",
    "Psychiatrist",
    "Pediatrician",
    "Cosmetologist",
    "Neurologist",
    "Orthopedic Doctor",
  ];
  const handleClick = (specialtyName) => {
    // Map problem-based specialties to their corresponding department
    const specialtyMap = {
      'Irregular heartbeats': 'Cardiologist',
      'Thyroid': 'Endocrinologist',
      'Nutritional deficiencies': 'Nutritionist',
      'Cavity': 'Dentist',
      'Joint or knee pain': 'Orthopedic',
      'Hairfall': 'Cosmetologist',
      'Skin': 'Cosmetologist',
      'Piles': 'Proctologist',
      'Fertility Specialist': 'Gynecologist',
      'Fever & Cold': 'GeneralPhysician',
      'PCOS & hormonal imbalance': 'Gynecologist',
      'Stress': 'Neurologist',
    };
    const department = specialtyMap[specialtyName] || specialtyName;
    navigate(`/department/${encodeURIComponent(department)}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    const locality = formData.get('locality');
    const searchTerm = formData.get('searchTerm');
    setSearchParams({ city, locality, searchTerm });
    console.log({ city, locality, searchTerm });

    // Construct location parameter based on city and locality
    let location = locality || city;
    if (city && locality) {
      location = `${locality},${city}`;
    }

    // If location is provided, fetch doctors by location
    if (location) {
      try {
        const response = await fetch(
          `http://192.168.0.123:8000/doctors/by-location?location=${encodeURIComponent(location)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch doctors by location');
        }
        const data = await response.json();
        // Navigate to Doctors component with fetched doctors
        navigate('/department/:specialtyName', { state: { filteredDoctors: data, searchParams: { city, locality, searchTerm } } });
      } catch (err) {
        console.error(err);
        // Navigate to Doctors component with empty results
        navigate('/department/:specialtyName', { state: { filteredDoctors: [], searchParams: { city, locality, searchTerm } } });
      }
    } else if (searchTerm) {
      // If only searchTerm is provided, navigate with searchTerm
      navigate('/department/:specialtyName', { state: { searchParams: { city, locality, searchTerm } } });
    } else {
      // If no location or searchTerm, navigate to all doctors
      navigate('/department/:specialtyName');
    }
  };

  const handleViewAll = () => {
    navigate('/doctors');
  };

  const handleSeeAllArticles = () => {
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
              <select
                name="city"
                className="w-full pl-10 pr-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
                value={searchParams.city}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, city: e.target.value }))}
              >
                <option value="" disabled>Select City</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="locality"
              placeholder="Enter Locality or Pincode"
              className="w-1/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
              value={searchParams.locality}
              onChange={(e) => setSearchParams((prev) => ({ ...prev, locality: e.target.value }))}
            />
            <select
              name="searchTerm"
              className="w-1/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
              value={searchParams.searchTerm}
              onChange={(e) => setSearchParams((prev) => ({ ...prev, searchTerm: e.target.value }))}
            >
              <option value="" disabled>Select Specialist</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
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
        </div>
        <button
          onClick={handleViewAll}
          className="px-6 py-2 bg-custom-blue text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300"
        >
          View All
        </button>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden w-full flex justify-center">
        <div className="w-full max-w-7xl mx-auto overflow-hidden group">
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
            {[...specialitymenu, ...specialitymenu, ...specialitymenu].map((specialty, index) => (
              <div
                key={`${specialty.name}-${index}`}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(specialty.name);
                  }}
                  className="mt-2 px-4 py-1 bg-custom-blue text-white text-xs md:text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Consult Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In-Clinic Consultation Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Book an in-clinic appointment with our Experienced & Verified Doctors</h2>
        <p className="text-gray-600 mb-6">Find Nearby Specialists for Your Health Needs – Easy and Fast</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Dentist')}
          >
            <img src={dental} alt="Dentist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Dentist</h3>
            <p className="text-sm text-gray-600 text-center">for dental care, cleaning, root canal, etc.</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Cosmetologist')}
          >
            <img src={derma} alt="Cosmetologist / Dermatologist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Cosmetologist / Dermatologist</h3>
            <p className="text-sm text-gray-600 text-center inverno">For skin, hair, and aesthetic treatments</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('ENT Specialist')}
          >
            <img src={ent} alt="ENT Specialist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">ENT Specialist</h3>
            <p className="text-sm text-gray-600 text-center">For ear, nose, and throat disorders</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Ophthalmologist')}
          >
            <img src={Ophthalmologist} alt="Ophthalmologist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Ophthalmologist</h3>
            <p className="text-sm text-gray-600 text-center">for eye checkups, vision problems, and surgeries.</p>
          </div>
        </div>
      </div>

      {/* Expert Healthcare Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Expert HealthCare – Right at Your Doorstep</h2>
        <p className="text-gray-600 mb-6">Book trusted specialists nearby for quick consultations and appointments</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Physiotherapist')}
          >
            <img src={phys} alt="Physiotherapist" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Physiotherapist</h3>
            <p className="text-sm text-gray-600 text-center">for recovery, rehabilitation, and mobility support.</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Nutritionist')}
          >
            <img src={nutritionist} alt="Nutritionist / Dietitian" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Nutritionist / Dietitian</h3>
            <p className="text-sm text-gray-600 text-center">for personalized diet planning and nutrition advice.</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('GeneralPhysician')}
          >
            <img src={physiotherapist} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">General Physician</h3>
            <p className="text-sm text-gray-600 text-center">for fever, infections, chronic conditions, and elderly care</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
            onClick={() => handleClick('Nurse')}
          >
            <img src={nurse} alt="Nurse / Elderly Care Assistant" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">Nurse / First Aid</h3>
            <p className="text-sm text-gray-600 text-center">for post-surgical care, injections, wound dressing</p>
          </div>
        </div>
      </div>

      {/* Articles Section */}
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
            <p className="text-sm text-gray-600">“Clear Skin from Within: Foods That Fight Acne”</p>
            <p className="text-xs text-gray-500">Dr. Diana Borgio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;