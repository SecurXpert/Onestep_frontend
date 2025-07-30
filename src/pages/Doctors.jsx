import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorsHeader from '../components/DoctorsHeader';
import { speciality } from '../assets/assets';
import nurse from '../assets/nurse-4.jpg';
import physio from '../assets/physio-4.jpg';
import genral from '../assets/genral-4.png';
import nutrition from '../assets/nutrition-4.jpg';

// City options for dropdown
const cityOptions = ['Visakhapatnam', 'Hyderabad'];

const Doctors = () => {
  const { specialty } = useParams();
  const [filterdoc, setFilterDoc] = useState([]);
  const [activeFilter, setActiveFilter] = useState(specialty || "All");
  const [searchParams, setSearchParams] = useState({
    city: '',
    locality: '',
    searchTerm: '',
  });
  const { topdoctors } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const doctorsListRef = useRef(null);

  const renderStars = (rating, size = 'text-xs') => {
    const stars = [];
    const rounded = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(<span key={i} className={`text-yellow-400 ${size}`}>&#9733;</span>);
      } else if (i - 0.5 === rounded) {
        stars.push(<span key={i} className={`text-yellow-400 ${size}`}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className={`text-gray-300 ${size}`}>&#9734;</span>);
      }
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Apply filter based on activeFilter and searchParams.searchTerm
  const applyFilter = (doctors) => {
    let filtered = activeFilter === "All"
      ? doctors
      : doctors.filter(doc => doc.specialization_name === activeFilter);

    if (searchParams.searchTerm.trim() !== "") {
      const lowerSearch = searchParams.searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(lowerSearch) ||
        doc.specialization_name.toLowerCase().includes(lowerSearch)
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    if (specialty && doctorsListRef.current) {
      // Scroll to doctors list if a specialty is provided
      setTimeout(() => {
        doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Otherwise, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, specialty]);

  useEffect(() => {
    setActiveFilter(specialty || "All");
  }, [specialty]);

  useEffect(() => {
    applyFilter(topdoctors);
  }, [activeFilter, searchParams.searchTerm, topdoctors]);

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
    navigate(`/department/${encodeURIComponent(specialtyName)}`);
    setActiveFilter(specialtyName);
    setSearchParams((prev) => ({ ...prev, searchTerm: "" }));
    // Scroll to the doctors list section
    setTimeout(() => {
      if (doctorsListRef.current) {
        doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
        applyFilter(data);
      } catch (err) {
        console.error(err);
        setFilterDoc([]);
      }
    } else {
      // If no location is provided, apply filter on topdoctors
      applyFilter(topdoctors);
    }
  };

  return (
    <div className="min-h-screen bg-b3d8e4-gradient flex flex-col items-center px-4 relative overflow-hidden">
      <DoctorsHeader />
      <div className="w-full max-w-6xl relative z-10 animate-fade-in mt-0">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-purple-600 mb-6 md:mb-8 tracking-tight animate-fade-in-up">
          Doctor Specialists
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center md:hidden gap-2">
            {specialties.map((spec) => (
              <p
                key={spec}
                onClick={() => {
                  setActiveFilter(spec);
                  setSearchParams((prev) => ({ ...prev, searchTerm: "" }));
                  if (spec === "All") {
                    navigate("/doctors");
                    setTimeout(() => {
                      if (doctorsListRef.current) {
                        doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  } else {
                    handleClick(spec);
                  }
                }}
                className={`px-3 py-1.5 rounded-full cursor-pointer text-center font-semibold text-sm transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1 ${
                  activeFilter === spec
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-500 hover:bg-purple-600 hover:text-white"
                }`}
              >
                {spec}
              </p>
            ))}
          </div>

          <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-center md:gap-4">
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
          </div>

          <div className="relative w-full flex flex-col items-start">
            <div className="flex justify-between items-center w-full mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-custom-blue">13+ Specialities</h1>
              <div className="hidden md:block relative w-48">
              </div>
            </div>
            <p className="text-lg md:text-m text-gray-600 mb-6 text-center max-w-2xl">
              Find the right specialist for every health need.
            </p>
            <div className="relative w-full overflow-hidden">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-custom-blue text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
                onClick={() => {
                  const container = document.querySelector('.marquee-container');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-blue text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
                onClick={() => {
                  const container = document.querySelector('.marquee-container');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div
                className="flex marquee-container"
                style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }}
              >
                {speciality.map((specialty, index) => (
                  <div
                    key={`${specialty.name}-${index}`}
                    className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 pt-2"
                    style={{ minWidth: '150px' }}
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

          <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Expert HealthCare – Right at Your Doorstep</h2>
            <p className="text-gray-600 mb-6">Book trusted specialists nearby for quick consultations and appointments.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
                onClick={() => handleClick('Physiotherapist')}
              >
                <img src={physio} alt="Physiotherapist" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Physiotherapist</h3>
                <p className="text-sm text-gray-600 text-center">for recovery, rehabilitation, and mobility support</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
                onClick={() => handleClick('Nutritionist')}
              >
                <img src={nutrition} alt="Nutritionist / Dietitian" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Nutritionist / Dietitian</h3>
                <p className="text-sm text-gray-600 text-center">for personalized diet planning and nutrition advice.</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
                onClick={() => handleClick('GeneralPhysician')}
              >
                <img src={genral} alt="General Physician" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">General Physician</h3>
                <p className="text-sm text-gray-600 text-center">for fever, infections, chronic conditions, and elderly care</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
                onClick={() => handleClick('Nurse')}
              >
                <img src={nurse} alt="Nurse / Elderly Care Assistant" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Nurse / Elderly Care Assistant</h3>
                <p className="text-sm text-gray-600 text-center">for post-surgical care, injections, wound dressing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;