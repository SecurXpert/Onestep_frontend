import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ProfileContent = () => {
   const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const medicalFileInputRef = useRef(null);
 
  const defaultProfile = {
    patient_id: user?.patient_id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    maritalStatus: user?.maritalStatus || '',
    address: user?.address || '',
    bloodGroup: user?.bloodGroup || '',
    region: user?.region || '',
    dob: user?.dob || '',
    medical_history: user?.medical_history || false,
    medical_document: user?.medical_document || null,
  };
 
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [medicalDocument, setMedicalDocument] = useState(null);
  const [selectedMedicalDocument, setSelectedMedicalDocument] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login-register');
      return;
    }
 
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth('http://192.168.0.112:8000/profile/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
 
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Fetch profile error response:', errorData);
          throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Failed to fetch profile'}`);
        }
 
        const data = await response.json();
        console.log('Fetched profile data:', data);
        const formattedProfile = {
          patient_id: data.patient_id || '',
          name: data.name || '',
          email: data.email || '',
          phone: data.phone_number || '',
          gender: data.gender || '',
          maritalStatus: data.marital_status || '',
          address: data.address || '',
          bloodGroup: data.blood_group || '',
          region: data.region || '',
          dob: data.dob || '',
          medical_history: data.medical_history || false,
          medical_document: data.medical_document || null,
        };
 
        setProfile(formattedProfile);
        if (data.profile_picture) {
          const baseUrl = data.profile_picture.startsWith('/')
            ? data.profile_picture
            : `/${data.profile_picture}`;
          const imageUrl = `http://192.168.0.131:8000${baseUrl}?t=${Date.now()}`;
          console.log('Setting profile image URL:', imageUrl);
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            setProfileImage(imageUrl);
            sessionStorage.setItem('profileImage', imageUrl);
          };
          img.onerror = () => {
            console.error('Failed to load profile image:', imageUrl);
            setError('Failed to load profile image. Please check if the image exists.');
            setProfileImage(null);
          };
        } else {
          setProfileImage(null);
        }
        if (data.medical_document) {
          const docBaseUrl = data.medical_document.startsWith('/')
            ? data.medical_document
            : `/${data.medical_document}`;
          const docUrl = `http://192.168.0.131:8000${docBaseUrl}?t=${Date.now()}`;
          console.log('Setting medical document URL:', docUrl);
          setMedicalDocument(docUrl);
        } else {
          setMedicalDocument(null);
        }
        setError('');
        sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
        if (err.message.includes('401')) {
          logout();
          navigate('/login-register');
        }
      } finally {
        setLoading(false);
      }
    };
 
    fetchProfile();
  }, [isLoggedIn, navigate, logout]);
 
  if (!isLoggedIn) {
    return null;
  }
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
 
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setSelectedFile(null);
      setSelectedMedicalDocument(null);
    }
  };
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, or GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (file.size === 0) {
        setError('Selected image is empty. Please choose a valid image.');
        return;
      }
      console.log('Selected profile picture:', { name: file.name, type: file.type, size: file.size });
      setProfileImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setError('');
    }
  };
 
  const handleMedicalDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid medical document (JPEG, PNG, GIF, or PDF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Medical document size must be less than 5MB');
        return;
      }
      if (file.size === 0) {
        setError('Selected medical document is empty. Please choose a valid file.');
        return;
      }
      console.log('Selected medical document:', { name: file.name, type: file.type, size: file.size });
      setMedicalDocument(URL.createObjectURL(file));
      setSelectedMedicalDocument(file);
      setError('');
    }
  };
 
  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
  const handleMedicalDocPlusClick = () => {
    if (medicalFileInputRef.current) {
      medicalFileInputRef.current.click();
    }
  };
 
  const handleImageError = (e) => {
    console.error('Image load error, falling back to placeholder');
    setError('Failed to load profile image. Please check if the image exists.');
    e.target.src = 'https://placehold.co/80x80?text=Profile';
  };
 
  const handleMedicalDocError = () => {
    console.error('Medical document load error, clearing document');
    setError('Failed to load medical document. Please check if the file exists.');
    setMedicalDocument(null);
  };
 
  const handleSave = async () => {
    try {
      if (!profile.name || !profile.email || !profile.phone || !profile.dob) {
        setError('Name, email, phone number, and date of birth are required');
        return;
      }
 
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone_number', profile.phone);
      formData.append('gender', profile.gender || '');
      formData.append('marital_status', profile.maritalStatus || '');
      formData.append('address', profile.address || '');
      formData.append('blood_group', profile.bloodGroup || '');
      formData.append('region', profile.region || '');
      formData.append('dob', profile.dob);
      formData.append('medical_history', profile.medical_history.toString());
      if (selectedFile) {
        formData.append('profile_picture', selectedFile);
        console.log('Appending profile picture:', selectedFile.name);
      }
      if (selectedMedicalDocument) {
        formData.append('medical_document', selectedMedicalDocument);
        console.log('Appending medical document:', selectedMedicalDocument.name);
      }
 
      const formDataEntries = {};
      for (let [key, value] of formData.entries()) {
        formDataEntries[key] = value instanceof File ? `File: ${value.name}` : value;
      }
      console.log('Profile update payload:', formDataEntries);
 
      const response = await fetchWithAuth('http://192.168.0.112:8000/profile/me', {
        method: 'PUT',
        body: formData,
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Profile update error response:', errorData);
        throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Profile update failed'}`);
      }
 
      const updatedProfile = await response.json();
      console.log('Backend response:', updatedProfile);
      const formattedProfile = {
        patient_id: updatedProfile.patient_id || profile.patient_id || '',
        name: updatedProfile.name || '',
        email: updatedProfile.email || '',
        phone: updatedProfile.phone_number || '',
        gender: updatedProfile.gender || '',
        maritalStatus: updatedProfile.marital_status || '',
        address: updatedProfile.address || '',
        bloodGroup: updatedProfile.blood_group || '',
        region: updatedProfile.region || '',
        dob: updatedProfile.dob || '',
        medical_history: updatedProfile.medical_history || false,
        medical_document: updatedProfile.medical_document || null,
      };
 
      sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
      if (updatedProfile.profile_picture) {
        const baseUrl = updatedProfile.profile_picture.startsWith('/')
          ? updatedProfile.profile_picture
          : `/${updatedProfile.profile_picture}`;
        const imageUrl = `http://192.168.0.131:8000${baseUrl}?t=${Date.now()}`;
        console.log('Updating profile image URL:', imageUrl);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setProfileImage(imageUrl);
          sessionStorage.setItem('profileImage', imageUrl);
        };
        img.onerror = () => {
          console.error('Failed to load updated profile image:', imageUrl);
          setError('Failed to load profile image after upload. Please try again.');
          setProfileImage(null);
          sessionStorage.setItem('profileImage', '');
        };
      } else {
        console.warn('No profile_picture in response');
        if (selectedFile) {
          setError('Profile picture upload failed. Please try again.');
          setProfileImage(null);
          sessionStorage.setItem('profileImage', '');
        }
      }
 
      if (updatedProfile.medical_document) {
        const docBaseUrl = updatedProfile.medical_document.startsWith('/')
          ? updatedProfile.medical_document
          : `/${updatedProfile.medical_document}`;
        const docUrl = `http://192.168.0.131:8000${docBaseUrl}?t=${Date.now()}`;
        console.log('Updating medical document URL:', docUrl);
        setMedicalDocument(docUrl);
      } else {
        console.warn('No medical_document in response');
        if (selectedMedicalDocument) {
          setError('Medical document upload failed. Please try again.');
          setMedicalDocument(null);
        }
      }
 
      console.log('Saved Profile:', formattedProfile);
      console.log('Profile Image URL:', updatedProfile.profile_picture || 'None');
      console.log('Medical Document URL:', updatedProfile.medical_document || 'None');
 
      setProfile(formattedProfile);
      setIsEditing(false);
      setSelectedFile(null);
      setSelectedMedicalDocument(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Failed to save profile or upload files. Please try again.');
      if (selectedFile) {
        setProfileImage(null);
        sessionStorage.setItem('profileImage', '');
      }
      if (selectedMedicalDocument) {
        setMedicalDocument(null);
      }
    }
  };
 
  const renderField = (label, name, type = 'text', isDropdown = false, options = []) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-4 bg-gray-50 rounded-lg mb-3 shadow-sm">
      <label className="w-40 font-semibold text-gray-700">{label}:</label>
      {isEditing && name !== 'patient_id' ? (
        isDropdown ? (
          <select
            name={name}
            value={profile[name]}
            onChange={handleChange}
            className="flex-1 border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <input
            type="checkbox"
            name={name}
            checked={profile[name]}
            onChange={handleChange}
            className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={profile[name]}
            onChange={handleChange}
            className="flex-1 border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        )
      ) : (
        <div className="flex-1 text-gray-800 font-medium">
          {type === 'checkbox' ? (profile[name] ? 'Yes' : 'No') : profile[name] || `Not Provided`}
        </div>
      )}
    </div>
  );
 
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      {loading && <p className="text-gray-600 mb-4">Loading profile...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!profile.patient_id && (
        <p className="text-red-600 mb-4">
          Your profile is incomplete. Please ensure all required fields, including Patient ID, are filled.
        </p>
      )}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileImage || 'https://placehold.co/80x80?text=Profile'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow-md"
              onError={handleImageError}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute top-0 left-0 opacity-0 w-20 h-20 cursor-pointer"
                  title="Upload Profile Picture"
                  ref={fileInputRef}
                />
                <FaPlus
                  className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 w-7 h-7 cursor-pointer hover:bg-purple-700 transition shadow-sm"
                  title="Upload Profile Picture"
                  onClick={handlePlusClick}
                />
              </>
            )}
          </div>
          <div className="leading-tight">
            <h1 className="text-2xl font-bold text-purple-800">{profile.name || 'Your Name'}</h1>
            <p className="text-md text-gray-500">{profile.email || 'Your Email'}</p>
          </div>
        </div>
        <FaEdit
          className="text-xl text-purple-600 cursor-pointer hover:text-purple-800 transition"
          title={isEditing ? 'Cancel' : 'Edit'}
          onClick={handleEditToggle}
        />
      </div>
 
      <hr className="border-t-2 border-purple-100 mb-6" />
 
      <div className="space-y-2">
        {renderField('Patient ID', 'patient_id')}
        {renderField('Name', 'name')}
        {renderField('Email', 'email')}
        {renderField('Phone Number', 'phone')}
        {renderField('Gender', 'gender', 'text', true, ['Male', 'Female', 'Other'])}
        {renderField('Marital Status', 'maritalStatus', 'text', true, ['Single', 'Married', 'Divorced'])}
        {renderField('Address', 'address')}
        {renderField('Blood Group', 'bloodGroup')}
        {renderField('Region', 'region')}
        {renderField('Date of Birth', 'dob', 'date')}
        {renderField('Medical History', 'medical_history', 'checkbox')}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-4 bg-gray-50 rounded-lg mb-3 shadow-sm">
          <label className="w-40 font-semibold text-gray-700">Medical Document:</label>
          {isEditing ? (
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleMedicalDocumentUpload}
                className="hidden"
                ref={medicalFileInputRef}
              />
              <button
                onClick={handleMedicalDocPlusClick}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <FaPlus /> Upload Medical Document
              </button>
              {medicalDocument && (
                <a
                  href={medicalDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  onError={handleMedicalDocError}
                >
                  View Current Document
                </a>
              )}
            </div>
          ) : (
            <div className="flex-1 text-gray-800 font-medium">
              {medicalDocument ? (
                <a
                  href={medicalDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  onError={handleMedicalDocError}
                >
                  View Medical Document
                </a>
              ) : (
                'Not Provided'
              )}
            </div>
          )}
        </div>
      </div>
 
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;