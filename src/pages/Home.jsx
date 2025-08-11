import React, { useState } from 'react';
import Headers from '../components/Headers'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import AppointmentModesCard from '../components/AppointmentModesCard'
import PharmacyLabLanding from '../components/PharmacyLabLanding'
import Chatbot from './Chatbot';
import botIcon from '../assets/bot1.png';

import Chatbot from './Chatbot';
import botIcon from '../assets/bot.png'; // Import the image

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChatbotOpen(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Headers />
      <SpecialityMenu />
     <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open OneStep Medi Chatbot"
      >
        <img
          src={botIcon} // Use the imported image
          alt="Chatbot Icon"
          className="w-10 h-10"
        />
      </button>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
 
    </div>
  );
};

export default Home;