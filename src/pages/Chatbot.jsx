import React, { useState } from 'react';

// Mock data for questions and solutions
const mockData = [
  {
    id: 1,
    question: "What should I do if I have a fever?",
    solution: "If you have a fever, rest and stay hydrated by drinking plenty of water. Take over-the-counter medications like acetaminophen or ibuprofen to reduce fever. Monitor your temperature and seek medical advice if the fever exceeds 100.4°F (38°C) for more than 48 hours or is accompanied by severe symptoms."
  },
  {
    id: 2,
    question: "How can I manage a sore throat?",
    solution: "To manage a sore throat, gargle with warm salt water (1/4 tsp salt in 8 oz water) several times a day. Stay hydrated, use throat lozenges, and consider over-the-counter pain relievers like ibuprofen. If symptoms persist beyond 3-4 days or worsen, consult a doctor to rule out infections like strep throat."
  },
  {
    id: 3,
    question: "What are the symptoms of dehydration?",
    solution: "Symptoms of dehydration include dry mouth, fatigue, dizziness, dark urine, and reduced urine output. Drink water or oral rehydration solutions immediately. For severe symptoms like confusion or rapid heartbeat, seek medical attention promptly."
  },
  {
    id: 4,
    question: "How do I treat a minor cut or scrape?",
    solution: "Clean a minor cut or scrape with soap and water, then apply an antiseptic ointment. Cover with a sterile bandage to keep it clean. Change the bandage daily and monitor for signs of infection like redness or swelling. Seek medical help if the wound doesn't heal or worsens."
  }
];

const Chatbot = ({ isOpen, onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to Doctor Hub! Please select a question below to get health advice.' }
  ]);

  const handleQuestionClick = (questionObj) => {
    setSelectedQuestion(questionObj);
    setMessages([
      ...messages,
      { sender: 'user', text: questionObj.question },
      { sender: 'bot', text: questionObj.solution }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-blue-600">OneStep Medi Chatbot</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="h-64 overflow-y-auto mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              message.sender === 'bot'
                ? 'bg-blue-100 text-blue-800 ml-2'
                : 'bg-green-100 text-green-800 ml-auto'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2">
        {mockData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleQuestionClick(item)}
            className="w-full text-left p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            {item.question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;