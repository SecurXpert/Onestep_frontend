import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorsHeader from '../components/DoctorsHeader';
import { speciality } from '../assets/assets';
import nurse from '../assets/nurse-4.jpg';
import physio from '../assets/physio-4.jpg';
import genral from '../assets/genral-4.png';
import nutrition from '../assets/nutrition-4.jpg';
 
const Doctors = () => {
  const { specialty } = useParams();
  const [filterdoc, setFilterDoc] = useState([]);
  const [activeFilter, setActiveFilter] = useState(specialty || "All");
  const [searchTerm, setSearchTerm] = useState("");
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
 
  // Apply filter based on activeFilter and searchTerm
  const applyFilter = () => {
    let filtered = activeFilter === "All"
      ? topdoctors
      : topdoctors.filter(doc => doc.specialization_name === activeFilter);
 
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
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
    applyFilter();
  }, [activeFilter, searchTerm, topdoctors]);
 
  const specialties = [
    "Specialities List",
    "Gynecologist",
    "Dentist",  
    "Endocrinologist",
    "Cardiologist",  
    "Dermatologist",  
    "Dietitian/Nutritionist",
    "General Physician",
    "Proctologist or General Surgeon",
    "Psychiatrist",  
    "Pediatrician",
    "Cosmetologist",
    "Neurologist",
    "Orthopedic Doctor",
  ];
 
  const handleClick = (specialtyName) => {
    navigate(`/doctors/${encodeURIComponent(specialtyName)}`);
    setActiveFilter(specialtyName);
    setSearchTerm("");
    // Scroll to the doctors list section
    setTimeout(() => {
      if (doctorsListRef.current) {
        doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
 
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    const locality = formData.get('locality');
    const searchTerm = formData.get('searchTerm');
    console.log({ city, locality, searchTerm });
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
                  setSearchTerm("");
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
            {/* <div className="hidden md:block relative w-48">
              <select
                value={activeFilter}
                onChange={(e) => {
                  const spec = e.target.value;
                  setActiveFilter(spec);
                  setSearchTerm("");
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
                className="w-full bg-white border-2 border-blue-500 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
                aria-label="Filter by specialty"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
 
          <div className="relative w-full flex flex-col items-start">
            <div className="flex justify-between items-center w-full mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-custom-blue">13+ Specialities</h1>
              <div className="hidden md:block relative w-48">
                <select
                  value={activeFilter}
                  onChange={(e) => {
                    const spec = e.target.value;
                    setActiveFilter(spec);
                    setSearchTerm("");
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
                  className="w-full bg-white border-2 border-blue-500 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
                  aria-label="Filter by specialty"
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
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
                    key={index}
                    className="flex flex-col items-center mx-6 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 pt-2"
                    style={{ minWidth: '150px' }}
                    onClick={() => handleClick(specialty.name)}
                  >
                    <div className="w-24 h-24 bg-custom-blue md:w-36 md:h-36 rounded-full border-2 border-custom-blue shadow-md">
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
 
          <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4"> Expert HealthCare – Right at Your Doorstep</h2>
            <p className="text-gray-600 mb-6">Book trusted specialists nearby for quick consultations and appointments.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <img src={physio} alt="Dentist" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Physiotherapist</h3>
                <p className="text-sm text-gray-600 text-center">for recovery, rehabilitation, and mobility support</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={nutrition} alt="Cosmetologist / Dermatologist" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Nutritionist / Dietitian</h3>
                <p className="text-sm text-gray-600 text-center">for personalized diet planning and nutrition advice.</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={genral} alt="ENT Specialist" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">General Physician</h3>
                <p className="text-sm text-gray-600 text-center">for fever, infections, chronic conditions, and elderly care</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={nurse} alt="Ophthalmologist" className="w-full h-48 object-cover rounded-lg mb-2" />
                <h3 className="text-md font-medium text-gray-800">Nurse / Elderly Care Assistant</h3>
                <p className="text-sm text-gray-600 text-center">for post-surgical care, injections, wound dressing.</p>
              </div>
            </div>
          </div>
 
          <div ref={doctorsListRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
            {filterdoc.length > 0 ? (
              filterdoc.map((doctor) => (
                <div
                  key={doctor.doctor_id}
                  onClick={() => navigate(`/appointment/${doctor.doctor_id}`)}
                  className="w-full max-w-[200px] md:max-w-[220px] rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform bg-white"
                >
                  <div className="relative w-full h-32 md:h-36 bg-gray-100 flex items-center justify-center">
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3 md:p-4 bg-custom-blue text-center relative">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">{doctor.doctor_name}</h3>
                    <p className="text-white text-xs md:text-sm mb-1 md:mb-2">{doctor.specialization_name}</p>
                    <p className="text-white text-xs md:text-sm">{doctor.experience}</p>
                    <div className="absolute bottom-2 left-2 flex gap-0.5 drop-shadow-md">{renderStars(doctor.rating, 'text-xs')}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full text-sm md:text-base">No doctors found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Doctors;
 