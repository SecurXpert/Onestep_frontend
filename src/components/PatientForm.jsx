import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
 
const PatientForm = ({
  bookingForSelf,
  setBookingForSelf,
  patientInfo,
  setPatientInfo,
  setReportFile,
  setShowRelatedDoctors,
}) => {
  const { user } = useContext(AuthContext);
 
  const calculateAge = (dob) => {
    if (!dob) return '';
    const [day, month, year] = dob.split('/');
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(birthDate)) return '';
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
 
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      ageYears--;
    }
 
    // Handle age in months for babies (less than 2 years)
    if (ageYears < 2) {
      const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
      return totalMonths >= 0 ? `${totalMonths} months` : '';
    }
 
    return ageYears >= 0 ? ageYears.toString() : '';
  };
 
  useEffect(() => {
    if (bookingForSelf && user) {
      setPatientInfo({
        ...patientInfo,
        name: user.name || '',
        contact: user.email || '',
        phone: user.phone_number || user.phone || '',
        dob: user.dob || '',
        age: user.dob ? calculateAge(user.dob) : user.age || '',
        gender: user.gender || '',
        blood_group: user.blood_group || user.bloodGroup || '',
        problem: '',
        purpose: '',
        notes: '',
        consent: false,
        unavailabilityOption: '',
        optionalDoctorId: '',
        alternativeTime: '',
        medical_history: false,
      });
      setShowRelatedDoctors(false);
    } else {
      setPatientInfo({
        ...patientInfo,
        name: '',
        contact: '',
        phone: '',
        dob: '',
        age: '',
        gender: '',
        blood_group: '',
        problem: '',
        purpose: '',
        notes: '',
        consent: false,
        unavailabilityOption: '',
        optionalDoctorId: '',
        alternativeTime: '',
        medical_history: false,
      });
      setShowRelatedDoctors(false);
    }
  }, [bookingForSelf, user, setPatientInfo, setShowRelatedDoctors]);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
   
    // Restrict name to letters and spaces
    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
 
    // Restrict phone to numbers
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }
 
    // Validate email format
    if (name === 'contact' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return;
    }
 
    // Validate DOB format (dd/mm/yyyy)
    if (name === 'dob' && value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return;
    }
 
    setPatientInfo((prev) => {
      const newInfo = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === 'dob') {
        newInfo.age = calculateAge(value);
      }
      return newInfo;
    });
 
    if (name === 'unavailabilityOption' && value === 'similar_doctor') {
      setShowRelatedDoctors(true);
    } else if (name === 'unavailabilityOption' && value === 'wait') {
      setShowRelatedDoctors(false);
    }
  };
 
  return (
    <div className="space-y-4 md:space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">Patient Information</h2>
 
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <label className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <input
            type="radio"
            name="bookingType"
            checked={bookingForSelf}
            onChange={() => setBookingForSelf(true)}
            className="accent-purple-600 w-4 h-4 md:w-5 md:h-5"
          />
          Book for <span className="font-medium">Self</span>
        </label>
        <label className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
          <input
            type="radio"
            name="bookingType"
            checked={!bookingForSelf}
            onChange={() => setBookingForSelf(false)}
            className="accent-purple-600 w-4 h-4 md:w-5 md:h-5"
          />
          Book for <span className="font-medium">Family Member</span>
        </label>
      </div>
 
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Patient Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter patient name"
            value={patientInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            disabled={bookingForSelf}
            required
          />
        </div>
 
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Patient Age <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={patientInfo.age}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            disabled={bookingForSelf || !bookingForSelf}
            required
          />
        </div>
 
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="dob"
            placeholder="DD/MM/YYYY"
            value={patientInfo.dob}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            disabled={bookingForSelf}
            required
          />
        </div>
      </div>
 
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={patientInfo.gender}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
 
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="contact"
            placeholder="Enter email address"
            value={patientInfo.contact}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            disabled={bookingForSelf}
            required
          />
        </div>
 
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={patientInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            disabled={bookingForSelf}
            required
          />
        </div>
      </div>
 
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Blood Group <span className="text-gray-400 text-xs md:text-sm ml-1">(Optional)</span>
          </label>
          <select
            name="blood_group"
            value={patientInfo.blood_group}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
 
        <div className="md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Care Objective <span className="text-red-500">*</span>
          </label>
          <select
            name="purpose"
            value={patientInfo.purpose}
            onChange={handleChange}
            className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            required
          >
            <option value="">Select Care Objective</option>
            <option value="new_consultation">First visit</option>
            <option value="second_opinion">Second Opinion</option>
          </select>
        </div>
      </div>
 
      <div>
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
          Describe Your Problem <span className="text-red-500">*</span>
        </label>
        <textarea
          name="problem"
          placeholder="Describe your health issue"
          value={patientInfo.problem}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base resize-none"
          required
        />
      </div>
 
      <div>
        <label className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
          <input
            type="checkbox"
            name="medical_history"
            checked={patientInfo.medical_history}
            onChange={handleChange}
            className="accent-purple-600 w-4 h-4 md:w-5 md:h-5 mt-0.5"
          />
          <span>Include Medical History (Upload previous reports if checked)</span>
        </label>
      </div>
 
      {patientInfo.medical_history && (
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Upload Previous Reports
            {patientInfo.purpose === 'second_opinion' ? (
              <span className="text-red-500"> *</span>
            ) : (
              <span className="text-gray-400 text-xs md:text-sm ml-1">(Optional)</span>
            )}
          </label>
          <input
            type="file"
            onChange={(e) => {
              if (typeof setReportFile === 'function') {
                setReportFile(e.target.files[0]);
              }
            }}
            className="block w-full text-xs md:text-sm text-gray-600 file:mr-3 md:file:mr-4 file:py-1.5 md:file:py-2 file:px-3 md:file:px-4 file:rounded file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            required={patientInfo.purpose === 'second_opinion'}
          />
        </div>
      )}
 
      <div>
        <label className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
          <input
            type="checkbox"
            name="consent"
            checked={patientInfo.consent}
            onChange={handleChange}
            className="accent-purple-600 w-4 h-4 md:w-5 md:h-5 mt-0.5"
          />
          <span>I consent to forward my appointment to another doctor if necessary.</span>
        </label>
      </div>
 
      {patientInfo.consent && (
        <div className="mt-4 md:mt-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Doctor Unavailability Options</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            Please choose an option for handling doctor unavailability:
          </p>
          <div className="flex flex-col gap-3 md:gap-4">
  <label className="flex items-center gap-2 text-gray-700 text-xs md:text-base">
    <input
      type="radio"
      name="unavailabilityOption"
      value="similar_doctor"
      checked={patientInfo.unavailabilityOption === 'similar_doctor'}
      onChange={handleChange}
      className="accent-purple-600 w-4 h-4 md:w-5 md:h-5"
    />
    Forward to a similar experienced doctor
  </label>
  <label className="flex items-center gap-2 text-gray-700 text-xs md:text-base">
    <input
      type="radio"
      name="unavailabilityOption"
      value="wait"
      checked={patientInfo.unavailabilityOption === 'wait'}
      onChange={(e) => {
        handleChange(e);
        if (e.target.checked) {
          alert("If doctor is available will inform you");
         
        }
      }}
      className="accent-purple-600 w-4 h-4 md:w-5 md:h-5"
    />
    Wait for the same doctor for next available slot
  </label>
</div>
        </div>
      )}
    </div>
  );
};
 
export default PatientForm;