import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import registerImage from '../assets/registerimage.png'; // Import the image
 
const LoginRegister = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', number: '', dob: '', email: '', password: '' });
  const [error, setError] = useState('');
 
  // Reset error when switching tabs
  useEffect(() => {
    setError('');
  }, [activeTab]);
 
  // Login form handlers
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
 
    try {
      const result = await login(loginForm.email, loginForm.password);
 
      if (result.success) {
        const accessToken = result.data?.access_token;
        if (!accessToken) {
          throw new Error('Access token not found in response');
        }
 
        const userRole = result.data.user?.role || 'user';
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };
 
  // Register form handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    // Restrict name to letters and spaces only
    if (name === 'name' && value && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    // Restrict number to digits only
    if (name === 'number' && value && !/^\d*$/.test(value)) {
      return;
    }
    setRegisterForm({ ...registerForm, [name]: value });
  };
 
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, number, dob, email, password } = registerForm;
 
    if (!name || !number || !dob || !email || !password) {
      setError('All fields are required');
      return;
    }
 
    // Validate phone number
    if (!/^\d{10}$/.test(number)) {
      setError('Phone number must be 10 digits');
      return;
    }
 
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
 
    // Validate DOB
    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }
 
    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
 
    const result = await register(name, number, dob, email, password);
    if (result.success) {
      alert('Registration successful! Please login.');
      setActiveTab('login');
    } else {
      setError(result.message);
    }
  };
 
  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];
 
  return (
    <div className="min-h-screen flex items-center justify-center p-20">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 hidden md:block h-[600px]"> {/* Fixed height for image container */}
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-full object-cover" // Ensure image covers without resizing
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:pl-12"> {/* Added padding-left for gap on medium screens and up */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 rounded-l-lg w-1/2 text-center transition-colors duration-200 ${
                activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-4 py-2 rounded-r-lg w-1/2 text-center transition-colors duration-200 ${
                activeTab === 'register' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Register
            </button>
          </div>
 
          {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
 
          {activeTab === 'login' ? (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <span
                  onClick={() => setActiveTab('register')}
                  className="text-purple-700 hover:underline cursor-pointer"
                >
                  Register
                </span>
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full"
                  required
                  pattern="[A-Za-z\s]*"
                  title="Name should only contain letters and spaces"
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={registerForm.number}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full"
                  required
                  pattern="\d*"
                  title="Phone number should only contain digits"
                />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={registerForm.dob}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full"
                  required
                  max={today}
                  title="Date of birth cannot be in the future"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded w-full">
                  Register
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <span
                  onClick={() => setActiveTab('login')}
                  className="text-purple-700 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default LoginRegister;