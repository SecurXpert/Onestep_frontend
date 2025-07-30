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
            name: 'Not specified',
            location: 'Not specified',
            hours: 'Not specified',
          },
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

  return <DoctorProfile doctor={doctor} />;
};

export default DoctorProfileWrapper;