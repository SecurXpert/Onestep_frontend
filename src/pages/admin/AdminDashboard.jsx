import React, { useState } from 'react';
import AddDoctorForm from '../../components/admin/AddDoctorForm';
import DoctorList from '../../components/admin/DoctorList';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('add');

  const views = [
    { name: 'Add Doctors', id: 'add' },
    { name: 'List of All Doctors', id: 'list' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex">
      {/* Decorative Line Element (Header) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-full md:w-[200px] bg-blue-700 shadow-lg">
          <nav className="flex flex-col space-y-4 p-4 h-full">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 rounded-lg text-center font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  activeView === view.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-blue-100 text-blue-500 hover:bg-purple-600 hover:text-white'
                }`}
              >
                {view.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-600 mb-6 tracking-tight animate-fade-in-up">
              Admin Dashboard
            </h2>
            {activeView === 'add' ? <AddDoctorForm /> : <DoctorList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;