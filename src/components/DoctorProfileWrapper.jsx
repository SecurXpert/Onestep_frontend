import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DoctorProfile from './DoctorProfile';

const DoctorProfileWrapper = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.0.123:8000/doctors/all');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        // Find the doctor with matching doctor_id
        const selectedDoctor = data.find((doc) => doc.doctor_id === id);
        if (!selectedDoctor) {
          throw new Error('Doctor not found');
        }
        // Map API response to expected DoctorProfile props
        const mappedDoctor = {
          id: selectedDoctor.doctor_id,
          doctor_name: selectedDoctor.doctor_name,
          specialty: selectedDoctor.specialization_name,
          experience: `${selectedDoctor.experience_years} years`,
          work_location: selectedDoctor.work_location || 'Not specified',
          clinic_location: selectedDoctor.clinic_location || 'Not specified',
          about: selectedDoctor.about || 'No description available',
          consultation_fee: selectedDoctor.consultation_fee || 0,
          image: selectedDoctor.image || 'https://via.placeholder.com/150?text=Doctor+Image',
          gender: selectedDoctor.gender || 'Not specified',
          languages: selectedDoctor.languages || 'Not specified',
          rating: selectedDoctor.rating || 'Not rated',
          contact: selectedDoctor.phone || 'Not available',
          linkedin: selectedDoctor.linkedin || '',
          qualifications: selectedDoctor.degree || 'Not specified',
          institution: selectedDoctor.institution || 'Not specified',
          certification: selectedDoctor.certification || 'Not specified',
          expertise: selectedDoctor.expertise || [],
          success_rate: selectedDoctor.success_rate || 'Not available',
          techniques: selectedDoctor.techniques || [],
          hospital: selectedDoctor.hospital || {
            name: 'Fortis Hospital, Hyderabad',
            location: 'Hyderabad',
            hours: 'Not specified',
          },
          available: selectedDoctor.available || true,
          patients: selectedDoctor.patients || '275+',
          regNo: selectedDoctor.regNo || '20XXXXXX',
        };
        setDoctor(mappedDoctor);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading doctor profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6">
        <img src={doctor.image} alt={`${doctor.doctor_name} profile`} className="w-32 h-32 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{doctor.doctor_name}</h1> 
          <div className="flex items-center justify-between">
            <p className="text-gray-600">{doctor.specialty} ({doctor.qualifications})</p>
          
          <div className="mt-0 ml-8">
            <a href="#" className="text-blue-600 hover:underline">Experience</a> | 
            <a href="#" className="text-blue-600 hover:underline ml-2">Educational History</a>
          </div>
          </div>
          
          <p className="text-gray-500">{doctor.experience}  of experience</p>
          
        </div>
      </div>
      <div className="mt-6 flex items-center space-x-6 ml-[9rem]">
        <div className="flex items-right">
          <span className="text-green-600 mr-2">✔</span>
          <span>{doctor.hospital.name}</span>
        </div>
        <div className="text-green-600">{doctor.available ? 'Available' : 'Not Available'}</div>
        <div className="text-gray-500">• {doctor.patients} patients</div>
      </div>
       <div className="flex items-center space-x-6">
      <div className="mt-4">
        <p className="text-gray-700">Doctor ID: {doctor.id}</p>
        <p className="text-gray-700">Reg No.: {doctor.regNo}</p>
      </div>
      <div className="mt-6  ml-[5rem] flex  space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Appointment</button>
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200">Check Availability</button>
      </div>
      </div>
    </div>
  );
};

export default DoctorProfileWrapper;