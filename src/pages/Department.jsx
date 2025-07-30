import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import banner from '../assets/banner.jpg';
import { FaInfoCircle } from 'react-icons/fa';
import tip from '../assets/nutrition-4.jpg';

// Specialty-specific tips
const specialtyTips = {
  gynecologist: [
    {
      id: 1,
      title: 'Ease Period Cramps',
      content: 'Drink ginger or chamomile tea during your period to naturally reduce cramps and inflammation. These teas help relax your body, calm your mood, and ease discomfort without needing painkillers.',
      image: tip,
    },
    {
      id: 2,
      title: 'Nourish Skin During Pregnancy',
      content: 'Gently massage your belly with almond or coconut oil daily to reduce dryness, ease itching, and support skin elasticity. It keeps your skin nourished and comfortable as your body changes.',
      image: tip,
    },
    {
      id: 3,
      title: 'Post-Period Stretching',
      content: 'Do 5 minutes of gentle stretching after your period ends to boost energy, ease lingering cramps, and improve pelvic blood flow for a smoother cycle recovery.',
      image: tip,
    },
  ],
  dentist: [
    {
      id: 1,
      title: 'Natural Teeth Cleanser',
      content: 'Crunchy fruits like apples gently scrub your teeth, making them a tasty, natural cleanser after snacks.',
      image: tip,
    },
    {
      id: 2,
      title: 'Prevent Staining',
      content: 'Love tea or coffee? Rinse with water afterward to help prevent staining while still enjoying your favorite sips.',
      image: tip,
    },
    {
      id: 3,
      title: 'Freshen Breath Naturally',
      content: 'Chew a few fennel seeds or fresh parsley after meals to naturally freshen breath and aid digestion without masking odors like gum or mints do.',
      image: tip,
    },
  ],
  endocrinologist: [
    {
      id: 1,
      title: 'Support Thyroid Health',
      content: 'Snack on 2–3 Brazil nuts weekly to support healthy thyroid function and balance hormones naturally.',
      image: tip,
    },
    {
      id: 2,
      title: 'Reduce Chemical Exposure',
      content: 'Use glass or steel containers instead of plastic to reduce chemical exposure that can affect your hormones.',
      image: tip,
    },
    {
      id: 3,
      title: 'Prioritize Deep Sleep',
      content: 'Focus on deep sleep, not just long sleep. Quality rest keeps your energy steady and hormones in sync.',
      image: tip,
    },
  ],
  cardiologist: [
    {
      id: 1,
      title: 'Improve Circulation',
      content: 'Stand and stretch every hour, especially if you sit for long hours, to improve circulation and lower blood pressure.',
      image: tip,
    },
    {
      id: 2,
      title: 'Morning Walk for Heart Health',
      content: 'A brisk walk right after waking up can improve circulation, lower early-morning blood pressure spikes, and reduce your risk of heart attack over time.',
      image: tip,
    },
    {
      id: 3,
      title: 'Heart-Healthy Snacks',
      content: 'Choose walnuts or almonds over salty snacks. They nourish your heart and help reduce bad cholesterol.',
      image: tip,
    },
  ],
  dermatologist: [
    {
      id: 1,
      title: 'Lock in Hydration',
      content: 'Apply moisturizer on damp skin to lock in hydration more effectively than applying it on dry skin.',
      image: tip,
    },
    {
      id: 2,
      title: 'Hydrate from Within',
      content: 'Add water-rich foods like cucumbers and oranges to your diet. They boost skin elasticity and help maintain a natural, dewy glow.',
      image: tip,
    },
    {
      id: 3,
      title: 'Daily Sunscreen',
      content: 'Wear sunscreen daily, not just in summer. Even indoor light and screens can cause pigmentation and aging.',
      image: tip,
    },
  ],
  dietitian: [
    {
      id: 1,
      title: 'Balanced Meal Rule',
      content: 'Follow the 3-2-1 rule for every meal: 3 parts vegetables, 2 parts protein, and 1 part whole grain for balanced nutrition and steady energy.',
      image: tip,
    },
    {
      id: 2,
      title: 'Mindful Chewing',
      content: 'Chew each bite 20–30 times to eat less, digest better, and avoid post-meal bloating.',
      image: tip,
    },
    {
      id: 3,
      title: 'Smart Carb Pairing',
      content: 'Pair carbs with protein and fiber, like brown rice with lentils and sautéed veggies, for steady energy and better weight control.',
      image: tip,
    },
  ],
  generalphysician: [
    {
      id: 1,
      title: 'Annual Health Check',
      content: 'Schedule one preventive health check every year, even when you feel healthy. Prevention is easier than cure.',
      image: tip,
    },
    {
      id: 2,
      title: 'Digital Health Records',
      content: 'Keep digital health records easily accessible to help doctors diagnose faster and more accurately during visits.',
      image: tip,
    },
    {
      id: 3,
      title: 'Know Your Vitals',
      content: 'Knowing your normal body temperature, pulse, and blood pressure empowers you to detect early warning signs.',
      image: tip,
    },
  ],
  proctologist: [
    {
      id: 1,
      title: 'Reduce Rectal Pressure',
      content: 'If you sit for long periods, stretch or stand for at least 5 minutes every hour to reduce rectal pressure and improve blood flow.',
      image: tip,
    },
    {
      id: 2,
      title: 'Increase Fiber Gradually',
      content: 'Increase fiber gradually with foods like soaked raisins or oats to avoid gas while easing bowel movements.',
      image: tip,
    },
    {
      id: 3,
      title: 'Address Rectal Bleeding',
      content: 'Never ignore rectal bleeding. It could be minor or the first sign of a larger issue best caught early.',
      image: tip,
    },
  ],
  psychiatrist: [
    {
      id: 1,
      title: 'Track Your Mood',
      content: 'Keep a daily mood log for two weeks to help you and your doctor identify hidden patterns and emotional triggers.',
      image: tip,
    },
    {
      id: 2,
      title: 'Limit Late-Night Screens',
      content: 'Screen time after 10 p.m. can disrupt melatonin and worsen anxiety. Try journaling or deep breathing instead.',
      image: tip,
    },
    {
      id: 3,
      title: 'Therapy for Wellbeing',
      content: 'Therapy isn’t just for crisis—it’s like regular fitness for emotional wellbeing and self-awareness.',
      image: tip,
    },
  ],
  pediatrician: [
    {
      id: 1,
      title: 'Introduce Foods Safely',
      content: 'Introduce new foods to your baby one at a time and wait 2–3 days to spot allergies or sensitivities.',
      image: tip,
    },
    {
      id: 2,
      title: 'Encourage Sensory Play',
      content: 'Let children engage in messy, sensory-rich play to boost brain development and emotional intelligence.',
      image: tip,
    },
    {
      id: 3,
      title: 'Track Vaccinations',
      content: 'Track your child’s vaccinations digitally to ensure on-time shots protect against serious illnesses.',
      image: tip,
    },
  ],
  cosmetologist: [
    {
      id: 1,
      title: 'Sleep for Skin Health',
      content: 'Sleep 7–8 hours a night—your skin repairs itself best during deep sleep, boosting collagen and reducing inflammation.',
      image: tip,
    },
    {
      id: 2,
      title: 'Clean Makeup Brushes',
      content: 'Clean your makeup brushes every week to prevent bacterial buildup that causes clogged pores and breakouts.',
      image: tip,
    },
    {
      id: 3,
      title: 'Limit Exfoliation',
      content: 'Over-exfoliation damages your skin barrier. Limit scrubs or acids to 2–3 times a week based on your skin type.',
      image: tip,
    },
  ],
  neurologist: [
    {
      id: 1,
      title: 'Boost Brain Agility',
      content: 'Add coordination games like juggling or memory puzzles to your routine to boost brain agility and focus.',
      image: tip,
    },
    {
      id: 2,
      title: 'Stay Hydrated',
      content: 'Stay hydrated with electrolytes by adding a pinch of pink Himalayan salt or a splash of coconut water to maintain nerve conductivity and prevent migraine triggers.',
      image: tip,
    },
    {
      id: 3,
      title: 'Screen Time Breaks',
      content: 'Take a 15-minute break after every hour of screen time to reset your nervous system and reduce brain fog.',
      image: tip,
    },
  ],
  orthopedic: [
    {
      id: 1,
      title: 'Build Bone Density',
      content: 'Climbing stairs or brisk walking daily builds bone density and reduces the risk of osteoporosis with age.',
      image: tip,
    },
    {
      id: 2,
      title: 'Foot-Elevation Breaks',
      content: 'If you stand or walk for long hours, take a 5-minute foot-elevation break every hour to improve circulation and ease joint stress.',
      image: tip,
    },
    {
      id: 3,
      title: 'Maintain Good Posture',
      content: 'Sit with a straight back and feet flat while working—good posture now prevents long-term spinal stress later.',
      image: tip,
    },
  ],
};

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
          `http://192.168.0.123:8000/doctors/by-specialization/${encodeURIComponent(
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
          `http://192.168.0.123:8000/doctors/by-location?location=${encodeURIComponent(location)}`
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

  // Get tips based on specialty
  const currentTips = specialtyTips[decodedSpecialty.toLowerCase()] ||  [
    {
      id: 1,
      title: 'General Health Tip',
      content: 'Maintain a balanced lifestyle with proper diet, exercise, and rest for overall wellbeing.',
      image: tip,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between px-4">
        <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
          <h1 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Need a {decodedSpecialty || 'Doctors'}? We’ve Got You.
          </h1>
          <h4 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Your health needs more than a search.
          </h4>
          <p className="text-custom-blue font-bold text-lg mb-4">
            Book appointments with verified {decodedSpecialty || 'Doctors'} who understand your concerns.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredDoctors.map((doctor) => (
    <div
      key={doctor.doctor_id}
      className="bg-white shadow-md rounded-lg border border-gray-200 p-4 flex items-center cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/doctor/${doctor.doctor_id}`)}
    >
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
        <button
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card's onClick from firing
            navigate(`/appointment/${doctor.doctor_id}`); // Navigate to appointment page
          }}
        >
          Consult Now
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Video Container */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Video</h2>
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
          <div className="relative" style={{ paddingBottom: '40%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
          {currentTips.map((tip) => (
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