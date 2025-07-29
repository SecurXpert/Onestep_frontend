import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard"

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    const data = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    const unique = [];
    const seen = new Set();

    for (const appt of data) {
      if (!seen.has(appt.id)) {
        unique.push(appt);
        seen.add(appt.id);
      }
    }

    setAppointments(unique);
    localStorage.setItem("myAppointments", JSON.stringify(unique));
  };

  const updateAppointmentStatus = () => {
    const bookings = JSON.parse(localStorage.getItem("doctorBookings") || "[]");
    const appointments = JSON.parse(localStorage.getItem("myAppointments") || "[]");
    const updatedAppointments = appointments.map((appt) => {
      const booking = bookings.find((b) => b.id === `booking-${appt.id}`);
      if (booking) {
        return { ...appt, status: booking.status, payment: booking.payment || appt.payment };
      }
      return appt;
    });
    setAppointments(updatedAppointments);
    localStorage.setItem("myAppointments", JSON.stringify(updatedAppointments));
  };

  useEffect(() => {
    fetchAppointments();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchAppointments();
      }
    };

    const handleBookingUpdate = () => {
      updateAppointmentStatus();
      fetchAppointments();
    };

    const handlePaymentUpdate = () => {
      updateAppointmentStatus();
      fetchAppointments();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("doctorBookingUpdated", handleBookingUpdate);
    window.addEventListener("paymentUpdated", handlePaymentUpdate);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("doctorBookingUpdated", handleBookingUpdate);
      window.removeEventListener("paymentUpdated", handlePaymentUpdate);
    };
  }, []);

  const handleCancel = (id) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("myAppointments", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center text-black mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments booked yet.</p>
      ) : (
        appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            {...appt}
            patientEmail={appt.patientEmail || "user@example.com"}
            onCancel={handleCancel}
          />
        ))
      )}
    </div>
  );
};

export default MyAppointment;