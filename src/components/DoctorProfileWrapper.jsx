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
        const response = await fetch('http://192.168.0.111:8000/doctors/all');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        const selectedDoctor = data.find((doc) => doc.doctor_id === id);
        if (!selectedDoctor) {
          throw new Error('Doctor not found');
        }
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
      <div className="flex items-center justify-between bg-blue-100 p-6 rounded-lg">
        <div>
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt={`${doctor.doctor_name} profile`} className="w-48 h-48 rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{doctor.doctor_name}</h1>
          <p className="text-gray-600">{doctor.specialty} ({doctor.qualifications})</p>
          <p className="text-gray-500">{doctor.experience} of experience</p>
          <p className="text-gray-700 italic mt-2">"I believe in listening to the patient's heart – both literally and emotionally."</p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-yellow-500">🏥</span>
            <span className="text-gray-700">{doctor.hospital.name}</span>
            <span className="text-gray-600">• {doctor.patients} patients</span>
            <span className="text-green-600">{doctor.available ? 'Available' : 'Not Available'}</span>
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Check Availability</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Appointment</button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <div className="flex items-center bg-gray-100 p-2 rounded">
          <span className="text-blue-600 mr-2">👤</span>
          <span>In clinic, Online</span>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded">
          <span className="text-orange-600 mr-2">🗣️</span>
          <span>English, Hindi, Telugu</span>
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded">
          <span className="text-green-600 mr-2">⭐</span>
          <span>97% recommends</span>
        </div>
      </div>
      <div className="mt-10 p-6 bg-blue-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt={`${doctor.doctor_name} profile`} className="w-48 h-48 rounded-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">About Dr. Anita Sharma</h2>
            <p className="text-gray-700">
              Dr. Anita Sharma is a renowned Cardiologist with over 19 years of clinical experience in managing a wide spectrum of heart-related disorders. Known for her evidence-based approach and patient-first philosophy, Dr. Sharma specializes in both preventive cardiology and advanced interventional treatments.
            </p>
            <p className="text-gray-700 mt-2">
              She is currently affiliated with Fortis Hospital, Hyderabad, and has successfully treated over 3,200+ patients across all age groups. Her calm demeanor, multilingual communication, and focus on long-term patient well-being make her a preferred cardiologist for both routine checkups and critical interventions.
            </p>
            <div className="mt-4 flex space-x-4 text-red-600">
              <a href="#" className="hover:underline">Experience</a>
              <a href="#" className="hover:underline">Education</a>
              <a href="#" className="hover:underline">Certifications</a>
              <a href="#" className="hover:underline">Awards</a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <div className="flex items-center bg-white p-3 rounded shadow">
            <img src="https://via.placeholder.com/50?text=Apollo" alt="Apollo Hospital" className="w-10 h-10 mr-2" />
            <span>Apollo Hospital, Hyderabad</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded shadow">
            <img src="https://via.placeholder.com/50?text=Fortis" alt="Fortis Hospital" className="w-10 h-10 mr-2" />
            <span>Fortis Hospital, Chennai</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded shadow">
            <img src="https://via.placeholder.com/50?text=Manipal" alt="Manipal Hospital" className="w-10 h-10 mr-2" />
            <span>Manipal Hospital, Bangalore</span>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Meet Now</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Know More!</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileWrapper;