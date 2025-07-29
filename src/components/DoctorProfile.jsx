import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const DoctorProfile = ({ doctor }) => {
  if (!doctor) {
    return <div className="text-center p-4 text-white">Loading doctor details...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-10 bg-custom-blue shadow-lg p-4 md:p-6 rounded-xl border border-purple-100">
      <img
        src={doctor.image}
        alt={doctor.doctor_name}
        className="w-full max-w-[200px] md:w-1/3 max-h-60 md:max-h-80 rounded-lg object-contain bg-gray-100  border border-purple-200 mx-auto md:mx-0"
      />
      <div className="flex-1 space-y-1.5 md:space-y-2 w-full text-white">
        <h2 className="text-lg md:text-2xl font-bold text-center md:text-left">{doctor.doctor_name}</h2>
        <p className="font-medium text-sm md:text-base text-center md:text-left">{doctor.specialty}</p>
        <p className="text-sm md:text-base text-center md:text-left">
          Experience: <span className="font-medium">{doctor.experience}</span>
        </p>
        <p className="text-sm md:text-base text-center md:text-left">
          Address: <span className="font-medium">{doctor.address}</span>
        </p>
        <div className="flex items-start gap-2 mt-2">
          <FaInfoCircle className="mt-0.5 md:mt-1 text-sm md:text-base" />
          <p className="text-xs md:text-sm">{doctor.about || 'Experienced and compassionate doctor.'}</p>
        </div>
        <div className="mt-3 md:mt-4 inline-block px-3 py-1.5 md:px-4 md:py-2 border border-purple-300 rounded-md bg-white shadow-sm mx-auto md:mx-0">
          <span className="text-custom-blue font-bold text-sm md:text-base">Fee: </span>
          <span className="text-custom-blue font-semibold text-sm md:text-base">₹{doctor.consultation_fee}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;