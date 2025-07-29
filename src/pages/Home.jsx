import React, { useState } from 'react';
import Headers from '../components/Headers'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import AppointmentModesCard from '../components/AppointmentModesCard'
import PharmacyLabLanding from '../components/PharmacyLabLanding'
import Chatbot from './Chatbot';


const Home = () => {
   const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <div>
      <Headers />
      <SpecialityMenu />
    <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
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
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4a2 2 0 012-2h10a2 2 0 012 2v4h-4m-6 0a4 4 0 01-4-4m8 4a4 4 0 004-4"
          />
        </svg>
      </button>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Home