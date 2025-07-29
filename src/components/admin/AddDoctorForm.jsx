import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AddDoctorForm = () => {
  const { addDoctor } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    image: null,
    rating: '',
    about: '',
    fees: '',
    address: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please upload a JPEG or PNG image');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty || !formData.experience || !formData.image || !formData.rating || !formData.about || !formData.fees || !formData.address) {
      setError('All fields are required');
      return;
    }
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5) {
      setError('Rating must be a number between 0 and 5');
      return;
    }

    const newDoctor = {
      _id: Date.now().toString(),
      name: formData.name,
      specialty: formData.specialty,
      experience: formData.experience,
      image: formData.image,
      rating: parseFloat(formData.rating),
      about:formData.about,
      fees:formData.fees,
      address:formData.address,
    };

    addDoctor(newDoctor);
    setFormData({
      name: '',
      specialty: '',
      experience: '',
      image: null,
      rating: '',
      about: '',
      fees: '',
      address: '',
    });
    setError('');
    document.getElementById('image').value = '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-blue-500 mb-4">Add New Doctor</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Doctor name"
          />
          <label
            htmlFor="name"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Doctor Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Specialty"
          />
          <label
            htmlFor="specialty"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Specialty
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Experience"
          />
          <label
            htmlFor="experience"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-allNull duration-300"
          >
            Experience (e.g., 5 years)
          </label>
        </div>
        <div className="relative">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Doctor image"
          />
          <label
            htmlFor="image"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Upload Image
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            max="5"
            step="0.5"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Rating"
          />
          <label
            htmlFor="rating"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Rating (0-5)
          </label>
        </div>
         <div className="relative">
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            max="5"
            step="0.5"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="about"
          />
          <label
            htmlFor="about"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            about
          </label>
        </div>
         <div className="relative">
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            max="5"
            step="0.5"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="fees"
          />
          <label
            htmlFor="fees"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            fees
          </label>
        </div>
         <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            max="5"
            step="0.5"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="address"
          />
          <label
            htmlFor="address"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            address
          </label>
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;