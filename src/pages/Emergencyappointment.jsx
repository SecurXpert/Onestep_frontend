import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import RazorpayEmergency from './RazorpayEmergency';

const Emergencyappointment = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    specialty: '',
    description: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');
  const [bookingForSelf, setBookingForSelf] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const specialties = [
    'Dentist',
    'Endocrinologist',
    'Cardiologist',
    'Dermatologist',
    'ENT Specialist',
    'Nutritionist',
    'General Physician',
    'Gynecologist',
    'Proctologist or General Surgeon',
    'Psychiatrist',
    'Pediatrician',
    'Cosmetologist',
    'Neurologist',
    'Orthopedic',
    'Nurse',
    'Ophthalmologist',
    'Homeopathy',
    'Physiotherapist',
  ];

  // Populate or clear user data based on bookingForSelf
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to book an emergency appointment.');
      navigate('/login-register');
      return;
    }

    if (user && bookingForSelf) {
      setPatientInfo((prev) => ({
        ...prev,
        name: user.name || 'Unknown Patient',
        phone: user.phone || '',
        age: user.age || '',
        gender: user.gender || 'Other',
        specialty: prev.specialty,
        description: prev.description,
      }));
    } else {
      setPatientInfo((prev) => ({
        name: '',
        age: '',
        gender: '',
        phone: '',
        specialty: prev.specialty,
        description: prev.description,
      }));
    }
  }, [isLoggedIn, navigate, user, bookingForSelf]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle terms and conditions checkbox
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
    const updatedAppointments = saved.map((appt) =>
      appt.id === appointmentId
        ? { ...appt, payment: 'completed', status: 'confirmed' }
        : appt
    );
    localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
    setBookingStatus('Emergency appointment booked and payment completed.');
    setShowPayment(false);
    setPaymentCompleted(true); // Show receipt button
    setTimeout(() => navigate('/myappointment'), 3500);
  };

  // Handle download receipt
  const downloadReceipt = () => {
    const receiptContent = `
      Emergency Appointment Receipt
      ------------------
      Appointment ID: ${appointmentId}
      Patient Name: ${patientInfo.name || 'Unknown Patient'}
      Specialty: ${patientInfo.specialty || 'Unknown Specialty'}
      Date: ${new Date().toISOString().split('T')[0]}
      Mode: Emergency
      Fees: ₹${patientInfo.fees || '200'}
      Patient Email: ${user?.email || patientInfo.phone || ''}
      Status: Confirmed
      Payment Status: Completed
      Description: ${patientInfo.description || 'No description provided'}
      ------------------
      Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emergency_receipt_${appointmentId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle form submission
  const handleBook = async () => {
    console.log('Starting handleBook with state:', {
      patientInfo,
      user,
      bookingForSelf,
      termsAccepted,
    });

    // Validation
    const missingFields = [];
    if (!isLoggedIn) {
      alert('Please log in to book an appointment.');
      navigate('/login-register');
      return;
    }
    if (!user?.patient_id) {
      alert('Your profile is incomplete. Please update your profile with a valid patient ID in the Profile section.');
      navigate('/profilepage');
      return;
    }
    if (!patientInfo.specialty) missingFields.push('Specialty');
    if (!patientInfo.name) missingFields.push('Patient Name');
    if (!patientInfo.age || isNaN(parseInt(patientInfo.age, 10)) || parseInt(patientInfo.age, 10) <= 0)
      missingFields.push('Patient Age');
    if (!patientInfo.gender) missingFields.push('Gender');
    if (!patientInfo.phone) missingFields.push('Phone Number');
    if (!patientInfo.description) missingFields.push('Description');
    if (!termsAccepted) missingFields.push('Terms and Conditions');

    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(', ')}.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const appointmentData = {
        is_self: bookingForSelf,
        name: patientInfo.name || user?.name || 'Unknown Patient',
        phone_number: patientInfo.phone || user?.phone || '',
        age: parseInt(patientInfo.age, 10) || 0,
        gender: patientInfo.gender || user?.gender || 'Other',
        problem_description: patientInfo.description,
        specialization: patientInfo.specialty,
      };

      console.log('appointmentData before sending:', JSON.stringify(appointmentData, null, 2));

      const response = await fetchWithAuth('http://192.168.0.170:8000/emergency/emergency/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend validation errors:', JSON.stringify(errorData.detail, null, 2));
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map((err) => {
            return `Field ${err.loc.join('.')} is ${err.msg.toLowerCase()}`;
          });
          throw new Error(errorMessages.join('; '));
        }
        throw new Error(errorData.detail || 'Failed to book emergency appointment');
      }

      const data = await response.json();
      const appointmentId = data.appointment_id;
      setAppointmentId(appointmentId);

      const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
      const appointmentWithId = {
        id: appointmentId,
        date: new Date().toISOString().split('T')[0],
        mode: 'Emergency',
        name: 'Emergency Appointment',
        specialty: patientInfo.specialty,
        image: '/src/assets/emergency-icon.png',
        fees: data.fees || '200', // Use backend fee if available
        status: 'pending',
        payment: 'pending',
        patientEmail: user?.email || patientInfo.phone || '',
        appointmentId: appointmentId,
        userId: user?.patient_id || '',
      };
      localStorage.setItem('myAppointments', JSON.stringify([appointmentWithId, ...saved]));

      setBookingStatus('Emergency appointment booked. Proceed to payment.');
      setShowPayment(true);
    } catch (error) {
      console.error('Booking error:', error.message);
      setError(`Failed to book emergency appointment: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-b3d8e4-gradient">
      <div className="max-w-5xl mx-auto bg-white px-3 py-6 md:px-4 md:py-10">
        <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">Book Emergency Appointment</h3>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Specialty *</label>
            <select
              name="specialty"
              value={patientInfo.specialty}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Specialty</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Book for</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  checked={bookingForSelf}
                  onChange={() => setBookingForSelf(true)}
                  className="mr-2"
                />
                Self
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  checked={!bookingForSelf}
                  onChange={() => setBookingForSelf(false)}
                  className="mr-2"
                />
                Family Member
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Patient Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Age *</label>
                <input
                  type="number"
                  name="age"
                  value={patientInfo.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Gender *</label>
                <select
                  name="gender"
                  value={patientInfo.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={patientInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={patientInfo.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Describe the emergency"
                  rows="4"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center text-xs md:text-sm text-gray-600">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
                className="mr-2"
              />
              I agree to the Terms and Conditions *
            </label>
          </div>
          {isLoading && (
            <p className="text-purple-600 text-xs md:text-sm mt-4">Submitting emergency appointment...</p>
          )}
          {bookingStatus && (
            <p
              className={`text-xs md:text-sm mt-4 font-semibold ${
                bookingStatus.includes('Failed') ? 'text-red-600' : 'text-purple-600'
              }`}
            >
              {bookingStatus}
            </p>
          )}
          {showPayment ? (
            <RazorpayEmergency
              appointmentId={appointmentId}
              amount={200} // Default fee, adjust if backend provides actual fee
              onSuccess={handlePaymentSuccess}
              doctorName="Emergency Appointment"
              patientEmail={user?.email || patientInfo.phone || ''}
            />
          ) : paymentCompleted ? (
            <div className="flex items-center space-x-4 mt-4">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
                Payment Done
              </span>
              <button
                onClick={downloadReceipt}
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition"
              >
                Download Receipt
              </button>
            </div>
          ) : (
            <button
              disabled={isLoading || !termsAccepted}
              onClick={handleBook}
              className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm mt-6 ${
                !isLoading && termsAccepted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Emergency Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergencyappointment;



// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { fetchWithAuth } from '../utils/api';
// import RazorpayEmergency from './RazorpayEmergency';

// const Emergencyappointment = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     phone: '',
//     specialty: '',
//     description: '',
//   });
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [error, setError] = useState('');
//   const [bookingForSelf, setBookingForSelf] = useState(true);
//   const [showPayment, setShowPayment] = useState(false);
//   const [appointmentId, setAppointmentId] = useState(null);
//   const [paymentCompleted, setPaymentCompleted] = useState(false);

//   const specialties = [
//     'Dentist',
//     'Endocrinologist',
//     'Cardiologist',
//     'Dermatologist',
//     'ENT Specialist',
//     'Nutritionist',
//     'General Physician',
//     'Gynecologist',
//     'Proctologist or General Surgeon',
//     'Psychiatrist',
//     'Pediatrician',
//     'Cosmetologist',
//     'Neurologist',
//     'Orthopedic',
//     'Nurse',
//     'Ophthalmologist',
//     'Homeopathy',
//     'Physiotherapist',
//   ];

//   // Populate or clear user data based on bookingForSelf
//   useEffect(() => {
//     if (!isLoggedIn) {
//       alert('Please log in to book an emergency appointment.');
//       navigate('/login-register');
//       return;
//     }

//     if (user && bookingForSelf) {
//       setPatientInfo((prev) => ({
//         ...prev,
//         name: user.name || 'Unknown Patient',
//         phone: user.phone || '',
//         age: user.age || '',
//         gender: user.gender || 'Other',
//         specialty: prev.specialty,
//         description: prev.description,
//       }));
//     } else {
//       setPatientInfo((prev) => ({
//         name: '',
//         age: '',
//         gender: '',
//         phone: '',
//         specialty: prev.specialty,
//         description: prev.description,
//       }));
//     }
//   }, [isLoggedIn, navigate, user, bookingForSelf]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPatientInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle terms and conditions checkbox
//   const handleTermsChange = (e) => {
//     setTermsAccepted(e.target.checked);
//   };

//   // Handle payment success
//   const handlePaymentSuccess = () => {
//     const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
//     const updatedAppointments = saved.map((appt) =>
//       appt.id === appointmentId
//         ? { ...appt, payment: 'completed', status: 'confirmed' }
//         : appt
//     );
//     localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
//     setBookingStatus('Emergency appointment booked and payment completed.');
//     setShowPayment(false);
//     setPaymentCompleted(true); // Show receipt button
//     setTimeout(() => navigate('/myappointment'), 3500);
//   };

//   // Handle download receipt
//   const downloadReceipt = () => {
//     const receiptContent = `
//       Emergency Appointment Receipt
//       ------------------
//       Appointment ID: ${appointmentId}
//       Patient Name: ${patientInfo.name || 'Unknown Patient'}
//       Specialty: ${patientInfo.specialty || 'Unknown Specialty'}
//       Date: ${new Date().toISOString().split('T')[0]}
//       Mode: Emergency
//       Fees: ₹${patientInfo.fees || '200'}
//       Patient Email: ${user?.email || patientInfo.phone || ''}
//       Status: Confirmed
//       Payment Status: Completed
//       Description: ${patientInfo.description || 'No description provided'}
//       ------------------
//       Generated on: ${new Date().toLocaleString()}
//     `;

//     const blob = new Blob([receiptContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `emergency_receipt_${appointmentId}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Handle form submission
//   const handleBook = async () => {
//     console.log('Starting handleBook with state:', {
//       patientInfo,
//       user,
//       bookingForSelf,
//       termsAccepted,
//     });

//     // Validation
//     const missingFields = [];
//     if (!isLoggedIn) {
//       alert('Please log in to book an appointment.');
//       navigate('/login-register');
//       return;
//     }
//     if (!user?.patient_id) {
//       alert('Your profile is incomplete. Please update your profile with a valid patient ID in the Profile section.');
//       navigate('/profilepage');
//       return;
//     }
//     if (!patientInfo.specialty) missingFields.push('Specialty');
//     if (!patientInfo.name) missingFields.push('Patient Name');
//     if (!patientInfo.age || isNaN(parseInt(patientInfo.age, 10)) || parseInt(patientInfo.age, 10) <= 0)
//       missingFields.push('Patient Age');
//     if (!patientInfo.gender) missingFields.push('Gender');
//     if (!patientInfo.phone) missingFields.push('Phone Number');
//     if (!patientInfo.description) missingFields.push('Description');
//     if (!termsAccepted) missingFields.push('Terms and Conditions');

//     if (missingFields.length > 0) {
//       alert(`Please fill all required fields: ${missingFields.join(', ')}.`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       const appointmentData = {
//         is_self: bookingForSelf,
//         name: patientInfo.name || user?.name || 'Unknown Patient',
//         phone_number: patientInfo.phone || user?.phone || '',
//         age: parseInt(patientInfo.age, 10) || 0,
//         gender: patientInfo.gender || user?.gender || 'Other',
//         problem_description: patientInfo.description,
//         specialization: patientInfo.specialty,
//       };

//       console.log('appointmentData before sending:', JSON.stringify(appointmentData, null, 2));

//       const response = await fetchWithAuth('http://192.168.0.122:10000/emergency/emergency/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(appointmentData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Backend validation errors:', JSON.stringify(errorData, null, 2));
//         let errorMessage = errorData.detail || 'Failed to book emergency appointment';
//         if (Array.isArray(errorData.detail)) {
//           errorMessage = errorData.detail.map((err) => {
//             return `Field ${err.loc.join('.')} ${err.msg.toLowerCase()}`;
//           }).join('; ');
//         } else if (errorData.detail === 'Invalid token') {
//           errorMessage = 'Authentication failed. Please log in again.';
//           alert(errorMessage);
//           navigate('/login-register');
//           return;
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       if (!data.appointment_id) {
//         throw new Error('No appointment_id received from backend');
//       }
//       const appointmentId = data.appointment_id;
//       setAppointmentId(appointmentId);

//       const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
//       const appointmentWithId = {
//         id: appointmentId,
//         date: new Date().toISOString().split('T')[0],
//         mode: 'Emergency',
//         name: 'Emergency Appointment',
//         specialty: patientInfo.specialty,
//         image: '/src/assets/emergency-icon.png',
//         fees: data.fees || '200', // Use backend fee if available
//         status: 'pending',
//         payment: 'pending',
//         patientEmail: user?.email || patientInfo.phone || '',
//         appointmentId: appointmentId,
//         userId: user?.patient_id || '',
//       };
//       localStorage.setItem('myAppointments', JSON.stringify([appointmentWithId, ...saved]));

//       setBookingStatus('Emergency appointment booked. Proceed to payment.');
//       setShowPayment(true);
//     } catch (error) {
//       console.error('Booking error:', error);
//       setError(`Failed to book emergency appointment: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-b3d8e4-gradient">
//       <div className="max-w-5xl mx-auto bg-white px-3 py-6 md:px-4 md:py-10">
//         <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">Book Emergency Appointment</h3>
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}
//         <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Specialty *</label>
//             <select
//               name="specialty"
//               value={patientInfo.specialty}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//             >
//               <option value="">Select Specialty</option>
//               {specialties.map((spec) => (
//                 <option key={spec} value={spec}>
//                   {spec}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Book for</label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingFor"
//                   checked={bookingForSelf}
//                   onChange={() => setBookingForSelf(true)}
//                   className="mr-2"
//                 />
//                 Self
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingFor"
//                   checked={!bookingForSelf}
//                   onChange={() => setBookingForSelf(false)}
//                   className="mr-2"
//                 />
//                 Family Member
//               </label>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Patient Information</label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter patient name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Age *</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={patientInfo.age}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter age"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Gender *</label>
//                 <select
//                   name="gender"
//                   value={patientInfo.gender}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={patientInfo.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Describe the emergency"
//                   rows="4"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="flex items-center text-xs md:text-sm text-gray-600">
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={handleTermsChange}
//                 className="mr-2"
//               />
//               I agree to the Terms and Conditions *
//             </label>
//           </div>
//           {isLoading && (
//             <p className="text-purple-600 text-xs md:text-sm mt-4">Submitting emergency appointment...</p>
//           )}
//           {bookingStatus && (
//             <p
//               className={`text-xs md:text-sm mt-4 font-semibold ${
//                 bookingStatus.includes('Failed') ? 'text-red-600' : 'text-purple-600'
//               }`}
//             >
//               {bookingStatus}
//             </p>
//           )}
//           {showPayment ? (
//             <RazorpayEmergency
//               appointmentId={appointmentId}
//               amount={200} // Default fee, adjust if backend provides actual fee
//               onSuccess={handlePaymentSuccess}
//               doctorName="Emergency Appointment"
//               patientEmail={user?.email || patientInfo.phone || ''}
//             />
//           ) : paymentCompleted ? (
//             <div className="flex items-center space-x-4 mt-4">
//               <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
//                 Payment Done
//               </span>
//               <button
//                 onClick={downloadReceipt}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition"
//               >
//                 Download Receipt
//               </button>
//             </div>
//           ) : (
//             <button
//               disabled={isLoading || !termsAccepted}
//               onClick={handleBook}
//               className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm mt-6 ${
//                 !isLoading && termsAccepted
//                   ? 'bg-blue-600 text-white hover:bg-blue-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Book Emergency Appointment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Emergencyappointment;