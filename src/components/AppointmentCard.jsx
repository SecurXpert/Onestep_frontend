import React, { useState, useEffect } from "react";
import RazorpayPayment from "../pages/RazorpayPayment";
import { fetchWithAuth } from "../utils/api";
import { FaEllipsisV } from 'react-icons/fa';

const AppointmentCard = ({ userId, onCancel }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetchWithAuth(
          "http://192.168.0.162:8000/appointments/my-appointments"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status}`);
        }
        
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handlePaymentSuccess = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.appointment_id === appointmentId ? { ...appt, is_paid: true } : appt
      )
    );
  };

  const handleDownloadReceipt = async (appointmentId) => {
    try {
      const response = await fetchWithAuth(
        `http://192.168.0.162:8000/static/receipts/receipt_${appointmentId}.pdf`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/pdf',
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download receipt");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Receipt_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Receipt download error:", error);
      alert(`Failed to download receipt: ${error.message}`);
    }
  };

  const toggleDropdown = (appointmentId) => {
    setDropdownOpen(dropdownOpen === appointmentId ? null : appointmentId);
  };

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (appointments.length === 0) {
    return <div className="text-center py-4">No appointments found</div>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.appointment_id}
          className="w-full bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src="/default-doctor.png"
                alt={appointment.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-700">Dr. {appointment.name}</h3>
              <p className="text-purple-500 text-sm">Specialty: {appointment.specialization}</p>
              <p className="text-gray-600 text-sm">Date: {appointment.preferred_date}</p>
              {appointment.appointment_type === "Home Visit" && (
                <p className="text-gray-600 text-sm">
                  <strong>Address:</strong> {appointment.forward_to || "Not specified"}
                </p>
              )}
              <p className="text-gray-600 text-sm">Time: {appointment.time_slot}</p>
              <p className="text-xs text-gray-400">
                Appointment ID: <span className="font-mono">{appointment.appointment_id}</span>
              </p>
              <p className="text-xs text-gray-400">
                Patient ID: <span className="font-mono">{userId || "Not Provided"}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 relative">
            {/* Desktop View: Buttons */}
            <div className="hidden sm:flex sm:space-x-2 sm:items-center">
              {appointment.is_paid ? (
                <>
                  <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full">
                    Payment Done
                  </span>
                  <button
                    onClick={() => handleDownloadReceipt(appointment.appointment_id)}
                    className="px-4 py-2 rounded transition bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    Download Receipt
                  </button>
                </>
              ) : (
                <>
                  {appointment.appointment_type === "virtual" && (
                    <div className="w-full sm:w-auto">
                      <RazorpayPayment
                        appointmentId={appointment.appointment_id}
                        amount={appointment.fees || 500}
                        onSuccess={() => handlePaymentSuccess(appointment.appointment_id)}
                        doctorName={appointment.name}
                        patientEmail={appointment.email}
                        userId={userId}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => onCancel(appointment.appointment_id)}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
              {appointment.is_confirmed ? (
                <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full">
                  Confirmed
                </span>
              ) : appointment.message === "rejected" ? (
                <span className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full">
                  Rejected
                </span>
              ) : (
                <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full">
                  Pending
                </span>
              )}
            </div>
            {/* Mobile View: Dropdown */}
            <div className="sm:hidden">
              <button
                onClick={() => toggleDropdown(appointment.appointment_id)}
                className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
              >
                <FaEllipsisV />
              </button>
              {dropdownOpen === appointment.appointment_id && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <div className="flex flex-col p-2 space-y-2">
                    {appointment.is_paid ? (
                      <>
                        <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full text-center">
                          Payment Done
                        </span>
                        <button
                          onClick={() => handleDownloadReceipt(appointment.appointment_id)}
                          className="px-4 py-2 rounded transition bg-blue-100 text-blue-600 hover:bg-blue-200 text-center"
                        >
                          Download Receipt
                        </button>
                      </>
                    ) : (
                      <>
                        {appointment.appointment_type === "virtual" && (
                          <RazorpayPayment
                            appointmentId={appointment.appointment_id}
                            amount={appointment.fees || 500}
                            onSuccess={() => handlePaymentSuccess(appointment.appointment_id)}
                            doctorName={appointment.name}
                            patientEmail={appointment.email}
                            userId={userId}
                          />
                        )}
                        <button
                          onClick={() => onCancel(appointment.appointment_id)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition text-center"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.is_confirmed ? (
                      <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full text-center">
                        Confirmed
                      </span>
                    ) : appointment.message === "rejected" ? (
                      <span className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full text-center">
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full text-center">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentCard;