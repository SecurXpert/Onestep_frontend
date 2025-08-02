import React, { useRef, useState, useEffect } from 'react';
import { FaHospitalAlt, FaCheckCircle, FaMapMarkerAlt, FaUserMd, FaLanguage, FaRegThumbsUp, FaUsers, FaRegCommentDots } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apollo from '../assets/apollo.png'
import clicnic1 from '../assets/clicnic1.jpg'
import clicnic2 from '../assets/clicnic2.jpg'
import doctor1 from '../assets/doctor1.png'
 
const DoctorProfileWrapper = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1); // Center card index
 
  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 320 + 24; // 320px width + 24px gap
    const centerOffset = (container.offsetWidth - cardWidth) / 2;
    container.scrollTo({
      left: index * cardWidth - centerOffset,
      behavior: 'smooth',
    });
  };
 
  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex]);
 
  const doctor = {
    name: "Dr. Anil Sharma",
    title: "Cardiologist (MBBS, MD)",
    experience: "14+ years of experience",
    quote: "I believe in listening to the patient's heart – both literally and medically.",
    hospital: "Fortis Hospital, Hyderabad",
    patients: "275+",
    available: true,
    profileImg: doctor1,
    profileImgRight: doctor1,
    modes: [
      { icon: <FaUserMd size={22} className="text-blue-500" />, label: "In clinic, Online" },
      { icon: <FaLanguage size={22} className="text-orange-500" />, label: "English, Hindi, Telugu" },
      { icon: <FaRegThumbsUp size={22} className="text-green-500" />, label: "97% Recommends" },
    ],
    about: {
      name: "Dr. Anita Sharma",
      description: `Dr. Anita Sharma is a renowned Cardiologist with over 10 years of clinical experience in managing a wide spectrum of heart-related disorders. Known for her evidence-based approach and patient-first philosophy, Dr. Sharma specializes in both preventive cardiology and critical interventions.
 
She is currently affiliated with Fortis Hospital, Hyderabad, and has successfully treated over a thousand patients with complex heart problems. Her methodical and structured care has ensured that patients get long-term well-being. Dr. Anita is a preferred cardiologist for both routine checkups and critical interventions.`,
      tabs: [
        { label: "Experience", color: "bg-red-100 text-red-500" },
        { label: "Education", color: "bg-blue-100 text-blue-500" },
        { label: "Certifications", color: "bg-green-100 text-green-500" },
        { label: "Awards", color: "bg-yellow-100 text-yellow-600" },
      ],
      hospitals: [
        { logo: apollo, name: "Apollo Hospital" },
        { logo: "/images/fortis-logo.png", name: "Fortis Hospital" },
        { logo: "/images/manipal-logo.png", name: "Manipal Hospital" },
      ]
    },
    locations: [
      {
        name: "FORTIS HOSPITAL",
        address: "5th Floor, Krishna Towers, 100 Feet Rd, Madhapur, Hyderabad, Telangana 500081",
        city: "Hyderabad",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.30966200977!2d78.38560331487644!3d17.44753888804737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b9b6c2e3e7%3A0x2e2b0e1c8f3f3e53!2sKrishna%20Towers%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1625582550000!5m2!1sen!2sin"
      }
    ],
    clinicImages: [
      clicnic1,
      clicnic2
    ],
    expertise: [
      { img: "/images/expert1.jpg", name: "Name Name", content: "content" },
      { img: "/images/expert2.jpg", name: "Name Name", content: "content" },
      { img: "/images/expert3.jpg", name: "Name Name", content: "content" },
      { img: "/images/expert4.jpg", name: "Name Name", content: "content" },
      { img: "/images/expert5.jpg", name: "Dr. Name Name", content: "content" },
    ],
    feedback: [
      {
        patient: "The Patients Name",
        img: doctor1,
        text: `I can not praise the staff, both medical and administrative, for the professional and caring and kind way I was treated. They were both patient and reassuring and more than happy to answer all my questions. Nothing was too much trouble. The detail was superb, I could not have asked for more. I have already recommended this hospital to friends and family.`,
        rating: 5
      },
      {
        patient: "The Patients Name",
        img: doctor1,
        text: `Dr. Anita Sharma is a skilled interventional cardiologist with a strong focus on preventive cardiac care. Trained at renowned institutions in India and internationally, she combines advanced cardiac procedures with lifestyle-focused heart patient-centered care.`,
        rating: 5
      },
      {
        patient: "The Patients Name",
        img: doctor1,
        text: `Dr. Anita Sharma is a skilled interventional cardiologist with a strong focus on preventive cardiac care. Trained at renowned institutions in India and internationally, she combines advanced cardiac procedures with lifestyle-focused heart patient-centered care.`,
        rating: 5
      }
    ],
    articles: [
      { author: "Dr. Anita S", title: "10 Early Signs of Heart Disease...", desc: "When I was studying visual communication design in college, I...", img: doctor1, tag: "UX" },
      { author: "Dr. Anita S", title: "10 Early Signs of Heart Disease...", desc: "When I was studying visual communication design in college, I...", img: doctor1, tag: "UX" },
      { author: "Dr. James S", title: "10 Early Signs of Heart Disease...", desc: "When I was studying visual communication design in college, I...", img: doctor1, tag: "Cardio" },
    ],
    healthTips: [
      { img: doctor1, title: "Lorem ipsum sit dolor", views: "2.4M Views" },
      { img: doctor1, title: "Lorem ipsum sit dolor", views: "2.8M Views" },
      { img: doctor1, title: "Lorem ipsum sit dolor", views: "3M Views" },
    ],
    introVideo: "https://www.youtube.com/embed/3xN0w5J1b7g",
    solutionSteps: [
      "Identify the Issue",
      "Reach Out to the Expert",
      "Share Your Concerns",
      "Receive a Personalized Plan",
      "Follow Up and Stay Consistent"
    ]
  };
 
  // Article Card Component (styled as in the screenshot)
  const ArticleCard = ({ art, idx, isActive }) => (
    <div
      className={`w-[320px] shrink-0 rounded-xl shadow transition-transform duration-300 p-0 border-0 bg-white/70
        flex flex-col h-[220px] relative
        ${isActive ? 'scale-105 z-10' : 'scale-95 opacity-80'}
      `}
      style={{
        borderRadius: 18,
        boxShadow: isActive
          ? '0 4px 24px 0 rgba(52, 110, 208, 0.13)'
          : '0 1px 6px 0 rgba(52, 110, 208, 0.06)',
        border: 'none'
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <img src={art.img} alt={art.author} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <span className="text-xs font-bold text-gray-800">{art.author}</span>
          <p className="text-[11px] text-gray-400 pt-0.5">17 hours ago</p>
        </div>
        <span className="ml-auto">
          <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-[#FFB800]/20 text-[#FFB800]">{art.tag || 'UX'}</span>
        </span>
      </div>
      <img src={art.img} alt="article visual" className="mx-4 mt-1 mb-2 rounded-lg object-cover h-[70px] w-[95%]" />
      <div className="px-4">
        <p className="font-semibold text-[15px] leading-snug mb-0 text-gray-800">{art.title}</p>
        <p className="text-xs text-gray-500 mb-2">{art.desc}</p>
      </div>
     
    </div>
   
  );
 
  return (
    <div className="bg-[#f7fafd] min-h-screen font-sans">
      {/* Profile Header Section */}
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md mt-6">
        {/* <div>
          <img src={doctor.profileImg} alt="Doctor" className="w-44 h-44 rounded-full object-cover shadow-md border-4 border-white" />
        </div> */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-700">{doctor.name}</h1>
          <p className="text-lg text-gray-700">{doctor.title}</p>
          <p className="text-gray-500 font-semibold mt-1">{doctor.experience}</p>
          <q className="text-gray-600 italic block my-3">{doctor.quote}</q>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <FaHospitalAlt className="text-orange-500" />
              <span className="font-medium">{doctor.hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-blue-500" />
              <span>{doctor.patients} patients</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span className="text-green-700">{doctor.available ? "Available" : "Not Available"}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-6 py-2 rounded transition">Check Availability</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition">Book Appointment</button>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={doctor.profileImgRight} alt="Doctor" className="w-56 h-[250px] object-cover rounded-lg shadow-lg" />
        </div>
      </div>
      {/* Info icons row */}
      <div className="max-w-6xl mx-auto mt-4 flex flex-wrap gap-4 justify-center">
        {doctor.modes.map((mode, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow border border-gray-100">
            {mode.icon}
            <span className="font-semibold text-gray-700">{mode.label}</span>
          </div>
        ))}
      </div>
      {/* About Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <img src={doctor.profileImg} alt="Doctor" className="w-44 h-44 rounded-lg object-cover mb-2" />
          </div>
          <div className="md:w-2/3">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold px-5 py-2 rounded-tl-lg rounded-br-lg">
              <span className="text-black font-semibold">About</span>{' '}
              <span className="text-white font-medium">Dr. {doctor.about.name}</span>
            </span>
            <div className="bg-white rounded-b px-2 py-2 border-l-2 border-blue-500">
              <p className="text-gray-700">{doctor.about.description}</p>
              {/* Tabs */}
              <div className="mt-4 flex flex-wrap gap-3">
                {doctor.about.tabs.map(tab => (
                  <button key={tab.label} className={`${tab.color} font-semibold px-4 py-1 rounded shadow cursor-pointer`}>{tab.label}</button>
                ))}
              </div>
              {/* Hospitals */}
              <div className="flex flex-wrap gap-4 mt-4">
                {doctor.about.hospitals.map((hosp, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                    <img src={hosp.logo} alt={hosp.name} className="w-10 h-10 object-contain" />
                    <span className="font-semibold">{hosp.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
               
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">Consult Now</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Know More !</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Clinic Location */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-3">Clinic Location</h2>
        {doctor.locations.map((loc, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="font-bold">{loc.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Address:</span>
                <span>{loc.address}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MdLocationCity className="text-orange-500" />
                <span className="font-semibold">City:</span>
                <span>{loc.city}</span>
              </div>
              <button className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded shadow mt-3">Contact Now</button>
            </div>
            <div className="flex-1 flex justify-center">
              <iframe
                src={loc.mapSrc}
                title="Clinic Location"
                width="350"
                height="200"
                className="rounded-md border"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
      {/* Clinic Images */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-6 mt-6">
        {doctor.clinicImages.map((img, idx) => (
          <img key={idx} src={img} alt={`Clinic ${idx + 1}`} className="w-[48%] h-48 object-cover rounded-lg shadow" />
        ))}
      </div>
      {/* Medical Expertise */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Medical Expertise</h2>
        <div className="flex flex-wrap gap-4">
          {doctor.expertise.map((expert, idx) => (
            <div key={idx} className="flex flex-col items-center w-32 bg-gray-50 rounded-lg py-2 shadow border">
              <img src={expert.img} alt={expert.name} className="w-16 h-16 rounded-full object-cover mb-1" />
              <span className="font-semibold text-sm">{expert.name}</span>
              <span className="text-xs text-gray-500">{expert.content}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Feedback/Patients Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Our Patients Feedback About <span className="text-blue-700">Dr Anita Sharma</span></h2>
        <div className="flex flex-wrap gap-6">
          {doctor.feedback.map((feed, idx) => (
            <div key={idx} className="flex-1 min-w-[250px] bg-gray-50 rounded-lg p-4 shadow border">
              <div className="flex items-center gap-3 mb-2">
                <img src={feed.img} alt={feed.patient} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-bold">{feed.patient}</span>
                <span className="flex gap-1 ml-2">
                  {[...Array(feed.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{feed.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Articles and Solutions - BLUE GRADIENT BACKGROUND, MODERN LAYOUT */}
     <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#6ec1e4] via-[#b8d8f5] to-[#f7fafd] rounded-xl shadow-md p-6 mt-8">
  <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-center">
   
    {/* Left side: Articles */}
    <div className="flex-[1.5] relative flex items-center min-h-[260px]">
     
      {/* Left arrow */}
      <button
        onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
        className="absolute left-[-18px] md:left-[-30px] top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg z-10 border border-blue-200"
        style={{ boxShadow: '0 2px 8px 0 rgba(52, 110, 208, 0.12)' }}
      >
        <ChevronLeft className="w-5 h-5 text-blue-700" />
      </button>
 
      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden gap-6 px-4 py-3"
        style={{ minWidth: 0 }}
      >
        {doctor.articles.map((art, idx) => (
          <ArticleCard
            key={idx}
            art={art}
            idx={idx}
            isActive={idx === activeIndex}
          />
        ))}
      </div>
 
      {/* Right arrow */}
      <button
        onClick={() =>
          setActiveIndex((prev) =>
            Math.min(prev + 1, doctor.articles.length - 1)
          )
        }
        className="absolute right-[-18px] md:right-[-30px] top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg z-10 border border-blue-200"
        style={{ boxShadow: '0 2px 8px 0 rgba(52, 110, 208, 0.12)' }}
      >
        <ChevronRight className="w-5 h-5 text-blue-700" />
      </button>
    </div>
 
    {/* Right side: Steps */}
    <div className="md:w-[350px] w-full mt-8 md:mt-0 flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-3 text-gray-900 text-center md:text-left">
        Easy Steps and Get Your Solution
      </h3>
      <ul className="list-decimal list-inside text-base text-gray-700 mb-5 text-left">
        {doctor.solutionSteps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
      <div className="flex gap-3 w-full justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-500 text-white font-semibold px-5 py-1.5 rounded transition shadow">
          Read More !
        </button>
        <button className="bg-[#186cc3] hover:bg-[#1559a5] text-white font-semibold px-5 py-1.5 rounded transition shadow">
          Consult Later
        </button>
        <button className="bg-[#209c38] hover:bg-[#157a29] text-white font-semibold px-5 py-1.5 rounded transition shadow">
          Connect Now !
        </button>
      </div>
    </div>
 
  </div>
</div>
 
      {/* Video and Health Tips */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 mt-8 mb-10">
        <div className="flex-1">
          <h3 className="font-bold mb-2">Dr Ankita Sharma's Intro</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={doctor.introVideo}
              title="Dr Ankita Sharma's Intro"
              width="100%"
              height="215"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2 flex items-center gap-2"><FaRegCommentDots className="text-red-500" /> Health and Tips</h3>
          <div className="flex gap-3">
            {doctor.healthTips.map((tip, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow border w-32 p-2">
                <img src={tip.img} alt={tip.title} className="w-full h-16 rounded object-cover mb-1" />
                <div className="text-xs font-semibold">{tip.title}</div>
                <div className="text-[10px] text-gray-400">{tip.views}</div>
                <button className="bg-yellow-400 text-white px-2 py-1 rounded text-xs mt-2">Watch More!</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DoctorProfileWrapper;