import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import banner from '../assets/banner.jpg'; // Ensure this path is correct
import { FaInfoCircle } from 'react-icons/fa';
import tip from '../assets/nutrition-4.jpg';

// Sample tips data
const tips = [
  {
    id: 1,
    title: 'Heart Health Tips',
    content: 'Maintain a balanced diet and exercise regularly to keep your heart healthy.',
    image: tip,
  },
  {
    id: 2,
    title: 'Managing Stress',
    content: 'Practice mindfulness and meditation to reduce stress and improve mental health.',
    image: tip,
  },
  {
    id: 3,
    title: 'Healthy Eating',
    content: 'Incorporate more fruits and vegetables into your diet for better nutrition.',
    image: tip,
  },
];

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment online through our platform by selecting a doctor and choosing a convenient time slot.',
  },
  {
    id: 2,
    question: 'What are the consultation fees?',
    answer: 'Consultation fees vary by doctor and specialty. Each doctor’s profile lists their fee.',
  },
  {
    id: 3,
    question: 'Can I consult online?',
    answer: 'Yes, most doctors offer online consultations. Check the doctor’s profile for availability.',
  },
];

// City options for dropdown
const cityOptions = ['Visakhapatnam', 'Hyderabad'];

const Department = () => {
  const { specialtyName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    locality: '',
    searchTerm: '',
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors by specialty on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://192.168.0.112:8000/doctors/by-specialization/${encodeURIComponent(
            specialtyName
          )}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch doctors by specialization');
        }
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (specialtyName) {
      fetchDoctors();
    }
  }, [specialtyName]);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search params:', searchParams);

    // Construct location parameter based on city and locality
    let location = searchParams.locality || searchParams.city;
    if (searchParams.city && searchParams.locality) {
      location = `${searchParams.locality},${searchParams.city}`;
    }

    // If location is provided, fetch doctors by location
    if (location) {
      try {
        setLoading(true);
        const response = await fetch(
          `http://192.168.0.112:8000/doctors/by-location?location=${encodeURIComponent(location)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch doctors by location');
        }
        const data = await response.json();
        // Filter doctors by specialty if specialtyName is provided
        const filteredData = specialtyName
          ? data.filter(
              (doctor) =>
                doctor.specialization_name.toLowerCase() ===
                decodeURIComponent(specialtyName).toLowerCase()
            )
          : data;
        setDoctors(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewAllDoctors = () => {
    navigate('/doctors');
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const decodedSpecialty = specialtyName ? decodeURIComponent(specialtyName) : '';
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialization_name.toLowerCase() === decodedSpecialty.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between px-4">
        <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
          <h1 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Need a {decodedSpecialty || 'Doctors'}? We’ve Got the Right One for You
          </h1>
          <h4 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Because your health journey deserves more than a search bar.
          </h4>
          <p className="text-custom-blue font-bold text-lg mb-4">
            Book appointments with verified [specialists] who understand your concerns.
          </p>
          <p className="text-custom-blue font-bold text-lg mb-4">
            One Step Medi connects you to top-rated doctors for personalized, hassle-free healthcare—online or in person.
          </p>
        </div>
        <div className="md:w-3/4 flex justify-center">
          <img src={banner} alt="Doctors" className="max-w-full h-auto max-h-[30vh] object-cover rounded-lg" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-8 mt-8">
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="searchTerm"
              placeholder="Doctor Name or Hospital or Specialist or Problem"
              className="w-1/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
              value={searchParams.searchTerm}
              onChange={handleInputChange}
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

      {/* Doctor Profile Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        {loading ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button
              onClick={handleViewAllDoctors}
              className="px-6 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
            >
              View All Doctors
            </button>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white shadow-md rounded-lg border border-gray-200 p-4 flex items-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/doctor/${doctor.doctor_id}`)} // Navigate to DoctorProfile with doctor ID
              >
                {/* Circular Profile Image */}
                <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Doctor Details and Button */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-800">{doctor.doctor_name}</h2>
                    <span className="text-blue-500 text-sm font-semibold">✔</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Specialization: <span className="font-medium">{doctor.specialization_name}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Qualification: <span className="font-medium">{doctor.degree || 'MD'}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Experience: <span className="font-medium">{doctor.experience_years} years</span>
                  </p>
                  <p className="text-sm text-green-600 mb-1 flex items-center">
                    <span className="mr-1">✔</span> Available
                  </p>
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <span className="mr-1">📍</span> {doctor.clinic_location || 'Not specified'}
                  </p>
                  {/* Consult Now Button */}
                  <button
                    className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click from triggering
                      navigate(`/doctor/${doctor.doctor_id}`); // Navigate to DoctorProfile
                    }}
                  >
                    Consult Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              No doctors found for {decodedSpecialty}.
            </p>
            <button
              onClick={handleViewAllDoctors}
              className="px-6 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Doctors
            </button>
          </div>
        )}
      </div>

      {/* Video Container */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Video</h2>
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
          <div className="relative" style={{ paddingBottom: '40%' /* Adjusted for smaller height while keeping 16:9 */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
              title="Health Education Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white shadow-md rounded-lg">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <span className="text-gray-600">{openFaq === faq.id ? '-' : '+'}</span>
              </button>
              {openFaq === faq.id && (
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Department;