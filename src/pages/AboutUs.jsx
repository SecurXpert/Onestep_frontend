import React from 'react';
import aboutus from '../assets/banner.jpg';
import about from '../assets/aboutus.png';
import security from '../assets/security.jpg';
import {
  IoMedkitOutline,
  IoPeopleOutline,
  IoCartOutline,
  IoCashOutline,
  IoHeadsetOutline,
  IoPulseOutline,
} from 'react-icons/io5';

const AboutUs = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
     <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            About One Step Medi
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Your Digital Healthcare Partner
          </h1>
          <p className="text-gray-700 font-medium text-base md:text-lg mb-4">
            We bring medical care to your fingertips, including online and in-clinic doctor appointments, diagnostics, and more!
          </p>
          <p className="text-gray-700 font-medium text-base md:text-lg mb-6">
            Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-[50%] flex justify-center pr-0">
          <img src={about} alt="Healthcare" className="max-w-full h-auto max-h-[50vh]" />
        </div>
</div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Top Section */}
        <div className="mb-12 animate-fade-in pt-10">
          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(59,130,246,0.1)] hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)] transition-shadow duration-300 group">
              <img
                src={aboutus}
                alt="About Us"
                className="w-full h-64 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-2xl group-hover:border-purple-600/30 transition-colors duration-300"></div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                One Step Medi – India’s Most Trusted All-in-One Digital Healthcare Platform
              </h2>

              <p className="text-gray-600 font-medium leading-relaxed mb-4">
                OneStep Medi is a unified digital healthcare platform that connects patients with verified
                doctors and essential medical services. We simplify access to doctor consultations, lab
                tests, doorstep medicine delivery, and secure digital records—all in one place.
              </p>

              <p className="text-gray-600 font-medium leading-relaxed">
                Each user is assigned a unique Patient ID to ensure seamless tracking of prescriptions,
                reports, and medical history. With timely alerts and convenient at-home services, OneStep Medi
                brings quality healthcare within everyone’s reach.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div>
          <h2 className="text-4xl font-extrabold text-blue-600 mb-10 text-center tracking-tight animate-fade-in-up">
            Why Choose Us?
          </h2>

          <h3 className="text-center text-gray-700 font-medium text-lg mb-10">
            <span className="font-semibold text-purple-600">One Step Medi</span> — Every Step Towards Better Health
            <br />
            Our mission is to make healthcare services available for everyone.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoPeopleOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Doctors</h3>
              <h3 className="text-xl font-bold text-gray-800 mb-2">130+</h3>
              <p className="text-gray-600 text-sm">
                All physicians are certified, background‑checked, and patient‑reviewed, ensuring trusted medical care every time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoMedkitOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Pharmacy</h3>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100+</h3>
              <p className="text-gray-600 text-sm">
                We provide 100% certified medicines delivered safely with professional verification.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoCartOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnostics Tie Up</h3>
              <h3 className="text-xl font-bold text-gray-800 mb-2">10+</h3>
              <p className="text-gray-600 text-sm">
                Medicine and lab sample collection delivered quickly and on time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoCashOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Affordable Pricing</h3>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Upto 80% Discount</h3>
              <p className="text-gray-600 text-sm">
                No hidden charges, no additional taxes — clear costs for consultations, tests, and deliveries every time.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoHeadsetOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Call and Chat Support</h3>
              <p className="text-gray-600 text-sm">
                We’re always available to assist you anytime via calls and chats.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoPulseOutline className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Branches</h3>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                </svg>
                Telangana
              </p>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-5 ml-9">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                </svg>
                Andhra Pradesh
              </p>
            </div>

            {/* Card 7 */}

          </div>
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center max-w-8xl mx-auto mt-10">
            <div className="md:w-1/2 p-4">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">Your Data, Fully Protected</h3>
              <h3 className="font-bold p-2" >We prioritize your privacy and security at every level.</h3>
              <ul className="text-gray-600 text-sm mb-4 pl-5 space-y-2">
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2 text-bold">✓</span> Advanced Security Protocols
                </li>
                <p className="text-gray-600 ml-6">Robust, multi-layered protection to keep your data safe.</p>
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2">✓</span> Automated Data Backups

                </li>
                <p className="text-gray-600 ml-6">Frequent backups ensure your information is never lost.</p>
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2">✓</span> Strict Privacy Policies

                </li>
                <p className="text-gray-600 ml-6">Your data is handled with the highest confidentiality standards.</p>
              </ul>
              <a
                href="/security-privacy"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ml-3"
              >
                Read More
              </a>
            </div>
            <div className="md:w-1/2 p-4 flex justify-center">
              <img
                src={security}
                alt="Data Security Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto mt-8">
            <div className="md:w-full p-4">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Doctors Say About Us</h3>
              <p className="font-bold mb-4 text-center">Trusted by healthcare professionals across India.</p>
              <p className="text-gray-600 text-sm mb-4 text-center">
                "OneStep Medi has revolutionized how I connect with my patients. The platform's seamless integration and reliable support make it a game-changer for healthcare delivery."
              </p>
              <p className="text-gray-600 text-sm mb-4 text-center">
                "The ease of managing patient records and scheduling consultations has saved me hours every week. Highly recommend it!"
              </p>
            </div>
            <div className="md:w-full p-4 mt-6 overflow-hidden whitespace-nowrap">
              <div className="inline-flex animate-marquee space-x-8">
                <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md">
                  <img
                    src="https://via.placeholder.com/50?text=Doctor"
                    alt="Doctor Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Dr. Anil Sharma</p>
                    <p className="text-gray-600 text-sm">General Physician</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md">
                  <img
                    src="https://via.placeholder.com/50?text=Doctor"
                    alt="Doctor Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Dr. Priya Menon</p>
                    <p className="text-gray-600 text-sm">Cardiologist</p>
                  </div>
                </div>
                {/* Duplicate items for seamless looping */}
                <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md">
                  <img
                    src="https://via.placeholder.com/50?text=Doctor"
                    alt="Doctor Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Dr. Anil Sharma</p>
                    <p className="text-gray-600 text-sm">General Physician</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md">
                  <img
                    src="https://via.placeholder.com/50?text=Doctor"
                    alt="Doctor Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Dr. Priya Menon</p>
                    <p className="text-gray-600 text-sm">Cardiologist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default AboutUs;