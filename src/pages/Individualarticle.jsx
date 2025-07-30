import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IndividualArticle = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state || {};

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Split the fullContent into three parts for the single-column layout
  const splitContent = (content) => {
    if (!content) return ['No content available.', '', ''];
    const sentences = content.split('. ').filter((s) => s.trim());
    const partSize = Math.ceil(sentences.length / 3);
    return [
      sentences.slice(0, partSize).join('. ') + (partSize > 0 ? '.' : ''),
      sentences.slice(partSize, partSize * 2).join('. ') + (partSize * 2 <= sentences.length ? '.' : ''),
      sentences.slice(partSize * 2).join('. ') + (partSize * 2 < sentences.length ? '.' : ''),
    ];
  };

  const [contentPart1, contentPart2, contentPart3] = splitContent(article.fullContent);

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full bg-gradient-to-r min-h-[40vh] from-blue-100 to-teal-100 flex flex-col md:flex-row items-center justify-between rounded-none shadow-lg p-4 sm:p-8 mb-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center px-4 sm:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {article.name || 'Article'}
          </h1>
        </div>

        {/* Right Image (Distinct Banner Image) */}
        <div className="w-full md:w-1/2 flex justify-center px-4 sm:px-8">
          <img
            src={article.image || '/images/placeholder.jpg'}
            alt={article.name || 'Article'}
            className="w-full max-w-md h-auto object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/images/fallback.jpg'; // Fallback image for banner
            }}
          />
        </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      {/* Article Content - Single Column */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>

        {/* Single-Column Layout */}
        <div className="flex flex-col gap-6">
          {/* First Section: Image and Content */}
          <div className="flex flex-col">
            <img
              src={article.image || '/images/placeholder.jpg'}
              alt={`${article.name || 'Article'} - Image 1`}
              className="w-full h-56 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = '/images/fallback.jpg'; // Fallback image for first section
              }}
            />
            <p className="text-gray-600 mb-4">{contentPart1}</p>
          </div>

          {/* Second Section: Image and Content */}
          <div className="flex flex-col">
            <img
              src={article.image2 || '/images/placeholder2.jpg'}
              alt={`${article.name || 'Article'} - Image 2`}
              className="w-full h-56 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = '/images/fallback2.jpg'; // Fallback image for second section
              }}
            />
            <p className="text-gray-600 mb-4">{contentPart2}</p>
          </div>

          {/* Third Section: Image, Content, Tags, and Likes */}
          <div className="flex flex-col">
            <img
              src={article.image3 || '/images/placeholder3.jpg'}
              alt={`${article.name || 'Article'} - Image 3`}
              className="w-full h-56 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = '/images/fallback3.jpg'; // Fallback image for third section
              }}
            />
            <p className="text-gray-600 mb-4">{contentPart3}</p>
            {article.tags && article.tags.length > 0 && (
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
      </div>
    </div>
  );
};

export default IndividualArticle;