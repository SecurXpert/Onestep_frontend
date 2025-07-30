import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUsers, FaBell, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Sample data (replace with API calls in a real application)
const initialDoctors = [
  { id: 1, name: 'Dr. John Smith', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Doe', specialty: 'Neurology' },
];
const initialAdmins = [
  { id: 1, name: 'Admin One', email: 'admin1@example.com' },
  { id: 2, name: 'Admin Two', email: 'admin2@example.com' },
];
const initialPatients = [
  { id: 1, name: 'Patient One', condition: 'Stable' },
  { id: 2, name: 'Patient Two', condition: 'Critical' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(initialDoctors);
  const [admins, setAdmins] = useState(initialAdmins);
  const [patients, setPatients] = useState(initialPatients);

  // Check authentication
//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [navigate]);

  // Doctor handlers
  const handleAddDoctor = () => {
    // Implement add doctor logic (e.g., open modal or navigate to form)
    console.log('Add doctor');
  };

  const handleEditDoctor = (id) => {
    // Implement edit doctor logic
    console.log(`Edit doctor ${id}`);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  // Admin handlers
  const handleAddAdmin = () => {
    // Implement add admin logic
    console.log('Add admin');
  };

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Patient handlers
  const handleDeletePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin</span>
              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  navigate('/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
          <nav className="mt-5">
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
                >
                  <FaTachometerAlt className="mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/doctors"
                  className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
                >
                  <FaUserMd className="mr-3" />
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="/patients"
                  className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
                >
                  <FaUsers className="mr-3" />
                  Patients
                </a>
              </li>
              <li>
                <a
                  href="/notifications"
                  className="flex items-center px-4 py-3 text-white hover:bg-gray-700"
                >
                  <FaBell className="mr-3" />
                  Notifications
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>

            {/* Doctors Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Doctors List</h3>
                <button
                  onClick={handleAddDoctor}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <FaPlus className="mr-2" /> Add Doctor
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditDoctor(doctor.id)}
                            className="text-blue-500 hover:text-blue-700 mr-4"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admins Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Admins List</h3>
                <button
                  onClick={handleAddAdmin}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <FaPlus className="mr-2" /> Add Admin
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Patients Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Patients List</h3>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.condition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;