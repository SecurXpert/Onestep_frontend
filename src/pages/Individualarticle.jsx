import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IndividualArticle = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state || {};

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full bg-gradient-to-r min-h-[40vh] from-blue-100 to-teal-100 flex flex-col md:flex-row items-center justify-between rounded-none shadow-lg p-4 sm:p-8 mb-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center px-4 sm:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {article.name || 'Article'}
          </h1>
          <p className="text-gray-700 font-medium text-base md:text-lg mb-4">
            {article.author || 'Unknown Author'}
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8">
          <img
            src={article.image || '/images/placeholder.jpg'}
            alt={article.name || 'Article'}
            className="w-full max-w-md h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      {/* Article Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">{article.name}</h1>
        <p className="text-gray-600 mb-6">{article.content}</p>
        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center text-gray-500">
          <span className="mr-2">❤️ {article.likes || 0}</span>
          <span>💬</span>
        </div>
      </div>
    </div>
  );
};

export default IndividualArticle;