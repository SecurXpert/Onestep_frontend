// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaTachometerAlt, FaUserMd, FaUsers, FaBell, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// // Sample data (replace with API calls in a real application)
// const initialDoctors = [
//   { id: 1, name: 'Dr. John Smith', specialty: 'Cardiology' },
//   { id: 2, name: 'Dr. Jane Doe', specialty: 'Neurology' },
// ];
// const initialAdmins = [
//   { id: 1, name: 'Admin One', email: 'admin1@example.com' },
//   { id: 2, name: 'Admin Two', email: 'admin2@example.com' },
// ];
// const initialPatients = [
//   { id: 1, name: 'Patient One', condition: 'Stable' },
//   { id: 2, name: 'Patient Two', condition: 'Critical' },
// ];

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState(initialDoctors);
//   const [admins, setAdmins] = useState(initialAdmins);
//   const [patients, setPatients] = useState(initialPatients);

//   // Check authentication
// //   useEffect(() => {
// //     const isAuthenticated = localStorage.getItem('isAuthenticated');
// //     if (!isAuthenticated) {
// //       navigate('/login');
// //     }
// //   }, [navigate]);

//   // Doctor handlers
//   const handleAddDoctor = () => {
//     // Implement add doctor logic (e.g., open modal or navigate to form)
//     console.log('Add doctor');
//   };

//   const handleEditDoctor = (id) => {
//     // Implement edit doctor logic
//     console.log(`Edit doctor ${id}`);
//   };

//   const handleDeleteDoctor = (id) => {
//     setDoctors(doctors.filter((doctor) => doctor.id !== id));
//   };

//   // Admin handlers
//   const handleAddAdmin = () => {
//     // Implement add admin logic
//     console.log('Add admin');
//   };

//   const handleDeleteAdmin = (id) => {
//     setAdmins(admins.filter((admin) => admin.id !== id));
//   };

//   // Patient handlers
//   const handleDeletePatient = (id) => {
//     setPatients(patients.filter((patient) => patient.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-600">Admin</span>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem('isAuthenticated');
//                   navigate('/login');
//                 }}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-800 text-white min-h-screen">
//           <nav className="mt-5">
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/dashboard"
//                   className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
//                 >
//                   <FaTachometerAlt className="mr-3" />
//                   Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/doctors"
//                   className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
//                 >
//                   <FaUserMd className="mr-3" />
//                   Doctors
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/patients"
//                   className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
//                 >
//                   <FaUsers className="mr-3" />
//                   Patients
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/notifications"
//                   className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
//                 >
//                   <FaBell className="mr-3" />
//                   Notifications
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>

//             {/* Doctors Section */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Doctors List</h3>
//                 <button
//                   onClick={handleAddDoctor}
//                   className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   <FaPlus className="mr-2" /> Add Doctor
//                 </button>
//               </div>
//               <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {doctors.map((doctor) => (
//                       <tr key={doctor.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialty}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEditDoctor(doctor.id)}
//                             className="text-blue-500 hover:text-blue-700 mr-4"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteDoctor(doctor.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Admins Section */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Admins List</h3>
//                 <button
//                   onClick={handleAddAdmin}
//                   className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   <FaPlus className="mr-2" /> Add Admin
//                 </button>
//               </div>
//               <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {admins.map((admin) => (
//                       <tr key={admin.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleDeleteAdmin(admin.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Patients Section */}
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Patients List</h3>
//               <div className="bg-white shadow rounded-lg overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {patients.map((patient) => (
//                       <tr key={patient.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.name}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.condition}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleDeletePatient(patient.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FaTrash />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [formData, setFormData] = useState({
    doctor_id: '',
    name: '',
    specialization: '',
    experience_years: '',
    quote: '',
    hospital: '',
    total_patients: '',
    status: true,
    profile_img_left: null,
    profile_img_right: null,
    label1: '',
    label2: '',
    label3: '',
    about: ''
  });
  const [sections, setSections] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);

  const API_BASE_URL = 'http://192.168.0.170:8000';

  // useEffect(() => {
  //   fetchDoctors();
  // }, []);

  // const fetchDoctors = async () => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/doctors`);
  //     setDoctors(Array.isArray(response.data) ? response.data : []);
  //     setError(null);
  //     setDebugInfo('Successfully fetched doctors');
  //   } catch (error) {
  //     console.error('Error fetching doctors:', error);
  //     setError(`Failed to fetch doctors: ${error.message}. Please check if the endpoint ${API_BASE_URL}/doctors is correctly configured on the server.`);
  //     setDebugInfo(`Fetch doctors failed: ${error.response?.status} ${error.message}`);
  //   }
  // };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      ...doctor,
      profile_img_left: null,
      profile_img_right: null
    });
    setIsEditing(true);
    setError(null);
    setDebugInfo(`Initialized edit for doctor ${doctor.doctor_id}`);
  };

  const handleDelete = async (doctor_id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`${API_BASE_URL}/doctors/${doctor_id}`);
        setDoctors(doctors.filter(doc => doc.doctor_id !== doctor_id));
        setSelectedDoctor(null);
        setIsEditing(false);
        setError(null);
        setDebugInfo(`Successfully deleted doctor ${doctor_id}`);
      } catch (error) {
        console.error('Error deleting doctor:', error);
        setError(`Failed to delete doctor: ${error.message}.`);
        setDebugInfo(`Delete doctor failed: ${error.response?.status} ${error.message}`);
      }
    }
  };

  const handleAdd = () => {
    setSelectedDoctor(null);
    setFormData({
      doctor_id: '',
      name: '',
      specialization: '',
      experience_years: '',
      quote: '',
      hospital: '',
      total_patients: '',
      status: true,
      profile_img_left: null,
      profile_img_right: null,
      label1: '',
      label2: '',
      label3: '',
      about: ''
    });
    setSections([]);
    setClinics([]);
    setExpertise([]);
    setReviews([]);
    setVideos([]);
    setIsEditing(true);
    setError(null);
    setDebugInfo('Initialized form for adding new doctor');
  };

  const handleSaveDoctor = async () => {
    if (!formData.doctor_id || !formData.name || !formData.specialization) {
      setError('Doctor ID, Name, and Specialization are required.');
      setDebugInfo('Validation failed: Missing required fields');
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        doctor_id: formData.doctor_id,
        name: formData.name,
        specialization: formData.specialization,
        experience_years: formData.experience_years,
        quote: formData.quote,
        hospital: formData.hospital,
        total_patients: formData.total_patients,
        status: formData.status.toString(),
        label1: formData.label1,
        label2: formData.label2,
        label3: formData.label3,
        about: formData.about
      }).toString();

      const formDataToSend = new FormData();
      if (formData.profile_img_left) {
        formDataToSend.append('profile_img_left', formData.profile_img_left);
      }
      if (formData.profile_img_right) {
        formDataToSend.append('profile_img_right', formData.profile_img_right);
      }

      let doctorId = formData.doctor_id;
      if (selectedDoctor) {
        await axios.put(`${API_BASE_URL}/doctors/${doctorId}?${queryParams}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setDebugInfo(`Successfully updated doctor ${doctorId}`);
      } else {
        const response = await axios.post(`${API_BASE_URL}/doctors/create?${queryParams}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        doctorId = response.data.doctor_id;
        setDebugInfo(`Successfully created doctor ${doctorId}`);
      }
      setFormData({ ...formData, doctor_id: doctorId });
      fetchDoctors();
      setError(null);
    } catch (error) {
      console.error('Error saving doctor:', error);
      setError(`Failed to save doctor: ${error.message}. Please ensure the backend accepts query parameters and multipart/form-data.`);
      setDebugInfo(`Save doctor failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleSaveSections = async () => {
    if (!formData.doctor_id) {
      setError('Please save doctor details first.');
      setDebugInfo('Validation failed: Missing doctor_id');
      return;
    }
    try {
      const formDataToSend = new FormData();
      sections.forEach((section, index) => {
        formDataToSend.append(`section_type`, section.section_type);
        if (section.image_file) {
          formDataToSend.append(`images`, section.image_file);
        }
      });
      await axios.post(`${API_BASE_URL}/doctors/sections/${formData.doctor_id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setError(null);
      setDebugInfo(`Successfully saved sections for doctor ${formData.doctor_id}`);
    } catch (error) {
      console.error('Error saving sections:', error);
      setError(`Failed to save sections: ${error.message}`);
      setDebugInfo(`Save sections failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleSaveClinics = async () => {
    if (!formData.doctor_id) {
      setError('Please save doctor details first.');
      setDebugInfo('Validation failed: Missing doctor_id');
      return;
    }
    try {
      const formDataToSend = new FormData();
      clinics.forEach((clinic, index) => {
        formDataToSend.append(`address`, clinic.address);
        formDataToSend.append(`city`, clinic.city);
        formDataToSend.append(`latitude`, clinic.latitude);
        formDataToSend.append(`longitude`, clinic.longitude);
        if (clinic.image_file) {
          formDataToSend.append(`images`, clinic.image_file);
        }
      });
      await axios.post(`${API_BASE_URL}/doctors/clinics/${formData.doctor_id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setError(null);
      setDebugInfo(`Successfully saved clinics for doctor ${formData.doctor_id}`);
    } catch (error) {
      console.error('Error saving clinics:', error);
      setError(`Failed to save clinics: ${error.message}`);
      setDebugInfo(`Save clinics failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleSaveExpertise = async () => {
    if (!formData.doctor_id) {
      setError('Please save doctor details first.');
      setDebugInfo('Validation failed: Missing doctor_id');
      return;
    }
    try {
      const formDataToSend = new FormData();
      expertise.forEach((exp, index) => {
        formDataToSend.append(`description`, exp.description);
        if (exp.image_file) {
          formDataToSend.append(`images`, exp.image_file);
        }
      });
      await axios.post(`${API_BASE_URL}/doctors/expertise/${formData.doctor_id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setError(null);
      setDebugInfo(`Successfully saved expertise for doctor ${formData.doctor_id}`);
    } catch (error) {
      console.error('Error saving expertise:', error);
      setError(`Failed to save expertise: ${error.message}`);
      setDebugInfo(`Save expertise failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleSaveReviews = async () => {
    if (!formData.doctor_id) {
      setError('Please save doctor details first.');
      setDebugInfo('Validation failed: Missing doctor_id');
      return;
    }
    try {
      const reviewData = reviews.length > 0 ? reviews[0] : { patient_name: '', description: '', rating: 0 };
      await axios.post(`${API_BASE_URL}/doctors/reviews/${formData.doctor_id}`, reviewData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setError(null);
      setDebugInfo(`Successfully saved reviews for doctor ${formData.doctor_id}`);
    } catch (error) {
      console.error('Error saving reviews:', error);
      setError(`Failed to save reviews: ${error.message}`);
      setDebugInfo(`Save reviews failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleSaveVideos = async () => {
    if (!formData.doctor_id) {
      setError('Please save doctor details first.');
      setDebugInfo('Validation failed: Missing doctor_id');
      return;
    }
    try {
      const videoData = videos.length > 0 ? videos[0] : { video_url: '' };
      await axios.post(`${API_BASE_URL}/doctors/videos/${formData.doctor_id}`, videoData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setError(null);
      setDebugInfo(`Successfully saved videos for doctor ${formData.doctor_id}`);
    } catch (error) {
      console.error('Error saving videos:', error);
      setError(`Failed to save videos: ${error.message}`);
      setDebugInfo(`Save videos failed: ${error.response?.status} ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    if (field === 'image_file') {
      updatedSections[index][field] = value[0];
    } else {
      updatedSections[index][field] = value;
    }
    setSections(updatedSections);
  };

  const handleClinicChange = (index, field, value) => {
    const updatedClinics = [...clinics];
    if (field === 'image_file') {
      updatedClinics[index][field] = value[0];
    } else {
      updatedClinics[index][field] = value;
    }
    setClinics(updatedClinics);
  };

  const handleExpertiseChange = (index, field, value) => {
    const updatedExpertise = [...expertise];
    if (field === 'image_file') {
      updatedExpertise[index][field] = value[0];
    } else {
      updatedExpertise[index][field] = value;
    }
    setExpertise(updatedExpertise);
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][field] = value;
    setReviews(updatedReviews);
  };

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index][field] = value;
    setVideos(updatedVideos);
  };

  const addSection = () => {
    setSections([...sections, { section_type: '', image_file: null }]);
    setDebugInfo('Added new section');
  };

  const addClinic = () => {
    setClinics([...clinics, { address: '', city: '', latitude: '', longitude: '', image_file: null }]);
    setDebugInfo('Added new clinic');
  };

  const addExpertise = () => {
    setExpertise([...expertise, { image_file: null, description: '' }]);
    setDebugInfo('Added new expertise');
  };

  const addReview = () => {
    setReviews([...reviews, { patient_name: '', description: '', rating: 0 }]);
    setDebugInfo('Added new review');
  };

  const addVideo = () => {
    setVideos([...videos, { video_url: '' }]);
    setDebugInfo('Added new video');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - Doctor Portfolio Management</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {debugInfo && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
            Debug: {debugInfo}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Doctors</h2>
            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> Add Doctor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.length > 0 ? (
              doctors.map(doctor => (
                <div key={doctor.doctor_id} className="bg-gray-50 p-4 rounded-lg shadow border flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(doctor)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={20} />
                    </button>
                    <button onClick={() => handleDelete(doctor.doctor_id)} className="text-red-500 hover:text-red-700">
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No doctors found.</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{selectedDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
                <input
                  type="text"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  disabled={!!selectedDoctor}
                  placeholder="e.g., DR201"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., Dr. Anil Sharma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., Cardiologist (MBBS, MD)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., 14"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quote</label>
                <input
                  type="text"
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., I believe in listening to the patient's heart."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., Fortis Hospital, Hyderabad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Patients</label>
                <input
                  type="number"
                  name="total_patients"
                  value={formData.total_patients}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., 275"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image Left</label>
                <input
                  type="file"
                  name="profile_img_left"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image Right</label>
                <input
                  type="file"
                  name="profile_img_right"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label 1</label>
                <input
                  type="text"
                  name="label1"
                  value={formData.label1}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., In clinic, Online"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label 2</label>
                <input
                  type="text"
                  name="label2"
                  value={formData.label2}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., English, Hindi, Telugu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Label 3</label>
                <input
                  type="text"
                  name="label3"
                  value={formData.label3}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="e.g., 97% Recommends"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  rows="4"
                  placeholder="Enter doctor's bio..."
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleSaveDoctor} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2">
                <FaSave /> Save Doctor
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Sections</h3>
                <button onClick={addSection} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add Section</button>
              </div>
              {sections.map((section, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={section.section_type}
                    onChange={(e) => handleSectionChange(index, 'section_type', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Section Type (e.g., Experience)"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleSectionChange(index, 'image_file', e.target.files)}
                    className="p-2 border rounded w-full"
                    accept="image/*"
                  />
                </div>
              ))}
              <button onClick={handleSaveSections} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 mt-4">
                <FaSave /> Save Sections
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Clinics</h3>
                <button onClick={addClinic} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add Clinic</button>
              </div>
              {clinics.map((clinic, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={clinic.address}
                    onChange={(e) => handleClinicChange(index, 'address', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    value={clinic.city}
                    onChange={(e) => handleClinicChange(index, 'city', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="City"
                  />
                  <input
                    type="number"
                    value={clinic.latitude}
                    onChange={(e) => handleClinicChange(index, 'latitude', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Latitude"
                  />
                  <input
                    type="number"
                    value={clinic.longitude}
                    onChange={(e) => handleClinicChange(index, 'longitude', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Longitude"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleClinicChange(index, 'image_file', e.target.files)}
                    className="p-2 border rounded w-full"
                    accept="image/*"
                  />
                </div>
              ))}
              <button onClick={handleSaveClinics} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 mt-4">
                <FaSave /> Save Clinics
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Expertise</h3>
                <button onClick={addExpertise} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add Expertise</button>
              </div>
              {expertise.map((exp, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="file"
                    onChange={(e) => handleExpertiseChange(index, 'image_file', e.target.files)}
                    className="p-2 border rounded w-full"
                    accept="image/*"
                  />
                  <input
                    type="text"
                    value={exp.description}
                    onChange={(e) => handleExpertiseChange(index, 'description', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Description"
                  />
                </div>
              ))}
              <button onClick={handleSaveExpertise} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 mt-4">
                <FaSave /> Save Expertise
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <button onClick={addReview} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add Review</button>
              </div>
              {reviews.map((review, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={review.patient_name}
                    onChange={(e) => handleReviewChange(index, 'patient_name', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Patient Name"
                  />
                  <input
                    type="text"
                    value={review.description}
                    onChange={(e) => handleReviewChange(index, 'description', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={review.rating}
                    onChange={(e) => handleReviewChange(index, 'rating', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                  />
                </div>
              ))}
              <button onClick={handleSaveReviews} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 mt-4">
                <FaSave /> Save Reviews
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Videos</h3>
                <button onClick={addVideo} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add Video</button>
              </div>
              {videos.map((video, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={video.video_url}
                    onChange={(e) => handleVideoChange(index, 'video_url', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Video URL (e.g., https://youtube.com/watch?v=...)"
                  />
                </div>
              ))}
              <button onClick={handleSaveVideos} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 mt-4">
                <FaSave /> Save Videos
              </button>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setIsEditing(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2">
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
