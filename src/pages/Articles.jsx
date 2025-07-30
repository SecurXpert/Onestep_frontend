import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/banner.jpg';

const articles = [
  {
    name: '6 Myths and Facts About Weight Loss',
    image: '/images/weight-loss.jpg',
    content: 'Weight loss is a long journey with many misconceptions attached to it. Let us talk about more in detail...',
    author: 'Ms. Swati Kapoor, Dietitian/Nutritionist',
    tags: ['Weight Loss', 'Weight Training'],
    likes: 702,
  },
  {
    name: 'How to Stop Immune System Attacking Yourself',
    image: '/images/immune-system.jpg',
    content: 'Autoimmune diseases are increasing at a dramatic rate. Most of the time it\'s the hidden allergens, infections most commonly now...',
    author: 'Dr. Govindaraja S.J, Dentist',
    tags: ['Immunity'],
    likes: 8,
  },
  {
    name: 'Determining Your Facial Skin Type & Care Guide',
    image: '/images/skin-type.jpg',
    content: 'Figuring out your skin type is the 1st step for getting a beautiful skin. Most women misdiagnose themselves & end up using the wrong regimen & products. This actually aggravates their skin more. Here\'s a cheat sheet to help you find the correct category: 1. Oily- Your face looks moist/shiny, especially at midday, 2. Dry/Sensitive- You have red patches...',
    author: 'Women\'s Health',
    likes: 160,
  },
];

const ArticlesPage = () => {
  const navigate = useNavigate();

  const handleArticleClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.name)}`, { state: article });
  };

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full bg-gradient-to-r min-h-[40vh] from-blue-100 to-teal-100 flex flex-col md:flex-row items-center justify-between rounded-none shadow-lg p-4 sm:p-8 mb-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 text-center px-4 sm:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Welcome to OneStep Medi
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Your all-in-one healthcare services
          </h1>
          <p className="text-gray-700 font-medium text-base md:text-lg mb-4">
            We bring medical care to your fingertips, including online and in-clinic doctor appointments, diagnostics, and more!
          </p>
          <p className="text-gray-700 font-medium text-base md:text-lg mb-6">
            Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
          </p>
        </div>

        {/* Right Image */}
     <div className="md:w-[50%] flex justify-center">
             <img src={banner} alt="Healthcare" className="max-w-full h-auto max-h-[50vh]" />
           </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      {/* Articles Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg relative z-10">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Top Health Articles</h1>
        <p className="text-gray-600 mb-6">Trending tips from doctors and health experts</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col items-start border rounded-lg p-4">
            <img src="/images/weight-loss.jpg" alt="teeth" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">TOP 5 FOODS THAT NATURALLY  WHITEN YOUR TEETH</h3>
            <p className="text-xs text-gray-500 mb-2">Ms. Swati Kapoor, Dietitian/Nutritionist</p>
            <p className="text-sm text-gray-600 mb-2">If you're dreaming of a brighter smile, you'll want to learn about the food that naturally whitens your teeth....</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Weight Loss</span>
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Weight Training</span>
            </div>
            <div className="flex items-center text-gray-500">
              <span className="mr-2">❤️ 702</span>
              <span>💬</span>
            </div>
          </div>
          <div className="flex flex-col items-start border rounded-lg p-4">
            <img src="/images/immune-system.jpg" alt="pregnancy" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY</h3>
            <p className="text-xs text-gray-500 mb-2">Dr. Govindaraja S.J, Dentist</p>
            <p className="text-sm text-gray-600 mb-2">The foods you choose directly impact your baby's growth, brain development and your overall health. In this guide, we'll explore...</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Immunity</span>
            </div>
            <div className="flex items-center text-gray-500">
              <span className="mr-2">❤️ 8</span>
              <span>💬</span>
            </div>
          </div>
          <div className="flex flex-col items-start border rounded-lg p-4">
            <img src="/images/skin-type.jpg" alt="eye" className="w-full h-48 object-cover rounded-lg mb-2" />
            <h3 className="text-md font-medium text-gray-800">BEST FOODS FOR EYE HEALTH</h3>
            <p className="text-xs text-gray-500 mb-2">Women's Health</p>
            <p className="text-sm text-gray-600 mb-2">Discover the foods for eye health that protect against digital eye strain, dryness, cataracts and macular degeneration. Rich in vitamin A, lutein...</p>
            <div className="flex items-center text-gray-500">
              <span className="mr-2">❤️ 160</span>
              <span>💬</span>

          

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;