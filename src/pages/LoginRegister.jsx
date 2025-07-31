import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import registerImage from '../assets/registerimage.png'; // Main image for all screens

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
    if (name === 'name' && value && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
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

    if (!/^\d{10}$/.test(number)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }

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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 2xs:p-6 xs:p-8 2sm:p-10 sm:p-12 md:p-16 md800:p-18 md900:p-20 lg:p-20 xl:p-24 2xl:p-28 3xl:p-32">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 h-64 2xs:h-72 xs:h-80 2sm:h-96 sm:h-[400px] md:h-[500px] md800:h-[550px] md900:h-[600px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] 3xl:h-[750px]">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 2xs:p-5 xs:p-6 2sm:p-7 sm:p-8 md:p-10 md800:p-11 md900:p-12 lg:p-12 xl:p-14 2xl:p-16 3xl:p-18">
          <div className="flex justify-center mb-4 2xs:mb-5 xs:mb-6 2sm:mb-6 sm:mb-6 md:mb-6 md800:mb-7 md900:mb-8 lg:mb-8 xl:mb-9 2xl:mb-10 3xl:mb-12">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1.5 2xs:px-3.5 2xs:py-1.5 xs:px-4 xs:py-2 2sm:px-4 2sm:py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 md800:px-5 md800:py-2.5 md900:px-5 md900:py-2.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 3xl:px-7 3xl:py-3.5 rounded-l-lg w-1/2 text-center transition-colors duration-200 text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl ${
                activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-1.5 2xs:px-3.5 2xs:py-1.5 xs:px-4 xs:py-2 2sm:px-4 2sm:py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 md800:px-5 md800:py-2.5 md900:px-5 md900:py-2.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 3xl:px-7 3xl:py-3.5 rounded-r-lg w-1/2 text-center transition-colors duration-200 text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl ${
                activeTab === 'register' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <p className="text-red-600 mb-3 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl">
              {error}
            </p>
          )}

          {activeTab === 'login' ? (
            <div>
              <h2 className="text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-xl md:text-xl md800:text-2xl md900:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-bold mb-4 text-center">
                Login
              </h2>
              <form onSubmit={handleLogin} className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                >
                  Login
                </button>
              </form>
              <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
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
              <h2 className="text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-xl md:text-xl md800:text-2xl md900:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-bold mb-4 text-center">
                Register
              </h2>
              <form onSubmit={handleRegister} className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
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
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
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
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
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
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                >
                  Register
                </button>
              </form>
              <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
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