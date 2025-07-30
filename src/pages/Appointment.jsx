import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import DoctorProfile from '../components/DoctorProfile';
import PatientForm from '../components/PatientForm';
import AddressDisplay from '../components/AddressDisplay';
import RelatedDoctors from '../components/RelatedDoctors';
 
const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { topdoctors } = useContext(AppContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [selectedMode, setSelectedMode] = useState('');
  const [bookingForSelf, setBookingForSelf] = useState(true);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    phone: '',
    dob: '',
    problem: '',
    purpose: '',
    notes: '',
    consent: false,
    address: '',
    reportFileName: '',
    unavailabilityOption: '',
    optionalDoctorId: '',
    blood_group: '',
    medical_history: false,
  });
  const [reportFile, setReportFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [customDateMode, setCustomDateMode] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [unavailableTime, setUnavailableTime] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const [isDoctorUnavailable, setIsDoctorUnavailable] = useState(false);
  const [showRelatedDoctors, setShowRelatedDoctors] = useState(false);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
 
  const maxRetries = 2;
 
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };
 
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to book an appointment.');
      navigate('/login-register');
      return;
    }
 
    console.log('AuthContext user:', user);
    if (user && bookingForSelf) {
      setPatientInfo((prev) => ({
        ...prev,
        name: user.name || prev.name || 'Unknown Patient',
        contact: user.email || prev.contact || '',
        phone: user.phone || prev.phone || '',
        dob: user.dob || prev.dob || '',
        age: user.dob ? calculateAge(user.dob) : user.age || prev.age || '',
        gender: user.gender || prev.gender || 'Other',
        blood_group: user.bloodGroup || prev.blood_group || '',
        address: user.address || prev.address || '',
      }));
    }
 
    const foundDoctor = topdoctors?.find((d) => d.doctor_id === id);
    if (foundDoctor && foundDoctor.doctor_name && foundDoctor.specialization_name) {
      setDoctor({
        ...foundDoctor,
        image: foundDoctor.image || '/src/assets/default-doctor.png',
        specialty: foundDoctor.specialization_name,
      });
    } else {
      fetchDoctor();
    }
  }, [id, isLoggedIn, navigate, topdoctors, user, bookingForSelf]);
 
  useEffect(() => {
    if (showRelatedDoctors && doctor?.specialization_name && selectedDate) {
      fetchRelatedDoctors();
    }
  }, [showRelatedDoctors, doctor, selectedDate]);
 
  const fetchDoctor = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth('http://192.168.0.112:8000/doctors/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        const foundDoctor = data.find((d) => d.doctor_id === id);
        if (foundDoctor && foundDoctor.doctor_name && foundDoctor.specialization_name) {
          setDoctor({
            ...foundDoctor,
            image: foundDoctor.image || '/src/assets/default-doctor.png',
            specialty: foundDoctor.specialization_name,
          });
        } else {
          setError('Doctor not found or incomplete data. Please try another doctor.');
        }
      } else {
        throw new Error(data.detail || 'Failed to fetch doctor details');
      }
    } catch (err) {
      setError(`Unable to fetch doctor details: ${err.message}. Please check your network or try again later.`);
    } finally {
      setIsLoading(false);
    }
  };
 
  const fetchRelatedDoctors = async () => {
    if (!doctor?.specialization_name || !selectedDate) {
      console.log('Skipping fetchRelatedDoctors: missing specialization or date');
      return;
    }
 
    try {
      const response = await fetchWithAuth(
        `http://192.168.0.112:8000/slots/similar-doctors?specialization=${encodeURIComponent(
          doctor.specialization_name
        )}&exclude_doctor_id=${id}&preferred_date=${selectedDate}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const grouped = {};
        (data.available_fallback_slots || []).forEach((slot) => {
          if (!grouped[slot.doctor_id]) {
            grouped[slot.doctor_id] = {
              doctor_id: slot.doctor_id,
              name: slot.doctor_name || 'Unknown Doctor',
              specialization_name: doctor.specialization_name,
              consultation_fee: slot.consultation_fee || 'N/A',
              image: slot.image || '/src/assets/default-doctor.png',
              time_slots: [],
            };
          }
          grouped[slot.doctor_id].time_slots = [
            ...new Set([...grouped[slot.doctor_id].time_slots, slot.time_slot]),
          ];
        });
        const relatedDocs = Object.values(grouped);
        console.log('Related doctors fetched:', relatedDocs);
        setRelatedDoctors(relatedDocs);
        setShowRelatedDoctors(relatedDocs.length > 0);
      } else {
        throw new Error(data.detail || 'Failed to fetch related doctors');
      }
    } catch (error) {
      console.error('Error fetching related doctors:', error);
      setError(`Unable to fetch related doctors: ${error.message}. Please try another time or doctor.`);
      setRelatedDoctors([]);
    }
  };
 
  const getDayOfWeek = (offset) => {
    const date = new Date(Date.now() + offset * 86400000);
    return {
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toISOString().split('T')[0],
    };
  };
 
  const daysOfWeek = [
    getDayOfWeek(0),
    getDayOfWeek(1),
    getDayOfWeek(2),
    getDayOfWeek(3),
    getDayOfWeek(4),
    getDayOfWeek(5),
  ];
 
 const fetchAvailableSlots = async (date) => {
    setLoadingAvailability(true);
    setAvailableTimes([]);
    setError('');
    setValidationErrors([]);
    try {  
      const response = await fetchWithAuth(
        `http://192.168.0.112:8000/slots/available-slots?preferred_date=${date}&doctor_id=${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const uniqueTimes = [...new Set(data.available_slots?.map((slot) => slot.time_slot) || [])];
        setAvailableTimes(uniqueTimes);
        setBookingStatus(data.message || 'Slots retrieved successfully');
        if (uniqueTimes.length === 0) {
          setIsDoctorUnavailable(true);
          setShowRelatedDoctors(true);
          fetchRelatedDoctors();
        } else {
          setIsDoctorUnavailable(false);
          setShowRelatedDoctors(false);
        }
      } else {
        throw new Error(data.detail || 'Failed to fetch slots');
      }
    } catch (error) {
      setError(`Unable to fetch available slots: ${error.message}. Please try again.`);
      setAvailableTimes([]);
      setIsDoctorUnavailable(true);
      setShowRelatedDoctors(true);
      fetchRelatedDoctors();
    } finally {
      setLoadingAvailability(false);
    }
};
 
  const handleQuickDateSelect = (date) => {
    setCustomDateMode(false);
    setSelectedDate(date);
    fetchAvailableSlots(date);
    setSelectedTime('');
    setUnavailableTime('');
    setBookingStatus('');
    setError('');
    setValidationErrors([]);
  };
 
  const handleCustomDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchAvailableSlots(date);
    setSelectedTime('');
    setUnavailableTime('');
    setBookingStatus('');
    setError('');
    setValidationErrors([]);
  };
 
  const handleTimeSelect = async (time) => {
    if (!selectedDate) {
      setError('Please select a date first.');
      return;
    }
    const isAvailable = availableTimes.includes(time);
    if (!isAvailable) {
      setSelectedTime('');
      setUnavailableTime(time);
      setIsDoctorUnavailable(true);
      setShowRelatedDoctors(true);
      fetchRelatedDoctors();
      setBookingStatus(
        `Doctor ${doctor?.name || 'Unknown'} is not available at ${time}. Please select another time or doctor.`
      );
    } else {
      setSelectedTime(time);
      setUnavailableTime('');
      setBookingStatus('');
      setIsDoctorUnavailable(false);
      setShowRelatedDoctors(false);
    }
  };
 
  const handleModeSelect = (mode) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time before choosing an appointment mode.');
      return;
    }
    setSelectedMode(mode);
    setError('');
    setValidationErrors([]);
  };
 
  const handleSelectRelatedDoctor = (doctorId, timeSlot) => {
    setPatientInfo({
      ...patientInfo,
      optionalDoctorId: doctorId,
      unavailabilityOption: 'similar_doctor',
      alternativeTime: timeSlot || '',
    });
    setBookingStatus(`Selected alternative doctor for forwarding.`);
  };
 const handleBook = async () => {
  console.log('Starting handleBook with state:', {
    id,
    doctor,
    selectedDate,
    selectedTime,
    selectedMode,
    patientInfo,
    user,
    bookingForSelf,
  });

  // Enhanced validation
  const missingFields = [];
  if (!isLoggedIn) {
    alert('Please log in to book an appointment.');
    navigate('/login-register');
    return;
  }
  if (!id) missingFields.push('Doctor ID (from URL parameters)');
  if (!doctor || !doctor.specialization_name) missingFields.push('Doctor or Specialization');
  if (!selectedDate) missingFields.push('Preferred Date');
  if (!selectedTime) missingFields.push('Time Slot');
  if (!selectedMode) missingFields.push('Appointment Mode');
  if (!patientInfo.contact) missingFields.push('Patient Email');
  if (!user?.patient_id) {
    alert('Your profile is incomplete. Please update your profile with a valid patient ID in the Profile section.');
    navigate('/profilepage');
    return;
  }
  if (!patientInfo.name) missingFields.push('Patient Name');
  if (!patientInfo.age || isNaN(parseInt(patientInfo.age, 10)) || parseInt(patientInfo.age, 10) <= 0)
    missingFields.push('Patient Age');
  if (!patientInfo.gender) missingFields.push('Gender');
  if (!patientInfo.phone) missingFields.push('Phone Number');
  if (!patientInfo.dob) missingFields.push('Date of Birth');
  if (!patientInfo.problem) missingFields.push('Problem Description');
  if (!patientInfo.purpose) missingFields.push('Care Objective');
  if (patientInfo.consent && !patientInfo.unavailabilityOption) missingFields.push('Unavailability Option');
  if (patientInfo.unavailabilityOption === 'similar_doctor' && !patientInfo.optionalDoctorId)
    missingFields.push('Alternative Doctor');
  if (patientInfo.unavailabilityOption === 'similar_doctor' && !patientInfo.alternativeTime)
    missingFields.push('Alternative Time Slot');
  if (selectedMode === 'Home Visit' && !patientInfo.address) missingFields.push('Address');

  // Only enforce medical history and report file for second opinion
  if (patientInfo.purpose === 'second_opinion') {
    if (!patientInfo.medical_history) {
      missingFields.push('Medical History (required for second opinion)');
    }
    if (patientInfo.medical_history && !reportFile) {
      missingFields.push('Previous Reports (required when medical history is included)');
    }
  }

  if (missingFields.length > 0) {
    alert(`Please fill all required fields: ${missingFields.join(', ')}.`);
    return;
  }

  setLoadingAvailability(true);
  setError('');
  setValidationErrors([]);

  try {
    const timeTo24Hour = (time) => {
      if (!time) return '';
      const [hourMin, period] = time.split(' ');
      let [hours, minutes] = hourMin.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    };

    const appointmentData = {
      doctor_id: id,
      preferred_date: selectedDate,
      time_slot: timeTo24Hour(selectedTime),
      appointment_type: selectedMode.toLowerCase().replace(' ', '_'),
      specialization: doctor.specialization_name,
      problem_description: patientInfo.problem || patientInfo.notes || 'Not specified',
      opinion_type: patientInfo.purpose.toLowerCase() || 'new_consultation',
      consent_to_forward: patientInfo.consent || false,
      forward_option: patientInfo.unavailabilityOption || '',
      is_self: bookingForSelf,
      medical_history: patientInfo.medical_history || false,
      name: patientInfo.name || user?.name || 'Unknown Patient',
      email: patientInfo.contact || user?.email || '',
      phone_number: patientInfo.phone || user?.phone || '',
      age: parseInt(patientInfo.age, 10) || parseInt(calculateAge(patientInfo.dob), 10) || 0,
      gender: patientInfo.gender || user?.gender || 'Other',
      dob: patientInfo.dob || user?.dob || '',
      blood_group: patientInfo.blood_group || user?.bloodGroup || 'Unknown',
      patient_id: user?.patient_id || '',
      address: patientInfo.address || '',
      ...(patientInfo.unavailabilityOption === 'similar_doctor'
        ? {
            fallback_doctor_id: patientInfo.optionalDoctorId || '',
            fallback_time_slot: patientInfo.alternativeTime || '',
          }
        : {}),
    };

    console.log('appointmentData before sending:', JSON.stringify(appointmentData, null, 2));

    let appointmentId;
    if (patientInfo.medical_history && reportFile) {
      const formData = new FormData();
      Object.entries(appointmentData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      formData.append('file', reportFile);

      const response = await fetchWithAuth('http://192.168.0.112:8000/appointments/book', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend validation errors:', JSON.stringify(errorData.detail, null, 2));
        // Improved error handling
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map((err) => {
            return `Field ${err.loc.join('.')} is ${err.msg.toLowerCase()}`;
          });
          throw new Error(errorMessages.join('; '));
        }
        throw new Error(errorData.detail || 'Failed to book appointment');
      }

      const data = await response.json();
      appointmentId = data.appointment_id;
    } else {
      const response = await fetchWithAuth('http://192.168.0.112:8000/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend validation errors:', JSON.stringify(errorData.detail, null, 2));
        // Improved error handling
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map((err) => {
            return `Field ${err.loc.join('.')} is ${err.msg.toLowerCase()}`;
          });
          throw new Error(errorMessages.join('; '));
        }
        throw new Error(errorData.detail || 'Failed to book appointment');
      }

      const data = await response.json();
      appointmentId = data.appointment_id;
    }

    const saved = JSON.parse(localStorage.getItem('myAppointments')) || [];
    const appointmentWithId = {
      id: appointmentId,
      doctor_id: id,
      date: selectedDate,
      time: selectedTime,
      mode: selectedMode,
      name: doctor.doctor_name || 'Unknown',
      specialty: doctor.specialization_name || 'Unknown',
      image: doctor.image || '/src/assets/default-doctor.png',
      fees: doctor.consultation_fee || '200',
      status: 'pending',
      payment: selectedMode === 'Virtual' ? 'pending' : 'not_required',
      patientEmail: patientInfo.contact || user?.email || '',
      appointmentId: appointmentId,
      userId: user?.patient_id || '',
    };
    localStorage.setItem('myAppointments', JSON.stringify([appointmentWithId, ...saved]));

    setBookingStatus(`Appointment booked with ${doctor.doctor_name || 'Unknown'}. Please wait for confirmation.`);
    setTimeout(() => navigate('/myappointment'), 3500);
  } catch (error) {
    console.error('Booking error:', error.message);
    alert(`Failed to book appointment: ${error.message}`);
    if (error.message.includes('Selected slot is already booked') && retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      setBookingStatus(`Slot unavailable. Retrying... (${retryCount + 1}/${maxRetries})`);
      setTimeout(() => handleBook(), 3000);
    } else {
      setBookingStatus(`Failed to book appointment: ${error.message}`);
    }
  } finally {
    setLoadingAvailability(false);
  }
};
 
  if (isLoading) {
    return <div className="text-center p-6 md:p-10">Loading...</div>;
  }
 
  if (error || !doctor) {
    return (
      <div className="text-center p-6 md:p-10 text-sm md:text-base">
        {error || 'Doctor not found. Please try another doctor or contact support.'}
      </div>
    );
  }
 
return (
  <div className="bg-b3d8e4-gradient">
    <div className="max-w-5xl mx-auto bg-white px-3 py-6 md:px-4 md:py-10">
      <DoctorProfile doctor={doctor} />
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
        <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">Book Your Appointment</h3>
        {error && <p className="text-red-600 text-xs md:text-sm mb-4">{error}</p>}
        {validationErrors.length > 0 && (
          <div className="text-red-600 text-xs md:text-sm mb-4">
            <p>Please correct the following errors:</p>
            <ul className="list-disc pl-5">
              {validationErrors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Choose Date</label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {daysOfWeek.map(({ label, date }) => (
                  <button
                    key={date}
                    onClick={() => handleQuickDateSelect(date)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition ${
                      selectedDate === date
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-purple-500 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => setCustomDateMode(true)}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-purple-600 border border-purple-500 rounded-md text-xs md:text-sm hover:bg-purple-50 transition"
                >
                  Pick a Date
                </button>
              </div>
              {selectedDate && !loadingAvailability && (
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Selected: {new Date(selectedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
              {customDateMode && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleCustomDateChange}
                  min={daysOfWeek[0].date}
                  className="mt-2 md:mt-4 w-full max-w-xs px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs md:text-sm"
                />
              )}
              {selectedDate && !loadingAvailability && availableTimes.length === 0 && (
                <p className="text-red-600 text-xs md:text-sm mt-2">Doctor unavailable for the selected date.</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-white-100 border border-purple-500 rounded"></div>
                <span className="text-xs md:text-sm text-gray-600">UnSelected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-600 rounded"></div>
                <span className="text-xs md:text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-xs md:text-sm text-gray-600">Not Available</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Select Time</label>
            {loadingAvailability ? (
              <p className="text-purple-600 text-xs md:text-sm">Loading available times...</p>
            ) : selectedDate && availableTimes.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
                {availableTimes.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`px-2.5 py-1.5 md:px-3 md:py-2 rounded-md text-xs md:text-sm font-medium border text-center transition ${
                        isSelected
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : selectedDate ? (
              <p className="text-red-600 text-xs md:text-sm">No available time slots for the selected date.</p>
            ) : (
              <p className="text-gray-600 text-xs md:text-sm">Please select a date to view available time slots.</p>
            )}
          </div>
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Appointment Mode</label>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              {['Virtual', 'Offline', 'Home Visit'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeSelect(mode)}
                  className={`flex-1 px-3 py-2 md:px-4 md:py-3 rounded-md text-xs md:text-sm font-medium transition ${
                    selectedMode === mode
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Modified: Render PatientForm for all appointment modes */}
        {selectedMode && (
          <PatientForm
            bookingForSelf={bookingForSelf}
            setBookingForSelf={setBookingForSelf}
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
            setReportFile={setReportFile}
            isDoctorUnavailable={isDoctorUnavailable}
            setShowRelatedDoctors={setShowRelatedDoctors}
          />
        )}
        {selectedMode === 'Home Visit' && (
          <AddressDisplay patientInfo={patientInfo} setPatientInfo={setPatientInfo} />
        )}
        {loadingAvailability && (
          <p className="text-purple-600 text-xs md:text-sm mt-4">Checking doctor availability...</p>
        )}
        {bookingStatus && (
          <p
            className={`text-xs md:text-sm mt-4 font-semibold ${
              bookingStatus.includes('not available') ||
              bookingStatus.includes('error') ||
              bookingStatus.includes('Please') ||
              bookingStatus.includes('Failed')
                ? 'text-red-600'
                : 'text-purple-600'
            }`}
          >
            {bookingStatus}
          </p>
        )}
        {!(showRelatedDoctors || isDoctorUnavailable) && (
          <button
            disabled={!selectedDate || !selectedTime || !selectedMode || loadingAvailability}
            onClick={handleBook}
            className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm ${
              selectedDate && selectedTime && selectedMode && !loadingAvailability
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Book Appointment {selectedMode && `(${selectedMode})`}
          </button>
        )}
      </div>
      {(showRelatedDoctors || isDoctorUnavailable) && (
        <>
          <RelatedDoctors
            doctors={relatedDoctors}
            specialty={doctor?.specialization_name || 'Unknown'}
            date={selectedDate}
            time={selectedTime || unavailableTime}
            onSelectDoctor={handleSelectRelatedDoctor}
            patientInfo={patientInfo}
          />
          <button
            disabled={!selectedDate || !selectedTime || !selectedMode || loadingAvailability}
            onClick={handleBook}
            className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm mt-12 ${
              selectedDate && selectedTime && selectedMode && !loadingAvailability
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Book Appointment {selectedMode && `(${selectedMode})`}
          </button>
        </>
      )}
    </div>
  </div>
);
};
 
export default Appointment;